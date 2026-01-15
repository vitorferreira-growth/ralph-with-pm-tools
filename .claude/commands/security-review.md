---
name: security-review
description: Quick security scan of current file, PR, or code block
---

You are performing a security review. Analyze the provided code or changes for security vulnerabilities.

## Review Checklist

### 1. Input Validation
- [ ] All external inputs validated
- [ ] Type checking enforced
- [ ] Length/size limits applied
- [ ] Format validation (regex, schemas)

### 2. Injection Prevention
- [ ] SQL: Parameterized queries only
- [ ] XSS: Output encoding applied
- [ ] Command injection: No shell=True with user input
- [ ] Path traversal: Paths sanitized

### 3. Authentication & Authorization
- [ ] Auth required for sensitive endpoints
- [ ] Authorization checks before actions
- [ ] Session management secure
- [ ] Password handling uses proper hashing

### 4. Secrets Management
- [ ] No hardcoded secrets
- [ ] Environment variables or secret manager
- [ ] Secrets not logged
- [ ] API keys rotatable

### 5. Error Handling
- [ ] No sensitive data in error messages
- [ ] Errors logged (without PII)
- [ ] Graceful degradation
- [ ] No stack traces to users

### 6. Cryptography
- [ ] Strong algorithms (AES-256, SHA-256+)
- [ ] Proper key management
- [ ] TLS 1.2+ for transit
- [ ] No custom crypto

## Output Format

```markdown
# Security Review: [file/component]

## Risk Level: [CRITICAL/HIGH/MEDIUM/LOW]

## Findings

### [Finding 1 Title]
- **Severity**: [severity]
- **Location**: [file:line]
- **Issue**: [description]
- **Fix**: [recommended fix]

### [Finding 2 Title]
...

## Checklist Summary
- Input Validation: [PASS/FAIL/NEEDS_REVIEW]
- Injection Prevention: [PASS/FAIL/NEEDS_REVIEW]
- Auth & AuthZ: [PASS/FAIL/NEEDS_REVIEW]
- Secrets: [PASS/FAIL/NEEDS_REVIEW]
- Error Handling: [PASS/FAIL/NEEDS_REVIEW]
- Cryptography: [PASS/FAIL/NEEDS_REVIEW]

## Recommendations
1. [Priority 1 fix]
2. [Priority 2 fix]
```

## Instructions

1. If a file path is provided, read and analyze that file
2. If code is provided inline, analyze that code
3. If no input, check for staged changes with `git diff --cached`
4. Focus on OWASP Top 10 vulnerabilities
5. Be specific about line numbers and fixes
6. Prioritize findings by severity
