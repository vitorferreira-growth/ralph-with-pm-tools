#!/usr/bin/env python3
"""
Security utilities for Claude Code hooks
Shared security functions and validation logic
"""

import re
import json
from typing import Dict, List, Optional, Any, Union
from pathlib import Path


# Enhanced secret detection patterns
SECRET_PATTERNS = [
    # API Keys and tokens
    r'(?i)(api[_-]?key|password|secret|token)\s*[:=]\s*["\']?([^"\'\s]+)',
    r'(?i)bearer\s+[a-z0-9\-._~+/]+=*',
    r'(?i)authorization:\s*bearer\s+[a-z0-9\-._~+/]+=*',

    # SSH and PGP keys
    r'-----BEGIN [A-Z ]+PRIVATE KEY-----',
    r'-----BEGIN RSA PRIVATE KEY-----',
    r'-----BEGIN OPENSSH PRIVATE KEY-----',
    r'-----BEGIN PGP PRIVATE KEY BLOCK-----',

    # Cloud provider keys
    r'AKIA[0-9A-Z]{16}',  # AWS Access Key
    r'(?i)aws_secret_access_key\s*[:=]\s*["\']?([^"\'\s]+)',
    r'(?i)google_api_key\s*[:=]\s*["\']?([^"\'\s]+)',
    r'(?i)github_token\s*[:=]\s*["\']?([^"\'\s]+)',

    # Database connection strings
    r'(?i)(mongodb|mysql|postgresql)://[^:]+:[^@]+@',
    r'(?i)postgres://[^:]+:[^@]+@',

    # JWT tokens
    r'eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*',

    # Generic high-entropy strings that might be secrets
    r'(?i)(secret|password|key|token)\s*[:=]\s*["\']?[a-z0-9]{20,}["\']?',
]

# Dangerous file operations patterns
DANGEROUS_FILE_PATTERNS = [
    r'/etc/passwd',
    r'/etc/shadow',
    r'/root/',
    r'\.ssh/id_rsa',
    r'\.aws/credentials',
    r'\.env',
    r'config\.json',
    r'secrets\.',
    r'\.key$',
    r'\.pem$',
]


def detect_secrets(content: str) -> List[Dict[str, str]]:
    """
    Detect potential secrets in content using regex patterns

    Args:
        content: String content to analyze

    Returns:
        List of detected secrets with pattern and match info
    """
    detected_secrets = []

    for pattern in SECRET_PATTERNS:
        matches = re.finditer(pattern, content, re.MULTILINE)
        for match in matches:
            detected_secrets.append({
                'pattern': pattern,
                'match': match.group(0)[:50] + '...' if len(match.group(0)) > 50 else match.group(0),
                'start': match.start(),
                'end': match.end(),
                'type': _classify_secret_type(pattern)
            })

    return detected_secrets


def _classify_secret_type(pattern: str) -> str:
    """Classify the type of secret based on the regex pattern"""
    if 'api' in pattern.lower() or 'token' in pattern.lower():
        return 'api_key'
    elif 'password' in pattern.lower():
        return 'password'
    elif 'private key' in pattern.upper():
        return 'private_key'
    elif 'bearer' in pattern.lower():
        return 'bearer_token'
    elif 'aws' in pattern.lower():
        return 'aws_credential'
    elif 'jwt' in pattern.lower() or 'eyJ' in pattern:
        return 'jwt_token'
    else:
        return 'unknown_secret'


def is_dangerous_file_path(file_path: str) -> bool:
    """
    Check if a file path is potentially dangerous to access

    Args:
        file_path: File path to check

    Returns:
        True if the path is dangerous, False otherwise
    """
    path_str = str(file_path).lower()

    for pattern in DANGEROUS_FILE_PATTERNS:
        if re.search(pattern, path_str, re.IGNORECASE):
            return True

    return False


