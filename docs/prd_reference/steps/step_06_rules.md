# Step 6 - Project Rules

## Objetivo
Definir as regras, convenções e padrões que devem ser seguidos durante todo o desenvolvimento do projeto.

---

## Prompt

<goal>
You are an experienced Tech Lead establishing coding standards and project rules for a development team. Your goal is to create a comprehensive set of rules that ensure consistency, maintainability, and quality across the codebase.

Based on the project context and tech stack, define the rules that all developers must follow.
</goal>

<format>
# Project Rules

## Code Style & Conventions

### Naming Conventions
- Files: kebab-case for files, PascalCase for components
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase with I prefix for interfaces (optional)
- Functions: camelCase, verb prefixes (get, set, handle, etc.)

### File Organization
- One component per file
- Co-locate related files (component, styles, tests, types)
- Maximum file size guidelines
- Import order conventions

### TypeScript Rules
- Strict mode enabled
- No `any` type unless absolutely necessary
- Explicit return types for public functions
- Use `unknown` instead of `any` for unknown types

### React/Next.js Rules
- Functional components only
- Custom hooks for shared logic
- Server Components by default, Client Components when needed
- Props interface defined above component

### CSS/Styling Rules
- TailwindCSS utility-first approach
- Custom classes only when necessary
- Responsive-first design
- CSS variables for theme values

## Git & Version Control

### Branch Naming
- feature/description
- fix/description
- refactor/description
- docs/description

### Commit Messages
- Conventional commits format
- feat: / fix: / docs: / refactor: / test: / chore:
- Present tense, imperative mood
- Reference issue numbers when applicable

### Pull Request Guidelines
- Descriptive title and description
- Link to related issues
- Screenshots for UI changes
- All tests passing
- Code review required

## Testing Standards

### Unit Tests
- Test files co-located with source
- Naming: `*.test.ts` or `*.spec.ts`
- Minimum coverage requirements
- Mock external dependencies

### Integration Tests
- Test user flows end-to-end
- Use testing library best practices
- Avoid testing implementation details

## Documentation

### Code Comments
- JSDoc for public APIs
- Inline comments for complex logic only
- TODO format: `// TODO(username): description`

### README Requirements
- Setup instructions
- Environment variables documentation
- Common commands

## Performance

### Optimization Rules
- Lazy load non-critical components
- Optimize images and assets
- Use React.memo for expensive components
- Avoid unnecessary re-renders

### Bundle Size
- Monitor bundle size in CI
- Tree-shake unused code
- Dynamic imports for large dependencies

## Security

### Security Rules
- Never commit secrets
- Validate all user input
- Sanitize output to prevent XSS
- Use parameterized queries
- HTTPS only

## Accessibility

### A11y Requirements
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Alt text for images
</format>

<context>
<tech-stack>
{user_tech_stack}
</tech-stack>

<project-type>
{project_type_and_requirements}
</project-type>
</context>

---

## Output Esperado

Documento de regras contendo:
1. **Code Style** - Convenções de naming e organização
2. **TypeScript Rules** - Regras específicas de tipagem
3. **Framework Rules** - React/Next.js específicas
4. **Git Guidelines** - Branches, commits, PRs
5. **Testing Standards** - Cobertura e padrões
6. **Documentation** - Como documentar
7. **Performance** - Otimizações obrigatórias
8. **Security** - Práticas de segurança
9. **Accessibility** - Requisitos de acessibilidade
