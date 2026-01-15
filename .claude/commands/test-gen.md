---
name: test-gen
description: Generate tests for code - unit tests, integration tests, or edge cases
---

You are generating tests. Create comprehensive, practical tests for the provided code.

## Test Categories

### 1. Unit Tests
- Test single functions/methods in isolation
- Mock external dependencies
- Fast execution
- High coverage of logic branches

### 2. Integration Tests
- Test component interactions
- Real database/service connections (or realistic mocks)
- API endpoint testing
- Workflow validation

### 3. Edge Case Tests
- Boundary conditions
- Empty/null inputs
- Maximum/minimum values
- Concurrent access
- Error conditions

### 4. Fintech-Specific Tests
- Money precision (decimal handling)
- Idempotency verification
- Transaction atomicity
- Race condition detection
- Audit trail validation

## Test Structure (AAA Pattern)

```
Arrange: Set up test data and preconditions
Act: Execute the code under test
Assert: Verify the results
```

## Language-Specific Frameworks

### Python (pytest)
```python
import pytest
from decimal import Decimal
from unittest.mock import Mock, patch

class TestPaymentProcessor:
    """Tests for PaymentProcessor class."""

    @pytest.fixture
    def processor(self):
        """Create a PaymentProcessor instance for testing."""
        return PaymentProcessor(api_key="test_key")

    @pytest.fixture
    def valid_payment(self):
        """Create a valid payment request."""
        return PaymentRequest(
            amount_cents=10000,
            currency="BRL",
            idempotency_key="test-123"
        )

    def test_process_payment_success(self, processor, valid_payment):
        """Should successfully process a valid payment."""
        # Arrange
        with patch.object(processor, '_call_gateway') as mock_gateway:
            mock_gateway.return_value = {"status": "approved", "id": "txn_123"}

            # Act
            result = processor.process(valid_payment)

            # Assert
            assert result.status == "approved"
            assert result.transaction_id == "txn_123"
            mock_gateway.assert_called_once()

    def test_process_payment_idempotency(self, processor, valid_payment):
        """Should return same result for duplicate idempotency key."""
        # First call
        result1 = processor.process(valid_payment)
        # Second call with same key
        result2 = processor.process(valid_payment)

        assert result1.transaction_id == result2.transaction_id

    @pytest.mark.parametrize("amount,expected_error", [
        (0, "Amount must be positive"),
        (-100, "Amount must be positive"),
        (None, "Amount is required"),
    ])
    def test_process_payment_invalid_amount(self, processor, amount, expected_error):
        """Should reject invalid payment amounts."""
        payment = PaymentRequest(amount_cents=amount, currency="BRL")

        with pytest.raises(ValidationError) as exc:
            processor.process(payment)

        assert expected_error in str(exc.value)
```

### Go (testing + testify)
```go
package payment_test

import (
    "context"
    "testing"

    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/require"
    "github.com/stretchr/testify/mock"
)

func TestPaymentProcessor_Process(t *testing.T) {
    t.Run("success", func(t *testing.T) {
        // Arrange
        mockGateway := new(MockGateway)
        mockGateway.On("Charge", mock.Anything, mock.Anything).
            Return(&ChargeResult{ID: "txn_123", Status: "approved"}, nil)

        processor := NewPaymentProcessor(mockGateway)
        req := &PaymentRequest{AmountCents: 10000, Currency: "BRL"}

        // Act
        result, err := processor.Process(context.Background(), req)

        // Assert
        require.NoError(t, err)
        assert.Equal(t, "approved", result.Status)
        assert.Equal(t, "txn_123", result.TransactionID)
        mockGateway.AssertExpectations(t)
    })

    t.Run("invalid amount", func(t *testing.T) {
        processor := NewPaymentProcessor(nil)

        testCases := []struct {
            name   string
            amount int64
            errMsg string
        }{
            {"zero", 0, "amount must be positive"},
            {"negative", -100, "amount must be positive"},
        }

        for _, tc := range testCases {
            t.Run(tc.name, func(t *testing.T) {
                req := &PaymentRequest{AmountCents: tc.amount}
                _, err := processor.Process(context.Background(), req)

                require.Error(t, err)
                assert.Contains(t, err.Error(), tc.errMsg)
            })
        }
    })
}
```

