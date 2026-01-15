#!/bin/bash
#
# Security Hook: Block Dangerous Bash Commands
# Runs before Bash tool executes
#
# Exit codes:
#   0 = Allow command
#   2 = Block command (dangerous)
#

set -uo pipefail

# Check jq dependency
if ! command -v jq &>/dev/null; then
    echo '{"error": "jq required but not installed"}' >&2
    exit 2
fi

# Read JSON input from stdin
INPUT=$(cat)

# Extract command from tool input (use heredoc to avoid echo issues)
COMMAND=$(jq -r '.tool_input.command // empty' <<< "$INPUT" 2>/dev/null) || COMMAND=""

if [[ -z "$COMMAND" ]]; then
    exit 0  # No command, allow
fi

# Dangerous command patterns (regex)
DANGEROUS_PATTERNS=(
    'rm[[:space:]]+-rf[[:space:]]+/'           # rm -rf /
    'rm[[:space:]]+-fr[[:space:]]+/'           # rm -fr /
    'rm[[:space:]]+-r[[:space:]]+-f[[:space:]]+/'  # rm -r -f /
    'rm[[:space:]]+-f[[:space:]]+-r[[:space:]]+/'  # rm -f -r /
    'sudo[[:space:]]+rm'                        # sudo rm anything
    'mkfs'                                      # Format filesystem
    'dd[[:space:]]+if=.+of=/dev'               # Write to device
    'chmod[[:space:]]+777[[:space:]]+-R'       # Recursive 777
    'chmod[[:space:]]+-R[[:space:]]+777'       # Recursive 777 (alt)
    '>\s*/dev/sd[a-z]'                         # Write to disk
    ':\(\)\{[[:space:]]*:\|:&'                 # Fork bomb
    'curl.+\|[[:space:]]*bash'                 # curl | bash
    'curl.+\|[[:space:]]*sh'                   # curl | sh
    'wget.+\|[[:space:]]*bash'                 # wget | bash
    'wget.+\|[[:space:]]*sh'                   # wget | sh
    '\$\(.+\)[[:space:]]*\|[[:space:]]*bash'   # $(cmd) | bash
    'nc[[:space:]].+-e'                        # Netcat reverse shell
    'bash[[:space:]]+-i'                       # Interactive bash (reverse shell pattern)
)

# System paths that should never be accessed
SYSTEM_PATHS=(
    '/etc/passwd'
    '/etc/shadow'
    '/etc/sudoers'
    '/root/'
    '~root/'
)

# Check for dangerous patterns
for pattern in "${DANGEROUS_PATTERNS[@]}"; do
    if printf '%s' "$COMMAND" | grep -qE "$pattern"; then
        printf '%s\n' "[SECURITY BLOCK] Dangerous command pattern detected" >&2
        jq -n --arg msg "Blocked dangerous command pattern" '{error: $msg}'
        exit 2
    fi
done

# Check for system path access
for path in "${SYSTEM_PATHS[@]}"; do
    if printf '%s' "$COMMAND" | grep -qF "$path"; then
        printf '%s\n' "[SECURITY BLOCK] System path access blocked" >&2
        jq -n --arg msg "Blocked system path access" '{error: $msg}'
        exit 2
    fi
done

# Log directory
LOG_DIR="${HOME}/.claude/logs"
mkdir -p "$LOG_DIR"

# Log if command contains sensitive keywords (REDACT the actual command)
SENSITIVE_KEYWORDS="password|secret|token|key|credential|auth"
if printf '%s' "$COMMAND" | grep -qiE "$SENSITIVE_KEYWORDS"; then
    printf '[%s] SENSITIVE: [REDACTED - contained sensitive keywords]\n' "$(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_DIR/security.log"
fi

# Allow command
exit 0
