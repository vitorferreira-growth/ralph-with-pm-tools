# Step 7 - Implementation Planner

## Objetivo
Quebrar a especificação técnica em tarefas detalhadas e ordenadas, prontas para execução.

---

## Prompt

<goal>
You are an AI-engineer tasked with breaking down a complicated technical specification into detailed steps that retain a high-degree of granularity based on the original specifications.

Your goal is to generate a highly-detailed, step-wise task plan that leaves no detail un-addressed.

You should pass-back-through your output several times to ensure no data is left out.

The main context for this task is provided in the Context section below, namely:
- The tech specification
- Any critical project rules
- The core application intent documentation
</goal>

<format>
## [Section N]
- [ ] Step 1: [Brief title]
  - **Task**: [Detailed explanation of what needs to be implemented]
  - **Files**: [Maximum of 15 files, ideally less]
    - `path/to/file1.ts`: [Description of changes]
    - `path/to/file2.ts`: [Description of changes]
  - **Step Dependencies**: [List of steps this depends on]
  - **User Instructions**: [Any manual steps the user needs to take]
  - **Acceptance Criteria**: [How to verify this step is complete]

## [Section N + 1]
- [ ] Step 2: [Brief title]
  ...

Repeat for all steps
</format>

<warnings-and-guidelines>
- You ARE allowed to mix backend and frontend steps together if it makes sense
- Each step must not modify more than 15 files in a single-run
- If it does, you need to ask the user for permission and explain why it's a special case

<guidelines>
- Always start with project setup and critical-path configurations
- Try to make each new step contained, so that the app can be built and functional between tasks
- Mark dependencies between steps
- Group related tasks into logical sections
- Consider the order of operations (database before API, API before UI, etc.)
- Include testing tasks after feature implementation
- Include deployment/configuration tasks
</guidelines>
</warnings-and-guidelines>

<context>
<tech-specification>
{complete_tech_spec_from_step_5}
</tech-specification>

<project-rules>
{rules_from_step_6}
</project-rules>

<app-overview>
{elevator_pitch_and_features}
</app-overview>
</context>

---

## Output Esperado

Plano de implementação estruturado em seções:

### Section 1: Project Setup
- [ ] Step 1: Initialize project with Next.js
- [ ] Step 2: Configure TypeScript and ESLint
- [ ] Step 3: Setup Prisma and database connection
- [ ] Step 4: Configure authentication (Clerk)

### Section 2: Core Infrastructure
- [ ] Step 5: Create base UI components
- [ ] Step 6: Setup state management (Zustand)
- [ ] Step 7: Configure API layer

### Section 3: Feature - [Feature Name]
- [ ] Step N: Implement [feature component]
- [ ] Step N+1: Create API endpoints
- [ ] Step N+2: Add tests

### Section N: Deployment
- [ ] Final Step: Configure CI/CD and deploy

---

## Exemplo de Step Detalhado

```markdown
## Section 1: Project Setup

- [ ] Step 1: Initialize Next.js Project
  - **Task**: Create a new Next.js 14+ project with App Router, TypeScript, TailwindCSS, and ESLint. Configure the base project structure according to the tech spec.
  - **Files**:
    - `package.json`: Project dependencies and scripts
    - `tsconfig.json`: TypeScript configuration with strict mode
    - `tailwind.config.ts`: TailwindCSS configuration with custom theme
    - `next.config.js`: Next.js configuration
    - `.eslintrc.json`: ESLint rules
    - `app/layout.tsx`: Root layout with providers
    - `app/page.tsx`: Landing page placeholder
  - **Step Dependencies**: None (first step)
  - **User Instructions**:
    - Run `npx create-next-app@latest` with TypeScript and TailwindCSS options
    - Copy environment variables template
  - **Acceptance Criteria**:
    - `npm run dev` starts the development server
    - TypeScript compilation succeeds without errors
    - TailwindCSS styles are applied correctly
```
