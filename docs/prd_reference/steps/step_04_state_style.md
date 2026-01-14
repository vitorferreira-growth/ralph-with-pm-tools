# Step 4 - State & Style

## Objetivo
Definir o design system completo (Part 1) e os estados de cada tela/feature (Part 2).

---

## Part 1: Style Guide

### Prompt

<goal>
You are an industry-veteran SaaS product designer. You've built high-touch UIs for FANG-style companies.

Your goal is to take the context below, the guidelines, and the user inspiration, and turn it into a functional UX/UI style-guide
</goal>

<inspirations>
The attached images serve as the user's inspiration (if any). You don't need to take it literally in any way, but let it serve as an understanding of what the user likes aesthetically
</inspirations>

<guidelines>
<aesthetics>
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
</aesthetics>
</guidelines>

<context>
<app-overview>
{elevator_pitch_and_target_audience}
</app-overview>

<task>
Your goal here is to think like a designer and build a "style guide" for the app as a whole. Take into account the following:

- Primary colors
- Secondary colors
- Accent colors
- Functional colors
- Background colors
- Font families
- Font weights
- Font styles
- Button styling
- Card styling
- Input styling
- Icons
- App spacing
- Motion & animation
</task>
</context>

### Output Format - Part 1

```markdown
## Color Palette

### Primary Colors
* **Primary White** - `#F8F9FA` (Used for backgrounds and clean surfaces)
* **Primary Dark** - `#0A5F55` (Primary brand color for buttons, icons, and emphasis)

### Secondary Colors
* **Secondary Light** - `#4CAF94` (For hover states and secondary elements)
* **Secondary Pale** - `#E6F4F1` (For backgrounds, selected states, and highlights)

### Accent Colors
* **Accent Teal** - `#00BFA5` (For important actions and notifications)
* **Accent Yellow** - `#FFD54F` (For warnings and highlights)

### Functional Colors
* **Success Green** - `#43A047` (For success states and confirmations)
* **Error Red** - `#E53935` (For errors and destructive actions)
* **Neutral Gray** - `#9E9E9E` (For secondary text and disabled states)
* **Dark Gray** - `#424242` (For primary text)

### Background Colors
* **Background White** - `#FFFFFF` (Pure white for cards and content areas)
* **Background Light** - `#F5F7F9` (Subtle off-white for app background)
* **Background Dark** - `#263238` (For dark mode primary background)

## Typography

### Font Family
* **Primary Font**: Inter / SF Pro Text
* **Monospace Font**: JetBrains Mono

### Font Weights
* **Regular**: 400
* **Medium**: 500
* **Semibold**: 600
* **Bold**: 700

### Text Styles
#### Headings
* **H1**: 28px/32px, Bold
* **H2**: 24px/28px, Bold
* **H3**: 20px/24px, Semibold

#### Body Text
* **Body Large**: 17px/24px, Regular
* **Body**: 15px/20px, Regular
* **Body Small**: 13px/18px, Regular

## Component Styling

### Buttons
* **Primary Button**: Brand color background, white text, 8dp radius
* **Secondary Button**: Outlined, brand color border
* **Text Button**: No background, brand color text

### Cards
* Background: White
* Shadow: Y-offset 2dp, Blur 8dp, Opacity 8%
* Corner Radius: 12dp
* Padding: 16dp

### Input Fields
* Height: 56dp
* Corner Radius: 8dp
* Border: 1dp neutral gray
* Active Border: 2dp primary color

## Spacing System
* **4dp** - Micro spacing
* **8dp** - Small spacing
* **16dp** - Default spacing
* **24dp** - Medium spacing
* **32dp** - Large spacing
* **48dp** - Extra large spacing

## Motion & Animation
* **Standard Transition**: 200ms, Ease-out
* **Emphasis Transition**: 300ms, Spring
* **Microinteractions**: 150ms, Ease-in-out
* **Page Transitions**: 350ms, Custom bezier

## Dark Mode Variants
* **Dark Background**: `#121212`
* **Dark Surface**: `#1E1E1E`
* **Dark Text Primary**: `#EEEEEE`
* **Dark Text Secondary**: `#B0BEC5`
```

---

## Part 2: Screen States

### Prompt

<goal>
You are an industry-veteran SaaS product designer. You've built high-touch UIs for FANG-style companies.

Your goal is to take the context below, the guidelines, the practicalities, the style guide, and the user inspiration, and turn it into a "State" Brief, or snapshots of different features at different points in time in the user's journey
</goal>

<guidelines>
<aesthetics>
{same_aesthetics_as_part_1}
</aesthetics>
</guidelines>

<context>
<app-overview>
{elevator_pitch_and_target_audience}
</app-overview>

<task>
Your goal here is to go feature-by-feature and think like a designer. Consider:

- **User goals and tasks** - What users need to accomplish
- **Information architecture** - Organizing content logically
- **Progressive disclosure** - Revealing complexity gradually
- **Visual hierarchy** - Guiding attention to important elements
- **Affordances and signifiers** - Making interactive elements identifiable
- **Consistency** - Uniform patterns across screens
- **Accessibility** - Works for users of all abilities
- **Error prevention** - Helping users avoid mistakes
- **Feedback** - Clear signals for success/failure
- **Performance considerations** - Loading states
- **Mobile vs. desktop** - Adapting for devices
- **Responsive design** - Various screen sizes
- **Animations** - Professional yet subtle transitions
</task>

<feature-list>
{features_from_step_3}
</feature-list>

<style-guide>
{style_guide_from_part_1}
</style-guide>
</context>

### Output Format - Part 2

```markdown
## Feature Name
### Screen X
#### Screen X State N
* Description of UI elements
* Layout and positioning
* Colors from style guide
* Typography choices
* Animations and transitions
* Loading states
* Error states
* Success states

#### Screen X State N+1
* Next state description
* Transition from previous state
* User feedback elements
```
