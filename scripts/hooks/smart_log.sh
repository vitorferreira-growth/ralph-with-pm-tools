#!/bin/bash
# Smart logging - logs file mods and bash only
set -uo pipefail

command -v jq &>/dev/null || exit 0
INPUT=$(cat)
[[ -z "$INPUT" ]] && exit 0

TOOL=$(jq -r '.tool_name // ""' <<< "$INPUT" 2>/dev/null)
case "$TOOL" in Edit|Write|MultiEdit|Bash|Task) ;; *) exit 0 ;; esac

LOG_DIR="${HOME}/.claude/logs"
mkdir -p "$LOG_DIR" 2>/dev/null || exit 0
LOG="$LOG_DIR/activity.log"

# Rotate if >5MB
if [[ -f "$LOG" ]]; then
    SZ=$(stat -f%z "$LOG" 2>/dev/null || stat -c%s "$LOG" 2>/dev/null || echo 0)
    [[ "$SZ" -gt 5242880 ]] && mv "$LOG" "$LOG.$(date +%s)" 2>/dev/null && \
        ls -t "$LOG_DIR"/activity.log.* 2>/dev/null | tail -n +4 | xargs rm -f 2>/dev/null
fi

TS=$(date '+%m-%d %H:%M:%S')
case "$TOOL" in
    Edit|Write|MultiEdit) printf '[%s] %s: %s\n' "$TS" "$TOOL" "$(jq -r '.tool_input.file_path // "?"' <<< "$INPUT")" ;;
    Bash) printf '[%s] Bash: %s\n' "$TS" "$(jq -r '.tool_input.command // "?"' <<< "$INPUT" | head -c 60 | tr '\n' ' ')" ;;
    Task) printf '[%s] Task: %s\n' "$TS" "$(jq -r '.tool_input.subagent_type // "?"' <<< "$INPUT")" ;;
esac >> "$LOG" 2>/dev/null
exit 0
