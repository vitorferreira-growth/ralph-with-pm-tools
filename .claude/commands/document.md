---
name: document
description: Generate documentation for code - functions, classes, modules, or APIs
---

You are generating documentation. Create clear, useful documentation for the provided code.

## Documentation Types

### 1. Function/Method Documentation
- Purpose and behavior
- Parameters with types and descriptions
- Return value and type
- Exceptions/errors raised
- Example usage
- Edge cases and gotchas

### 2. Class/Module Documentation
- Overview and responsibility
- Public interface summary
- Dependencies and relationships
- Thread safety considerations
- Usage examples

### 3. API Documentation
- Endpoint description
- Request format (method, path, headers, body)
- Response format (status codes, body structure)
- Authentication requirements
- Rate limiting details
- Error responses

### 4. Architecture Documentation
- Component overview
- Data flow diagrams (text-based)
- Integration points
- Configuration options

## Language-Specific Formats

### Python (Google-style docstrings)
```python
def function_name(param1: str, param2: int = 10) -> dict:
    """Short description of function.

    Longer description if needed, explaining the behavior,
    algorithm, or important details.

    Args:
        param1: Description of first parameter.
        param2: Description of second parameter. Defaults to 10.

    Returns:
        Description of return value.

    Raises:
        ValueError: When param1 is empty.
        ConnectionError: When external service unavailable.

    Example:
        >>> result = function_name("test", 20)
        >>> print(result)
        {'status': 'success'}
    """
```

### Go (godoc style)
```go
// FunctionName does X and returns Y.
//
// It handles Z edge case by doing W.
// Thread-safe for concurrent use.
//
// Example:
//
//	result, err := FunctionName(ctx, "input")
//	if err != nil {
//	    log.Fatal(err)
//	}
func FunctionName(ctx context.Context, input string) (Result, error)
```

### Ruby (YARD style)
```ruby
# Short description of method.
#
# Longer description explaining behavior and important details.
#
# @param param1 [String] description of first parameter
# @param param2 [Integer] description of second parameter (default: 10)
# @return [Hash] description of return value
# @raise [ArgumentError] when param1 is nil
#
# @example Basic usage
#   result = method_name("test", 20)
#   # => { status: :success }
def method_name(param1, param2 = 10)
```

### TypeScript (TSDoc style)
```typescript
/**
 * Short description of function.
 *
 * @param param1 - Description of first parameter
 * @param param2 - Description of second parameter
 * @returns Description of return value
 * @throws {ValidationError} When input is invalid
 *
 * @example
 * ```typescript
 * const result = functionName("test", 20);
 * console.log(result); // { status: "success" }
 * ```
 */
function functionName(param1: string, param2: number = 10): Result
```

### Rust (rustdoc style)
```rust
/// Short description of function.
///
/// Longer description explaining behavior and important details.
///
/// # Arguments
///
/// * `param1` - Description of first parameter
/// * `param2` - Description of second parameter
///
/// # Returns
///
/// Description of return value
///
/// # Errors
///
/// Returns `Err` if the operation fails because of X.
///
/// # Examples
///
/// ```
/// let result = function_name("test", 20)?;
/// assert_eq!(result.status, Status::Success);
/// ```
///
/// # Panics
///
/// Panics if param1 is empty (use `try_function_name` for fallible version).
pub fn function_name(param1: &str, param2: i32) -> Result<Output, Error>
```

## Output Format

```markdown
# Documentation: [file/component]

## Overview
[Brief description of what this code does and why it exists]

## [Generated documentation in appropriate format]

---

## Additional Notes

### Dependencies
- [External dependency 1]: [why needed]
- [External dependency 2]: [why needed]

### Related Code
- [Related file/function 1]: [relationship]
- [Related file/function 2]: [relationship]

### Usage Context
[When and how this code is typically used in the system]
```

## Instructions

1. If a file path is provided, read and document that file
2. If code is provided inline, document that code
3. Use the appropriate documentation style for the language
4. Include practical examples that developers can copy
5. Document edge cases and error conditions
6. Keep documentation concise but complete
7. For fintech code, note any compliance or security considerations
8. Don't document obvious things (avoid "returns the return value")
