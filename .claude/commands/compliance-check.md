---
name: compliance-check
description: Validate code/infrastructure against PCI-DSS and SOC2 requirements
---

You are performing a compliance validation. Check the provided code or configuration against regulatory requirements.

## Applicable Frameworks

### PCI-DSS 4.0 (if handling payment data)
- Requirement 3: Protect stored cardholder data
- Requirement 4: Encrypt transmission
- Requirement 6: Secure development
- Requirement 7: Restrict access
- Requirement 8: Identify and authenticate
- Requirement 10: Log and monitor

### SOC 2 (for all services)
- CC6: Logical and physical access controls
- CC7: System operations
- CC8: Change management

## Compliance Checklist

### Data Protection
- [ ] Sensitive data encrypted at rest (AES-256)
- [ ] TLS 1.2+ for data in transit
- [ ] PAN masked in logs/displays (first 6, last 4)
- [ ] SAD never stored post-authorization
- [ ] Data retention policies enforced

### Access Control
- [ ] Principle of least privilege
- [ ] Unique user identification
- [ ] MFA for sensitive access
- [ ] Access logs maintained
- [ ] Quarterly access reviews documented

### Secure Development
- [ ] Code review required
- [ ] Security testing before release
- [ ] Vulnerability scanning enabled
- [ ] Dependencies audited
- [ ] Change management followed

### Logging & Monitoring
- [ ] All access to sensitive data logged
- [ ] Logs include: who, what, when, where
- [ ] Log integrity protected
- [ ] 1-year retention minimum
- [ ] Alerts for suspicious activity

### Infrastructure
- [ ] Network segmentation (CDE isolated)
- [ ] Firewall rules documented
- [ ] No unnecessary services
- [ ] Hardening standards applied

## Output Format

```markdown
# Compliance Check: [file/component]

## Scope
- **Frameworks**: [PCI-DSS/SOC2/Both]
- **Data Types**: [CHD/PII/Financial/None]
- **Environment**: [Production/Staging/Development]

## Compliance Status

### PCI-DSS (if applicable)
| Requirement | Control | Status | Notes |
|-------------|---------|--------|-------|
| 3.4 | Data encryption | [PASS/FAIL/N/A] | [details] |
| 4.1 | TLS encryption | [PASS/FAIL/N/A] | [details] |
| ... | ... | ... | ... |

### SOC 2
| Criteria | Control | Status | Notes |
|----------|---------|--------|-------|
| CC6.1 | Access provisioning | [PASS/FAIL/N/A] | [details] |
| CC7.2 | Security monitoring | [PASS/FAIL/N/A] | [details] |
| ... | ... | ... | ... |

## Findings

### [Finding 1: Non-Compliant Item]
- **Requirement**: [PCI-DSS X.X / SOC2 CCX.X]
- **Location**: [file:line or component]
- **Issue**: [description]
- **Remediation**: [specific fix]
- **Evidence Needed**: [what auditor will ask for]

## Compliance Summary
- PCI-DSS: [X/Y controls compliant]
- SOC 2: [X/Y controls compliant]
- Overall Risk: [HIGH/MEDIUM/LOW]

## Action Items
1. [Immediate fix required]
2. [Before next audit]
3. [Nice to have]
```

## Instructions

1. First determine what type of data is being handled (CHD, PII, financial)
2. Apply relevant compliance frameworks
3. Check against specific control requirements
4. Be specific about which requirement is violated
5. Provide actionable remediation steps
6. Note what evidence would satisfy an auditor
