#!/bin/bash
# Auto-commit hook - commits file changes after Edit/Write
set -uo pipefail

git rev-parse --git-dir &>/dev/null || exit 0

INPUT=$(cat)
FILE_PATH=$(jq -r '.tool_input.file_path // empty' <<< "$INPUT" 2>/dev/null) || exit 0
[[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]] && exit 0

# Skip if no changes (tracked file with no diff AND not untracked)
if git diff --quiet -- "$FILE_PATH" 2>/dev/null && \
   git diff --cached --quiet -- "$FILE_PATH" 2>/dev/null && \
   git ls-files --error-unmatch "$FILE_PATH" &>/dev/null; then
    exit 0
fi

# Get relative path (macOS compatible - no --relative-to)
GIT_ROOT=$(git rev-parse --show-toplevel)
REL_PATH="${FILE_PATH#$GIT_ROOT/}"
[[ "$REL_PATH" == "$FILE_PATH" ]] && REL_PATH=$(basename "$FILE_PATH")

# Stage and commit
git add "$FILE_PATH" 2>/dev/null || exit 0
git diff --cached --quiet && exit 0
git commit --no-verify -m "auto: Update $REL_PATH [$(date '+%H:%M:%S')]" &>/dev/null || true
exit 0
