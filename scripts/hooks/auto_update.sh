#!/bin/bash
# Auto-update hook - pulls latest on session start
# Runs silently, non-blocking, fails gracefully

REPO_DIR="$(dirname "$(dirname "$(dirname "$(readlink -f "$0" 2>/dev/null || echo "$0")")")")"

# Skip if not a git repo or offline
cd "$REPO_DIR" 2>/dev/null || exit 0
git rev-parse --git-dir &>/dev/null || exit 0

# Fetch and check for updates (timeout 5s)
timeout 5 git fetch origin main &>/dev/null || exit 0

LOCAL=$(git rev-parse HEAD 2>/dev/null)
REMOTE=$(git rev-parse origin/main 2>/dev/null)

if [[ "$LOCAL" != "$REMOTE" ]]; then
    # Pull updates
    git pull --ff-only origin main &>/dev/null && \
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Auto-updated claude-code-commandments" >> ~/.claude/logs/updates.log
fi

exit 0
