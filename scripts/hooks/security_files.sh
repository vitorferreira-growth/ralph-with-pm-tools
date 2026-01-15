#!/bin/bash
#
# Security Hook: Protect Sensitive Files
# Runs before Edit/Write tool executes
#
# Exit codes:
#   0 = Allow operation
#   2 = Block operation (sensitive file)
#

set -uo pipefail

# Check jq dependency
if ! command -v jq &>/dev/null; then
    echo '{"error": "jq required but not installed"}' >&2
    exit 2
fi

# Read JSON input from stdin
INPUT=$(cat)

# Extract file path from tool input
FILE_PATH=$(jq -r '.tool_input.file_path // empty' <<< "$INPUT" 2>/dev/null) || FILE_PATH=""

if [[ -z "$FILE_PATH" ]]; then
    exit 0  # No file path, allow
fi

# Sensitive file patterns (more specific to avoid false positives)
SENSITIVE_PATTERNS=(
    '(^|/)\.env$'                    # .env files (exact)
    '(^|/)\.env\.[^/]+$'             # .env.local, .env.production
    '(^|/)credentials\.(json|ya?ml|xml|ini|txt)$'  # credentials.json etc
    '(^|/)secrets\.(json|ya?ml|xml|ini|txt)$'      # secrets.yaml etc
    '\.pem$'                          # PEM certificates
    '\.key$'                          # Private keys
    '(^|/)id_rsa$'                    # SSH private key
    '(^|/)id_ed25519$'                # SSH private key
    '(^|/)\.ssh/config$'              # SSH config
    '(^|/)\.aws/credentials$'         # AWS credentials
    '(^|/)\.npmrc$'                   # NPM config (may have tokens)
    '(^|/)\.pypirc$'                  # PyPI config
    '(^|/)\.git/config$'              # Git config (may have tokens)
    '(^|/)\.netrc$'                   # Netrc credentials
)

# System paths (never allow)
SYSTEM_PATHS=(
    '/etc/'
    '/root/'
    '/var/log/'
    '/sys/'
    '/proc/'
)

# Check for sensitive file patterns
for pattern in "${SENSITIVE_PATTERNS[@]}"; do
    if printf '%s' "$FILE_PATH" | grep -qiE "$pattern"; then
        printf '%s\n' "[SECURITY BLOCK] Sensitive file access blocked: $FILE_PATH" >&2
        jq -n --arg msg "Blocked access to sensitive file" '{error: $msg}'
        exit 2
    fi
done

# Check for system paths
for path in "${SYSTEM_PATHS[@]}"; do
    if [[ "$FILE_PATH" == "$path"* ]]; then
        printf '%s\n' "[SECURITY BLOCK] System path access blocked: $FILE_PATH" >&2
        jq -n --arg msg "Blocked system path access" '{error: $msg}'
        exit 2
    fi
done

# Log file modifications (sanitize path for logging)
LOG_DIR="${HOME}/.claude/logs"
mkdir -p "$LOG_DIR"
SAFE_PATH=$(printf '%s' "$FILE_PATH" | tr -d '\n\r\t' | sed 's/[^[:print:]]//g')
printf '[%s] FILE_ACCESS: %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$SAFE_PATH" >> "$LOG_DIR/file_access.log"

# Allow operation
exit 0
