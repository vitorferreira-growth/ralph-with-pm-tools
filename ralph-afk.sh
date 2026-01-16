#!/usr/bin/env bash
set -euo pipefail

# =========================
# Config
# =========================
LOG_FILE="${LOG_FILE:-run.log}"     # override: LOG_FILE=meu.log ./script.sh 10
STREAM="${STREAM:-1}"              # 1 = stream Claude output live, 0 = print at end of cycle
BAR_WIDTH="${BAR_WIDTH:-30}"       # progress bar width

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
usage() {
  echo "Usage: $0 <iterations>"
  echo "Example: $0 10"
  echo
  echo "Env vars:"
  echo "  LOG_FILE=run.log   Where to write logs (default: run.log)"
  echo "  STREAM=1           1=stream Claude output live, 0=print at end of cycle"
  echo "  BAR_WIDTH=30       Progress bar width"
}

timestamp() { date "+%Y-%m-%d %H:%M:%S"; }

log() {
  # log LEVEL COLOR "message"
  local level="$1"; shift
  local color="$1"; shift
  local msg="$*"

  local line
  line="$(printf "[%s] %-7s %s" "$(timestamp)" "$level" "$msg")"

  # terminal
  printf "%s%s%s\n" "$color" "$line" "$C_RESET"

  # file (no colors)
  printf "%s\n" "$line" >> "$LOG_FILE"
}

hr() {
  local w="${COLUMNS:-80}"
  printf '%*s\n' "$w" '' | tr ' ' '-'
}

progress_bar() {
  # progress_bar current total
  local current="$1"
  local total="$2"

  local filled=$(( current * BAR_WIDTH / total ))
  local empty=$(( BAR_WIDTH - filled ))

  printf "["
  if command -v seq >/dev/null 2>&1; then
    printf "%0.s#" $(seq 1 "$filled" 2>/dev/null || true)
    printf "%0.s-" $(seq 1 "$empty" 2>/dev/null || true)
  else
    # fallback without seq
    for ((k=0; k<filled; k++)); do printf "#"; done
    for ((k=0; k<empty; k++)); do printf "-"; done
  fi
  printf "] %d/%d" "$current" "$total"
}

notify_done() {
  # 1) Beep in terminal (if bell is enabled)
  if command -v tput >/dev/null 2>&1; then
    tput bel || true
  else
    printf '\a' || true
  fi

  # 2) Best-effort system sound
  if command -v afplay >/dev/null 2>&1; then
    # macOS
    afplay /System/Library/Sounds/Glass.aiff >/dev/null 2>&1 || true
  elif command -v paplay >/dev/null 2>&1; then
    # Linux (PulseAudio/PipeWire)
    paplay /usr/share/sounds/freedesktop/stereo/complete.oga >/dev/null 2>&1 || true
  elif command -v aplay >/dev/null 2>&1; then
    # Linux (ALSA)
    aplay /usr/share/sounds/alsa/Front_Center.wav >/dev/null 2>&1 || true
  fi
}

# =========================
# Args
# =========================
if [[ "${1:-}" == "" ]]; then
  usage
  exit 1
fi

if ! [[ "$1" =~ ^[0-9]+$ ]] || [[ "$1" -le 0 ]]; then
  echo "ERROR: iterations must be a positive integer."
  usage
  exit 1
fi

iterations="$1"

# =========================
# Init
# =========================
: > "$LOG_FILE" # truncate log file
start_all="$(date +%s)"

log "INFO" "$C_CYAN" "Starting run with ${iterations} iteration(s)."
log "INFO" "$C_DIM"  "Log file: $LOG_FILE | STREAM=$STREAM | BAR_WIDTH=$BAR_WIDTH"
hr | tee -a "$LOG_FILE"

# =========================
# Main loop
# =========================
for ((i=1; i<=iterations; i++)); do
  cycle_start="$(date +%s)"
  echo | tee -a "$LOG_FILE"
  hr | tee -a "$LOG_FILE"

  bar="$(progress_bar "$i" "$iterations")"
  log "CYCLE" "$C_MAGENTA" "$bar  — Running Claude..."
  hr | tee -a "$LOG_FILE"

  prompt='@PRD.md @progress.txt @.claude/agents/ @.claude/context/infinitepay-ds.md \
1. Read .claude/context/infinitepay-ds.md for Design System rules. \
2. Find the highest-priority task and DETECT its type. \
3. USE SPECIALIZED AGENTS based on task type: \
   - Frontend/UI: typescript-engineer, frontend-developer \
   - Backend: python-engineer, golang-engineer, ruby-engineer, rust-engineer \
   - Database: data-architect-agent \
   - Security: security-engineer, api-security-agent \
   - Infrastructure: terraform-ops, gitops-engineer \
   - Payments/Fintech: payments-engineer, compliance-engineer \
4. IMPLEMENT following the agent best practices. \
5. FRONTEND RULES (InfinitePay Design System): \
   - Use components from @cloudwalk/infinitepay-ds-web (Button, Input, Icon, Tag, Modal) \
   - Use ONLY semantic colors (bg-primary, text-success, border-error) \
   - Use ONLY DS typography (font-heading-*, font-content-*) \
   - NEVER override component styles with className (only layout: spacing, width) \
   - ALWAYS verify icon names exist in infinitepay-ds.md before using \
   - Prefer DS components over creating new ones \
6. RUN /security-review on all changed files. \
7. RUN /test-gen for new functionality. \
8. Run tests and type checks. \
9. Update PRD with completion status. \
10. Append to progress.txt: task, agents used, results. \
11. Commit with conventional commits. \
ONLY WORK ON A SINGLE TASK. \
If PRD is complete, output <promise>COMPLETE</promise>. \
Reference .claude/agents/ for specialized domain knowledge.'

  result=""
  if [[ "$STREAM" == "1" ]]; then
    tmp="$(mktemp)"
    # Stream to terminal+log and also capture to tmp for COMPLETE detection
    set +e
    claude --dangerously-skip-permissions -p "$prompt" 2>&1 | tee -a "$LOG_FILE" | tee "$tmp"
    cmd_status="${PIPESTATUS[0]}"
    set -e

    result="$(cat "$tmp")"
    rm -f "$tmp"

    if [[ "$cmd_status" -ne 0 ]]; then
      log "ERROR" "$C_RED" "claude exited with status $cmd_status (stopping)."
      notify_done
      exit "$cmd_status"
    fi
  else
    # Non-stream: capture then print once
    set +e
    result="$(claude --dangerously-skip-permissions -p "$prompt" 2>&1)"
    cmd_status="$?"
    set -e

    printf "%s\n" "$result" | tee -a "$LOG_FILE"

    if [[ "$cmd_status" -ne 0 ]]; then
      log "ERROR" "$C_RED" "claude exited with status $cmd_status (stopping)."
      notify_done
      exit "$cmd_status"
    fi
  fi

  cycle_end="$(date +%s)"
  cycle_secs="$((cycle_end - cycle_start))"

  hr | tee -a "$LOG_FILE"
  log "DONE" "$C_BLUE" "Cycle $i finished in ${cycle_secs}s."

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    total_secs="$(( $(date +%s) - start_all ))"
    log "SUCCESS" "$C_GREEN" "PRD complete after $i iteration(s). Total time: ${total_secs}s."
    notify_done
    exit 0
  else
    log "INFO" "$C_YELLOW" "Not complete yet. Moving to next cycle."
  fi
done

total_secs="$(( $(date +%s) - start_all ))"
log "INFO" "$C_CYAN" "Reached max iterations ($iterations). Total time: ${total_secs}s."
notify_done
exit 0