---
name: refactor
description: Suggest refactoring opportunities - code smells, patterns, and improvements
---

You are performing a refactoring analysis. Identify improvement opportunities in the provided code.

## Code Smells to Detect

### 1. Complexity Issues
- [ ] Long methods (>20 lines)
- [ ] Deep nesting (>3 levels)
- [ ] High cyclomatic complexity
- [ ] God classes/functions
- [ ] Feature envy

### 2. Duplication
- [ ] Copy-paste code
- [ ] Similar logic in multiple places
- [ ] Repeated conditionals
- [ ] Magic numbers/strings

### 3. Naming & Clarity
- [ ] Unclear variable names
- [ ] Misleading function names
- [ ] Inconsistent naming conventions
- [ ] Missing type hints/annotations

### 4. Design Issues
- [ ] Tight coupling
- [ ] Missing abstraction
- [ ] Wrong abstraction level
- [ ] Violation of SOLID principles
- [ ] Mixed responsibilities

### 5. Error Handling
- [ ] Swallowed exceptions
- [ ] Generic catch-all handlers
- [ ] Missing error cases
- [ ] Inconsistent error patterns

### 6. Fintech-Specific
- [ ] Money as float (should be integer cents)
- [ ] Missing idempotency patterns
- [ ] Non-atomic operations on balances
- [ ] Missing audit trail

## Refactoring Techniques

### Extract Method
```python
# Before: Long method with multiple responsibilities
def process_order(order):
    # Validate order (10 lines)
    # Calculate totals (15 lines)
    # Apply discounts (10 lines)
    # Create invoice (20 lines)
    pass

# After: Clear, single-responsibility methods
def process_order(order):
    validate_order(order)
    totals = calculate_totals(order)
    totals = apply_discounts(totals, order.coupons)
    return create_invoice(order, totals)
```

### Replace Conditional with Polymorphism
```python
# Before: Type checking with conditionals
def calculate_fee(payment):
    if payment.type == "credit":
        return payment.amount * 0.03
    elif payment.type == "debit":
        return payment.amount * 0.01
    elif payment.type == "pix":
        return 0

# After: Polymorphic behavior
class CreditPayment(Payment):
    def calculate_fee(self) -> int:
        return self.amount * 3 // 100

class DebitPayment(Payment):
    def calculate_fee(self) -> int:
        return self.amount * 1 // 100

class PixPayment(Payment):
    def calculate_fee(self) -> int:
        return 0
```

### Introduce Parameter Object
```python
# Before: Too many parameters
def create_transaction(
    amount, currency, merchant_id, customer_id,
    description, metadata, idempotency_key
):
    pass

# After: Grouped into meaningful object
@dataclass
class TransactionRequest:
    amount_cents: int
    currency: str
    merchant_id: str
    customer_id: str
    description: str
    metadata: dict
    idempotency_key: str

def create_transaction(request: TransactionRequest):
    pass
```

### Replace Magic Numbers
```python
# Before: Magic numbers
if retry_count > 3:
    if response.status == 429:
        sleep(60)

# After: Named constants
MAX_RETRIES = 3
RATE_LIMIT_STATUS = 429
RATE_LIMIT_COOLDOWN_SECONDS = 60

if retry_count > MAX_RETRIES:
    if response.status == RATE_LIMIT_STATUS:
        sleep(RATE_LIMIT_COOLDOWN_SECONDS)
```

### Guard Clauses
```python
# Before: Deep nesting
def process_payment(payment):
    if payment:
        if payment.is_valid():
            if payment.amount > 0:
                if not payment.is_duplicate():
                    # actual logic here
                    return do_process(payment)

# After: Early returns
def process_payment(payment):
    if not payment:
        raise ValueError("Payment required")
    if not payment.is_valid():
        raise ValidationError("Invalid payment")
    if payment.amount <= 0:
        raise ValidationError("Amount must be positive")
    if payment.is_duplicate():
        return get_existing_result(payment)

    return do_process(payment)
```

## Output Format

```markdown
# Refactoring Analysis: [file/component]

## Summary
- **Code Quality Score**: [1-10]
- **Critical Issues**: [count]
- **Improvement Opportunities**: [count]
- **Estimated Effort**: [Small/Medium/Large]

## Findings

### Critical (Fix Now)

#### [Finding 1: Code Smell Name]
- **Location**: [file:line-range]
- **Problem**: [description]
- **Impact**: [why it matters]
- **Before**:
```[language]
// Current code
```
- **After**:
```[language]
// Refactored code
```
- **Technique**: [Extract Method / Replace Conditional / etc.]

### Recommended (Should Fix)

#### [Finding 2: Code Smell Name]
...

### Nice to Have (Consider)

#### [Finding 3: Code Smell Name]
...

## Refactoring Plan

### Phase 1: Quick Wins (No behavior change)
1. [ ] Rename `x` to `transaction_amount` in [file:line]
2. [ ] Extract `validate_payment` method from `process_payment`
3. [ ] Replace magic number `86400` with `SECONDS_PER_DAY`

### Phase 2: Structural Improvements
1. [ ] Extract `PaymentValidator` class
2. [ ] Introduce `Money` value object

### Phase 3: Architecture Changes (if needed)
1. [ ] Consider splitting `PaymentProcessor` into smaller services

## Testing Impact
- Tests to update: [list]
- New tests needed: [list]
- Regression risk: [LOW/MEDIUM/HIGH]

## SOLID Violations
| Principle | Status | Notes |
|-----------|--------|-------|
| Single Responsibility | [OK/VIOLATION] | [details] |
| Open/Closed | [OK/VIOLATION] | [details] |
| Liskov Substitution | [OK/VIOLATION] | [details] |
| Interface Segregation | [OK/VIOLATION] | [details] |
| Dependency Inversion | [OK/VIOLATION] | [details] |
```

## Instructions

1. If a file path is provided, read and analyze that file
2. If code is provided inline, analyze that code
3. Focus on actionable improvements, not nitpicks
4. Show before/after code for each suggestion
5. Prioritize by impact and effort
6. Consider fintech requirements (auditability, atomicity, precision)
7. Preserve existing behavior - refactoring should not change functionality
8. Note testing implications for each refactoring
