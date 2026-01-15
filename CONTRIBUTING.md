# Contributing Guidelines

## Git Workflow

### Branch Naming Convention
- **Format**: `type/description-with-hyphens`
- **Types**: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `hotfix`
- **Examples**:
  - `feat/add-user-authentication`
  - `fix/resolve-login-timeout`
  - `chore/update-dependencies`

### Commit Message Format
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Development Process
1. **Create feature branch**: `git checkout -b feat/your-feature`  
2. **Make small, atomic commits** with descriptive messages
3. **Test your changes** before committing
4. **Push to remote**: `git push -u origin feat/your-feature`
5. **Create Pull Request** to `main` branch
6. **Wait for review** and address feedback
7. **Merge after approval** (squash merge preferred)

### Pre-commit Checks
The following checks run automatically:
- ✅ Secret detection
- ✅ File size limits (10MB max)
- ✅ Python syntax validation
- ✅ Commit message format
- ✅ TODO/FIXME tracking

### Security Requirements
- **GPG signing required** for all commits and tags
- **No secrets** in repository (use environment variables)
- **Review all changes** before committing
- **Use .gitignore** for sensitive files

## Code Style

### Python Code Standards
- Follow PEP 8 guidelines
- Maximum line length: 79 characters
- Use type hints for all function parameters and return values
- Use specific exception types (not bare `except:`)
- Remove unused imports
- Use f-strings for string formatting

### Code Quality Requirements
- **Type hints**: All functions must have complete type annotations
- **Exception handling**: Use specific exception types only
- **Documentation**: Add docstrings for all public functions
- **Testing**: Include tests for new functionality
- **Security**: No secrets in code, validate all inputs

### Automated Formatting
Before committing, run:
```bash
# Fix Python formatting and imports
python -m autopep8 --in-place --max-line-length=79 **/*.py
python -m isort **/*.py

# Validate syntax
python -m py_compile **/*.py
```

## Security Guidelines

### Required Security Practices
- **Input validation**: Validate all user inputs
- **Path traversal protection**: Use safe path operations
- **Command injection prevention**: Never use shell=True
- **Secret detection**: Scan for credentials before commit
- **Rate limiting**: Implement for user-facing operations

### Security Tools Integration
The repository includes comprehensive security utilities:
- `scripts/security/security_utils.py`: Core security validation functions
- Pre-commit hooks: Validate security before commits
- Post-commit hooks: Monitor security after changes

## Testing Requirements

### Test Coverage
- Unit tests for all security-critical functions
- Integration tests for hook system
- Security tests for input validation
- Performance tests for rate limiting

### Running Tests
```bash
# Run security test suite
python scripts/security/security_test.py

# Run Python syntax validation
python -m py_compile .claude/**/*.py
```

## Documentation Standards

### Required Documentation
- **Function docstrings**: All public functions
- **Type annotations**: Complete type hints
- **Security notes**: Document security implications
- **Examples**: Provide usage examples

### Documentation Format
```python
def secure_function(input_data: str, max_length: int = 100) -> Dict[str, Any]:
    """
    Process input data with security validation.
    
    Args:
        input_data: Raw input string to process
        max_length: Maximum allowed input length
        
    Returns:
        Dictionary containing processed data and metadata
        
    Raises:
        ValueError: If input contains secrets or exceeds length
        SecurityError: If dangerous patterns detected
        
    Security:
        - Validates input for secrets and dangerous patterns
        - Enforces length limits to prevent DoS
        - Logs security events for monitoring
    """
```

## Hook System Guidelines

### Hook Development
- Use security utilities for all validation
- Implement proper error handling
- Add comprehensive logging
- Follow timeout requirements
- Test all code paths

### Hook Types
- **pre_tool_use**: Validate before execution
- **post_tool_use**: Process after execution  
- **session_start**: Initialize session context
- **stop**: Handle session termination

## Review Process

### Pull Request Requirements
- **Security review**: All changes reviewed for security
- **Code quality**: Meets style and testing requirements
- **Documentation**: Complete and accurate
- **Testing**: All tests pass
- **GPG signing**: All commits signed

### Approval Process
1. Create pull request with clear description
2. Security agent review (automated)
3. Python agent review (automated)
4. Git agent review (automated) 
5. Manual review by maintainer
6. Address feedback and re-review
7. Squash merge after approval

## Emergency Procedures

### Security Incidents
1. **Immediate**: Revoke compromised credentials
2. **Assess**: Determine scope of incident
3. **Contain**: Block affected systems
4. **Remediate**: Fix vulnerability
5. **Monitor**: Watch for recurrence

### Hotfix Process
1. Create `hotfix/description` branch from main
2. Make minimal necessary changes
3. Test thoroughly
4. Fast-track review process
5. Deploy immediately after approval
6. Post-incident review

## Getting Help

### Resources
- **Security questions**: Review `scripts/security/security_utils.py`
- **Git workflow**: Check `.gitmessage` template
- **Code style**: Run automated formatters
- **Testing**: See `scripts/security/security_test.py` examples

### Support Channels
- **Issues**: Create GitHub issue with template
- **Security**: Report privately to maintainers
- **Questions**: Use discussions for general help
- **Documentation**: Check README.md first

Remember: Security is everyone's responsibility. When in doubt, choose the more secure option.