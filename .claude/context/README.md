# Context Persistence

This directory stores project-specific context that persists across Claude Code sessions.

## Structure

```
.claude/context/
├── README.md           # This file
├── project.md          # Project overview, architecture, key decisions
├── decisions.md        # Architectural Decision Records (ADRs)
├── patterns.md         # Code patterns specific to this project
└── glossary.md         # Domain-specific terms and definitions
```

## Usage

Claude Code reads these files to understand project context without re-analyzing the codebase each session.

### project.md
High-level project info that rarely changes:
- Tech stack and versions
- Architecture overview
- Key dependencies
- Team conventions

### decisions.md
Append-only log of architectural decisions:
```markdown
## 2024-01-15: Use integer cents for money
**Context**: Need to handle BRL currency
**Decision**: Store all money as integer cents, never floats
**Rationale**: Avoids floating point errors in financial calculations
```

### patterns.md
Project-specific patterns Claude should follow:
```markdown
## Error Handling
All errors must include correlation_id from context.

## API Responses
Always wrap in {data, meta, errors} structure.
```

### glossary.md
Domain terms that might be ambiguous:
```markdown
- **Merchant**: Business that accepts payments (not end customer)
- **Acquirer**: CloudWalk's role in payment processing
- **Settlement**: Daily batch transfer to merchant bank account
```

## Auto-Update

When Claude discovers important context during a session, it should offer to update these files:

```
Claude: "I noticed this project uses a custom error handling pattern.
        Should I add this to .claude/context/patterns.md?"
```

## Gitignore

These files should be committed to git so the whole team shares context.
