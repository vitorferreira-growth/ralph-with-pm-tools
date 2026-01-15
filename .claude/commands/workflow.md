# Multi-Agent Workflow Orchestrator

Execute predefined multi-agent workflows for complex tasks that require coordinated expertise.

## Available Workflows

### 1. `payment-security-review`
**Use when:** Reviewing payment-related code changes, new payment features, or transaction handling

**Agents involved:**
- `payments-engineer` - Transaction integrity, ACID compliance, idempotency
- `security-engineer` - Vulnerabilities, input validation, secrets handling
- `data-architect` - Schema design, query optimization, data integrity

**Execution:** Parallel (all agents analyze independently)

---

### 2. `infrastructure-deploy`
**Use when:** Deploying new infrastructure or making significant infra changes

**Agents involved:**
- `security-engineer` - Pre-deployment security validation
- `terraform-ops` - Infrastructure provisioning review
- `gitops-engineer` - Kubernetes/ArgoCD deployment

**Execution:** Sequential (security gates deployment)

---

### 3. `api-launch`
**Use when:** Launching a new API endpoint or service

**Agents involved:**
- `api-security-agent` - OAuth, rate limiting, CORS, input validation
- `typescript-engineer` OR `golang-engineer` - Code quality (based on language)
- `observability-engineer` - Logging, metrics, tracing setup

**Execution:** Parallel (independent concerns)

---

### 4. `compliance-audit`
**Use when:** Preparing for compliance review or validating regulatory requirements

**Agents involved:**
- `compliance-engineer` - PCI-DSS, SOC2, LGPD requirements
- `security-engineer` - Security controls validation
- `data-architect` - Data handling and retention review

**Execution:** Parallel then synthesize

---

### 5. `incident-response`
**Use when:** Responding to security incidents or suspicious activity

**Agents involved:**
- `incident-response-agent` - Initial triage, scope identification
- `security-engineer` - Root cause analysis, remediation
- `compliance-engineer` - Regulatory notification requirements

**Execution:** Sequential (findings inform next steps)

---

### 6. `pr-review`
**Use when:** Comprehensive review of a pull request

**Agents involved:**
- Language-specific engineer (auto-detected)
- `security-engineer` - Security review
- `compliance-engineer` - Compliance check (if payment/PII related)

**Execution:** Parallel

---

## Usage

```
/workflow <workflow-name> [target]
```

**Examples:**
- `/workflow payment-security-review src/payments/`
- `/workflow infrastructure-deploy terraform/production/`
- `/workflow api-launch src/api/v2/users.go`
- `/workflow compliance-audit` (full codebase)
- `/workflow incident-response` (interactive)
- `/workflow pr-review` (current branch changes)

---

## Execution Instructions

<execution_process>
When the user invokes a workflow:

1. **Identify the workflow** from the name provided
2. **Determine the target** (files, directories, or scope)
3. **Detect execution mode** (parallel vs sequential)
4. **Spawn agents** using the Task tool:
   - For PARALLEL: Spawn all agents in a single message with multiple Task calls
   - For SEQUENTIAL: Spawn agents one at a time, passing findings to the next

### Parallel Workflow Template
```
For payment-security-review, api-launch, compliance-audit, pr-review:

Spawn simultaneously:
- Task(subagent_type="agent-1", prompt="[specific task with target]")
- Task(subagent_type="agent-2", prompt="[specific task with target]")
- Task(subagent_type="agent-3", prompt="[specific task with target]")

Collect all results, then synthesize into unified report.
```

### Sequential Workflow Template
```
For infrastructure-deploy, incident-response:

Step 1: Task(subagent_type="first-agent", prompt="[task]")
        Wait for result

Step 2: Task(subagent_type="second-agent", prompt="[task + Step 1 findings]")
        Wait for result

Step 3: Task(subagent_type="third-agent", prompt="[task + accumulated findings]")
```
</execution_process>

---

## Output Format

After workflow completion, provide:

```markdown
## Workflow: [workflow-name]
**Target:** [files/directories analyzed]
**Agents:** [list of agents used]

### Summary
[High-level findings across all agents]

### Findings by Agent

#### [Agent 1 Name]
- Finding 1
- Finding 2

#### [Agent 2 Name]
- Finding 1
- Finding 2

### Action Items
- [ ] Critical: [item]
- [ ] High: [item]
- [ ] Medium: [item]

### Compliance Status
[For compliance-relevant workflows]
- PCI-DSS: ✅/❌
- SOC2: ✅/❌
- LGPD: ✅/❌
```

---

## Workflow Definitions Reference

Reference: @/.claude/docs/AGENT_WORKFLOWS.md

The workflow definitions including the full agent interaction matrix and handoff protocols are documented in the AGENT_WORKFLOWS.md file.