### Ruby (RSpec)
```ruby
RSpec.describe PaymentProcessor do
  subject(:processor) { described_class.new(gateway: gateway) }

  let(:gateway) { instance_double(PaymentGateway) }
  let(:valid_payment) do
    build(:payment_request, amount_cents: 10_000, currency: 'BRL')
  end

  describe '#process' do
    context 'with valid payment' do
      before do
        allow(gateway).to receive(:charge)
          .and_return(OpenStruct.new(id: 'txn_123', status: 'approved'))
      end

      it 'returns successful result' do
        result = processor.process(valid_payment)

        expect(result).to be_success
        expect(result.transaction_id).to eq('txn_123')
      end

      it 'calls gateway with correct parameters' do
        processor.process(valid_payment)

        expect(gateway).to have_received(:charge).with(
          amount_cents: 10_000,
          currency: 'BRL'
        )
      end
    end

    context 'with invalid amount' do
      it 'raises error for zero amount' do
        payment = build(:payment_request, amount_cents: 0)

        expect { processor.process(payment) }
          .to raise_error(ValidationError, /amount must be positive/i)
      end

      it 'raises error for negative amount' do
        payment = build(:payment_request, amount_cents: -100)

        expect { processor.process(payment) }
          .to raise_error(ValidationError, /amount must be positive/i)
      end
    end

    context 'idempotency' do
      it 'returns same result for duplicate idempotency key' do
        allow(gateway).to receive(:charge).once
          .and_return(OpenStruct.new(id: 'txn_123', status: 'approved'))

        result1 = processor.process(valid_payment)
        result2 = processor.process(valid_payment)

        expect(result1.transaction_id).to eq(result2.transaction_id)
      end
    end
  end
end
```

### TypeScript (Jest/Vitest)
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaymentProcessor } from './payment-processor';
import type { PaymentRequest } from './types';

describe('PaymentProcessor', () => {
  let processor: PaymentProcessor;
  let mockGateway: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockGateway = vi.fn();
    processor = new PaymentProcessor({ gateway: mockGateway });
  });

  describe('process', () => {
    const validPayment: PaymentRequest = {
      amountCents: 10000,
      currency: 'BRL',
      idempotencyKey: 'test-123',
    };

    it('should process valid payment successfully', async () => {
      mockGateway.mockResolvedValue({
        id: 'txn_123',
        status: 'approved',
      });

      const result = await processor.process(validPayment);

      expect(result.status).toBe('approved');
      expect(result.transactionId).toBe('txn_123');
      expect(mockGateway).toHaveBeenCalledOnce();
    });

    it.each([
      [0, 'Amount must be positive'],
      [-100, 'Amount must be positive'],
    ])('should reject amount %i with error "%s"', async (amount, expectedError) => {
      const payment = { ...validPayment, amountCents: amount };

      await expect(processor.process(payment)).rejects.toThrow(expectedError);
    });
  });
});
```

## Output Format

```markdown
# Generated Tests: [file/component]

## Test Summary
- **Unit Tests**: [count]
- **Integration Tests**: [count]
- **Edge Cases**: [count]
- **Coverage Target**: [percentage]

## Tests

\`\`\`[language]
[Generated test code]
\`\`\`

## Test Cases Covered

### Happy Path
- [x] [Test case 1]
- [x] [Test case 2]

### Error Cases
- [x] [Error case 1]
- [x] [Error case 2]

### Edge Cases
- [x] [Edge case 1]
- [x] [Edge case 2]

## Additional Tests Recommended
- [ ] [Suggested test 1]
- [ ] [Suggested test 2]

## Test Data / Fixtures Needed
- [Fixture 1]: [description]
- [Fixture 2]: [description]
```

## Instructions

1. If a file path is provided, read and generate tests for that file
2. If code is provided inline, generate tests for that code
3. Use the appropriate testing framework for the language
4. Follow AAA pattern (Arrange, Act, Assert)
5. Include both happy path and error cases
6. Add edge cases relevant to fintech (money precision, idempotency, etc.)
7. Use descriptive test names that explain what is being tested
8. Keep tests independent and isolated
9. Suggest fixtures/factories for test data
