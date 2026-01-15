#!/bin/bash

# Stop hook - validates if session can be stopped
# Returns JSON: {"ok": true} or {"ok": false, "reason": "..."}

# For now, always allow stopping
# Future: check for uncommitted changes, running processes, incomplete todos, etc.

echo '{"ok": true}'
exit 0
