# Agent Workflows and Interaction Matrix

This document defines how agents work together for common fintech scenarios.

## Agent Interaction Matrix

| Primary Agent | Collaborates With | Scenario |
|--------------|-------------------|----------|
| payments-engineer | security-engineer, data-architect | Payment system design |
| security-engineer | compliance-engineer, api-security-agent | Security reviews |
| terraform-ops | gitops-engineer, security-engineer | Infrastructure changes |
| golang-engineer | payments-engineer, security-engineer | Go payment services |
| python-engineer | data-architect, observability-engineer | Data pipelines |
| compliance-engineer | security-engineer, data-architect | Audit preparation |

## Workflow Definitions

### 1. Payment Security Review

**Trigger**: New payment endpoint, transaction logic, or money handling code

**Agents**: payments-engineer → security-engineer → compliance-engineer

```yaml
workflow: payment-security-review
steps:
  1. payments-engineer:
     - Review transaction design
     - Verify ACID compliance
     - Check idempotency patterns
     - Validate money handling

  2. security-engineer:
     - Input validation review
     - SQL injection check
     - Authentication/authorization
     - Secrets management

  3. compliance-engineer:
     - PCI-DSS requirements
     - Audit trail verification
     - Data retention compliance

output:
  - Security findings report
  - Compliance checklist
  - Required fixes before merge
```

### 2. Infrastructure Deployment

**Trigger**: Terraform changes, Kubernetes manifests, new services

**Agents**: terraform-ops → gitops-engineer → security-engineer

```yaml
workflow: infrastructure-deploy
steps:
  1. terraform-ops:
     - Environment isolation check
     - PCI scope validation
     - IAM least privilege
     - Network security

  2. gitops-engineer:
     - Resource limits/requests
     - Health checks configured
     - Service account identity
     - Secrets via Secret Manager

  3. security-engineer:
     - Cross-environment contamination
     - Privileged container check
     - Network policy review

output:
  - Deployment risk assessment
  - Required approvals list
  - Safe deployment commands
```

### 3. API Launch

**Trigger**: New API endpoint, public-facing service

**Agents**: api-security-agent → security-engineer → observability-engineer

```yaml
workflow: api-launch
steps:
  1. api-security-agent:
     - Authentication method
     - Rate limiting configured
     - CORS policy
     - Input validation

  2. security-engineer:
     - OWASP Top 10 check
     - Injection prevention
     - Error handling (no leaks)
     - Logging (no PII)

  3. observability-engineer:
     - SLO/SLI definition
     - Alerting rules
     - Dashboard setup
     - Log aggregation

output:
  - API security checklist
  - Monitoring setup
  - Rate limit configuration
```

### 4. Compliance Audit Prep

**Trigger**: Upcoming PCI/SOC2 audit, compliance review

**Agents**: compliance-engineer → security-engineer → data-architect

```yaml
workflow: compliance-audit
steps:
  1. compliance-engineer:
     - Identify applicable requirements
     - Generate evidence checklist
     - Map controls to systems

  2. security-engineer:
     - Access control review
     - Encryption validation
     - Vulnerability scan status
     - Penetration test results

  3. data-architect:
     - Data flow documentation
     - CDE scope validation
     - Retention policy compliance
     - Backup verification

output:
  - Audit preparation checklist
  - Evidence inventory
  - Gap analysis report
```

### 5. Incident Response

**Trigger**: Security incident, breach, anomaly detection

**Agents**: incident-response-agent → security-engineer → compliance-engineer

```yaml
workflow: incident-response
steps:
  1. incident-response-agent:
     - Assess severity
     - Containment actions
     - Evidence preservation
     - Communication plan

  2. security-engineer:
     - Root cause analysis
     - Attack vector identification
     - Remediation steps
     - Hardening recommendations

  3. compliance-engineer:
     - Regulatory notification requirements
     - Documentation for auditors
     - Data subject notification (if needed)

output:
  - Incident report
  - Timeline of events
  - Remediation plan
  - Notification checklist
```

## Parallel vs Sequential Execution

### Run in Parallel
- Independent reviews (security + compliance can run simultaneously)
- Multiple language engineers on different services
- Infrastructure + deployment preparation

### Run Sequentially
- When output of one agent feeds into another
- When changes must be validated before next step
- When approval is required between stages

## Invocation Examples

### Manual Workflow Invocation
```
Review this payment endpoint with payment-security-review workflow:
[code]
```

### Multi-Agent Request
```
I need security-engineer and compliance-engineer to review this change together
```

### Chained Invocation
```
First use terraform-ops to review the infrastructure,
then gitops-engineer to validate the deployment config
```

## Agent Handoff Format

When one agent hands off to another, use this format:

```yaml
handoff:
  from: security-engineer
  to: compliance-engineer
  context:
    file: src/payments/handler.go
    findings:
      - Input validation: PASS
      - SQL injection: PASS
      - Authentication: NEEDS_REVIEW
    recommendation: "Auth implementation needs compliance review for PCI-DSS 8.3"
```