def validate_tool_input(tool_input: Any) -> Dict[str, Any]:
    """
    Validate and sanitize tool input

    Args:
        tool_input: Raw tool input to validate

    Returns:
        Validated tool input dictionary

    Raises:
        ValueError: If input is invalid or dangerous
    """
    if not isinstance(tool_input, dict):
        # Convert string inputs to dict format
        if isinstance(tool_input, str):
            try:
                parsed = json.loads(tool_input)
                if isinstance(parsed, dict):
                    tool_input = parsed
                else:
                    tool_input = {'raw_input': tool_input}
            except json.JSONDecodeError:
                tool_input = {'raw_input': tool_input}
        else:
            tool_input = {'raw_input': str(tool_input)}

    # Whitelist allowed keys for different tool types
    ALLOWED_KEYS = {
        'Bash': {'command', 'description', 'timeout'},
        'Read': {'file_path', 'limit', 'offset'},
        'Write': {'file_path', 'content'},
        'Edit': {'file_path', 'old_string', 'new_string', 'replace_all'},
        'MultiEdit': {'file_path', 'edits'},
        'Grep': {'pattern', 'path', 'glob', 'type', 'output_mode', '-i', '-n', '-A', '-B', '-C'},
        'Glob': {'pattern', 'path'},
        'LS': {'path', 'ignore'},
    }

    # Get tool name from input or environment
    tool_name = tool_input.get('tool_name', 'unknown')

    # Validate keys against whitelist
    if tool_name in ALLOWED_KEYS:
        allowed = ALLOWED_KEYS[tool_name]
        invalid_keys = set(tool_input.keys()) - allowed - {'tool_name', 'raw_input'}
        if invalid_keys:
            raise ValueError(f"Invalid keys for {tool_name}: {invalid_keys}")

    # Check for secrets in string values
    for key, value in tool_input.items():
        if isinstance(value, str):
            secrets = detect_secrets(value)
            if secrets:
                raise ValueError(f"Potential secret detected in {key}: {secrets[0]['type']}")

    # Validate file paths
    if 'file_path' in tool_input:
        file_path = tool_input['file_path']
        if is_dangerous_file_path(file_path):
            raise ValueError(f"Access to dangerous file path blocked: {file_path}")

    return tool_input


def sanitize_output(output: str, max_length: int = 10000) -> str:
    """
    Sanitize output by removing potential secrets and limiting length

    Args:
        output: Raw output to sanitize
        max_length: Maximum length of output

    Returns:
        Sanitized output string
    """
    if not isinstance(output, str):
        output = str(output)

    # Truncate if too long
    if len(output) > max_length:
        output = output[:max_length] + '\n... [TRUNCATED FOR SECURITY]'

    # Replace potential secrets with placeholders
    secrets = detect_secrets(output)
    for secret in secrets:
        secret_type = secret['type']
        placeholder = f'[{secret_type.upper()}_REDACTED]'
        output = output.replace(secret['match'], placeholder)

    return output


