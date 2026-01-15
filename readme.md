# Ralph with Steroids

A fork of [Ralph Loop](https://github.com/luisbebop/ralph) enhanced with a structured **PRD Generator** using the 8-Step Method.

## The `/prd` Command

The main enhancement is a Claude Code custom command that generates comprehensive PRDs through an interactive conversation.

### Two Modes

| Command | Mode | Phases | Use Case |
|---------|------|--------|----------|
| `/prd quick` | Quick | 3 phases | Fast MVPs, simple projects |
| `/prd` or `/prd full` | Full | 8 phases | Complex products, full specs |

### The 8-Step Method (Full Mode)

1. **Discovery** - Problem, audience, USP, platforms, monetization
2. **Features** - MVP features (P0), v2 features (P1), future (P2)
3. **User Stories** - Detailed stories with acceptance criteria per feature
4. **Design System** - Colors, typography, spacing, components, motion
5. **Screen States** - Empty, loading, success, error states per feature
6. **Technical Architecture** - Stack, system diagram, data models, APIs
7. **Project Rules** - Code style, git workflow, testing conventions
8. **Implementation Plan** - Step-by-step tasks with dependencies

### Quick Mode (3 Phases)

1. **Essenciais** - Idea, problem, audience, MVP features, tech stack
2. **Design Rápido** - Style, colors, dark mode
3. **Output** - Simplified PRD with high-level tasks

## The `/frd` Command

Add new features to an existing project. Reads `PRD.md` and `progress.txt` automatically for context.

### Two Modes

| Command | Mode | Phases | Use Case |
|---------|------|--------|----------|
| `/frd quick` | Quick | 3 phases | Simple features, UI changes |
| `/frd` or `/frd full` | Full | 6 phases | Complex features, new APIs |

### The 6-Step Method (Full Mode)

0. **Context Loading** - Auto-reads PRD.md + progress.txt
1. **Feature Discovery** - Problem, positioning, priority
2. **User Stories** - Detailed stories with acceptance criteria
3. **Screen States** - Components, states, micro-interactions
4. **Technical Spec** - APIs, data models, integrations
5. **Implementation Plan** - Ralph-compatible tasks

### Quick Mode (3 Phases)

1. **Feature + Stories** - Combined discovery and user stories
2. **Quick Spec** - Affected screens, components, backend needs
3. **Tasks** - Simplified task list

---

## Recommended Workflow

```
1. /prd        -> Generate complete PRD
3. ralph-once  -> See the first execution
3. ralph-afk   -> Execute all PRD tasks
4. /frd        -> Add new features (after PRD is done)
5. ralph-afk   -> Execute feature tasks
```

> **Tip:** The `/frd` command is designed for adding features to working projects.
> If the PRD still has pending tasks, finish them first with `ralph-once.sh` or `ralph-afk.sh`.

---

## Project Structure

```
.claude/commands/
├── prd.md                 # The /prd command definition
└── frd.md                 # The /frd command definition
docs/prd_reference/        # 8-Step Method documentation
├── steps/                 # Detailed prompts for each step
└── templates/
    └── prd_template.md    # PRD output template
```

## Quick Start

1. Install [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code)

2. Generate a PRD (interactive):
   ```bash
   ./gen-full-prd.sh    # Full 8-phase PRD
   ./gen-simple-prd.sh  # Quick 3-phase PRD
   ```

3. Run one task at a time:
   ```bash
   ./ralph-once.sh
   ```

4. AFK mode (multiple iterations):
   ```bash
   ./ralph-afk.sh 50
   ```

## Files

| File | Description |
|------|-------------|
| `gen-full-prd.sh` | Runs `/prd full` command |
| `gen-simple-prd.sh` | Runs `/prd quick` command |
| `gen-frd.sh` | Runs `/frd full` command |
| `gen-simple-frd.sh` | Runs `/frd quick` command |
| `ralph-once.sh` | Execute one task from PRD/FRD |
| `ralph-afk.sh` | Loop N times autonomously |
| `PRD.md` | Generated PRD (source of truth) |
| `progress.txt` | Task completion log |

## How It Works

1. **PRD Generation**: The `/prd` command guides you through structured questions, generating a complete PRD saved to `docs/prd/PRD_[PROJECT].md`

2. **Task Execution**: Ralph reads the PRD, picks the next incomplete task, implements it, commits, and updates `progress.txt`

3. **Loop**: Repeat until all tasks are done

4. **Feature Addition**: Once PRD is complete, use `/frd` to add new features. It reads the existing PRD for context and generates compatible tasks

---

## Agent-Aware Execution

The `ralph-once.sh` and `ralph-afk.sh` scripts leverage **specialized agents** from CloudWalk's Claude Code Commandments for intelligent task execution.

### What Happens During Execution

1. **Task Detection**: Claude identifies the task type (frontend, backend, database, etc.)
2. **Agent Selection**: Applies relevant agent guidelines automatically:
   - Frontend/UI → `typescript-engineer`, `frontend-developer`
   - Backend → `python-engineer`, `golang-engineer`, `ruby-engineer`, `rust-engineer`
   - Database → `data-architect-agent`
   - Security → `security-engineer`, `api-security-agent`
   - Infrastructure → `terraform-ops`, `gitops-engineer`
   - Payments/Fintech → `payments-engineer`, `compliance-engineer`
3. **Quality Gates**: Before committing:
   - Runs `/security-review` on changed files
   - Runs `/test-gen` for new functionality
4. **Commit**: Uses conventional commits format

### Available Agents

| Category | Agents |
|----------|--------|
| Languages | `golang`, `python`, `ruby`, `rust`, `typescript`, `elixir` |
| Frontend | `frontend-developer`, `frontend-security-agent`, `ui-ux-designer`, `ui-visual-validator` |
| Security | `security-engineer`, `api-security-agent`, `crypto-engineer`, `supply-chain-security` |
| Infrastructure | `terraform-ops`, `gitops-engineer`, `networking-engineer`, `observability-engineer` |
| Fintech | `payments-engineer`, `compliance-engineer`, `data-architect-agent`, `incident-response-agent` |

### Available Commands

| Command | Description |
|---------|-------------|
| `/prd` | Generate PRD using 8-Step Method |
| `/frd` | Add features to existing PRD |
| `/security-review` | Quick security scan |
| `/test-gen` | Generate tests for code |
| `/diagnose` | Diagnose project issues |
| `/refactor` | Suggest refactoring opportunities |
| `/optimize` | Performance optimization suggestions |
| `/document` | Generate documentation |
| `/workflow` | Multi-agent workflow orchestrator |
| `/compliance-check` | PCI-DSS/SOC2 compliance validation |
| `/onboard` | Team member onboarding |

## License

Copyright (c) 2026 vitorferreira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
