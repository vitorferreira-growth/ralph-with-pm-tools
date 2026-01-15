#!/bin/bash

CLAUDE_WRAPPER_FUNCTION='
function claude() {
    command claude "$@"
}
'

# --- Installer Logic ---

# Detect the user'"'"'s shell and identify the correct rc file
if [[ "$SHELL" == *"zsh"* ]]; then
    SHELL_RC="$HOME/.zshrc"
elif [[ "$SHELL" == *"bash"* ]]; then
    SHELL_RC="$HOME/.bashrc"
else
    echo "⚠️  Unsupported shell: $SHELL - skipping theme install"
    exit 0
fi

# Use unique markers to identify the theme block in the rc file
THEME_START_MARKER="# CLOUDWALK_CLAUDE_THEME_START"
THEME_END_MARKER="# CLOUDWALK_CLAUDE_THEME_END"

# Check if an old version of the theme exists and remove it
if grep -q "$THEME_START_MARKER" "$SHELL_RC" 2>/dev/null; then
    # Use awk to print lines outside of the start/end markers, effectively deleting the block
    awk "
        /$THEME_START_MARKER/ {p=1}
        !p;
        /$THEME_END_MARKER/ {p=0}
    " "$SHELL_RC" > "${SHELL_RC}.tmp" && mv "${SHELL_RC}.tmp" "$SHELL_RC"
fi

# Install the new theme
# Append the new function, wrapped in our unique markers for future updates
{
    echo ""
    echo "$THEME_START_MARKER"
    echo "$CLAUDE_WRAPPER_FUNCTION"
    echo "$THEME_END_MARKER"
} >> "$SHELL_RC"

echo "✅ CloudWalk theme installed. Please restart your terminal or run 'source $SHELL_RC'."
