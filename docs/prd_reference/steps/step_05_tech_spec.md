# Step 5 - Technical Specification

## Objetivo
Criar uma especificação técnica completa que servirá como input direto para planejamento e geração de código.

---

## Prompt

<goal>
Create a comprehensive technical specification document for a software development project that will serve as direct input for planning and code generation AI systems. The specification must be precise, structured, and provide actionable implementation guidance covering all aspects of the system from architecture to deployment.
</goal>

<format>
The output should be a detailed technical specification in markdown format with the following structure:

# {Project Name} Technical Specification

## 1. Executive Summary
- Project overview and objectives
- Key technical decisions and rationale
- High-level architecture diagram
- Technology stack recommendations

## 2. System Architecture
### 2.1 Architecture Overview
- System components and their relationships
- Data flow diagrams
- Infrastructure requirements

### 2.2 Technology Stack
- Frontend technologies and frameworks
- Backend technologies and frameworks
- Database and storage solutions
- Third-party services and APIs

## 3. Feature Specifications
For each major feature:
### 3.X {Feature Name}
- User stories and acceptance criteria
- Technical requirements and constraints
- Detailed implementation approach
- User flow diagrams
- API endpoints (if applicable)
- Data models involved
- Error handling and edge cases
- Performance considerations

## 4. Data Architecture
### 4.1 Data Models
For each entity:
- Entity definition and purpose
- Attributes (name, type, constraints, defaults)
- Relationships and associations
- Indexes and optimization strategies

### 4.2 Data Storage
- Database selection and rationale
- Data persistence strategies
- Caching mechanisms
- Backup and recovery procedures

## 5. API Specifications
### 5.1 Internal APIs
For each endpoint:
- Endpoint URL and HTTP method
- Request parameters and body schema
- Response schema and status codes
- Authentication and authorization
- Rate limiting and throttling
- Example requests and responses

### 5.2 External Integrations
For each integration:
- Service description and purpose
- Authentication mechanisms
- API endpoints and usage
- Error handling and fallback strategies
- Data synchronization approaches

## 6. Security & Privacy
### 6.1 Authentication & Authorization
- Authentication mechanism and flow
- Authorization strategies and role definitions
- Session management
- Token handling and refresh strategies

### 6.2 Data Security
- Encryption strategies (at rest and in transit)
- PII handling and protection
- Compliance requirements (GDPR, CCPA, etc.)
- Security audit procedures

### 6.3 Application Security
- Input validation and sanitization
- OWASP compliance measures
- Security headers and policies
- Vulnerability management

## 7. User Interface Specifications
### 7.1 Design System
- Visual design principles
- Brand guidelines and personality
- Component library structure
- Responsive design approach
- Accessibility standards (WCAG compliance)
- Platform-specific UI considerations

### 7.2 Design Foundations
#### 7.2.1 Color System
- Primary, secondary, and accent colors (hex/rgb values)
- Semantic colors (success, warning, error, info)
- Neutral/grayscale palette
- Dark mode considerations
- Color accessibility ratios

#### 7.2.2 Typography
- Font families (primary, secondary, monospace)
- Type scale (font sizes and line heights)
- Font weights and styles
- Responsive typography rules
- Text color treatments

#### 7.2.3 Spacing & Layout
- Base unit system (4px, 8px grid, etc.)
- Spacing scale (xs, sm, md, lg, xl values)
- Container widths and breakpoints
- Grid system specifications
- Component spacing patterns

#### 7.2.4 Interactive Elements
- Button styles and states
- Form field specifications
- Animation timing and easing
- Hover/focus/active states
- Loading and transition patterns

#### 7.2.5 Component Specifications
- Design tokens structure
- Core component variants
- Composition patterns
- State visualizations
- Platform-specific adaptations

### 7.3 User Experience Flows
- Key user journeys with wireframes/mockups
- Navigation structure
- State management and transitions
- Error states and user feedback
- Loading and empty states

## 8. Infrastructure & Deployment
### 8.1 Infrastructure Requirements
- Hosting environment specifications
- Server requirements and configuration
- Network architecture
- Storage requirements

### 8.2 Deployment Strategy
- CI/CD pipeline configuration
- Environment management (dev, staging, production)
- Deployment procedures and rollback strategies
- Configuration management

## 9. Testing Strategy
### 9.1 Testing Approach
- Unit testing strategy
- Integration testing
- End-to-end testing
- Performance testing

### 9.2 Quality Assurance
- Code review process
- Testing coverage requirements
- Acceptance criteria verification

## 10. Monitoring & Observability
- Logging strategy
- Error tracking
- Performance monitoring
- Alerting and on-call procedures

## 11. Project Structure
```
project/
├── app/
├── components/
├── lib/
├── hooks/
├── stores/
├── types/
├── prisma/
├── public/
├── tests/
└── config/
```
</format>

<warnings-and-guidelines>
Before creating the specification:

1. **Analyze the project comprehensively** considering:
   - System architecture and infrastructure requirements
   - Core functionality and feature breakdown
   - Data models and storage architecture
   - API and integration specifications
   - Security, privacy, and compliance requirements
   - Performance and scalability considerations
   - User interface and experience specifications
   - Third-party services and external dependencies
   - Deployment and operational requirements
   - Quality assurance and monitoring strategy

2. **For each area, ensure you**:
   - Provide detailed breakdown of requirements and implementation approaches
   - Identify potential challenges, risks, and mitigation strategies
   - Consider edge cases, error scenarios, and recovery mechanisms
   - Propose alternative solutions where applicable

3. **Critical considerations**:
   - Break down complex features into detailed user flows
   - Identify areas requiring clarification or having technical constraints
   - Consider platform-specific requirements (web, mobile, desktop)
   - Address non-functional requirements (performance, security, accessibility)

4. **Quality guidelines**:
   - Be technology-agnostic unless specific technologies are mandated
   - Provide concrete examples and clear interfaces between components
   - Include specific implementation guidance without unnecessary jargon
   - Focus on completeness and actionability for development teams

5. **Project structure guidelines**:
   - Prefer feature-based organization over layer-based when possible
   - Group related functionality together
   - Separate concerns clearly (business logic, UI, data access)
   - Document the chosen structure rationale in the specification
   - Include example directory trees for complex features

6. **When specifying project structure**:
   - Show concrete examples with file paths
   - Explain the reasoning for the chosen organization
   - Highlight where shared code should live
   - Indicate naming conventions (camelCase, PascalCase, kebab-case)
   - Specify file naming patterns (e.g., `*.test.ts`, `*.spec.ts`)
</warnings-and-guidelines>

<context>
<project_request>
{high_level_architecture_from_step_2}
</project_request>

<tech-stack>
{user_tech_stack_preferences}
</tech-stack>

<design-considerations>
<aesthetics>
{aesthetics_guidelines}
</aesthetics>

<app-design-system>
{style_guide_from_step_4}
</app-design-system>
</design-considerations>

<feature-stories>
{feature_stories_from_step_3}
</feature-stories>
</context>

---

## Output Esperado

Especificação técnica completa contendo:
- Executive Summary com decisões técnicas chave
- Arquitetura do sistema com diagramas
- Especificação de cada feature
- Data models em formato Prisma/SQL
- API endpoints documentados
- Estratégia de segurança
- Design system completo
- Infraestrutura e deployment
- Estrutura de projeto
