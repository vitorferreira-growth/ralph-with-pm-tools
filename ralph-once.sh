#!/usr/bin/env bash
set -euo pipefail

# =========================
# Config
# =========================
LOG_FILE="${LOG_FILE:-one_shot.log}"  # override: LOG_FILE=run.log ./script.sh
STREAM="${STREAM:-1}"                # 1 = stream output live, 0 = print at end

# =========================
# Colors (auto-disable if not TTY)
# =========================
if [[ -t 1 ]]; then
  C_RESET=$'\033[0m'
  C_RED=$'\033[31m'
  C_GREEN=$'\033[32m'
  C_YELLOW=$'\033[33m'
  C_BLUE=$'\033[34m'
  C_MAGENTA=$'\033[35m'
  C_CYAN=$'\033[36m'
  C_DIM=$'\033[2m'
else
  C_RESET=""; C_RED=""; C_GREEN=""; C_YELLOW=""; C_BLUE=""; C_MAGENTA=""; C_CYAN=""; C_DIM=""
fi

# =========================
# Helpers
# =========================
timestamp() { date "+%Y-%m-%d %H:%M:%S"; }

log() {
  local level="$1"; shift
  local color="$1"; shift
  local msg="$*"

  local line
  line="$(printf "[%s] %-7s %s" "$(timestamp)" "$level" "$msg")"

  printf "%s%s%s\n" "$color" "$line" "$C_RESET"
  printf "%s\n" "$line" >> "$LOG_FILE"
}

hr() {
  local w="${COLUMNS:-80}"
  printf '%*s\n' "$w" '' | tr ' ' '-'
}

notify_done() {
  if command -v tput >/dev/null 2>&1; then
    tput bel || true
  else
    printf '\a' || true
  fi

  if command -v afplay >/dev/null 2>&1; then
    afplay /System/Library/Sounds/Glass.aiff >/dev/null 2>&1 || true
  elif command -v paplay >/dev/null 2>&1; then
    paplay /usr/share/sounds/freedesktop/stereo/complete.oga >/dev/null 2>&1 || true
  elif command -v aplay >/dev/null 2>&1; then
    aplay /usr/share/sounds/alsa/Front_Center.wav >/dev/null 2>&1 || true
  fi
}

# =========================
# Init
# =========================
: > "$LOG_FILE"
start="$(date +%s)"

log "INFO" "$C_CYAN" "Starting one-shot Claude run (IS_SANDBOX=1)."
log "INFO" "$C_DIM"  "Log file: $LOG_FILE | STREAM=$STREAM"
hr | tee -a "$LOG_FILE"

prompt='@PRD.md @progress.txt @.claude/agents/ \
1. Read the PRD and progress file to understand context. \
2. Find the next incomplete task. \
3. DETECT TASK TYPE and use appropriate specialized agents: \
   - Frontend tasks: Use typescript-engineer, frontend-developer agents \
   - Backend tasks: Use language-specific agent (python/go/ruby/rust) \
   - Database tasks: Use data-architect-agent \
   - API tasks: Use api-security-agent \
   - Infrastructure: Use terraform-ops, gitops-engineer \
4. IMPLEMENT the task following agent best practices. \
5. RUN /security-review on changed files before committing. \
6. RUN /test-gen to create tests for new code. \
7. Commit with conventional commits format. \
8. Update progress.txt with task details and agents used. \
ONLY DO ONE TASK AT A TIME. \
Reference agents in .claude/agents/ for domain expertise.'

result=""
if [[ "$STREAM" == "1" ]]; then
  tmp="$(mktemp)"
  set +e
  IS_SANDBOX=1 claude --dangerously-skip-permissions -p "$prompt" 2>&1 | tee -a "$LOG_FILE" | tee "$tmp"
  cmd_status="${PIPESTATUS[0]}"
  set -e

  result="$(cat "$tmp")"
  rm -f "$tmp"
else
  set +e
  result="$(IS_SANDBOX=1 claude --dangerously-skip-permissions -p "$prompt" 2>&1)"
  cmd_status="$?"
  set -e

  printf "%s\n" "$result" | tee -a "$LOG_FILE"
fi

end="$(date +%s)"
secs="$((end - start))"
hr | tee -a "$LOG_FILE"

if [[ "${cmd_status:-0}" -ne 0 ]]; then
  log "ERROR" "$C_RED" "claude exited with status $cmd_status after ${secs}s."
  notify_done
  exit "$cmd_status"
fi

log "SUCCESS" "$C_GREEN" "Finished successfully in ${secs}s."
notify_done
exit 0