# Step 8 - Task Breakdown & Execution

## Objetivo
Detalhar ainda mais as tarefas do Step 7, focando em instruções executáveis para cada step.

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
  - **Step Dependencies**: [Step Dependencies]
  - **User Instructions**: [Instructions for User]
  - **UX/UI**: [Visual/interaction considerations for this step]
  - **Code Examples**: [If applicable, pseudocode or code snippets]

## [Section N + 1]

## [Section N + 2]

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
- Include code examples where helpful
- Specify exact file paths based on project structure
- Include UX/UI notes for frontend tasks
</guidelines>
</warnings-and-guidelines>

<context>
<tech-specification>
{complete_tech_spec_from_step_5}
</tech-specification>

<project-rules>
{rules_from_step_6}
</project-rules>

<implementation-plan>
{plan_from_step_7}
</implementation-plan>
</context>

---

## Output Esperado

Tarefas detalhadas com código e instruções específicas:

```markdown
## Section 2: Authentication Setup

- [ ] Step 5: Configure Clerk Authentication
  - **Task**: Integrate Clerk authentication with Next.js middleware, create sign-in/sign-up pages, and setup webhook for user synchronization.

  - **Files**:
    - `middleware.ts`: Clerk auth middleware configuration
    - `app/(auth)/sign-in/[[...sign-in]]/page.tsx`: Sign-in page
    - `app/(auth)/sign-up/[[...sign-up]]/page.tsx`: Sign-up page
    - `app/api/webhooks/clerk/route.ts`: Webhook handler
    - `lib/auth.ts`: Auth utility functions

  - **Step Dependencies**: Step 1 (Project Setup), Step 3 (Database)

  - **User Instructions**:
    - Create Clerk account at clerk.com
    - Get API keys from dashboard
    - Add to `.env.local`:
      ```
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
      CLERK_SECRET_KEY=sk_...
      CLERK_WEBHOOK_SECRET=whsec_...
      ```
    - Configure webhook endpoint in Clerk dashboard

  - **UX/UI**:
    - Clean, centered auth forms
    - Social login buttons prominently displayed
    - Loading states during authentication
    - Error messages inline with form fields

  - **Code Examples**:
    ```typescript
    // middleware.ts
    import { authMiddleware } from "@clerk/nextjs";

    export default authMiddleware({
      publicRoutes: ["/", "/pricing", "/about"],
    });

    export const config = {
      matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
    };
    ```
```

---

## Diferença entre Step 7 e Step 8

| Aspecto | Step 7 (Planner) | Step 8 (Task Breakdown) |
|---------|------------------|-------------------------|
| Foco | Visão geral do plano | Detalhes de execução |
| Código | Raramente | Frequentemente |
| UX/UI | Referência apenas | Instruções específicas |
| Dependências | Alto nível | Detalhadas |
| User Instructions | Setup básico | Passo a passo |
