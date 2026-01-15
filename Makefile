# INSTALL
#################
.PHONY: install install-only install-agents install-hooks install-settings install-mcp install-theme install-bigquery
.PHONY: mcp_setup test-hooks uninstall

install: backup install-only

install-only:
	@echo "🚀 Installing Claude Code Parallel Subagent System v1.0.0..."
	$(MAKE) install-agents install-hooks install-settings install-mcp test-hooks install-theme
	@echo ""
	@echo "🎉 INSTALLATION COMPLETE!"
	@echo ""
	@echo "🔄 IMPORTANT: Restart Claude Code to activate new settings and MCP servers"
	@echo ""
	@echo "🤖 Parallel subagent system is now globally active and will:"
	@echo "   • Auto-spawn specialized agents based on context detection"
	@echo "   • Auto-commit changes to prevent work loss"
	@echo "   • Run security checks and test automation" 
	@echo "   • Provide superhuman AI assistance"
	@echo "   • Verify system functionality after each operation"
	@echo ""
	@echo "🔥 Trigger examples:"
	@echo "   • 'python payment database' → spawns 6+ agents"
	@echo "   • 'rust kubernetes aws' → spawns 6+ agents"
	@echo "   • 'security vulnerability' → spawns security analysis"
	@echo ""
	@echo "📊 Monitor activity in: ~/.claude/logs/"
	@echo "🏷️  Version: v1.0.0"

uninstall:
	@echo "🗑️  Uninstalling Claude Code Parallel Subagent System..."
	
	@LATEST_BACKUP=$$(ls -t ~/.claude/backups/claude-backup-*.tar.gz 2>/dev/null | head -1); \
	if [ -z "$$LATEST_BACKUP" ]; then \
		echo "⚠️  No backup found - this may remove your original Claude configuration!"; \
		echo "   Continue anyway? [y/N]"; \
		read -r response; \
		if [ "$$response" != "y" ] && [ "$$response" != "Y" ]; then \
			echo "❌ Uninstall cancelled"; \
			exit 1; \
		fi; \
		echo "🔄 Removing Claude configuration without restore..."; \
		rm -rf ~/.claude/agents ~/.claude/hooks ~/.claude/commands ~/.claude/logs; \
		rm -f ~/.claude/security_utils.py ~/.claude/security_test.py ~/.claude/settings.json ~/.claude/.mcp.json; \
	else \
		echo "🔄 Restoring original Claude configuration from $$LATEST_BACKUP..."; \
		rm -rf ~/.claude/agents ~/.claude/hooks ~/.claude/commands ~/.claude/logs; \
		rm -f ~/.claude/security_utils.py ~/.claude/security_test.py ~/.claude/settings.json ~/.claude/.mcp.json; \
		cd ~/.claude && tar -xzf "$$LATEST_BACKUP" 2>/dev/null || true; \
		echo "✅ Original configuration restored"; \
	fi
	
	@echo ""
	@echo "🎉 UNINSTALLATION COMPLETE!"
	@echo ""
	@echo "✅ Your original Claude configuration has been restored"
	@echo "ℹ️  Backup files preserved in ~/.claude/backups/ for reference"

mcp_setup:
	@chmod +x scripts/setup_bigquery_mcp.sh
	./scripts/setup_bigquery_mcp.sh
	@if [ -f ../toolbox ]; then \
		mv ../toolbox ./toolbox; \
		echo "✅ Moved toolbox binary to current directory"; \
	fi

install-agents:
	@echo "📋 Installing agent definitions..."
	mkdir -p ~/.claude/agents
	# Create symbolic links for .md files for automatic updates
	find .claude/agents -name "*.md" -type f -exec ln -sf "$(PWD)/{}" ~/.claude/agents/ \; 2>/dev/null || true
	@echo "✅ Agents symlinked to ~/.claude/agents for global use."