def create_security_log_entry(
    tool_name: str,
    tool_input: Any,
    action: str,
    details: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Create a standardized security log entry

    Args:
        tool_name: Name of the tool being used
        tool_input: Input provided to the tool
        action: Action taken (e.g., 'blocked', 'allowed', 'sanitized')
        details: Additional details about the security action

    Returns:
        Security log entry dictionary
    """
    from datetime import datetime

    log_entry = {
        'timestamp': datetime.now().isoformat(),
        'tool_name': tool_name,
        'action': action,
        'input_hash': hash(str(tool_input)) if tool_input else None,
    }

    if details:
        log_entry['details'] = details

    # Sanitize the input before logging
    if isinstance(tool_input, dict):
        sanitized_input = {}
        for key, value in tool_input.items():
            if isinstance(value, str) and detect_secrets(value):
                sanitized_input[key] = '[REDACTED_FOR_SECURITY]'
            else:
                sanitized_input[key] = value
        log_entry['tool_input'] = sanitized_input
    else:
        log_entry['tool_input'] = '[REDACTED_FOR_SECURITY]' if detect_secrets(str(tool_input)) else str(tool_input)[:200]

    return log_entry

# Enhanced system directory protection
SYSTEM_DIRECTORY_PATTERNS = [
    r'^/etc/',           # System configuration
    r'^/root/',          # Root home directory
    r'^/var/log/',       # System logs
    r'^/boot/',          # Boot files
    r'^/sys/',           # System filesystem
    r'^/proc/',          # Process filesystem
    r'^/dev/',           # Device files
    r'^/usr/bin/',       # System binaries
    r'^/usr/sbin/',      # System admin binaries
    r'^/lib/',           # System libraries
    r'^/lib64/',         # 64-bit system libraries
    r'\.dll$',           # Windows DLLs
    r'\.exe$',           # Windows executables
    r'\.scr$',           # Screen savers (potential malware)
    r'\.msi$',           # Windows installers
    r'\.bat$',           # Batch files (potential command injection)
    r'\.cmd$',           # Command files
    r'\.ps1$',           # PowerShell scripts
]

# Rate limiting storage
_rate_limit_storage = {}
_rate_limit_cleanup_time = None


def enhanced_is_dangerous_file_path(file_path: str) -> bool:
    """
    Enhanced file path validation with comprehensive system directory protection
    """
    from pathlib import Path
    import os

    # Normalize path for consistent checking
    try:
        normalized_path = str(Path(file_path).resolve())
    except (OSError, ValueError):
        return True

    path_str = normalized_path.lower()

    # Check against original dangerous patterns
    for pattern in DANGEROUS_FILE_PATTERNS:
        if re.search(pattern, path_str, re.IGNORECASE):
            return True

    # Check against enhanced system directory patterns
    for pattern in SYSTEM_DIRECTORY_PATTERNS:
        if re.search(pattern, normalized_path, re.IGNORECASE):
            return True

    # Block access to parent directories using ..
    if "../" in file_path or "..\\" in file_path:
        return True

    # Block access to hidden system files
    path_parts = Path(file_path).parts
    for part in path_parts:
        if part.startswith('.') and part in ['.env', '.git', '.ssh', '.aws', '.docker']:
            return True

    # Block access outside of allowed directories
    try:
        cwd = Path.cwd().resolve()
        target_path = Path(file_path).resolve()

        # Check if target is within current working directory
        try:
            target_path.relative_to(cwd)
        except ValueError:
            return True

    except (OSError, ValueError):
        return True

    return False


def check_rate_limit(identifier: str, max_requests: int = 10, window_seconds: int = 60) -> bool:
    """
    Check if an operation is within rate limits
    """
    import time
    global _rate_limit_storage, _rate_limit_cleanup_time

    current_time = time.time()

    # Cleanup old entries every 5 minutes
    if _rate_limit_cleanup_time is None or (current_time - _rate_limit_cleanup_time) > 300:
        cleanup_time = current_time - window_seconds * 2
        _rate_limit_storage = {
            k: [t for t in timestamps if t > cleanup_time]
            for k, timestamps in _rate_limit_storage.items()
            if any(t > cleanup_time for t in timestamps)
        }
        _rate_limit_cleanup_time = current_time

    # Initialize or get existing timestamps for this identifier
    if identifier not in _rate_limit_storage:
        _rate_limit_storage[identifier] = []

    timestamps = _rate_limit_storage[identifier]

    # Remove timestamps outside the window
    cutoff_time = current_time - window_seconds
    timestamps = [t for t in timestamps if t > cutoff_time]

    # Check if we are within limits
    if len(timestamps) >= max_requests:
        return False  # Rate limited

    # Add current timestamp
    timestamps.append(current_time)
    _rate_limit_storage[identifier] = timestamps

    return True  # Not rate limited


def get_secure_timeout(operation_type: str) -> int:
    """
    Get secure timeout value for different operations
    """
    timeout_config = {
        'bash': 60,          # 1 minute for bash commands
        'read': 30,          # 30 seconds for file reads
        'write': 45,         # 45 seconds for file writes
        'edit': 60,          # 1 minute for file edits
        'grep': 30,          # 30 seconds for searches
        'glob': 20,          # 20 seconds for file globbing
        'ls': 15,            # 15 seconds for directory listings
        'git': 120,          # 2 minutes for git operations
        'test': 300,         # 5 minutes for test execution
        'build': 600,        # 10 minutes for builds
        'default': 60        # Default 1 minute
    }

    return timeout_config.get(operation_type.lower(), timeout_config['default'])


def create_secure_config() -> Dict[str, Any]:
    """
    Create secure configuration with proper defaults
    """
    return {
        'max_file_size': 10 * 1024 * 1024,  # 10MB max file size
        'max_output_length': 50000,          # 50K characters max output
        'max_log_entries': 1000,             # Max log entries before rotation
        'rate_limit_requests': 20,           # Max requests per minute
        'rate_limit_window': 60,             # Rate limit window in seconds
        'allowed_extensions': [
            '.py', '.js', '.ts', '.go', '.rs', '.rb', '.java', '.cpp', '.c',
            '.h', '.hpp', '.css', '.html', '.md', '.txt', '.json', '.yaml',
            '.yml', '.toml', '.ini', '.cfg', '.conf', '.sh', '.bat'
        ],
        'blocked_extensions': [
            '.exe', '.dll', '.so', '.dylib', '.msi', '.deb', '.rpm',
            '.dmg', '.pkg', '.app', '.scr', '.com', '.pif'
        ],
        'secure_headers': {
            'User-Agent': 'Claude-Code-Security/1.0',
            'X-Security-Version': '1.0'
        }
    }


def rotate_log_file(log_file_path: str, max_entries: int = 1000) -> bool:
    """
    Rotate log file when it gets too large
    """
    from pathlib import Path
    import json
    import shutil
    from datetime import datetime

    log_path = Path(log_file_path)

    if not log_path.exists():
        return False

    # Count entries in log file
    try:
        with open(log_path, 'r') as f:
            lines = f.readlines()

        if len(lines) <= max_entries:
            return False  # No rotation needed

        # Create backup with timestamp
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_path = log_path.with_suffix(f'.{timestamp}.backup')

        # Move current log to backup
        shutil.move(str(log_path), str(backup_path))

        # Keep only recent entries in new log file
        recent_entries = lines[-max_entries//2:]  # Keep last half

        with open(log_path, 'w') as f:
            f.writelines(recent_entries)

        # Add rotation log entry
        rotation_entry = {
            'timestamp': datetime.now().isoformat(),
            'action': 'log_rotation',
            'entries_before': len(lines),
            'entries_after': len(recent_entries),
            'backup_file': str(backup_path)
        }

        with open(log_path, 'a') as f:
            f.write(json.dumps(rotation_entry) + '\n')

        # Clean up old backups (keep only last 5)
        backup_pattern = log_path.stem + '.*' + '.backup'
        parent_dir = log_path.parent
        backups = sorted(parent_dir.glob(backup_pattern))

        if len(backups) > 5:
            for old_backup in backups[:-5]:
                old_backup.unlink()

        return True

    except (IOError, json.JSONDecodeError, OSError) as e:
        # If rotation fails, log the error but don't crash
        try:
            error_entry = {
                'timestamp': datetime.now().isoformat(),
                'action': 'log_rotation_error',
                'error': str(e)
            }
            with open(log_path, 'a') as f:
                f.write(json.dumps(error_entry) + '\n')
        except:
            pass  # If we cannot even log the error, just continue

        return False


def setup_log_rotation_for_all_logs() -> None:
    """
    Set up log rotation for all log files in the logs directory
    """
    from pathlib import Path

    logs_dir = Path(__file__).parent / 'logs'
    if not logs_dir.exists():
        return

    # Rotate all .json log files
    for log_file in logs_dir.glob('*.json'):
        rotate_log_file(str(log_file), max_entries=1000)

