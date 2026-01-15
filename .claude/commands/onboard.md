# Onboard Command

Welcome new team members to the CloudWalk codebase with personalized guidance.

## Execution

When invoked, analyze the user's context and provide tailored onboarding:

<process>
1. **Detect user's role** from the question or infer from context
2. **Scan the current project** for tech stack and patterns
3. **Generate personalized guide** based on role + stack
</process>

## Role-Specific Guides

### Backend Engineer
```
Welcome to CloudWalk Backend! Here's your quickstart:

1. **Stack**: Go, Ruby, Elixir (check which is in this repo)
2. **Key patterns**:
   - Money: Always integer cents, never floats
   - IDs: UUIDs with idempotency keys
   - Errors: Structured with correlation IDs
3. **Before your first PR**:
   - Run: `make test && make lint`
   - Read: CONTRIBUTING.md, .claude/agents/payments-engineer.md
4. **Agents to know**: payments-engineer, security-engineer, data-architect
```

### Frontend Engineer
```
Welcome to CloudWalk Frontend! Here's your quickstart:

1. **Stack**: TypeScript, React (check package.json)
2. **Key patterns**:
   - Types: Strict mode, no `any`
   - Money display: Format from cents
   - API calls: Use typed clients
3. **Before your first PR**:
   - Run: `npm run lint && npm run test`
   - Read: .claude/agents/typescript-engineer.md
4. **Agents to know**: typescript-engineer, frontend-developer, ui-ux-designer
```

### DevOps/SRE
```
Welcome to CloudWalk Infra! Here's your quickstart:

1. **Stack**: Terraform, Kubernetes, ArgoCD
2. **Key patterns**:
   - Envs: staging → production (never skip)
   - Secrets: Vault only, never in code
   - Deploys: GitOps via ArgoCD
3. **Before your first PR**:
   - Run: `terraform validate && terraform plan`
   - Read: .claude/agents/terraform-ops.md, gitops-engineer.md
4. **Agents to know**: terraform-ops, gitops-engineer, security-engineer
```

### Security Engineer
```
Welcome to CloudWalk Security! Here's your quickstart:

1. **Focus areas**: PCI-DSS, payments security, API security
2. **Key patterns**:
   - All PRs need security review for payments code
   - Secrets rotation: See security-engineer.md
   - Incident response: See incident-response-agent.md
3. **Tools**: Zeropath (PR scanning), Vault (secrets)
4. **Agents to know**: security-engineer, crypto-engineer, compliance-engineer
```

## Output Format

```markdown
# Welcome to CloudWalk! 👋

## Your Role: [Detected Role]

## This Project
- **Language**: [detected]
- **Framework**: [detected]
- **Key files**: [important files for this role]

## Quick Start
1. [First thing to do]
2. [Second thing]
3. [Third thing]

## Recommended Reading
- [ ] [File 1 relevant to role]
- [ ] [File 2 relevant to role]
- [ ] [Agent doc relevant to role]

## Your AI Agents
These agents will auto-activate when you work on relevant code:
| Agent | When it helps |
|-------|---------------|
| [agent-1] | [context] |
| [agent-2] | [context] |

## First Task Suggestions
Based on this codebase, good first contributions:
- [ ] [Suggestion 1]
- [ ] [Suggestion 2]

## Questions?
Ask Claude: "How does [X] work in this codebase?"
```

## Execution Steps

<steps>
1. Run `git log --oneline -20` to see recent activity
2. Check for README.md, CONTRIBUTING.md, package.json, go.mod, Gemfile, mix.exs
3. Identify primary language and framework
4. Match user role (ask if unclear)
5. Generate personalized onboarding guide
6. List relevant agents from .claude/agents/
7. Suggest first tasks based on recent issues or TODOs
</steps>
