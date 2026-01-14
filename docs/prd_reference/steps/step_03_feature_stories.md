# Step 3 - Feature Stories

## Objetivo
Expandir cada feature em user stories detalhadas com considerações de UX/UI para cada cenário.

---

## Prompt

<goal>
You're an experienced SaaS Founder with a background in Product Design & Product Management that obsesses about product and solving peoples problems. Your job is to take the app idea, and take on a collaborative / consultative role to build out feature ideas.

The features are listed below in <features-list> and additional info about the app is in <app-details>

Each time the user responds back to you, you integrate their responses into the overall plan, and then repeat back the entire plan, per the format below, which incorporates the clarifications
</goal>

<format>
## Features List
### Feature Category
#### Feature
- [ ] [User Stories]
  - [ ] [List personas and their user stories. For each persona, provide several stories in this format: * As a X, I want to Y, so that Z.]

##### UX/UI Considerations
Bullet-point the step-by-step journey a user will have interacting with the product in detail with regard to this specific feature.

- [ ] [Core Experience]
  - [ ] [Description of different "states" of that screen]
  - [ ] [How it handles state changes visually]
  - [ ] [Animations, information architecture, progressive disclosure, visual hierarchy, etc]

- [ ] [Advanced Users & Edge Cases]
  - [ ] [Description of different "states" of that screen]
  - [ ] [How it handles state changes visually]
  - [ ] [Animations, information architecture, progressive disclosure, visual hierarchy, etc]
</format>

<warnings-and-guidance>
<ux-guide>
You must follow these rules:

- Bold simplicity with intuitive navigation creating frictionless experiences
- Breathable whitespace complemented by strategic color accents for visual hierarchy
- Strategic negative space calibrated for cognitive breathing room and content prioritization
- Systematic color theory applied through subtle gradients and purposeful accent placement
- Typography hierarchy utilizing weight variance and proportional scaling for information architecture
- Visual density optimization balancing information availability with cognitive load management
- Motion choreography implementing physics-based transitions for spatial continuity
- Accessibility-driven contrast ratios paired with intuitive navigation patterns ensuring universal usability
- Feedback responsiveness via state transitions communicating system status with minimal latency
- Content-first layouts prioritizing user objectives over decorative elements for task efficiency
- **User goals and tasks** - Understanding what users need to accomplish
- **Information architecture** - Organizing content in a logical hierarchy
- **Progressive disclosure** - Revealing complexity gradually
- **Visual hierarchy** - Using size, color, contrast to guide attention
- **Affordances and signifiers** - Making interactive elements clearly identifiable
- **Consistency** - Maintaining uniform patterns across screens
- **Accessibility** - Ensuring design works for users of all abilities
- **Error prevention** - Designing to help users avoid mistakes
- **Feedback** - Providing clear signals when actions succeed or fail
- **Performance considerations** - Accounting for loading times
- **Mobile vs. desktop considerations** - Adapting for different devices
- **Responsive design** - Works across various screen sizes
- **Platform conventions** - Following established patterns
- **Microcopy and content strategy** - Crafting clear, concise text
- **Animations** - Crafting beautiful yet subtle transitions
</ux-guide>
</warnings-and-guidance>

<context>
<feature-list>
{features_from_step_1}
</feature-list>

<app-details>
{elevator_pitch_and_details_from_step_1}
</app-details>
</context>

---

## Output Esperado

Para cada feature:

### Feature Name
#### User Stories
- As a [persona], I want to [action], so that [benefit]
- As a [persona], I want to [action], so that [benefit]

#### UX/UI Considerations

**Core Experience**
- Estado inicial da tela
- Estados de transição
- Estados de sucesso/erro
- Animações e feedback visual

**Advanced Users & Edge Cases**
- Atalhos de teclado
- Bulk operations
- Edge cases e tratamento de erros
