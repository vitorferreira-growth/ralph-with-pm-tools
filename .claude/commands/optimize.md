---
name: optimize
description: Performance optimization suggestions for code, queries, or infrastructure
---

You are performing a performance optimization review. Analyze the provided code for efficiency improvements.

## Analysis Areas

### 1. Algorithmic Complexity
- [ ] Time complexity analysis (Big O)
- [ ] Space complexity analysis
- [ ] Unnecessary iterations or loops
- [ ] Data structure choices

### 2. Database Performance
- [ ] N+1 query detection
- [ ] Missing indexes (check WHERE/JOIN clauses)
- [ ] Query plan analysis suggestions
- [ ] Connection pooling considerations
- [ ] Batch operations vs individual calls

### 3. Memory & Resources
- [ ] Memory leaks potential
- [ ] Object allocation patterns
- [ ] Resource cleanup (connections, files, handles)
- [ ] Caching opportunities

### 4. Concurrency
- [ ] Parallelization opportunities
- [ ] Async/await patterns
- [ ] Lock contention
- [ ] Thread safety issues

### 5. I/O Performance
- [ ] Network call optimization
- [ ] File I/O patterns
- [ ] Buffering strategies
- [ ] Compression opportunities

### 6. Language-Specific

#### Python
- [ ] List comprehensions vs loops
- [ ] Generator expressions for large data
- [ ] Avoid global lookups
- [ ] Use `__slots__` for memory

#### Go
- [ ] Goroutine leaks
- [ ] Channel buffering
- [ ] Sync.Pool for allocations
- [ ] Avoid interface{} boxing

#### Ruby
- [ ] Eager loading vs lazy loading
- [ ] Memoization patterns
- [ ] Avoid method_missing abuse
- [ ] Use pluck/select vs loading full objects

#### Rust
- [ ] Unnecessary clones
- [ ] Iterator vs collect patterns
- [ ] Stack vs heap allocation
- [ ] Zero-copy opportunities

## Output Format

```markdown
# Performance Analysis: [file/component]

## Summary
- **Current Complexity**: [O(n²)/O(n log n)/O(n)]
- **Estimated Impact**: [HIGH/MEDIUM/LOW]
- **Quick Wins**: [number of easy fixes]

## Findings

### [Finding 1: Title]
- **Location**: [file:line]
- **Type**: [Algorithm/Database/Memory/I/O/Concurrency]
- **Current**: [what it does now]
- **Impact**: [why it matters - quantify if possible]
- **Fix**:
```[language]
// Optimized code here
```
- **Expected Improvement**: [2x faster / 50% less memory / etc.]

### [Finding 2: Title]
...

## Optimization Priorities

### Immediate (High Impact, Low Effort)
1. [Quick win 1]
2. [Quick win 2]

### Short-term (High Impact, Medium Effort)
1. [Bigger change 1]

### Long-term (Requires Architecture Changes)
1. [Major refactor if needed]

## Benchmarking Suggestions
- [ ] Benchmark before/after: `[command]`
- [ ] Profile hotspots: `[profiler command]`
- [ ] Load test endpoints: `[tool suggestion]`

## Trade-offs
| Optimization | Benefit | Cost |
|--------------|---------|------|
| [change 1] | [faster] | [more complex] |
| [change 2] | [less memory] | [slower writes] |
```

## Instructions

1. If a file path is provided, read and analyze that file
2. If code is provided inline, analyze that code
3. Focus on measurable improvements, not premature optimization
4. Quantify impact where possible (2x, 50%, etc.)
5. Consider the fintech context - latency matters for payments
6. Suggest profiling/benchmarking to validate assumptions
7. Note trade-offs (e.g., memory vs speed, complexity vs performance)
