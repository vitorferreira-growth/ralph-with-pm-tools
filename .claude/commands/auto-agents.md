# Auto-Agents Command

<task>
You are an intelligent agent coordinator that runs the auto_agents.py script to detect project context and automatically spawn relevant specialized agents based on the current project's technologies and patterns.
</task>

<context>
This command executes the auto_agents.py script which:
- Analyzes the current project structure and technologies
- Detects languages, frameworks, databases, and infrastructure
- Maps detected context to relevant specialized agents
- Creates agent requests for Claude to process using Task tool
- Provides intelligent agent recommendations based on project needs

Script Location: @/scripts/auto_agents.py
Reference: @/docs/claude-commands-guide.md
</context>

<execution_process>
1. **Run Auto-Agents Script**: Execute the Python script with appropriate options
2. **Parse Results**: Process the agent recommendations and context detection
3. **Display Analysis**: Show detected project context and recommended agents
4. **Process Agent Requests**: Use Task tool to spawn recommended agents if requests were created

The script supports these options:
- `--dry-run`: Show what agents would be called without actually calling them
- `--verbose`: Show detailed context detection information
- `--help`: Display help information
</execution_process>

<script_execution>
Run the auto_agents.py script with the provided arguments:

```bash
python3 scripts/auto_agents.py $ARGUMENTS
```

Arguments to pass: $ARGUMENTS (e.g., --dry-run, --verbose, --help, or empty for normal execution)

Note: The script runs from the current working directory and expects to find the script at `scripts/auto_agents.py` relative to the project root.
</script_execution>

<agent_processing>
After running the script:

1. **Check for Agent Requests**: Look for generated agent request files in `.claude/logs/auto_agent_requests.json`
2. **Process Requests**: If agent requests exist, use Task tool to spawn the recommended agents
3. **Report Results**: Display the context analysis and agent spawning results

Example agent spawning:
```
For each recommended agent:
- Use Task tool with appropriate subagent_type
- Include context from the detection analysis
- Process multiple agents in parallel when possible
```
</agent_processing>

<output_format>
## 🔍 Project Context Analysis

**Languages Detected**: [List detected languages]
**Frameworks**: [List detected frameworks]  
**Infrastructure**: [List detected infrastructure]
**Databases**: [List detected databases]

## 🤖 Recommended Agents

**Agents to Spawn**: [List recommended agents]
**Context Triggers**: [What triggered each agent recommendation]

## 📝 Execution Results

[Results of script execution and any agent spawning]
</output_format>

<error_handling>
If the script fails:
1. Check if Python 3 is available
2. Verify script exists at expected location
3. Check for required permissions
4. Display helpful error message with troubleshooting steps
</error_handling>

<usage_examples>
Examples:
- `/project:auto-agents` - Run full analysis and spawn recommended agents
- `/project:auto-agents --dry-run` - Show what would happen without executing
- `/project:auto-agents --verbose` - Show detailed context detection
- `/project:auto-agents --help` - Display script help information
</usage_examples>

## Parallel vs Sequential Execution

### When to Run Agents in PARALLEL

Run agents in parallel when they:
- Analyze **independent** aspects of the codebase
- Don't need each other's output to function
- Can work on **different files** simultaneously

**Example: Initial Project Review**
```
User: "Review this new payment feature before I submit the PR"

✅ PARALLEL (spawn in single message with multiple Task calls):
┌─────────────────────────────────────────────────────────────────┐
│  Task 1: security-engineer     → Reviews for vulnerabilities    │
│  Task 2: payments-engineer     → Reviews transaction logic      │
│  Task 3: compliance-engineer   → Checks PCI-DSS requirements    │
└─────────────────────────────────────────────────────────────────┘

All three can read the same files simultaneously without conflicts.
```

**Example: Multi-Language Codebase**
```
User: "Check all our services for security issues"

✅ PARALLEL:
┌─────────────────────────────────────────────────────────────────┐
│  Task 1: golang-engineer       → Reviews Go services            │
│  Task 2: ruby-engineer         → Reviews Rails API              │
│  Task 3: typescript-engineer   → Reviews Node.js services       │
└─────────────────────────────────────────────────────────────────┘

Different language experts can analyze their respective codebases simultaneously.
```

### When to Run Agents SEQUENTIALLY

Run agents sequentially when:
- Output from one agent **informs** the next agent's work
- There's a **dependency chain** between analyses
- One agent's findings **change the scope** for the next

**Example: Security Incident Response**
```
User: "We detected suspicious activity, investigate and remediate"

❌ DON'T PARALLEL - Sequential flow required:
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: incident-response-agent                                │
│          → Identifies breach scope, affected systems            │
│                           ↓                                     │
│  Step 2: security-engineer (with Step 1 findings)               │
│          → Analyzes attack vectors, finds root cause            │
│                           ↓                                     │
│  Step 3: compliance-engineer (with breach details)              │
│          → Determines regulatory notification requirements      │
└─────────────────────────────────────────────────────────────────┘

Each step needs the previous step's output to be effective.
```

**Example: Infrastructure Deployment**
```
User: "Deploy this new service to production"

❌ DON'T PARALLEL - Order matters:
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: security-engineer                                      │
│          → Validates no secrets in code, checks configs         │
│                           ↓                                     │
│  Step 2: terraform-ops                                          │
│          → Provisions infrastructure (needs security approval)  │
│                           ↓                                     │
│  Step 3: gitops-engineer                                        │
│          → Deploys application (needs infra to exist)           │
└─────────────────────────────────────────────────────────────────┘
```

### Hybrid Pattern: Parallel Then Sequential

**Example: Comprehensive PR Review**
```
User: "Full review of PR #123 - payment refund feature"

Phase 1 - PARALLEL (independent analysis):
┌─────────────────────────────────────────────────────────────────┐
│  Task 1: golang-engineer       → Code quality, patterns         │
│  Task 2: security-engineer     → Vulnerability scan             │
│  Task 3: payments-engineer     → Transaction correctness        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
           Collect all findings from Phase 1
                              ↓
Phase 2 - SEQUENTIAL (synthesize findings):
┌─────────────────────────────────────────────────────────────────┐
│  compliance-engineer (with all Phase 1 findings)                │
│  → Provides unified compliance assessment                       │
│  → Determines if PR can be approved                             │
└─────────────────────────────────────────────────────────────────┘
```

### Decision Matrix

| Scenario | Execution | Reason |
|----------|-----------|--------|
| Multiple language review | Parallel | Independent codebases |
| Security + Performance audit | Parallel | Different concerns |
| Feature review (security, code, tests) | Parallel | Independent analysis |
| Incident → Remediation | Sequential | Findings inform next step |
| Plan → Implement → Deploy | Sequential | Each step depends on previous |
| Security review → Deployment | Sequential | Approval gates |
| Code review → Compliance check | Sequential | Compliance needs review findings |

### Code Example: Spawning Parallel Agents

```
# In a single message, spawn multiple Task calls:

<Task 1>
subagent_type: security-engineer
prompt: "Review src/payments/ for OWASP Top 10 vulnerabilities"
</Task 1>

<Task 2>
subagent_type: payments-engineer
prompt: "Review src/payments/ for transaction integrity issues"
</Task 2>

<Task 3>
subagent_type: golang-engineer
prompt: "Review src/payments/ for Go best practices and patterns"
</Task 3>

# All three run simultaneously, results collected when all complete
```
