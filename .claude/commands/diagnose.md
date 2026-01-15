---
name: diagnose
description: Diagnose issues in the current project - errors, configuration problems, or stuck states
---

You are performing a diagnostic analysis. Investigate and resolve issues in the project.

## Diagnostic Areas

### 1. Build & Compilation Errors
- Syntax errors
- Type errors
- Missing dependencies
- Version conflicts
- Configuration issues

### 2. Runtime Errors
- Exception analysis
- Stack trace interpretation
- Environment issues
- Resource exhaustion

### 3. Test Failures
- Assertion failures
- Flaky tests
- Missing fixtures
- Environment differences

### 4. Configuration Issues
- Missing environment variables
- Invalid configuration values
- Permission problems
- Path issues

### 5. Dependency Problems
- Version conflicts
- Missing packages
- Incompatible versions
- Security vulnerabilities

### 6. Performance Issues
- Slow queries
- Memory leaks
- CPU bottlenecks
- Network timeouts

## Diagnostic Process

### Step 1: Gather Information
```bash
# Check recent changes
git log --oneline -10
git diff HEAD~1

# Check error logs
tail -100 logs/error.log

# Check system state
ps aux | grep [process]
df -h
free -m
```

### Step 2: Reproduce Issue
- Identify exact steps to reproduce
- Note environment (OS, versions, etc.)
- Capture full error output
- Check if issue is consistent or intermittent

### Step 3: Isolate Root Cause
- Binary search through recent commits
- Disable components to narrow down
- Check external dependencies
- Review recent configuration changes

### Step 4: Propose Solution
- Fix root cause, not symptoms
- Consider side effects
- Provide rollback plan if needed
- Document for future reference

## Common Issues & Solutions

### Python
```python
# ModuleNotFoundError
pip install -r requirements.txt
# or
poetry install

# ImportError: circular import
# Solution: Move import inside function or restructure modules

# AttributeError: 'NoneType' has no attribute 'x'
# Check: Return value, database query results, optional fields
```

### Go
```go
// cannot find package
go mod tidy
go mod download

// undefined: SomeFunction
// Check: Is it exported (capitalized)?
// Check: Is the package imported?

// race condition detected
// Use: go run -race ./...
// Fix: Add proper synchronization (mutex, channels)
```

### Ruby/Rails
```ruby
# Bundler::GemNotFound
bundle install

# PG::ConnectionBad
# Check: Is PostgreSQL running?
# Check: DATABASE_URL in .env

# ActiveRecord::RecordNotFound
# Check: ID exists in database
# Consider: find_by instead of find
```

### TypeScript/Node
```typescript
// Cannot find module
npm install
// or
yarn install

// Type 'X' is not assignable to type 'Y'
// Check: Type definitions match
// Consider: Type assertion or proper typing

// ECONNREFUSED
// Check: Is the service running?
// Check: Correct port and host
```

### Infrastructure
```bash
# Docker: Container exits immediately
docker logs <container>
# Check entrypoint/cmd, check dependencies

# Kubernetes: Pod CrashLoopBackOff
kubectl describe pod <pod>
kubectl logs <pod> --previous
# Check: Resource limits, probes, dependencies

# Terraform: Error acquiring state lock
terraform force-unlock <lock-id>
# Warning: Ensure no other operation is running!
```

## Output Format

```markdown
# Diagnostic Report: [issue summary]

## Issue Description
- **Symptoms**: [what user sees]
- **Error Message**: [exact error if any]
- **First Occurred**: [when noticed]
- **Frequency**: [always/intermittent/once]

## Environment
- **OS**: [operating system]
- **Language Version**: [version]
- **Dependencies**: [relevant versions]
- **Recent Changes**: [git log summary]

## Investigation Steps

### 1. [First thing checked]
```
[command run or file checked]
```
**Finding**: [what was discovered]

### 2. [Second thing checked]
...

## Root Cause
**The issue is caused by**: [clear explanation]

**Evidence**:
- [Evidence 1]
- [Evidence 2]

## Solution

### Immediate Fix
```[language]
// Code or command to fix the issue
```

### Steps to Apply
1. [Step 1]
2. [Step 2]
3. [Step 3 - verify fix]

### Verification
```bash
# Command to verify the fix worked
```

## Prevention

### To prevent this in the future:
1. [Preventive measure 1]
2. [Preventive measure 2]

### Suggested Additions:
- [ ] Add test for this case
- [ ] Add monitoring/alerting
- [ ] Update documentation

## Rollback Plan (if applicable)
```bash
# How to revert if fix causes issues
```

## Related Issues
- [Link to similar issues if found]
- [Related documentation]
```

## Self-Healing Actions

When you identify common issues, suggest automated fixes:

### Auto-Fixable Issues
| Issue | Auto-Fix Command |
|-------|------------------|
| Missing dependencies | `npm install` / `pip install -r requirements.txt` |
| Formatting errors | `npm run format` / `black .` / `go fmt ./...` |
| Lint errors (some) | `npm run lint:fix` / `rubocop -a` |
| Type generation | `npm run generate-types` |
| Database migrations | `rails db:migrate` / `alembic upgrade head` |
| Lock file sync | `npm install` / `bundle install` |

### Fallback Strategies
1. **If primary fix fails**: Try [alternative approach]
2. **If still broken**: Revert to last known good state
3. **If data issue**: Check backup restoration options

## Instructions

1. Start by understanding the symptoms - what exactly is failing?
2. Gather information before guessing - read logs, check git history
3. Reproduce the issue if possible
4. Use binary search to narrow down (disable half, check if still fails)
5. Fix root cause, not symptoms
6. Verify the fix works
7. Suggest preventive measures
8. If unable to diagnose, clearly state what additional information is needed
