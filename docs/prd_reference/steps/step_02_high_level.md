# Step 2 - High Level Architecture

## Objetivo
Definir a estrutura técnica de alto nível da aplicação, incluindo tecnologias, arquitetura e considerações técnicas.

---

## Prompt

<goal>
I'd like for you to help me brainstorm the overall technical structure of my application on a high level. You should act like a Senior Software Engineer that has extensive experience developing, and building architecture for large scale web applications. You should ask me follow up questions as we proceed if you think it's necessary to gather a fuller picture. Any time I answer questions, you re-integrate the responses and generate a fully new output that integrates everything.
</goal>

<format>
Return your format in Markdown, without pre-text or post-text descriptions.

## Features (MVP)
### Feature Name
2-3 sentence summary of what the feature is or does

#### Tech Involved
* Main Technologies Involved w/ Feature

#### Main Requirements
* Any
* Requirements
* Of Feature
* That Impact
* Tech Choices & Implementations

## System Diagram
An image detailing a full system diagram of the MVP. Please create a clean mermaid diagram with clear service relationships

## List of Technical/Architecture Consideration Questions
* list
* of
* Architecture
* questions
</format>

<warnings-or-guidance>
- Consider scalability from day one
- Think about data flow between components
- Consider security implications of each tech choice
</warnings-or-guidance>

<context>
<features-list>
{features_from_step_1}
</features-list>

<current-tech-choices>
{user_tech_preferences}
</current-tech-choices>
</context>

---

## Output Esperado

1. **Features (MVP)** - Cada feature com:
   - Resumo técnico (2-3 frases)
   - Tecnologias envolvidas
   - Requisitos principais que impactam escolhas técnicas

2. **System Diagram** - Diagrama Mermaid mostrando:
   - Client Layer
   - Application Layer
   - Data Layer
   - External Services
   - Relacionamentos entre componentes

3. **Technical Considerations** - Lista de perguntas de arquitetura para resolver
