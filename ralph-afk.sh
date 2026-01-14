#!/usr/bin/env bash
set -euo pipefail

# =========================
# Config
# =========================
LOG_FILE="${LOG_FILE:-run.log}"     # pode sobrescrever: LOG_FILE=meu.log ./script.sh 10
STREAM="${STREAM:-1}"              # 1 = mostra output ao vivo, 0 = só imprime no fim do ciclo
BAR_WIDTH="${BAR_WIDTH:-30}"       # tamanho da barra de progresso

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
  printf "%0.s#" $(seq 1 "$filled" 2>/dev/null || true)
  printf "%0.s-" $(seq 1 "$empty" 2>/dev/null || true)
  printf "] %d/%d" "$current" "$total"
}

# =========================
# Args
# =========================
if [[ "${1:-}" == "" ]]; then
  usage
  exit 1
fi

if ! [[ "$1" =~ ^[0-9]+$ ]] || [[ "$1" -le 0 ]]; then
  log "ERROR" "$C_RED" "iterations must be a positive integer."
  usage
  exit 1
fi

iterations="$1"

# =========================
# Init
# =========================
: > "$LOG_FILE" # truncate
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

  local_bar="$(progress_bar "$i" "$iterations")"
  log "CYCLE" "$C_MAGENTA" "$local_bar  — Running Claude..."

  hr | tee -a "$LOG_FILE"

  # Prompt
  prompt='@PRD.md @progress.txt \
1. Find the highest-priority task and implement it. \
2. Run your tests and type checks. \
3. Update the PRD with what was done. \
4. Append your progress to progress.txt. \
5. Commit your changes. \
ONLY WORK ON A SINGLE TASK. \
If the PRD is complete, output <promise>COMPLETE</promise>.'

  result=""
  if [[ "$STREAM" == "1" ]]; then
    tmp="$(mktemp)"
    # Stream to terminal and log, while also capturing to tmp for checking COMPLETE
    set +e
    claude --dangerously-skip-permissions -p "$prompt" 2>&1 | tee -a "$LOG_FILE" | tee "$tmp"
    cmd_status="${PIPESTATUS[0]}"
    set -e
    result="$(cat "$tmp")"
    rm -f "$tmp"

    if [[ "$cmd_status" -ne 0 ]]; then
      log "ERROR" "$C_RED" "claude exited with status $cmd_status (stopping)."
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
    exit 0
  else
    log "INFO" "$C_YELLOW" "Not complete yet. Moving to next cycle."
  fi
done

total_secs="$(( $(date +%s) - start_all ))"
log "INFO" "$C_CYAN" "Reached max iterations ($iterations). Total time: ${total_secs}s."
exit 0