install-hooks:
	@echo "🔧 Installing hooks system..."
	mkdir -p ~/.claude/logs
	mkdir -p ~/.claude/commands
	# Symlink hook scripts for global use
	mkdir -p ~/.claude/scripts/hooks
	find scripts/hooks -name "*.sh" -type f -exec ln -sf "$(PWD)/{}" ~/.claude/scripts/hooks/ \; 2>/dev/null || true
	chmod +x ~/.claude/scripts/hooks/*.sh 2>/dev/null || true
	# Symlink commands and utilities
	ln -sf "$(PWD)/scripts/auto_agents.py" ~/.claude/commands/
	ln -sf "$(PWD)/scripts/security/security_utils.py" ~/.claude/
	ln -sf "$(PWD)/scripts/security/security_test.py" ~/.claude/
	chmod +x ~/.claude/commands/*.py 2>/dev/null || true
	@echo "✅ Hook scripts installed to ~/.claude/scripts/hooks/"
	@echo "✅ Hooks are configured in .claude/settings.json"

install-settings:
	@echo "⚙️  Installing default settings..."
	ln -sf "$(PWD)/.claude/settings.json" ~/.claude/settings.json
	@echo "✅ Settings symlinked"

install-mcp:
	@echo "⚙️  Installing MCP configuration..."
	@if [ -f ~/.claude/.mcp.json ]; then \
		echo "📝 Merging MCP configuration..."; \
		python3 -c "import json; \
		existing = json.load(open('$(HOME)/.claude/.mcp.json')); \
		new = json.load(open('.mcp.json')); \
		existing['mcpServers'].update(new['mcpServers']); \
		json.dump(existing, open('$(HOME)/.claude/.mcp.json', 'w'), indent=2)" 2>/dev/null || \
		(echo "⚠️  MCP merge failed, keeping existing configuration"; cp .mcp.json ~/.claude/.mcp.json.new); \
	else \
		ln -sf "$(PWD)/.mcp.json" ~/.claude/.mcp.json; \
	fi
	@echo "✅ MCP configuration installed"

install-theme:
	@echo "🎨 Installing CloudWalk theme..."
	@chmod +x scripts/install_cloudwalk_theme.sh > /dev/null 2>&1
	@./scripts/install_cloudwalk_theme.sh > /dev/null 2>&1 || echo "⚠️  Theme install skipped"
	@echo "✅ Theme installation complete"

install-bigquery:
	@echo "📊 Setting up BigQuery MCP Toolbox..."
	@chmod +x scripts/setup_bigquery_mcp.sh > /dev/null 2>&1
	@./scripts/setup_bigquery_mcp.sh > /dev/null 2>&1 || echo "⚠️  BigQuery MCP setup failed - check gcloud installation"
	@echo "✅ BigQuery MCP Toolbox setup complete"

test-hooks:
	@echo "🧪 Testing hook installation..."
	@# Test bash hooks exist and are valid
	@for hook in security_bash.sh security_files.sh auto_commit.sh smart_log.sh auto_update.sh; do \
		if [ -f ~/.claude/scripts/hooks/$$hook ]; then \
			bash -n ~/.claude/scripts/hooks/$$hook 2>/dev/null || { echo "❌ $$hook has syntax errors"; exit 1; }; \
		fi; \
	done
	@# Test settings.json is valid JSON
	@if command -v jq >/dev/null 2>&1; then \
		jq empty ~/.claude/settings.json 2>/dev/null || { echo "❌ settings.json is invalid"; exit 1; }; \
	fi
	@echo "✅ Hooks test passed"

# BACKUP
#################
.PHONY: backup list-backups restore-backup remove-old-backup-system

backup:
	@echo "💾 Creating backup of existing Claude configuration..."
	@if [ -d ~/.claude ]; then \
		mkdir -p ~/.claude/backups; \
		BACKUP_FILE=~/.claude/backups/claude-backup-$(shell date +%Y%m%d-%H%M%S).tar.gz; \
		cd ~/.claude && tar --exclude='./backups' -czf "$$BACKUP_FILE" . 2>/dev/null || true; \
		echo "✅ Backup created at $$BACKUP_FILE"; \
	else \
		echo "ℹ️  No existing Claude configuration to backup"; \
	fi
	@$(MAKE) remove-old-backup-system

# NOTE: This is a temporary fix to remove the old backup system files. We can remove this once everyone has updated to the new backup system.
remove-old-backup-system:
	@echo "🧹 Removing old backup system files..."
	@if [ -d ~/.claude/backup ]; then \
		echo "🗑️  Removing old backup directory ~/.claude/backup"; \
		rm -rf ~/.claude/backup; \
		echo "✅ Old backup directory removed"; \
	fi
	@if [ -d ~/.claude/backups/pre-subagent-install ]; then \
		echo "🗑️  Removing old pre-subagent-install backup"; \
		rm -rf ~/.claude/backups/pre-subagent-install; \
		echo "✅ Old pre-subagent-install backup removed"; \
	fi

list-backups:
	@echo "📋 Available backups:"
	@ls -la ~/.claude/backups/claude-backup-*.tar.gz 2>/dev/null || echo "No backups found"

restore-backup:
	@echo "🔄 Available backups:"
	@ls -t ~/.claude/backups/claude-backup-*.tar.gz 2>/dev/null | head -5 | nl
	@echo "Enter the number of the backup to restore (1-5): "; \
	read -r choice; \
	BACKUP_FILE=$$(ls -t ~/.claude/backups/claude-backup-*.tar.gz 2>/dev/null | sed -n "$${choice}p"); \
	if [ -n "$$BACKUP_FILE" ]; then \
		echo "🔄 Restoring from $$BACKUP_FILE..."; \
		rm -rf ~/.claude/agents ~/.claude/hooks ~/.claude/commands ~/.claude/logs; \
		rm -f ~/.claude/security_utils.py ~/.claude/security_test.py ~/.claude/settings.json ~/.claude/.mcp.json; \
		cd ~/.claude && tar -xzf "$$BACKUP_FILE"; \
		echo "✅ Configuration restored from $$BACKUP_FILE"; \
	else \
		echo "❌ Invalid selection"; \
	fi
