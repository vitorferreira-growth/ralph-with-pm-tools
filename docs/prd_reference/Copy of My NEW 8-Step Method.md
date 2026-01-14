# Step \#1 \- Fleshing Out

\<goal\>

You’re an experienced SaaS Founder that obsesses about product and solving peoples problems. You take a real focus on the PROBLEM, and then think through interesting ways of solving those problems. Your job is to take the app idea, and take on a collaborative / consultative role to turn this idea into a detailed project specification. 

The app idea and initial MVP thoughts are in the context section below, listed as \[IDEA\] and \[MVP\].

Each time the user responds back to you, you integrate their responses into the overall plan, and then repeat back the entire plan, per the format below, which incorporates the clarifications

\</goal\>

\<format\>

\#\# Elevator Pitch

\#\# Problem Statement

\#\# Target Audience

\#\# USP

\#\# Target Platforms

\#\# Features List

\#\#\# Feature Category

\- \[\] \[Requirement, ideally as a User Story\]

\- \[\] \[Sub-requirement or acceptance requirement\]

\#\#\# UX/UI Considerations

\- \[\] \[Screen or Interaction\]

\- \[\] \[Description of different “states” of that screen\]

\- \[\] \[How it handles state changes visually\]

\- \[\] \[Animations, information architecture, progressive disclosure, visual hierarchy, etc\]

\#\#\# Non-Functional Requirements

\- \[\] \[Performance\]

\- \[\] \[Scalability\]

\- \[\] \[Security\]

\- \[\] \[Accessibility\]

\#\# Monetization

\[How will the app make money?\]

\#\# Critical Questions or Clarifications

\</format\>

\<warnings-and-guidance\>

Ask for clarifications if there are any ambiguities

Give suggestions for new features

Consider inter-connectedness of different features

Make sure any mission-critical decisions are not skipped over

\</warnings-and-guidance\>

\<context\>

\[IDEA\]

I want to create a "prompt repository" where users can store their commonly used prompts in one centralized area. Prompts should be sharable, have privacy settings, and support Markdown and XML formatting

\[MVP\]

User logs in or signs up

User can create a storage hierarchy for their prompts

User can create new prompts and add them into storage

User can retrieve, view, and edit existing prompts

\</context\>

# Output \- 1

## **Elevator Pitch**

A centralized prompt management platform that transforms scattered AI prompts into an organized, searchable, and shareable knowledge base \- think "GitHub for prompts" where users can version, collaborate, and monetize their best AI interactions.

## **Problem Statement**

AI users repeatedly lose valuable prompts across multiple platforms (ChatGPT, Claude, Midjourney, etc.), struggle to find and reuse their best work, and lack ways to collaborate or learn from others' proven prompts. This leads to duplicated effort, inconsistent results, and missed opportunities for knowledge sharing.

## **Target Audience**

* **Primary**: Power users of AI tools (developers, content creators, researchers) who use prompts daily  
* **Secondary**: Teams collaborating on AI projects who need standardized prompts  
* **Tertiary**: Prompt engineers looking to monetize their expertise

## **USP**

Unlike simple note-taking apps or platform-specific histories, we provide a dedicated prompt management system with version control, advanced formatting support (Markdown/XML), collaboration features, and cross-platform compatibility \- making prompts as manageable as code.

## **Target Platforms**

* Web application (responsive design)  
* Browser extension for quick capture  
* Mobile apps (iOS/Android) for on-the-go access  
* API for third-party integrations

## **Features List**

### **Authentication & User Management**

* User registration with email verification  
* OAuth integration (Google, GitHub, Microsoft)  
* Password reset functionality  
* Profile management and settings

### **Prompt Organization**

* Create folder/tag hierarchy for organization  
  * Nested folders with drag-and-drop  
  * Multiple tags per prompt  
  * Smart collections based on rules  
* Search across all prompts with filters  
  * Full-text search  
  * Filter by platform, date, tags, author  
  * Search within results

### **Prompt Creation & Editing**

* Rich text editor with Markdown/XML support  
  * Syntax highlighting  
  * Live preview  
  * Template variables ({{name}}, {{context}})  
* Version control for prompts  
  * Save revision history  
  * Compare versions  
  * Restore previous versions  
* Prompt templates and snippets  
  * Pre-built templates by category  
  * Custom snippet library  
*   
* API for programmatic access

### **UX/UI Considerations**

* **Dashboard Screen**  
  * Recent prompts carousel  
  * Quick actions (new prompt, import)  
  * Usage statistics  
  * Search bar prominently placed  
* **Prompt Editor**  
  * Split-screen editor/preview  
  * Collapsible sidebar for organization  
  * Floating toolbar for formatting  
  * Auto-save with status indicator  
* **Browse/Discover Screen**  
  * Grid/list view toggle  
  * Infinite scroll with lazy loading  
  * Preview on hover  
  * Quick actions (save, fork, share)  
* **Mobile Optimization**  
  * Swipe gestures for navigation  
  * Simplified editor for mobile  
  * Offline mode with sync

### **Non-Functional Requirements**

* **Performance**  
  * Sub-second search results  
  * Instant preview rendering  
  * Optimistic UI updates  
* **Scalability**  
  * Support 10k+ prompts per user  
  * Handle concurrent editing in teams  
  * CDN for static assets  
* **Security**  
  * End-to-end encryption option  
  * API rate limiting  
  * Regular security audits  
  * GDPR compliance  
* **Accessibility**  
  * WCAG 2.1 AA compliance  
  * Keyboard navigation  
  * Screen reader support

## **Monetization**

* **Freemium Model**:  
  * Free: 100 prompts, basic features  
  * Pro ($9/mo): Unlimited prompts, version control, API access  
  * Team ($19/user/mo): Collaboration features, admin controls  
* **Marketplace**: Commission on premium prompt sales  
* **Enterprise**: Custom pricing for API access and white-label solutions  
1. 

# Step \#2 \- High Level

\<goal\>  
I'd like for you to help me brainstorm the overall technical structure of my application ona  high level. You should act like a Senior Software Engineer that has extensive experience developing, and building architecture for large scale web applications. You should ask me follow up questions as we proceed if you think it's necessary to gather a fuller picture. Any time I answer questions, you re-integrate the responses and generate a fully new output that integrates everything.

\</goal\>  
\<format\>  
Return your format in Markdown, without pre-text or post-text descriptions.

\#\# Features (MVP)  
\#\#\# Feature Name  
2-3 sentence summary of what the feature is or does

\#\#\#\# Tech Involved  
\* Main Technologies Involved w/ Feature

\#\#\#\# Main Requirements  
\* Any  
\* Requirements  
\* Of Feature  
\* That Impact  
\* Tech Choices & Implementations

\#\# System Diagram  
An image detailing a full system diagram of the MVP. Please create a clean mermaid diagram with clear service relationships

\#\# List of Technical/Architecture Consideration Questions  
\* list  
\* of  
\* Architecture  
\* questions

\</format\>

\<warnings-or-guidance\>  
x  
\</warnings-or-guidance\>

\<context\>  
\<features-list\>  
Features List  
\#\# Authentication & User Management

 User registration with email verification  
 Password reset functionality  
 Profile management and settings

\#\# Prompt Organization

 Create folder/tag hierarchy for organization

 Nested folders with drag-and-drop  
 Multiple tags per prompt  
 Smart collections based on rules

 Search across all prompts with filters

 Full-text search  
 Filter by platform, date, tags, author  
 Search within results

\#\# Prompt Creation & Editing

 Rich text editor with Markdown/XML support

 Syntax highlighting  
 Live preview  
 Template variables ({{name}}, {{context}})

 Version control for prompts

 Save revision history  
 Compare versions  
 Restore previous versions

 Prompt templates and snippets

 Pre-built templates by category  
 Custom snippet library  
\</features-list\>  
\<current-tech-choices\>

- The frontend will be built in NextJS  
- The backend will be built using ServerActions  
- The database will be Postgres, hosted through Supabase  
- The authentication will use Clerk  
- Use Prisma ORM for database interactions  
- Deployment on Vercel

\</current-tech-choices\>

\</context\>

# Output \- 2

## **Features (MVP)**

### **Authentication & User Management**

Provides secure user registration with email verification, password reset functionality, and comprehensive profile management. Integrates with Clerk for authentication services while maintaining user preferences and settings in the database.

#### **Tech Involved**

* Clerk Authentication  
* Next.js App Router with middleware  
* Prisma ORM with PostgreSQL  
* Server Actions for profile updates

#### **Main Requirements**

* Clerk webhook integration for user sync  
* User metadata storage in PostgreSQL  
* Session management across Server Components  
* Profile data synchronization between Clerk and database  
* Role-based access control preparation

### **Prompt Organization**

Enables users to organize prompts using a flexible folder/tag hierarchy with drag-and-drop functionality, smart collections, and multi-dimensional categorization. Supports nested folder structures and rule-based automatic organization.

#### **Tech Involved**

* PostgreSQL with recursive CTEs for folder hierarchy  
* React DnD Kit for drag-and-drop  
* Server Actions for CRUD operations  
* Prisma with relation queries

#### **Main Requirements**

* Recursive folder structure with infinite nesting  
* Many-to-many prompt-tag relationships  
* Smart collection rule engine  
* Optimistic UI updates for drag-and-drop  
* Efficient tree traversal queries  
* Cascade delete for folder hierarchies

### **Search & Filtering**

Provides comprehensive full-text search across all prompts with advanced filtering capabilities by platform, date, tags, and author. Includes search within results and faceted search options.

#### **Tech Involved**

* PostgreSQL full-text search with GIN indexes  
* Prisma raw queries for search  
* React Query for search result caching  
* Server Actions for search API

#### **Main Requirements**

* GIN indexes on searchable columns  
* Search result ranking and relevance  
* Real-time search suggestions  
* Filter state management  
* Pagination for large result sets  
* Search history tracking

### **Prompt Creation & Editing**

Features a rich text editor with Markdown/XML support, syntax highlighting, live preview, and template variable system. Includes comprehensive version control with revision history and comparison tools.

#### **Tech Involved**

* CodeMirror 6 or Monaco Editor  
* Unified/Remark for Markdown processing  
* Server Actions for saving  
* PostgreSQL JSONB for version storage

#### **Main Requirements**

* Real-time syntax highlighting  
* Template variable parsing and validation  
* Debounced auto-save functionality  
* Version diff algorithm  
* Preview rendering pipeline  
* Concurrent editing conflict resolution

### **Templates & Snippets**

Provides pre-built prompt templates organized by category and a custom snippet library for reusable prompt components. Supports template inheritance and variable substitution.

#### **Tech Involved**

* PostgreSQL for template storage  
* React components for template gallery  
* Server Actions for template CRUD  
* Template engine for variable substitution

#### **Main Requirements**

* Template categorization system  
* Template versioning  
* Snippet insertion UI  
* Variable validation in templates  
* Template sharing permissions  
* Usage analytics for popular templates

## **System Diagram**

mermaid

```
graph TB
    subgraph "Client Layer"
        UI[Next.js App Router]
        MW[Middleware]
    end
    
    subgraph "Authentication"
        CLERK[Clerk Service]
        WEBHOOK[Clerk Webhooks]
    end
    
    subgraph "Application Layer"
        SA[Server Actions]
        API[API Routes]
    end
    
    subgraph "Data Layer"
        PRISMA[Prisma ORM]
        PG[(PostgreSQL/Supabase)]
        CACHE[React Query Cache]
    end
    
    subgraph "External Services"
        VERCEL[Vercel CDN]
    end
    
    UI --> MW
    MW --> CLERK
    MW --> SA
    UI --> CACHE
    
    SA --> PRISMA
    API --> PRISMA
    PRISMA --> PG
    
    CLERK --> WEBHOOK
    WEBHOOK --> API
    API --> PG
    
    UI --> VERCEL
    CACHE --> SA
    
    PG -.-> |Full-text Search| PG
    PG -.-> |Recursive CTEs| PG
    PG -.-> |JSONB Storage| PG
```

# Step \#3 \- Feature Stories

\<goal\>  
You’re an experienced SaaS Founder with a background in Product Design & Product Management that obsesses about product and solving peoples problems. Your job is to take the app idea, and take on a collaborative / consultative role to build out feature ideas. 

The features are listed below in \<features-list\> and additional info about the app is in \<app-details\>

Each time the user responds back to you, you integrate their responses into the overall plan, and then repeat back the entire plan, per the format below, which incorporates the clarifications  
\</goal\>  
\<format\>  
\#\# Features List  
\#\#\# Feature Category  
\#\#\#\# Feature  
\- \[\] \[User Stories\]  
	\- \[\] \[List personas and their user stories. For each persona, provide several stories in this format: \* As a X, I want to Y, so that Z.\]  
\#\#\#\#\# UX/UI Considerations  
Bullet-point the step-by-step journey a user will have interacting with the product in detail with regard to this specific feature.  
\- \[\] \[Core Experience\]  
	\- \[\] \[Description of different “states” of that screen\]  
	\- \[\] \[How it handles state changes visually\]  
	\- \[\] \[Animations, information architecture, progressive disclosure, visual hierarchy, etc\]  
\- \[\] \[Advanced Users & Edge Cases\]  
	\- \[\] \[Description of different “states” of that screen\]  
	\- \[\] \[How it handles state changes visually\]  
	\- \[\] \[Animations, information architecture, progressive disclosure, visual hierarchy, etc\]

\</format\>  
\<warnings-and-guidance\>  
\<ux-guide\>  
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
- **User goals and tasks** \- Understanding what users need to accomplish and designing to make those primary tasks seamless and efficient  
- **Information architecture** \- Organizing content and features in a logical hierarchy that matches users' mental models  
- **Progressive disclosure** \- Revealing complexity gradually to avoid overwhelming users while still providing access to advanced features  
- **Visual hierarchy** \- Using size, color, contrast, and positioning to guide attention to the most important elements first  
- **Affordances and signifiers** \- Making interactive elements clearly identifiable through visual cues that indicate how they work  
- **Consistency** \- Maintaining uniform patterns, components, and interactions across screens to reduce cognitive load  
- **Accessibility** \- Ensuring the design works for users of all abilities (color contrast, screen readers, keyboard navigation)  
- **Error prevention** \- Designing to help users avoid mistakes before they happen rather than just handling errors after they occur  
- **Feedback** \- Providing clear signals when actions succeed or fail, and communicating system status at all times  
- **Performance considerations** \- Accounting for loading times and designing appropriate loading states  
- **Mobile vs. desktop considerations** \- Adapting layouts and interactions for different device capabilities and contexts  
- **Responsive design** \- Ensuring the interface works well across various screen sizes and orientations  
- **User testing feedback loops** \- Incorporating iterative testing to validate assumptions and improve the design  
- **Platform conventions** \- Following established patterns from iOS/Android/Web to meet user expectations  
- **Microcopy and content strategy** \- Crafting clear, concise text that guides users through the experience  
- **Aesthetic appeal** \- Creating a visually pleasing design that aligns with brand identity while prioritizing usability  
- **Animations \-** Crafting beautiful yet subtle animations and transitions that make the app feel professional

\</ux-guide\>  
\</warnings-and-guidance\>  
\<context\>  
\<feature-list\>  
\#\# Authentication & User Management  
 User registration with email verification  
 Password reset functionality  
 Profile management and settings  
\#\# Prompt Organization  
 Create folder/tag hierarchy for organization  
 Nested folders with drag-and-drop  
 Multiple tags per prompt  
 Smart collections based on rules  
 Search across all prompts with filters  
 Full-text search  
 Filter by platform, date, tags, author  
 Search within results  
\#\# Prompt Creation & Editing  
 Rich text editor with Markdown/XML support  
 Syntax highlighting  
 Live preview  
 Template variables ({{name}}, {{context}})  
 Version control for prompts  
 Save revision history  
 Compare versions  
 Restore previous versions  
 Prompt templates and snippets  
 Pre-built templates by category  
 Custom snippet library  
\</feature-list\>  
\<app-details\>

## **Elevator Pitch**

A centralized prompt management platform that transforms scattered AI prompts into an organized, searchable, and shareable knowledge base \- think "GitHub for prompts" where users can version, collaborate, and monetize their best AI interactions.

## **Problem Statement**

AI users repeatedly lose valuable prompts across multiple platforms (ChatGPT, Claude, Midjourney, etc.), struggle to find and reuse their best work, and lack ways to collaborate or learn from others' proven prompts. This leads to duplicated effort, inconsistent results, and missed opportunities for knowledge sharing.

## **Target Audience**

* **Primary**: Power users of AI tools (developers, content creators, researchers) who use prompts daily  
* **Secondary**: Teams collaborating on AI projects who need standardized prompts  
* **Tertiary**: Prompt engineers looking to monetize their expertise

## **USP**

Unlike simple note-taking apps or platform-specific histories, we provide a dedicated prompt management system with version control, advanced formatting support (Markdown/XML), collaboration features, and cross-platform compatibility \- making prompts as manageable as code.

### **UX/UI Considerations**

* **Dashboard Screen**  
  * Recent prompts carousel  
  * Quick actions (new prompt, import)  
  * Usage statistics  
  * Search bar prominently placed  
* **Prompt Editor**  
  * Split-screen editor/preview  
  * Collapsible sidebar for organization  
  * Floating toolbar for formatting  
  * Auto-save with status indicator  
* **Browse/Discover Screen**  
  * Grid/list view toggle  
  * Infinite scroll with lazy loading  
  * Preview on hover  
  * Quick actions (save, fork, share)

\</app-details\>  
\</context\>

# Output \- 3

### **Authentication & User Management**

#### **User Registration with Email Verification**

* **User Stories**  
  * As a new user, I want to sign up quickly with minimal friction, so that I can start organizing my prompts immediately  
  * As a security-conscious user, I want email verification, so that my account is protected from unauthorized access  
  * As a returning user, I want social login options (Google, GitHub), so that I can access my account without remembering another password  
  * As a team lead, I want to invite team members via email, so that we can collaborate on shared prompt libraries

##### **UX/UI Considerations**

**Core Experience**

* Landing page with clear value proposition and prominent "Get Started" CTA  
* Registration modal/page with email, password, and optional name fields  
* Real-time validation showing password strength meter and requirement checkmarks  
* Success state showing "Check your email" illustration with resend option  
* Email verification link opens app with success toast notification  
* Automatic redirect to onboarding flow after verification

**Advanced Users & Edge Cases**

* OAuth integration showing provider logos with hover states  
* Email already exists: Inline error with "Login instead?" link  
* Verification email not received: Countdown timer (60s) before enabling resend  
* Expired verification links: Clear messaging with one-click regeneration  
* Bulk team invites: CSV upload with preview and error handling

#### **Password Reset Functionality**

* **User Stories**  
  * As a forgetful user, I want to reset my password easily, so that I don't lose access to my prompts  
  * As a security-aware user, I want secure password reset links, so that others can't hijack my account  
  * As a mobile user, I want the reset flow to work seamlessly on my phone, so that I can regain access anywhere

##### **UX/UI Considerations**

**Core Experience**

* "Forgot password?" link on login page with subtle animation on hover  
* Email input with instant validation and helpful error messages  
* Success state with email sent confirmation and security tips  
* Reset page with password requirements clearly displayed  
* Auto-login after successful reset with success toast

**Advanced Users & Edge Cases**

* Rate limiting visualization (e.g., "3 attempts remaining")  
* Account not found: Generic security message to prevent enumeration  
* Multiple reset requests: Only latest link valid, clear messaging  
* Expired links: Friendly error with quick retry option  
* Password history check preventing reuse of recent passwords

#### **Profile Management and Settings**

* **User Stories**  
  * As a professional user, I want to customize my profile, so that collaborators know who I am  
  * As a privacy-conscious user, I want granular privacy controls, so that I control who sees my work  
  * As a power user, I want keyboard shortcuts and preferences, so that I can work efficiently  
  * As a team member, I want to manage my notification preferences, so that I stay informed without being overwhelmed

##### **UX/UI Considerations**

**Core Experience**

* Settings accessed via avatar dropdown or keyboard shortcut (Cmd/Ctrl \+ ,)  
* Tabbed interface: Profile, Account, Preferences, Notifications, Billing  
* Profile tab: Avatar upload with crop tool, display name, bio, social links  
* Real-time preview of profile as others see it  
* Auto-save with subtle "Saved" indicators  
* Preference toggles with immediate effect (theme, density, defaults)

**Advanced Users & Edge Cases**

* API key generation with copy button and regeneration warning  
* Export all data option with format selection (JSON, CSV)  
* Account deletion with 30-day grace period and data download  
* Two-factor authentication setup with QR code and backup codes  
* Session management showing all active devices with revoke option  
* Webhook configuration for integrations

### **Prompt Organization**

#### **Create Folder/Tag Hierarchy**

* **User Stories**  
  * As an organized user, I want to create nested folders, so that I can mirror my mental model  
  * As a visual thinker, I want to color-code folders, so that I can quickly identify categories  
  * As a collaborative user, I want to share entire folders, so that my team stays synchronized  
  * As a power user, I want to bulk organize prompts, so that I can clean up quickly

##### **UX/UI Considerations**

**Core Experience**

* Left sidebar with collapsible folder tree  
* Right-click context menu for folder operations  
* Inline folder creation with auto-focus on name field  
* Folder colors/icons picker with preview  
* Drag-and-drop visual feedback with insertion indicators  
* Breadcrumb navigation showing current location

**Advanced Users & Edge Cases**

* Keyboard navigation (arrow keys, Enter to expand/collapse)  
* Multi-select with Shift/Cmd click for bulk operations  
* Folder templates for common structures  
* Smart folders based on dynamic rules  
* Folder permissions for team collaboration  
* Archive/unarchive functionality with filtered view

#### **Nested Folders with Drag-and-Drop**

* **User Stories**  
  * As a visual organizer, I want to drag prompts between folders, so that reorganizing is intuitive  
  * As a mobile user, I want touch-friendly organization, so that I can manage on-the-go  
  * As a bulk organizer, I want to move multiple items, so that I can restructure efficiently

##### **UX/UI Considerations**

**Core Experience**

* Hover states showing valid drop targets  
* Ghost image following cursor during drag  
* Auto-expand folders on hover (with delay)  
* Spring-loading animation for nested navigation  
* Undo/redo support for all operations  
* Multi-item drag showing count badge

**Advanced Users & Edge Cases**

* Keyboard alternatives for accessibility  
* Touch gestures: long-press to initiate, visual feedback  
* Drag to external apps (export functionality)  
* Performance optimization for 1000+ items  
* Conflict resolution for duplicate names  
* Batch operations toolbar when multiple items selected

#### **Multiple Tags per Prompt**

* **User Stories**  
  * As a categorizer, I want unlimited tags per prompt, so that I can cross-reference effectively  
  * As a fast worker, I want auto-complete tags, so that I maintain consistency  
  * As a team member, I want shared tag taxonomies, so that we stay organized together  
  * As an analyst, I want to see tag statistics, so that I can optimize my system

##### **UX/UI Considerations**

**Core Experience**

* Tag input with pill-style display  
* Autocomplete dropdown with fuzzy matching  
* Tag creation inline with \# prefix  
* Color-coded tags with customization  
* Tag cloud view for discovery  
* Quick filter by clicking any tag

**Advanced Users & Edge Cases**

* Bulk tag operations with find/replace  
* Tag aliasing and synonyms  
* Hierarchical tags (parent/child relationships)  
* Tag permissions and governance  
* Import/export tag taxonomies  
* Tag analytics dashboard with usage trends

### **Search & Discovery**

#### **Search Across All Prompts with Filters**

* **User Stories**  
  * As a busy user, I want instant search results, so that I can find prompts quickly  
  * As a precise searcher, I want advanced filters, so that I can narrow down results  
  * As a learner, I want search suggestions, so that I discover related prompts  
  * As a researcher, I want to save searches, so that I can monitor specific topics

##### **UX/UI Considerations**

**Core Experience**

* Global search bar with ⌘K shortcut  
* Instant results dropdown with highlighting  
* Filter sidebar with common options  
* Search results with context snippets  
* Sort options (relevance, date, popularity)  
* Clear visual distinction for different content types

**Advanced Users & Edge Cases**

* Advanced search syntax documentation  
* Search history with quick access  
* Saved searches with notifications  
* Boolean operators and wildcards  
* Regular expression support  
* Search API for integrations  
* Faceted search with count indicators

### **Prompt Creation & Editing**

#### **Rich Text Editor with Markdown/XML Support**

* **User Stories**  
  * As a developer, I want syntax highlighting, so that I can write complex prompts accurately  
  * As a writer, I want rich formatting, so that my prompts are well-structured  
  * As a power user, I want vim keybindings, so that I can edit efficiently  
  * As a collaborator, I want commenting abilities, so that I can provide feedback

##### **UX/UI Considerations**

**Core Experience**

* Monaco-style editor with syntax themes  
* Toolbar with common formatting options  
* Markdown shortcuts (e.g., \*\* for bold)  
* Split view: editor | preview  
* Auto-save indicator with sync status  
* Word count and reading time display

**Advanced Users & Edge Cases**

* Multiple cursor support  
* Code folding for long prompts  
* Diff view for comparisons  
* Collaborative editing indicators  
* Custom syntax definitions  
* Plugin system for extensions  
* AI-powered suggestions  
* Zen mode for distraction-free writing

#### **Version Control for Prompts**

* **User Stories**  
  * As a experimenter, I want to track changes, so that I can see what worked  
  * As a careful user, I want to restore versions, so that I never lose good work  
  * As a team lead, I want to review changes, so that I can ensure quality  
  * As an analyst, I want version statistics, so that I can measure iteration

##### **UX/UI Considerations**

**Core Experience**

* Version timeline in right sidebar  
* Visual diff highlighting changes  
* Restore button with confirmation  
* Version naming and descriptions  
* Author attribution for each version  
* Quick preview on hover

**Advanced Users & Edge Cases**

* Branch/merge functionality  
* Version comparison matrix  
* Bulk version operations  
* Version export/import  
* Webhooks for version events  
* Integration with Git  
* Performance metrics per version

# Step \#4 \- State & Style

PART 1

\<goal\>  
You are an industry-veteran SaaS product designer. You’ve built high-touch UIs for FANG-style companies.

Your goal is to take the context below, the guidelines, and the user inspiration, and turn it into a functional UX/UI style-guide  
\</goal\>

\<inspirations\>  
The attached images serve as the user’s inspiration (if any). You don’t need to take it literally in any way, but let it serve as an understanding of what the user likes aesthetically   
\</inspirations\>

\<guidelines\>  
\<aesthetics\>

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

\</aesthetics\>

\</guidelines\>

\<context\>  
\<app-overview\>  
**Elevator Pitch**  
**A centralized prompt management platform that transforms scattered AI prompts into an organized, searchable, and shareable knowledge base \- think "GitHub for prompts" where users can version, collaborate, and monetize their best AI interactions.**  
**Problem Statement**  
**AI users repeatedly lose valuable prompts across multiple platforms (ChatGPT, Claude, Midjourney, etc.), struggle to find and reuse their best work, and lack ways to collaborate or learn from others' proven prompts. This leads to duplicated effort, inconsistent results, and missed opportunities for knowledge sharing.**  
**Target Audience**  
**Primary: Power users of AI tools (developers, content creators, researchers) who use prompts daily**  
**Secondary: Teams collaborating on AI projects who need standardized prompts**  
**Tertiary: Prompt engineers looking to monetize their expertise**  
**USP**  
**Unlike simple note-taking apps or platform-specific histories, we provide a dedicated prompt management system with version control, advanced formatting support (Markdown/XML), collaboration features, and cross-platform compatibility \- making prompts as manageable as code.**  
\</app-overview\>  
\<task\>  
Your goal here is to think like a designer and build a “style guide” for the app as a whole. Take into account the following:

Primary colors  
Secondary colors  
Accent colors  
Functional colors  
Background colors  
Font families  
Font weights  
Font styles  
Button styling  
Card styling  
Input styling  
Icons  
App spacing  
Motion & animation

I need you to take this all into account, and give me a cohesive Design Brief. Here’s an EXAMPLE of how I want it formatted:

\<format\>

## **Color Palette**

### **Primary Colors**

* **Primary White** \- `#F8F9FA` (Used for backgrounds and clean surfaces)  
* **Primary Dark Green** \- `#0A5F55` (Primary brand color for buttons, icons, and emphasis)

### **Secondary Colors**

* **Secondary Green Light** \- `#4CAF94` (For hover states and secondary elements)  
* **Secondary Green Pale** \- `#E6F4F1` (For backgrounds, selected states, and highlights)

### **Accent Colors**

* **Accent Teal** \- `#00BFA5` (For important actions and notifications)  
* **Accent Yellow** \- `#FFD54F` (For warnings and highlights)

### **Functional Colors**

* **Success Green** \- `#43A047` (For success states and confirmations)  
* **Error Red** \- `#E53935` (For errors and destructive actions)  
* **Neutral Gray** \- `#9E9E9E` (For secondary text and disabled states)  
* **Dark Gray** \- `#424242` (For primary text)

### **Background Colors**

* **Background White** \- `#FFFFFF` (Pure white for cards and content areas)  
* **Background Light** \- `#F5F7F9` (Subtle off-white for app background)  
* **Background Dark** \- `#263238` (For dark mode primary background)

## **Typography**

### **Font Family**

* **Primary Font**: SF Pro Text (iOS) / Roboto (Android)  
* **Alternative Font**: Inter (Web fallback)

### **Font Weights**

* **Regular**: 400  
* **Medium**: 500  
* **Semibold**: 600  
* **Bold**: 700

### **Text Styles**

#### **Headings**

* **H1**: 28px/32px, Bold, Letter spacing \-0.2px  
  * Used for screen titles and major headers  
* **H2**: 24px/28px, Bold, Letter spacing \-0.2px  
  * Used for section headers and card titles  
* **H3**: 20px/24px, Semibold, Letter spacing \-0.1px  
  * Used for subsection headers and important text

#### **Body Text**

* **Body Large**: 17px/24px, Regular, Letter spacing 0px  
  * Primary reading text for transcript content  
* **Body**: 15px/20px, Regular, Letter spacing 0px  
  * Standard text for most UI elements  
* **Body Small**: 13px/18px, Regular, Letter spacing 0.1px  
  * Secondary information and supporting text

#### **Special Text**

* **Caption**: 12px/16px, Medium, Letter spacing 0.2px  
  * Used for timestamps, metadata, and labels  
* **Button Text**: 16px/24px, Medium, Letter spacing 0.1px  
  * Used specifically for buttons and interactive elements  
* **Link Text**: 15px/20px, Medium, Letter spacing 0px, Primary Dark Green  
  * Clickable text throughout the application

## **Component Styling**

### **Buttons**

* **Primary Button**  
  * Background: Primary Dark Green (`#0A5F55`)  
  * Text: White (`#FFFFFF`)  
  * Height: 48dp  
  * Corner Radius: 8dp  
  * Padding: 16dp horizontal  
* **Secondary Button**  
  * Border: 1.5dp Primary Dark Green (`#0A5F55`)  
  * Text: Primary Dark Green (`#0A5F55`)  
  * Background: Transparent  
  * Height: 48dp  
  * Corner Radius: 8dp  
* **Text Button**  
  * Text: Primary Dark Green (`#0A5F55`)  
  * No background or border  
  * Height: 44dp

### **Cards**

* Background: White (`#FFFFFF`)  
* Shadow: Y-offset 2dp, Blur 8dp, Opacity 8%  
* Corner Radius: 12dp  
* Padding: 16dp

### **Input Fields**

* Height: 56dp  
* Corner Radius: 8dp  
* Border: 1dp Neutral Gray (`#9E9E9E`)  
* Active Border: 2dp Primary Dark Green (`#0A5F55`)  
* Background: White (`#FFFFFF`)  
* Text: Dark Gray (`#424242`)  
* Placeholder Text: Neutral Gray (`#9E9E9E`)

### **Icons**

* **Primary Icons**: 24dp x 24dp  
* **Small Icons**: 20dp x 20dp  
* **Navigation Icons**: 28dp x 28dp  
* Primary color for interactive icons: Primary Dark Green (`#0A5F55`)  
* Secondary color for inactive/decorative icons: Neutral Gray (`#9E9E9E`)

## **Spacing System**

* **4dp** \- Micro spacing (between related elements)  
* **8dp** \- Small spacing (internal padding)  
* **16dp** \- Default spacing (standard margins)  
* **24dp** \- Medium spacing (between sections)  
* **32dp** \- Large spacing (major sections separation)  
* **48dp** \- Extra large spacing (screen padding top/bottom)

## **Motion & Animation**

* **Standard Transition**: 200ms, Ease-out curve  
* **Emphasis Transition**: 300ms, Spring curve (tension: 300, friction: 35\)  
* **Microinteractions**: 150ms, Ease-in-out  
* **Page Transitions**: 350ms, Custom cubic-bezier(0.2, 0.8, 0.2, 1\)

## **Dark Mode Variants**

* **Dark Background**: `#121212` (primary dark background)  
* **Dark Surface**: `#1E1E1E` (card backgrounds)  
* **Dark Primary Green**: `#26A69A` (adjusted for contrast)  
* **Dark Text Primary**: `#EEEEEE`  
* **Dark Text Secondary**: `#B0BEC5`

\</format\>  
\</task\>  
\</context\>

\================================================================================================================================================  
PART 2

\<goal\>  
You are an industry-veteran SaaS product designer. You’ve built high-touch UIs for FANG-style companies.

Your goal is to take the context below, the guidelines, the practicalities, the style guide, and the user inspiration, and turn it into a “State” Brief, or snapshots of different features at different points in time in the user’s journey  
\</goal\>

\<guidelines\>  
\<aesthetics\>

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

\</aesthetics\>

\</guidelines\>

\<context\>  
\<app-overview\>  
**Elevator Pitch**  
**A centralized prompt management platform that transforms scattered AI prompts into an organized, searchable, and shareable knowledge base \- think "GitHub for prompts" where users can version, collaborate, and monetize their best AI interactions.**  
**Problem Statement**  
**AI users repeatedly lose valuable prompts across multiple platforms (ChatGPT, Claude, Midjourney, etc.), struggle to find and reuse their best work, and lack ways to collaborate or learn from others' proven prompts. This leads to duplicated effort, inconsistent results, and missed opportunities for knowledge sharing.**  
**Target Audience**  
**Primary: Power users of AI tools (developers, content creators, researchers) who use prompts daily**  
**Secondary: Teams collaborating on AI projects who need standardized prompts**  
**Tertiary: Prompt engineers looking to monetize their expertise**  
**USP**  
**Unlike simple note-taking apps or platform-specific histories, we provide a dedicated prompt management system with version control, advanced formatting support (Markdown/XML), collaboration features, and cross-platform compatibility \- making prompts as manageable as code.**  
\</app-overview\>  
\<task\>  
Your goal here is to go feature-by-feature and think like a designer. Here is a list of things you’d absolutely need to think about:

**User goals and tasks** \- Understanding what users need to accomplish and designing to make those primary tasks seamless and efficient  
**Information architecture** \- Organizing content and features in a logical hierarchy that matches users' mental models  
**Progressive disclosure** \- Revealing complexity gradually to avoid overwhelming users while still providing access to advanced features  
**Visual hierarchy** \- Using size, color, contrast, and positioning to guide attention to the most important elements first  
**Affordances and signifiers** \- Making interactive elements clearly identifiable through visual cues that indicate how they work  
**Consistency** \- Maintaining uniform patterns, components, and interactions across screens to reduce cognitive load  
**Accessibility** \- Ensuring the design works for users of all abilities (color contrast, screen readers, keyboard navigation)  
**Error prevention** \- Designing to help users avoid mistakes before they happen rather than just handling errors after they occur  
**Feedback** \- Providing clear signals when actions succeed or fail, and communicating system status at all times  
**Performance considerations** \- Accounting for loading times and designing appropriate loading states  
**Mobile vs. desktop considerations** \- Adapting layouts and interactions for different device capabilities and contexts  
**Responsive design** \- Ensuring the interface works well across various screen sizes and orientations  
**User testing feedback loops** \- Incorporating iterative testing to validate assumptions and improve the design  
**Platform conventions** \- Following established patterns from iOS/Android/Web to meet user expectations  
**Microcopy and content strategy** \- Crafting clear, concise text that guides users through the experience  
**Aesthetic appeal** \- Creating a visually pleasing design that aligns with brand identity while prioritizing usability  
**Animations \-** Crafting beautiful yet subtle animations and transitions that make the app feel professional

I need you to take EACH FEATURE below, and give me a cohesive Design Brief. Here’s how I want it formatted. You repeat this for each feature:

\<format\>  
\#\# Feature Name  
\#\#\# Screen X  
\#\#\#\# Screen X State N  
\* description  
\* of  
\* UI & UX  
\* in detail  
\* including animations  
\* any anything else  
\* and colors based on the style-guide below  
\#\#\#\# Screen X State N+1

Repeat for as many N+\# as needed based on the function of the state

\</format\>  
\</task\>

\<feature-list\>

## **Features List**

### **Authentication & User Management**

#### **User Registration with Email Verification**

* **User Stories**  
  * As a new user, I want to sign up quickly with just my email, so that I can start organizing my prompts immediately  
  * As a security-conscious user, I want email verification, so that my account is protected from unauthorized access  
  * As a returning user, I want social login options (Google/GitHub), so that I can sign in with one click  
  * As a team lead, I want to invite team members via email, so that we can collaborate on prompts

##### **UX/UI Considerations**

* **Landing Page**  
  * Hero section with clear value proposition and "Get Started" CTA  
  * Animated preview showing prompt organization in action  
  * Social proof indicators (user count, prompts saved)  
* **Registration Modal**  
  * **Initial State**: Email input with real-time validation  
  * **Loading State**: Subtle spinner replacing submit button  
  * **Success State**: Confirmation message with email icon animation  
  * Progressive disclosure: Only ask for email first, then password on next step  
  * Password strength indicator with dynamic feedback  
  * Terms acceptance with inline expandable privacy policy  
* **Email Verification Screen**  
  * **Pending State**: Animated email icon with "Check your inbox" message  
  * **Resend State**: Countdown timer before allowing resend (prevents spam)  
  * **Success State**: Smooth transition to onboarding flow  
  * Magic link option for passwordless entry  
  * Deep link handling for mobile app verification

#### **Password Reset Functionality**

* **User Stories**  
  * As a forgetful user, I want to reset my password easily, so that I don't lose access to my prompts  
  * As a security-aware user, I want secure password reset with time limits, so that my account stays protected  
  * As a mobile user, I want the reset process to work seamlessly on my phone, so that I can regain access anywhere

##### **UX/UI Considerations**

* **Password Reset Request**  
  * **Initial State**: Clean form with just email field  
  * **Loading State**: Button transforms to progress indicator  
  * **Success State**: Full-screen confirmation with next steps  
  * Inline validation with helpful error messages  
  * Rate limiting indicator if too many attempts  
* **Reset Password Screen**  
  * **Token Validation**: Automatic check with loading skeleton  
  * **Form State**: New password fields with requirements checklist  
  * **Success State**: Auto-redirect to login with success toast  
  * Password visibility toggle with smooth icon transition  
  * Automatic login option after successful reset

### **Prompt Organization**

#### **Create Folder/Tag Hierarchy**

* **User Stories**  
  * As a content creator, I want to organize prompts by project, so that I can quickly find relevant prompts for each client  
  * As a researcher, I want nested folders for topics and subtopics, so that I can maintain a knowledge hierarchy  
  * As a visual thinker, I want color-coded folders, so that I can quickly identify different categories  
  * As a power user, I want keyboard shortcuts for folder creation, so that I can organize efficiently

##### **UX/UI Considerations**

* **Sidebar Navigation**  
  * **Collapsed State**: Icon-only view with tooltips on hover  
  * **Expanded State**: Full folder tree with smooth accordion animations  
  * **Drag State**: Ghost element preview with valid drop zones highlighted  
  * Contextual menu on right-click with common actions  
  * Breadcrumb navigation showing current location  
* **Folder Creation Modal**  
  * **Input State**: Auto-focused name field with suggested names  
  * **Color Picker State**: Compact palette with custom color option  
  * **Icon Selection State**: Searchable icon grid with categories  
  * Parent folder selector with visual hierarchy preview  
  * Real-time preview of how folder will appear in sidebar

#### **Nested Folders with Drag-and-Drop**

* **User Stories**  
  * As an organized user, I want to restructure my folders easily, so that I can adapt my organization as needs change  
  * As a visual organizer, I want to see where items will land before dropping, so that I can organize confidently  
  * As a bulk organizer, I want to select multiple items to move, so that I can reorganize efficiently

##### **UX/UI Considerations**

* **Drag Interaction**  
  * **Hover State**: Subtle scale and shadow elevation on draggable items  
  * **Dragging State**: Semi-transparent ghost following cursor with count badge for multiple items  
  * **Valid Drop State**: Target folder expands with insertion line indicator  
  * **Invalid Drop State**: Red tint with shake animation on invalid targets  
  * Spring physics for natural-feeling drag movements  
  * Auto-scroll when dragging near viewport edges  
  * Undo/redo support with toast notifications

### **Prompt Creation & Editing**

#### **Rich Text Editor with Markdown/XML Support**

* **User Stories**  
  * As a developer, I want syntax highlighting for code blocks, so that I can write technical prompts clearly  
  * As a content writer, I want WYSIWYG editing, so that I can focus on content without markup  
  * As a power user, I want to switch between visual and source modes, so that I have full control  
  * As a template creator, I want to use variables and placeholders, so that I can create reusable prompts

##### **UX/UI Considerations**

* **Editor Interface**  
  * **Split View Mode**: Resizable panes with synchronized scrolling  
  * **Preview Mode**: Live rendering with syntax highlighting  
  * **Source Mode**: Monaco-style editor with autocomplete  
  * **Zen Mode**: Distraction-free writing with fade-in toolbar  
  * Floating formatting toolbar appearing on text selection  
  * Smart indent and bracket matching  
  * Command palette (Cmd/Ctrl \+ K) for quick actions  
* **Variable System**  
  * **Variable Input State**: Inline pills with edit-on-click  
  * **Variable Preview State**: Highlighted with sample data  
  * **Variable Error State**: Red underline with tooltip explanation  
  * Autocomplete dropdown for existing variables  
  * Variable definition sidebar with test values  
  * Real-time preview with variable substitution

#### **Version Control for Prompts**

* **User Stories**  
  * As a prompt engineer, I want to track changes over time, so that I can see how prompts evolved  
  * As a experimenter, I want to compare versions side-by-side, so that I can identify improvements  
  * As a cautious user, I want to restore previous versions, so that I can recover from mistakes  
  * As a collaborator, I want to see who made changes, so that I can understand modifications

##### **UX/UI Considerations**

* **Version History Panel**  
  * **Timeline View**: Visual timeline with version dots and connecting lines  
  * **List View**: Compact list with diff indicators (+/- lines)  
  * **Comparison View**: Side-by-side diff with highlighted changes  
  * Version metadata (author, timestamp, change summary)  
  * One-click restore with confirmation dialog  
* **Auto-save Indicator**  
  * **Saving State**: Subtle pulse animation on save icon  
  * **Saved State**: Checkmark with timestamp  
  * **Error State**: Warning icon with retry option  
  * Debounced saves to prevent excessive versions  
  * Manual checkpoint creation for major versions  
  * Branch creation for experimental changes

\</feature-list\>

\<style-guide\>

# **Prompt Management Platform Design Brief**

## **Color Palette**

### **Primary Colors**

* **Primary Dark** \- `#0F0F14` (Deep charcoal for main backgrounds)  
* **Primary Surface** \- `#1A1A1F` (Elevated surface color for cards and panels)  
* **Primary Light** \- `#F8F9FA` (Clean white for text and highlights)

### **Secondary Colors**

* **Secondary Purple** \- `#8B5CF6` (Primary brand accent for key actions)  
* **Secondary Purple Light** \- `#A78BFA` (Hover states and secondary elements)  
* **Secondary Purple Pale** \- `#EDE9FE` (Subtle backgrounds and selected states)

### **Accent Colors**

* **Accent Gradient Start** \- `#8B5CF6` (Purple for gradient beginnings)  
* **Accent Gradient End** \- `#EC4899` (Pink for gradient endings)  
* **Accent Blue** \- `#3B82F6` (For informational elements)  
* **Accent Teal** \- `#14B8A6` (For success states and confirmations)

### **Functional Colors**

* **Success Green** \- `#10B981` (Successful operations and saves)  
* **Warning Amber** \- `#F59E0B` (Warnings and cautions)  
* **Error Red** \- `#EF4444` (Errors and destructive actions)  
* **Info Blue** \- `#3B82F6` (Informational messages)

### **Neutral Colors**

* **Neutral 50** \- `#FAFAFA` (Lightest backgrounds)  
* **Neutral 100** \- `#F4F4F5` (Light mode backgrounds)  
* **Neutral 200** \- `#E4E4E7` (Borders in light mode)  
* **Neutral 400** \- `#A1A1AA` (Muted text)  
* **Neutral 500** \- `#71717A` (Secondary text)  
* **Neutral 600** \- `#52525B` (Primary text in light mode)  
* **Neutral 700** \- `#3F3F46` (Dark mode borders)  
* **Neutral 800** \- `#27272A` (Dark mode elevated surfaces)  
* **Neutral 900** \- `#18181B` (Dark mode primary surfaces)

## **Typography**

### **Font Family**

* **Primary Font**: Inter (All weights)  
* **Monospace Font**: JetBrains Mono (For code/prompts)  
* **System Fallback**: \-apple-system, BlinkMacSystemFont, Segoe UI

### **Font Weights**

* Light: 300  
* Regular: 400  
* Medium: 500  
* Semibold: 600  
* Bold: 700

### **Text Styles**

#### **Headings**

* **H1**: 32px/40px, Bold, Letter-spacing \-0.025em  
  * Used for page titles and major sections  
* **H2**: 28px/36px, Semibold, Letter-spacing \-0.02em  
  * Section headers and important callouts  
* **H3**: 24px/32px, Semibold, Letter-spacing \-0.015em  
  * Subsection headers  
* **H4**: 20px/28px, Medium, Letter-spacing \-0.01em  
  * Card titles and minor headers  
* **H5**: 18px/24px, Medium, Letter-spacing 0  
  * Small section headers

#### **Body Text**

* **Body Large**: 16px/24px, Regular, Letter-spacing 0  
  * Primary reading text for prompt content  
* **Body**: 14px/20px, Regular, Letter-spacing 0  
  * Standard UI text  
* **Body Small**: 12px/16px, Regular, Letter-spacing 0.025em  
  * Secondary information and metadata

#### **Special Text**

* **Code**: 14px/20px, JetBrains Mono Regular, Letter-spacing 0  
  * Prompt content and code blocks  
* **Label**: 12px/16px, Medium, Letter-spacing 0.05em, Uppercase  
  * Form labels and small headers  
* **Caption**: 11px/14px, Regular, Letter-spacing 0.025em  
  * Timestamps and tertiary information

## **Component Styling**

### **Buttons**

#### **Primary Button**

* Background: Linear gradient (135deg, `#8B5CF6` 0%, `#EC4899` 100%)  
* Text: White (`#FFFFFF`)  
* Height: 40px  
* Padding: 12px 24px  
* Border Radius: 8px  
* Font: 14px/20px, Medium  
* Shadow: 0 4px 6px \-1px rgba(139, 92, 246, 0.25)  
* Hover: Brightness 110%, Transform scale(1.02)  
* Active: Transform scale(0.98)  
* Transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1\)

#### **Secondary Button**

* Background: Transparent  
* Border: 1px solid `#3F3F46`  
* Text: `#E4E4E7`  
* Height: 40px  
* Padding: 12px 24px  
* Border Radius: 8px  
* Hover: Background `#27272A`, Border `#52525B`

#### **Ghost Button**

* Background: Transparent  
* Text: `#A1A1AA`  
* Height: 36px  
* Padding: 8px 16px  
* Hover: Text `#E4E4E7`, Background rgba(161, 161, 170, 0.1)

### **Cards**

* Background: `#1A1A1F`  
* Border: 1px solid rgba(255, 255, 255, 0.06)  
* Border Radius: 12px  
* Padding: 24px  
* Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3)  
* Hover Shadow: 0 4px 6px \-1px rgba(0, 0, 0, 0.4)  
* Transition: all 200ms ease-out

### **Input Fields**

* Height: 40px  
* Background: `#0F0F14`  
* Border: 1px solid `#27272A`  
* Border Radius: 8px  
* Padding: 10px 16px  
* Font Size: 14px  
* Text Color: `#F4F4F5`  
* Placeholder: `#52525B`  
* Focus Border: 1px solid `#8B5CF6`  
* Focus Shadow: 0 0 0 3px rgba(139, 92, 246, 0.1)

### **Text Areas**

* Min Height: 120px  
* Background: `#0F0F14`  
* Border: 1px solid `#27272A`  
* Border Radius: 8px  
* Padding: 12px 16px  
* Font: 14px/20px JetBrains Mono  
* Resize: Vertical only

### **Modals/Dialogs**

* Background: `#1A1A1F`  
* Border Radius: 16px  
* Shadow: 0 25px 50px \-12px rgba(0, 0, 0, 0.75)  
* Backdrop: rgba(0, 0, 0, 0.7)  
* Max Width: 560px  
* Padding: 32px

### **Icons**

* Small: 16px × 16px  
* Default: 20px × 20px  
* Large: 24px × 24px  
* Interactive Color: `#A1A1AA`  
* Active/Hover Color: `#E4E4E7`  
* Accent Color: `#8B5CF6`

## **Spacing System**

* 2px \- Micro (Icon to text spacing)  
* 4px \- Tiny (Related elements)  
* 8px \- Small (Compact spacing)  
* 12px \- Medium-Small (Form elements)  
* 16px \- Default (Standard padding)  
* 24px \- Medium (Section spacing)  
* 32px \- Large (Major sections)  
* 48px \- Extra Large (Page margins)  
* 64px \- Huge (Hero sections)

## **Motion & Animation**

### **Transitions**

* **Micro**: 150ms ease-out (Hover states, small changes)  
* **Default**: 200ms cubic-bezier(0.4, 0, 0.2, 1\) (Most interactions)  
* **Smooth**: 300ms cubic-bezier(0.4, 0, 0.2, 1\) (Modals, dropdowns)  
* **Entrance**: 400ms cubic-bezier(0.0, 0, 0.2, 1\) (Page transitions)

### **Animation Patterns**

* **Fade In**: opacity 0 → 1  
* **Slide Up**: translateY(10px) → translateY(0)  
* **Scale**: scale(0.95) → scale(1)  
* **Gradient Shift**: Background position animation for gradient buttons

### **Interactive States**

* Hover: Transform scale(1.02) for cards, brightness adjustment for buttons  
* Active: Transform scale(0.98)  
* Focus: Box shadow with primary color  
* Loading: Pulse animation with opacity 0.5 → 1

## **Special UI Elements**

### **Gradient Overlays**

* Card Hover Gradient: Linear gradient overlay with 5% opacity  
* Premium Features: Gradient border using pseudo-elements  
* Active Tab: Bottom border with gradient

### **Glass Morphism Elements**

* Background: rgba(26, 26, 31, 0.7)  
* Backdrop Filter: blur(10px)  
* Border: 1px solid rgba(255, 255, 255, 0.1)

### **Code Block Styling**

* Background: `#0A0A0D`  
* Border: 1px solid `#27272A`  
* Border Radius: 8px  
* Padding: 16px  
* Font: 13px/20px JetBrains Mono  
* Syntax Highlighting: Using Prism.js dark theme

### **Tag/Label Components**

* Height: 24px  
* Padding: 4px 12px  
* Border Radius: 12px  
* Background: rgba(139, 92, 246, 0.1)  
* Text: `#A78BFA`  
* Font Size: 12px  
* Border: 1px solid rgba(139, 92, 246, 0.2)

## **Dark Mode Optimizations**

* Reduced contrast for eye comfort (never pure black on white)  
* Subtle gradients to create depth without harsh shadows  
* Increased saturation for accent colors to maintain vibrancy  
* Adjusted opacity values for overlays and disabled states

## **Accessibility Considerations**

* WCAG AA compliant contrast ratios (4.5:1 for normal text, 3:1 for large text)  
* Focus indicators visible and consistent  
* Interactive elements minimum 44px touch target  
* Clear hover and active states  
* Sufficient color contrast for colorblind users

\</style-guide\>  
\</context\>

# Output \- 4

# **Prompt Management Platform Design Brief**

## **Color Palette**

### **Primary Colors**

* ## **Primary Dark \- \#0F0F14 (Deep charcoal for main backgrounds)**

* ## **Primary Surface \- \#1A1A1F (Elevated surface color for cards and panels)**

* ## **Primary Light \- \#F8F9FA (Clean white for text and highlights)**

### **Secondary Colors**

* ## **Secondary Purple \- \#8B5CF6 (Primary brand accent for key actions)**

* ## **Secondary Purple Light \- \#A78BFA (Hover states and secondary elements)**

* ## **Secondary Purple Pale \- \#EDE9FE (Subtle backgrounds and selected states)**

### **Accent Colors**

* ## **Accent Gradient Start \- \#8B5CF6 (Purple for gradient beginnings)**

* ## **Accent Gradient End \- \#EC4899 (Pink for gradient endings)**

* ## **Accent Blue \- \#3B82F6 (For informational elements)**

* ## **Accent Teal \- \#14B8A6 (For success states and confirmations)**

### **Functional Colors**

* ## **Success Green \- \#10B981 (Successful operations and saves)**

* ## **Warning Amber \- \#F59E0B (Warnings and cautions)**

* ## **Error Red \- \#EF4444 (Errors and destructive actions)**

* ## **Info Blue \- \#3B82F6 (Informational messages)**

### **Neutral Colors**

* ## **Neutral 50 \- \#FAFAFA (Lightest backgrounds)**

* ## **Neutral 100 \- \#F4F4F5 (Light mode backgrounds)**

* ## **Neutral 200 \- \#E4E4E7 (Borders in light mode)**

* ## **Neutral 400 \- \#A1A1AA (Muted text)**

* ## **Neutral 500 \- \#71717A (Secondary text)**

* ## **Neutral 600 \- \#52525B (Primary text in light mode)**

* ## **Neutral 700 \- \#3F3F46 (Dark mode borders)**

* ## **Neutral 800 \- \#27272A (Dark mode elevated surfaces)**

* ## **Neutral 900 \- \#18181B (Dark mode primary surfaces)**

## **Typography**

### **Font Family**

* ## **Primary Font: Inter (All weights)**

* ## **Monospace Font: JetBrains Mono (For code/prompts)**

* ## **System Fallback: \-apple-system, BlinkMacSystemFont, Segoe UI**

### **Font Weights**

* ## **Light: 300**

* ## **Regular: 400**

* ## **Medium: 500**

* ## **Semibold: 600**

* ## **Bold: 700**

### **Text Styles**

#### **Headings**

* ## **H1: 32px/40px, Bold, Letter-spacing \-0.025em**

  * ## **Used for page titles and major sections**

* ## **H2: 28px/36px, Semibold, Letter-spacing \-0.02em**

  * ## **Section headers and important callouts**

* ## **H3: 24px/32px, Semibold, Letter-spacing \-0.015em**

  * ## **Subsection headers**

* ## **H4: 20px/28px, Medium, Letter-spacing \-0.01em**

  * ## **Card titles and minor headers**

* ## **H5: 18px/24px, Medium, Letter-spacing 0**

  * ## **Small section headers**

#### **Body Text**

* ## **Body Large: 16px/24px, Regular, Letter-spacing 0**

  * ## **Primary reading text for prompt content**

* ## **Body: 14px/20px, Regular, Letter-spacing 0**

  * ## **Standard UI text**

* ## **Body Small: 12px/16px, Regular, Letter-spacing 0.025em**

  * ## **Secondary information and metadata**

#### **Special Text**

* ## **Code: 14px/20px, JetBrains Mono Regular, Letter-spacing 0**

  * ## **Prompt content and code blocks**

* ## **Label: 12px/16px, Medium, Letter-spacing 0.05em, Uppercase**

  * ## **Form labels and small headers**

* ## **Caption: 11px/14px, Regular, Letter-spacing 0.025em**

  * ## **Timestamps and tertiary information**

## **Component Styling**

### **Buttons**

#### **Primary Button**

* ## **Background: Linear gradient (135deg, \#8B5CF6 0%, \#EC4899 100%)**

* ## **Text: White (\#FFFFFF)**

* ## **Height: 40px**

* ## **Padding: 12px 24px**

* ## **Border Radius: 8px**

* ## **Font: 14px/20px, Medium**

* ## **Shadow: 0 4px 6px \-1px rgba(139, 92, 246, 0.25)**

* ## **Hover: Brightness 110%, Transform scale(1.02)**

* ## **Active: Transform scale(0.98)**

* ## **Transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1\)**

#### **Secondary Button**

* ## **Background: Transparent**

* ## **Border: 1px solid \#3F3F46**

* ## **Text: \#E4E4E7**

* ## **Height: 40px**

* ## **Padding: 12px 24px**

* ## **Border Radius: 8px**

* ## **Hover: Background \#27272A, Border \#52525B**

#### **Ghost Button**

* ## **Background: Transparent**

* ## **Text: \#A1A1AA**

* ## **Height: 36px**

* ## **Padding: 8px 16px**

* ## **Hover: Text \#E4E4E7, Background rgba(161, 161, 170, 0.1)**

### **Cards**

* ## **Background: \#1A1A1F**

* ## **Border: 1px solid rgba(255, 255, 255, 0.06)**

* ## **Border Radius: 12px**

* ## **Padding: 24px**

* ## **Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3)**

* ## **Hover Shadow: 0 4px 6px \-1px rgba(0, 0, 0, 0.4)**

* ## **Transition: all 200ms ease-out**

### **Input Fields**

* ## **Height: 40px**

* ## **Background: \#0F0F14**

* ## **Border: 1px solid \#27272A**

* ## **Border Radius: 8px**

* ## **Padding: 10px 16px**

* ## **Font Size: 14px**

* ## **Text Color: \#F4F4F5**

* ## **Placeholder: \#52525B**

* ## **Focus Border: 1px solid \#8B5CF6**

* ## **Focus Shadow: 0 0 0 3px rgba(139, 92, 246, 0.1)**

### **Text Areas**

* ## **Min Height: 120px**

* ## **Background: \#0F0F14**

* ## **Border: 1px solid \#27272A**

* ## **Border Radius: 8px**

* ## **Padding: 12px 16px**

* ## **Font: 14px/20px JetBrains Mono**

* ## **Resize: Vertical only**

### **Modals/Dialogs**

* ## **Background: \#1A1A1F**

* ## **Border Radius: 16px**

* ## **Shadow: 0 25px 50px \-12px rgba(0, 0, 0, 0.75)**

* ## **Backdrop: rgba(0, 0, 0, 0.7)**

* ## **Max Width: 560px**

* ## **Padding: 32px**

### **Icons**

* ## **Small: 16px × 16px**

* ## **Default: 20px × 20px**

* ## **Large: 24px × 24px**

* ## **Interactive Color: \#A1A1AA**

* ## **Active/Hover Color: \#E4E4E7**

* ## **Accent Color: \#8B5CF6**

## **Spacing System**

* ## **2px \- Micro (Icon to text spacing)**

* ## **4px \- Tiny (Related elements)**

* ## **8px \- Small (Compact spacing)**

* ## **12px \- Medium-Small (Form elements)**

* ## **16px \- Default (Standard padding)**

* ## **24px \- Medium (Section spacing)**

* ## **32px \- Large (Major sections)**

* ## **48px \- Extra Large (Page margins)**

* ## **64px \- Huge (Hero sections)**

## **Motion & Animation**

### **Transitions**

* ## **Micro: 150ms ease-out (Hover states, small changes)**

* ## **Default: 200ms cubic-bezier(0.4, 0, 0.2, 1\) (Most interactions)**

* ## **Smooth: 300ms cubic-bezier(0.4, 0, 0.2, 1\) (Modals, dropdowns)**

* ## **Entrance: 400ms cubic-bezier(0.0, 0, 0.2, 1\) (Page transitions)**

### **Animation Patterns**

* ## **Fade In: opacity 0 → 1**

* ## **Slide Up: translateY(10px) → translateY(0)**

* ## **Scale: scale(0.95) → scale(1)**

* ## **Gradient Shift: Background position animation for gradient buttons**

### **Interactive States**

* ## **Hover: Transform scale(1.02) for cards, brightness adjustment for buttons**

* ## **Active: Transform scale(0.98)**

* ## **Focus: Box shadow with primary color**

* ## **Loading: Pulse animation with opacity 0.5 → 1**

## **Special UI Elements**

### **Gradient Overlays**

* ## **Card Hover Gradient: Linear gradient overlay with 5% opacity**

* ## **Premium Features: Gradient border using pseudo-elements**

* ## **Active Tab: Bottom border with gradient**

### **Glass Morphism Elements**

* ## **Background: rgba(26, 26, 31, 0.7)**

* ## **Backdrop Filter: blur(10px)**

* ## **Border: 1px solid rgba(255, 255, 255, 0.1)**

### **Code Block Styling**

* ## **Background: \#0A0A0D**

* ## **Border: 1px solid \#27272A**

* ## **Border Radius: 8px**

* ## **Padding: 16px**

* ## **Font: 13px/20px JetBrains Mono**

* ## **Syntax Highlighting: Using Prism.js dark theme**

### **Tag/Label Components**

* ## **Height: 24px**

* ## **Padding: 4px 12px**

* ## **Border Radius: 12px**

* ## **Background: rgba(139, 92, 246, 0.1)**

* ## **Text: \#A78BFA**

* ## **Font Size: 12px**

* ## **Border: 1px solid rgba(139, 92, 246, 0.2)**

## **Dark Mode Optimizations**

* ## **Reduced contrast for eye comfort (never pure black on white)**

* ## **Subtle gradients to create depth without harsh shadows**

* ## **Increased saturation for accent colors to maintain vibrancy**

* ## **Adjusted opacity values for overlays and disabled states**

## **Accessibility Considerations**

* ## **WCAG AA compliant contrast ratios (4.5:1 for normal text, 3:1 for large text)**

* ## **Focus indicators visible and consistent**

* ## **Interactive elements minimum 44px touch target**

* ## **Clear hover and active states**

* ## **Sufficient color contrast for colorblind users**

## 

## 

## 

## 

## 

## 

## 

## 

## 

## 

## 

## 

## 

## 

## **Authentication & User Management**

### **Landing Page**

#### **Initial Load State**

* Hero section with animated gradient background using Primary Purple (`#8B5CF6`) to Pink (`#EC4899`) with subtle wave animation  
* Headline "Your AI Prompts, Organized" in H1 (32px, Bold) with fade-in animation  
* Subheadline in Body Large (16px) in Neutral 400 (`#A1A1AA`): "Transform scattered prompts into an organized knowledge base"  
* Primary CTA button "Get Started" with gradient background, 40px height, smooth scale(1.02) on hover  
* Below fold: Three feature cards with glass morphism effect showcasing key benefits  
* Social proof counter animating up from 0 to current user count  
* Navigation bar with transparent background, blur effect on scroll  
* Smooth parallax scrolling on hero elements

#### **Scroll State**

* Navigation bar transitions to solid `#1A1A1F` background with subtle shadow  
* Feature cards animate in with staggered fade-up effect (translateY(10px) → translateY(0))  
* Interactive preview section shows prompt organization with cursor animation  
* Testimonial cards slide in from sides with intersection observer  
* Footer fades in with links in Neutral 500 (`#71717A`)

### **Registration Modal**

#### **Initial State**

* Modal backdrop with rgba(0, 0, 0, 0.7) fade-in over 300ms  
* Modal container slides up with scale(0.95) → scale(1) animation  
* Email input field auto-focused with purple glow (`#8B5CF6` with 0.1 opacity)  
* "Continue with Email" primary button disabled until valid email  
* Divider with "OR" text in Neutral 500  
* Social login buttons (Google/GitHub) with subtle hover elevation  
* "Already have an account?" link at bottom in Secondary Purple Light (`#A78BFA`)  
* Close button (X) in top-right with rotate animation on hover

#### **Email Validation State**

* Real-time validation with 150ms debounce  
* Green checkmark fades in next to valid email  
* Red error message slides down for invalid format  
* Button enables with color transition when email valid  
* Input border transitions to Success Green (`#10B981`) for valid email

#### **Loading State**

* Button text fades out, replaced by spinning loader  
* Modal content has subtle opacity reduction (0.7)  
* Prevent additional clicks with pointer-events: none  
* Smooth transition lasting 200ms

#### **Password Step State**

* Email field slides up and locks with gray background  
* Password field slides in from bottom with auto-focus  
* Password strength meter appears below with segments  
* Requirements checklist with real-time validation  
* Show/hide password toggle with eye icon morph animation  
* Terms checkbox with custom styling matching brand

#### **Success State**

* Confetti animation using brand colors  
* Success message "Check your email\!" with mail icon  
* Modal content fades out and scales down  
* Smooth redirect to email verification screen

### **Email Verification Screen**

#### **Pending State**

* Full-screen centered container with dark background (`#0F0F14`)  
* Large animated email icon with subtle bounce effect  
* "Check your inbox" as H2 heading  
* Email address displayed in code font style  
* Countdown timer before "Resend" button enables (60s)  
* "Open email app" button with system email client detection  
* Tips section with common issues in collapsible accordion

#### **Resend State**

* Button transforms from disabled to primary style  
* Click triggers subtle pulse animation on email icon  
* Toast notification slides in from top: "Email resent\!"  
* Countdown resets with smooth number transitions

#### **Success State**

* Green checkmark draws in with SVG animation  
* "Email verified\!" message with celebration animation  
* Auto-redirect progress bar at bottom  
* "Continue to app" button for manual proceed  
* Smooth fade transition to onboarding flow

### **Password Reset Flow**

#### **Reset Request Initial State**

* Clean centered form with single email input  
* Forgot password icon animation (key rotating)  
* Clear instruction text in Body size  
* Rate limit warning if multiple attempts detected  
* Link to return to login with back arrow

#### **Reset Request Loading State**

* Button width animates to circle with spinner  
* Form elements fade to 50% opacity  
* Prevents double-submission

#### **Reset Request Success State**

* Full-screen success illustration  
* Clear next steps in numbered list  
* "Check spam folder" reminder  
* Return to login link prominent

#### **Reset Password Form State**

* Token validation with skeleton loader  
* Password field with same styling as registration  
* Confirm password field with match validation  
* Requirements dynamically check off  
* Submit button with gradient effect

#### **Reset Success State**

* Brief success animation  
* "Password updated" message  
* Auto-redirect to login with 3s countdown  
* Manual "Go to login" button

## **Prompt Organization**

### **Create Folder/Tag Hierarchy**

#### **Sidebar Initial State**

* Collapsed to 64px width showing only icons  
* Folder icons in Neutral 400 with tooltip on hover  
* Smooth width transition on hover (64px → 240px)  
* "New Folder" button at bottom with plus icon  
* Drag handle appears on hover for reordering

#### **Sidebar Expanded State**

* 240px width with folder names visible  
* Tree structure with 16px indentation per level  
* Folder count badges in small gray pills  
* Active folder highlighted with purple left border  
* Smooth accordion animations for expand/collapse  
* Search bar slides down from top on CMD+K

#### **Folder Creation Modal Initial State**

* Modal slides up with spring physics animation  
* Name input auto-focused with purple glow  
* Suggested names based on existing patterns  
* Color palette with 12 preset colors in grid  
* Custom color picker collapsed by default  
* Icon grid with search functionality

#### **Folder Creation Icon Selection State**

* Searchable grid of 100+ icons  
* Icons organized by category tabs  
* Selected icon scales up with spring animation  
* Preview of folder appearance updates live  
* Recently used icons section at top

#### **Folder Creation Completion State**

* Create button with gradient background  
* Loading state with button transformation  
* Success state with folder sliding into sidebar  
* Modal fades out with scale down animation  
* New folder auto-selected and expanded

### **Nested Folders with Drag-and-Drop**

#### **Hover State**

* Folder scales to 1.02 with shadow elevation  
* Cursor changes to grab hand  
* Drag handle becomes visible on left edge  
* Multi-select shows checkbox on hover

#### **Dragging State**

* Original position shows dashed outline  
* Dragged item becomes semi-transparent (0.7 opacity)  
* Follows cursor with slight lag for natural feel  
* Count badge shows number if multiple selected  
* Other folders show hover state when valid drop target

#### **Valid Drop State**

* Target folder expands with spring animation  
* Blue insertion line shows exact drop position  
* Target folder highlights with purple glow  
* Preview of new structure in real-time  
* Auto-scroll activates near viewport edges

#### **Invalid Drop State**

* Red tint overlay on invalid targets  
* Subtle shake animation on attempt  
* Cursor shows not-allowed symbol  
* Original position pulses to indicate return

#### **Drop Success State**

* Smooth slide animation to final position  
* Brief purple flash on moved items  
* Success toast with undo option  
* Tree structure reflows with stagger animation  
* Auto-save indicator pulses in corner

## **Prompt Creation & Editing**

### **Rich Text Editor Interface**

#### **Split View Mode**

* Vertical divider with drag handle  
* Synchronized scrolling between panes  
* Live preview updates with 100ms debounce  
* Syntax highlighting in source view  
* Resizable panes with min/max constraints  
* Double-click divider to reset 50/50

#### **Editor Focus State**

* Toolbar fades in at top with formatting options  
* Word count and read time in bottom bar  
* Auto-save indicator with timestamp  
* Zen mode button in top-right corner  
* Format painter tool for style copying

#### **Variable Input State**

* Type {{ to trigger variable dropdown  
* Autocomplete menu with fuzzy search  
* Variables appear as purple pills inline  
* Hover shows variable definition tooltip  
* Click to edit variable properties  
* Delete with backspace or X button

#### **Markdown Rendering State**

* Real-time preview with GitHub-flavored markdown  
* Code blocks with syntax highlighting  
* Copy button appears on code block hover  
* Tables with alternating row colors  
* Checkboxes interactive in preview

#### **Full Screen / Zen Mode**

* Smooth transition with fade to black  
* All UI elements fade out except editor  
* ESC or F11 to exit  
* Subtle breathing animation on cursor  
* Focus mode highlights current paragraph

### **Version Control Interface**

#### **Version Timeline View**

* Horizontal timeline with version dots  
* Hover shows preview of changes  
* Click to expand version details  
* Major versions shown with larger dots  
* Branch points clearly indicated  
* Current version highlighted in purple

#### **Version Comparison View**

* Side-by-side diff with color coding  
* Added content in green background  
* Removed content in red strikethrough  
* Changed content in yellow highlight  
* Line numbers for reference  
* Unified diff option available

#### **Version List View**

* Compact list with key metadata  
* Author avatar and name  
* Relative timestamps ("2 hours ago")  
* Change summary in gray text  
* Revert button on hover  
* Star important versions

#### **Restore Confirmation State**

* Modal with comparison preview  
* "Are you sure?" with consequences explained  
* Show what will be lost/gained  
* Confirm button requires 3s hold  
* Cancel prominent to prevent accidents

#### **Auto-save Indicator States**

* Idle: Gray text "All changes saved"  
* Saving: Pulsing dot with "Saving..."  
* Saved: Green checkmark fades in  
* Error: Red warning with retry button  
* Offline: Orange indicator with queue count

# Step \#5 \- Tech Spec

\<goal\>  
Create a comprehensive technical specification document for a software development project that will serve as direct input for planning and code generation AI systems. The specification must be precise, structured, and provide actionable implementation guidance covering all aspects of the system from architecture to deployment.  
\</goal\>

\<format\>  
The output should be a detailed technical specification in markdown format with the following structure:

\# {Project Name} Technical Specification

\#\# 1\. Executive Summary  
\- Project overview and objectives  
\- Key technical decisions and rationale  
\- High-level architecture diagram  
\- Technology stack recommendations

\#\# 2\. System Architecture  
\#\#\# 2.1 Architecture Overview  
\- System components and their relationships  
\- Data flow diagrams  
\- Infrastructure requirements

\#\#\# 2.2 Technology Stack  
\- Frontend technologies and frameworks  
\- Backend technologies and frameworks  
\- Database and storage solutions  
\- Third-party services and APIs

\#\# 3\. Feature Specifications  
For each major feature:  
\#\#\# 3.X {Feature Name}  
\- User stories and acceptance criteria  
\- Technical requirements and constraints  
\- Detailed implementation approach  
\- User flow diagrams  
\- API endpoints (if applicable)  
\- Data models involved  
\- Error handling and edge cases  
\- Performance considerations

\#\# 4\. Data Architecture  
\#\#\# 4.1 Data Models  
For each entity:  
\- Entity definition and purpose  
\- Attributes (name, type, constraints, defaults)  
\- Relationships and associations  
\- Indexes and optimization strategies

\#\#\# 4.2 Data Storage  
\- Database selection and rationale  
\- Data persistence strategies  
\- Caching mechanisms  
\- Backup and recovery procedures

\#\# 5\. API Specifications  
\#\#\# 5.1 Internal APIs  
For each endpoint:  
\- Endpoint URL and HTTP method  
\- Request parameters and body schema  
\- Response schema and status codes  
\- Authentication and authorization  
\- Rate limiting and throttling  
\- Example requests and responses

\#\#\# 5.2 External Integrations  
For each integration:  
\- Service description and purpose  
\- Authentication mechanisms  
\- API endpoints and usage  
\- Error handling and fallback strategies  
\- Data synchronization approaches

\#\# 6\. Security & Privacy  
\#\#\# 6.1 Authentication & Authorization  
\- Authentication mechanism and flow  
\- Authorization strategies and role definitions  
\- Session management  
\- Token handling and refresh strategies

\#\#\# 6.2 Data Security  
\- Encryption strategies (at rest and in transit)  
\- PII handling and protection  
\- Compliance requirements (GDPR, CCPA, etc.)  
\- Security audit procedures

\#\#\# 6.3 Application Security  
\- Input validation and sanitization  
\- OWASP compliance measures  
\- Security headers and policies  
\- Vulnerability management

\#\# 7\. User Interface Specifications  
\#\#\# 7.1 Design System  
\- Visual design principles  
\- Brand guidelines and personality  
\- Component library structure  
\- Responsive design approach  
\- Accessibility standards (WCAG compliance)  
\- Platform-specific UI considerations

\#\#\# 7.2 Design Foundations  
\#\#\#\# 7.2.1 Color System  
\- Primary, secondary, and accent colors (hex/rgb values)  
\- Semantic colors (success, warning, error, info)  
\- Neutral/grayscale palette  
\- Dark mode considerations  
\- Color accessibility ratios

\#\#\#\# 7.2.2 Typography  
\- Font families (primary, secondary, monospace)  
\- Type scale (font sizes and line heights)  
\- Font weights and styles  
\- Responsive typography rules  
\- Text color treatments

\#\#\#\# 7.2.3 Spacing & Layout  
\- Base unit system (4px, 8px grid, etc.)  
\- Spacing scale (xs, sm, md, lg, xl values)  
\- Container widths and breakpoints  
\- Grid system specifications  
\- Component spacing patterns

\#\#\#\# 7.2.4 Interactive Elements  
\- Button styles and states  
\- Form field specifications  
\- Animation timing and easing  
\- Hover/focus/active states  
\- Loading and transition patterns

\#\#\#\# 7.2.5 Component Specifications  
\- Design tokens structure  
\- Core component variants  
\- Composition patterns  
\- State visualizations  
\- Platform-specific adaptations

\#\#\# 7.3 User Experience Flows  
\- Key user journeys with wireframes/mockups  
\- Navigation structure  
\- State management and transitions  
\- Error states and user feedback  
\- Loading and empty states

\#\# 8\. Infrastructure & Deployment  
\#\#\# 8.1 Infrastructure Requirements  
\- Hosting environment specifications  
\- Server requirements and configuration  
\- Network architecture  
\- Storage requirements

\#\#\# 8.2 Deployment Strategy  
\- CI/CD pipeline configuration  
\- Environment management (dev, staging, production)  
\- Deployment procedures and rollback strategies  
\- Configuration management

\</format\>

\<warnings-and-guidelines\>  
Before creating the specification:

1\. \*\*Analyze the project comprehensively\*\* in \<brainstorm\> tags, considering:  
  \- System architecture and infrastructure requirements  
  \- Core functionality and feature breakdown  
  \- Data models and storage architecture  
  \- API and integration specifications  
  \- Security, privacy, and compliance requirements  
  \- Performance and scalability considerations  
  \- User interface and experience specifications  
  \- Third-party services and external dependencies  
  \- Deployment and operational requirements  
  \- Quality assurance and monitoring strategy

2\. \*\*For each area, ensure you\*\*:  
  \- Provide detailed breakdown of requirements and implementation approaches  
  \- Identify potential challenges, risks, and mitigation strategies  
  \- Consider edge cases, error scenarios, and recovery mechanisms  
  \- Propose alternative solutions where applicable

3\. \*\*Critical considerations\*\*:  
  \- Break down complex features into detailed user flows and system interactions  
  \- Identify areas requiring clarification or having technical constraints  
  \- Consider platform-specific requirements (web, mobile, desktop)  
  \- Address non-functional requirements (performance, security, accessibility)

4\. \*\*Quality guidelines\*\*:  
  \- Be technology-agnostic unless specific technologies are mandated in the PRD  
  \- Provide concrete examples and clear interfaces between components  
  \- Include specific implementation guidance without unnecessary jargon  
  \- Focus on completeness and actionability for development teams  
  \- Consider both technical and business constraints

5\. **\*\*Project structure guidelines\*\*** (adapt based on technology stack): \- Prefer feature-based organization over layer-based when possible \- Group related functionality together (e.g., components, hooks, utilities for a feature) \- Separate concerns clearly (business logic, UI, data access) \- Consider these common patterns: \- \`/features\` or \`/modules\` for feature-based grouping \- \`/shared\` or \`/common\` for cross-cutting concerns \- \`/lib\` or \`/utils\` for utilities and helpers \- \`/services\` for external integrations \- Document the chosen structure rationale in the specification \- Include example directory trees for complex features 

6\. **\*\*When specifying project structure\*\***: \- Show concrete examples with file paths \- Explain the reasoning for the chosen organization \- Highlight where shared code should live \- Indicate naming conventions (camelCase, PascalCase, kebab-case) \- Specify file naming patterns (e.g., \`\*.test.ts\`, \`\*.spec.ts\`)  
\</warnings-and-guidelines\>

\<context\>  
You are an expert software architect creating technical specifications that will be used as direct input for planning and code generation AI systems. The specification must translate business requirements from a Product Requirements Document (PRD) into comprehensive technical documentation that development teams can execute against.

The project request will be provided here:

\<project\_request\>

## **Features (MVP)**

### **Authentication & User Management**

Provides secure user registration with email verification, password reset functionality, and comprehensive profile management. Integrates with Clerk for authentication services while maintaining user preferences and settings in the database.

#### **Tech Involved**

* Clerk Authentication  
* Next.js App Router with middleware  
* Prisma ORM with PostgreSQL  
* Server Actions for profile updates

#### **Main Requirements**

* Clerk webhook integration for user sync  
* User metadata storage in PostgreSQL  
* Session management across Server Components  
* Profile data synchronization between Clerk and database  
* Role-based access control preparation

### **Prompt Organization**

Enables users to organize prompts using a flexible folder/tag hierarchy with drag-and-drop functionality, smart collections, and multi-dimensional categorization. Supports nested folder structures and rule-based automatic organization.

#### **Tech Involved**

* PostgreSQL with recursive CTEs for folder hierarchy  
* React DnD Kit for drag-and-drop  
* Server Actions for CRUD operations  
* Prisma with relation queries

#### **Main Requirements**

* Recursive folder structure with infinite nesting  
* Many-to-many prompt-tag relationships  
* Smart collection rule engine  
* Optimistic UI updates for drag-and-drop  
* Efficient tree traversal queries  
* Cascade delete for folder hierarchies

### **Search & Filtering**

Provides comprehensive full-text search across all prompts with advanced filtering capabilities by platform, date, tags, and author. Includes search within results and faceted search options.

#### **Tech Involved**

* PostgreSQL full-text search with GIN indexes  
* Prisma raw queries for search  
* React Query for search result caching  
* Server Actions for search API

#### **Main Requirements**

* GIN indexes on searchable columns  
* Search result ranking and relevance  
* Real-time search suggestions  
* Filter state management  
* Pagination for large result sets  
* Search history tracking

### **Prompt Creation & Editing**

Features a rich text editor with Markdown/XML support, syntax highlighting, live preview, and template variable system. Includes comprehensive version control with revision history and comparison tools.

#### **Tech Involved**

* CodeMirror 6 or Monaco Editor  
* Unified/Remark for Markdown processing  
* Server Actions for saving  
* PostgreSQL JSONB for version storage

#### **Main Requirements**

* Real-time syntax highlighting  
* Template variable parsing and validation  
* Debounced auto-save functionality  
* Version diff algorithm  
* Preview rendering pipeline  
* Concurrent editing conflict resolution

### **Templates & Snippets**

Provides pre-built prompt templates organized by category and a custom snippet library for reusable prompt components. Supports template inheritance and variable substitution.

#### **Tech Involved**

* PostgreSQL for template storage  
* React components for template gallery  
* Server Actions for template CRUD  
* Template engine for variable substitution

#### **Main Requirements**

* Template categorization system  
* Template versioning  
* Snippet insertion UI  
* Variable validation in templates  
* Template sharing permissions  
* Usage analytics for popular templates

## **System Diagram**

mermaid

```
graph TB
    subgraph "Client Layer"
        UI[Next.js App Router]
        MW[Middleware]
    end
    
    subgraph "Authentication"
        CLERK[Clerk Service]
        WEBHOOK[Clerk Webhooks]
    end
    
    subgraph "Application Layer"
        SA[Server Actions]
        API[API Routes]
    end
    
    subgraph "Data Layer"
        PRISMA[Prisma ORM]
        PG[(PostgreSQL/Supabase)]
        CACHE[React Query Cache]
    end
    
    subgraph "External Services"
        VERCEL[Vercel CDN]
    end
    
    UI --> MW
    MW --> CLERK
    MW --> SA
    UI --> CACHE
    
    SA --> PRISMA
    API --> PRISMA
    PRISMA --> PG
    
    CLERK --> WEBHOOK
    WEBHOOK --> API
    API --> PG
    
    UI --> VERCEL
    CACHE --> SA
    
    PG -.-> |Full-text Search| PG
    PG -.-> |Recursive CTEs| PG
    PG -.-> |JSONB Storage| PG
```

\</project\_request\>

User specific tech stack requests here:

\<tech-stack\>

* NextJS (frontend)  
* NextJS Server Actions (backend)  
* Supabase (Postgres DB)  
* Prisma ORM  
* Clerk Auth  
* Deployment on Vercel  
* Zustand for state management  
* TailwindCSS for styling  
* Framer Motion for Animation

\</tech-stack\>

Project design considerations will be provided here:

\<design-considerations\>  
\<aesthetics\>

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

\</aesthetics\>  
\<app-design-system\>

## **Color Palette**

### **Primary Colors**

* **Primary Dark** \- `#0F0F14` (Deep charcoal for main backgrounds)  
* **Primary Surface** \- `#1A1A1F` (Elevated surface color for cards and panels)  
* **Primary Light** \- `#F8F9FA` (Clean white for text and highlights)

### **Secondary Colors**

* **Secondary Purple** \- `#8B5CF6` (Primary brand accent for key actions)  
* **Secondary Purple Light** \- `#A78BFA` (Hover states and secondary elements)  
* **Secondary Purple Pale** \- `#EDE9FE` (Subtle backgrounds and selected states)

### **Accent Colors**

* **Accent Gradient Start** \- `#8B5CF6` (Purple for gradient beginnings)  
* **Accent Gradient End** \- `#EC4899` (Pink for gradient endings)  
* **Accent Blue** \- `#3B82F6` (For informational elements)  
* **Accent Teal** \- `#14B8A6` (For success states and confirmations)

### **Functional Colors**

* **Success Green** \- `#10B981` (Successful operations and saves)  
* **Warning Amber** \- `#F59E0B` (Warnings and cautions)  
* **Error Red** \- `#EF4444` (Errors and destructive actions)  
* **Info Blue** \- `#3B82F6` (Informational messages)

### **Neutral Colors**

* **Neutral 50** \- `#FAFAFA` (Lightest backgrounds)  
* **Neutral 100** \- `#F4F4F5` (Light mode backgrounds)  
* **Neutral 200** \- `#E4E4E7` (Borders in light mode)  
* **Neutral 400** \- `#A1A1AA` (Muted text)  
* **Neutral 500** \- `#71717A` (Secondary text)  
* **Neutral 600** \- `#52525B` (Primary text in light mode)  
* **Neutral 700** \- `#3F3F46` (Dark mode borders)  
* **Neutral 800** \- `#27272A` (Dark mode elevated surfaces)  
* **Neutral 900** \- `#18181B` (Dark mode primary surfaces)

## **Typography**

### **Font Family**

* **Primary Font**: Inter (All weights)  
* **Monospace Font**: JetBrains Mono (For code/prompts)  
* **System Fallback**: \-apple-system, BlinkMacSystemFont, Segoe UI

### **Font Weights**

* Light: 300  
* Regular: 400  
* Medium: 500  
* Semibold: 600  
* Bold: 700

### **Text Styles**

#### **Headings**

* **H1**: 32px/40px, Bold, Letter-spacing \-0.025em  
  * Used for page titles and major sections  
* **H2**: 28px/36px, Semibold, Letter-spacing \-0.02em  
  * Section headers and important callouts  
* **H3**: 24px/32px, Semibold, Letter-spacing \-0.015em  
  * Subsection headers  
* **H4**: 20px/28px, Medium, Letter-spacing \-0.01em  
  * Card titles and minor headers  
* **H5**: 18px/24px, Medium, Letter-spacing 0  
  * Small section headers

#### **Body Text**

* **Body Large**: 16px/24px, Regular, Letter-spacing 0  
  * Primary reading text for prompt content  
* **Body**: 14px/20px, Regular, Letter-spacing 0  
  * Standard UI text  
* **Body Small**: 12px/16px, Regular, Letter-spacing 0.025em  
  * Secondary information and metadata

#### **Special Text**

* **Code**: 14px/20px, JetBrains Mono Regular, Letter-spacing 0  
  * Prompt content and code blocks  
* **Label**: 12px/16px, Medium, Letter-spacing 0.05em, Uppercase  
  * Form labels and small headers  
* **Caption**: 11px/14px, Regular, Letter-spacing 0.025em  
  * Timestamps and tertiary information

## **Component Styling**

### **Buttons**

#### **Primary Button**

* Background: Linear gradient (135deg, `#8B5CF6` 0%, `#EC4899` 100%)  
* Text: White (`#FFFFFF`)  
* Height: 40px  
* Padding: 12px 24px  
* Border Radius: 8px  
* Font: 14px/20px, Medium  
* Shadow: 0 4px 6px \-1px rgba(139, 92, 246, 0.25)  
* Hover: Brightness 110%, Transform scale(1.02)  
* Active: Transform scale(0.98)  
* Transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1\)

#### **Secondary Button**

* Background: Transparent  
* Border: 1px solid `#3F3F46`  
* Text: `#E4E4E7`  
* Height: 40px  
* Padding: 12px 24px  
* Border Radius: 8px  
* Hover: Background `#27272A`, Border `#52525B`

#### **Ghost Button**

* Background: Transparent  
* Text: `#A1A1AA`  
* Height: 36px  
* Padding: 8px 16px  
* Hover: Text `#E4E4E7`, Background rgba(161, 161, 170, 0.1)

### **Cards**

* Background: `#1A1A1F`  
* Border: 1px solid rgba(255, 255, 255, 0.06)  
* Border Radius: 12px  
* Padding: 24px  
* Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3)  
* Hover Shadow: 0 4px 6px \-1px rgba(0, 0, 0, 0.4)  
* Transition: all 200ms ease-out

### **Input Fields**

* Height: 40px  
* Background: `#0F0F14`  
* Border: 1px solid `#27272A`  
* Border Radius: 8px  
* Padding: 10px 16px  
* Font Size: 14px  
* Text Color: `#F4F4F5`  
* Placeholder: `#52525B`  
* Focus Border: 1px solid `#8B5CF6`  
* Focus Shadow: 0 0 0 3px rgba(139, 92, 246, 0.1)

### **Text Areas**

* Min Height: 120px  
* Background: `#0F0F14`  
* Border: 1px solid `#27272A`  
* Border Radius: 8px  
* Padding: 12px 16px  
* Font: 14px/20px JetBrains Mono  
* Resize: Vertical only

### **Modals/Dialogs**

* Background: `#1A1A1F`  
* Border Radius: 16px  
* Shadow: 0 25px 50px \-12px rgba(0, 0, 0, 0.75)  
* Backdrop: rgba(0, 0, 0, 0.7)  
* Max Width: 560px  
* Padding: 32px

### **Icons**

* Small: 16px × 16px  
* Default: 20px × 20px  
* Large: 24px × 24px  
* Interactive Color: `#A1A1AA`  
* Active/Hover Color: `#E4E4E7`  
* Accent Color: `#8B5CF6`

## **Spacing System**

* 2px \- Micro (Icon to text spacing)  
* 4px \- Tiny (Related elements)  
* 8px \- Small (Compact spacing)  
* 12px \- Medium-Small (Form elements)  
* 16px \- Default (Standard padding)  
* 24px \- Medium (Section spacing)  
* 32px \- Large (Major sections)  
* 48px \- Extra Large (Page margins)  
* 64px \- Huge (Hero sections)

## **Motion & Animation**

### **Transitions**

* **Micro**: 150ms ease-out (Hover states, small changes)  
* **Default**: 200ms cubic-bezier(0.4, 0, 0.2, 1\) (Most interactions)  
* **Smooth**: 300ms cubic-bezier(0.4, 0, 0.2, 1\) (Modals, dropdowns)  
* **Entrance**: 400ms cubic-bezier(0.0, 0, 0.2, 1\) (Page transitions)

### **Animation Patterns**

* **Fade In**: opacity 0 → 1  
* **Slide Up**: translateY(10px) → translateY(0)  
* **Scale**: scale(0.95) → scale(1)  
* **Gradient Shift**: Background position animation for gradient buttons

### **Interactive States**

* Hover: Transform scale(1.02) for cards, brightness adjustment for buttons  
* Active: Transform scale(0.98)  
* Focus: Box shadow with primary color  
* Loading: Pulse animation with opacity 0.5 → 1

## **Special UI Elements**

### **Gradient Overlays**

* Card Hover Gradient: Linear gradient overlay with 5% opacity  
* Premium Features: Gradient border using pseudo-elements  
* Active Tab: Bottom border with gradient

### **Glass Morphism Elements**

* Background: rgba(26, 26, 31, 0.7)  
* Backdrop Filter: blur(10px)  
* Border: 1px solid rgba(255, 255, 255, 0.1)

### **Code Block Styling**

* Background: `#0A0A0D`  
* Border: 1px solid `#27272A`  
* Border Radius: 8px  
* Padding: 16px  
* Font: 13px/20px JetBrains Mono  
* Syntax Highlighting: Using Prism.js dark theme

### **Tag/Label Components**

* Height: 24px  
* Padding: 4px 12px  
* Border Radius: 12px  
* Background: rgba(139, 92, 246, 0.1)  
* Text: `#A78BFA`  
* Font Size: 12px  
* Border: 1px solid rgba(139, 92, 246, 0.2)

## **Dark Mode Optimizations**

* Reduced contrast for eye comfort (never pure black on white)  
* Subtle gradients to create depth without harsh shadows  
* Increased saturation for accent colors to maintain vibrancy  
* Adjusted opacity values for overlays and disabled states

## **Accessibility Considerations**

* WCAG AA compliant contrast ratios (4.5:1 for normal text, 3:1 for large text)  
* Focus indicators visible and consistent  
* Interactive elements minimum 44px touch target  
* Clear hover and active states  
* Sufficient color contrast for colorblind users

\</app-design-system\>  
\<app-screen-states\>

## **Authentication & User Management**

### **Landing Page**

#### **Initial Load State**

* Hero section with animated gradient background using Primary Purple (`#8B5CF6`) to Pink (`#EC4899`) with subtle wave animation  
* Headline "Your AI Prompts, Organized" in H1 (32px, Bold) with fade-in animation  
* Subheadline in Body Large (16px) in Neutral 400 (`#A1A1AA`): "Transform scattered prompts into an organized knowledge base"  
* Primary CTA button "Get Started" with gradient background, 40px height, smooth scale(1.02) on hover  
* Below fold: Three feature cards with glass morphism effect showcasing key benefits  
* Social proof counter animating up from 0 to current user count  
* Navigation bar with transparent background, blur effect on scroll  
* Smooth parallax scrolling on hero elements

#### **Scroll State**

* Navigation bar transitions to solid `#1A1A1F` background with subtle shadow  
* Feature cards animate in with staggered fade-up effect (translateY(10px) → translateY(0))  
* Interactive preview section shows prompt organization with cursor animation  
* Testimonial cards slide in from sides with intersection observer  
* Footer fades in with links in Neutral 500 (`#71717A`)

### **Registration Modal**

#### **Initial State**

* Modal backdrop with rgba(0, 0, 0, 0.7) fade-in over 300ms  
* Modal container slides up with scale(0.95) → scale(1) animation  
* Email input field auto-focused with purple glow (`#8B5CF6` with 0.1 opacity)  
* "Continue with Email" primary button disabled until valid email  
* Divider with "OR" text in Neutral 500  
* Social login buttons (Google/GitHub) with subtle hover elevation  
* "Already have an account?" link at bottom in Secondary Purple Light (`#A78BFA`)  
* Close button (X) in top-right with rotate animation on hover

#### **Email Validation State**

* Real-time validation with 150ms debounce  
* Green checkmark fades in next to valid email  
* Red error message slides down for invalid format  
* Button enables with color transition when email valid  
* Input border transitions to Success Green (`#10B981`) for valid email

#### **Loading State**

* Button text fades out, replaced by spinning loader  
* Modal content has subtle opacity reduction (0.7)  
* Prevent additional clicks with pointer-events: none  
* Smooth transition lasting 200ms

#### **Password Step State**

* Email field slides up and locks with gray background  
* Password field slides in from bottom with auto-focus  
* Password strength meter appears below with segments  
* Requirements checklist with real-time validation  
* Show/hide password toggle with eye icon morph animation  
* Terms checkbox with custom styling matching brand

#### **Success State**

* Confetti animation using brand colors  
* Success message "Check your email\!" with mail icon  
* Modal content fades out and scales down  
* Smooth redirect to email verification screen

### **Email Verification Screen**

#### **Pending State**

* Full-screen centered container with dark background (`#0F0F14`)  
* Large animated email icon with subtle bounce effect  
* "Check your inbox" as H2 heading  
* Email address displayed in code font style  
* Countdown timer before "Resend" button enables (60s)  
* "Open email app" button with system email client detection  
* Tips section with common issues in collapsible accordion

#### **Resend State**

* Button transforms from disabled to primary style  
* Click triggers subtle pulse animation on email icon  
* Toast notification slides in from top: "Email resent\!"  
* Countdown resets with smooth number transitions

#### **Success State**

* Green checkmark draws in with SVG animation  
* "Email verified\!" message with celebration animation  
* Auto-redirect progress bar at bottom  
* "Continue to app" button for manual proceed  
* Smooth fade transition to onboarding flow

### **Password Reset Flow**

#### **Reset Request Initial State**

* Clean centered form with single email input  
* Forgot password icon animation (key rotating)  
* Clear instruction text in Body size  
* Rate limit warning if multiple attempts detected  
* Link to return to login with back arrow

#### **Reset Request Loading State**

* Button width animates to circle with spinner  
* Form elements fade to 50% opacity  
* Prevents double-submission

#### **Reset Request Success State**

* Full-screen success illustration  
* Clear next steps in numbered list  
* "Check spam folder" reminder  
* Return to login link prominent

#### **Reset Password Form State**

* Token validation with skeleton loader  
* Password field with same styling as registration  
* Confirm password field with match validation  
* Requirements dynamically check off  
* Submit button with gradient effect

#### **Reset Success State**

* Brief success animation  
* "Password updated" message  
* Auto-redirect to login with 3s countdown  
* Manual "Go to login" button

## **Prompt Organization**

### **Create Folder/Tag Hierarchy**

#### **Sidebar Initial State**

* Collapsed to 64px width showing only icons  
* Folder icons in Neutral 400 with tooltip on hover  
* Smooth width transition on hover (64px → 240px)  
* "New Folder" button at bottom with plus icon  
* Drag handle appears on hover for reordering

#### **Sidebar Expanded State**

* 240px width with folder names visible  
* Tree structure with 16px indentation per level  
* Folder count badges in small gray pills  
* Active folder highlighted with purple left border  
* Smooth accordion animations for expand/collapse  
* Search bar slides down from top on CMD+K

#### **Folder Creation Modal Initial State**

* Modal slides up with spring physics animation  
* Name input auto-focused with purple glow  
* Suggested names based on existing patterns  
* Color palette with 12 preset colors in grid  
* Custom color picker collapsed by default  
* Icon grid with search functionality

#### **Folder Creation Icon Selection State**

* Searchable grid of 100+ icons  
* Icons organized by category tabs  
* Selected icon scales up with spring animation  
* Preview of folder appearance updates live  
* Recently used icons section at top

#### **Folder Creation Completion State**

* Create button with gradient background  
* Loading state with button transformation  
* Success state with folder sliding into sidebar  
* Modal fades out with scale down animation  
* New folder auto-selected and expanded

### **Nested Folders with Drag-and-Drop**

#### **Hover State**

* Folder scales to 1.02 with shadow elevation  
* Cursor changes to grab hand  
* Drag handle becomes visible on left edge  
* Multi-select shows checkbox on hover

#### **Dragging State**

* Original position shows dashed outline  
* Dragged item becomes semi-transparent (0.7 opacity)  
* Follows cursor with slight lag for natural feel  
* Count badge shows number if multiple selected  
* Other folders show hover state when valid drop target

#### **Valid Drop State**

* Target folder expands with spring animation  
* Blue insertion line shows exact drop position  
* Target folder highlights with purple glow  
* Preview of new structure in real-time  
* Auto-scroll activates near viewport edges

#### **Invalid Drop State**

* Red tint overlay on invalid targets  
* Subtle shake animation on attempt  
* Cursor shows not-allowed symbol  
* Original position pulses to indicate return

#### **Drop Success State**

* Smooth slide animation to final position  
* Brief purple flash on moved items  
* Success toast with undo option  
* Tree structure reflows with stagger animation  
* Auto-save indicator pulses in corner

## **Prompt Creation & Editing**

### **Rich Text Editor Interface**

#### **Split View Mode**

* Vertical divider with drag handle  
* Synchronized scrolling between panes  
* Live preview updates with 100ms debounce  
* Syntax highlighting in source view  
* Resizable panes with min/max constraints  
* Double-click divider to reset 50/50

#### **Editor Focus State**

* Toolbar fades in at top with formatting options  
* Word count and read time in bottom bar  
* Auto-save indicator with timestamp  
* Zen mode button in top-right corner  
* Format painter tool for style copying

#### **Variable Input State**

* Type {{ to trigger variable dropdown  
* Autocomplete menu with fuzzy search  
* Variables appear as purple pills inline  
* Hover shows variable definition tooltip  
* Click to edit variable properties  
* Delete with backspace or X button

#### **Markdown Rendering State**

* Real-time preview with GitHub-flavored markdown  
* Code blocks with syntax highlighting  
* Copy button appears on code block hover  
* Tables with alternating row colors  
* Checkboxes interactive in preview

#### **Full Screen / Zen Mode**

* Smooth transition with fade to black  
* All UI elements fade out except editor  
* ESC or F11 to exit  
* Subtle breathing animation on cursor  
* Focus mode highlights current paragraph

### **Version Control Interface**

#### **Version Timeline View**

* Horizontal timeline with version dots  
* Hover shows preview of changes  
* Click to expand version details  
* Major versions shown with larger dots  
* Branch points clearly indicated  
* Current version highlighted in purple

#### **Version Comparison View**

* Side-by-side diff with color coding  
* Added content in green background  
* Removed content in red strikethrough  
* Changed content in yellow highlight  
* Line numbers for reference  
* Unified diff option available

#### **Version List View**

* Compact list with key metadata  
* Author avatar and name  
* Relative timestamps ("2 hours ago")  
* Change summary in gray text  
* Revert button on hover  
* Star important versions

#### **Restore Confirmation State**

* Modal with comparison preview  
* "Are you sure?" with consequences explained  
* Show what will be lost/gained  
* Confirm button requires 3s hold  
* Cancel prominent to prevent accidents

#### **Auto-save Indicator States**

* Idle: Gray text "All changes saved"  
* Saving: Pulsing dot with "Saving..."  
* Saved: Green checkmark fades in  
* Error: Red warning with retry button  
* Offline: Orange indicator with queue count

\</app-screen-states\>  
\</design-considerations\>

Begin your response with detailed specification planning in \<brainstorm\> tags, then provide the complete technical specification following the prescribed format.  
\</context\>

# Output \- 5

# **AI Prompt Manager Technical Specification**

## **1\. Executive Summary**

The AI Prompt Manager is a web-based application designed to help AI developers and prompt engineers organize, manage, and optimize their prompt library. The system provides a comprehensive solution for storing prompts with rich text editing, version control, advanced search capabilities, and intelligent organization through folders and tags.

### **Key Technical Decisions**

* **Frontend**: Next.js 14+ App Router for server-side rendering and optimal performance  
* **Backend**: Server Actions instead of traditional REST APIs for seamless client-server communication  
* **Database**: Supabase (PostgreSQL) for robust data storage with full-text search capabilities  
* **Authentication**: Clerk for enterprise-grade authentication with minimal implementation overhead  
* **Deployment**: Vercel for automatic scaling and global edge distribution

### **High-level Architecture**

mermaid

```
graph TB
    subgraph "Client Layer"
        UI[Next.js App Router<br/>React 18+]
        STATE[Zustand Store]
        CACHE[React Query Cache]
    end
    
    subgraph "Edge Layer"
        MW[Next.js Middleware]
        CDN[Vercel Edge Network]
    end
    
    subgraph "Application Layer"
        SA[Server Actions]
        WH[Webhook Handlers]
    end
    
    subgraph "Data Layer"
        PRISMA[Prisma ORM]
        PG[(Supabase PostgreSQL)]
    end
    
    subgraph "External Services"
        CLERK[Clerk Auth]
        VERCEL[Vercel Platform]
    end
    
    UI --> STATE
    UI --> CACHE
    UI --> MW
    MW --> CLERK
    MW --> SA
    
    CACHE --> SA
    SA --> PRISMA
    PRISMA --> PG
    
    CLERK --> WH
    WH --> PRISMA
    
    UI --> CDN
    CDN --> VERCEL
```

## **2\. System Architecture**

### **2.1 Architecture Overview**

The system follows a modern, serverless architecture optimized for developer experience and performance:

**Frontend Architecture**

* Next.js App Router with React Server Components for optimal performance  
* Zustand for lightweight client-side state management  
* React Query for server state synchronization and caching  
* Progressive enhancement with JavaScript optional for core features

**Backend Architecture**

* Server Actions for type-safe server mutations  
* Edge middleware for authentication and request routing  
* Webhook handlers for external service integration  
* Database-first design with Prisma ORM

**Data Flow**

1. User requests hit Vercel Edge Network  
2. Middleware validates authentication via Clerk  
3. Server Components fetch data directly from database  
4. Client Components hydrate with cached data  
5. Mutations occur through Server Actions  
6. Real-time updates via React Query invalidation

### **2.2 Technology Stack**

**Frontend Technologies**

* **Framework**: Next.js 14+ (App Router)  
* **UI Library**: React 18+  
* **State Management**: Zustand 4+  
* **Data Fetching**: TanStack Query (React Query) v5  
* **Styling**: TailwindCSS 3.4+  
* **Animation**: Framer Motion 11+  
* **Rich Text Editor**: CodeMirror 6  
* **Drag & Drop**: @dnd-kit/sortable  
* **Icons**: Lucide React  
* **Forms**: React Hook Form \+ Zod  
* **Date Handling**: date-fns

**Backend Technologies**

* **Runtime**: Node.js 20+ (Vercel)  
* **API Layer**: Next.js Server Actions  
* **ORM**: Prisma 5+  
* **Validation**: Zod  
* **Error Tracking**: Sentry  
* **Logging**: Pino

**Database & Storage**

* **Primary Database**: Supabase (PostgreSQL 15+)  
* **Caching**: React Query in-memory cache  
* **File Storage**: Vercel Blob (for future attachments)  
* **Search**: PostgreSQL Full-Text Search with GIN indexes

**Third-party Services**

* **Authentication**: Clerk  
* **Hosting**: Vercel  
* **Monitoring**: Vercel Analytics  
* **Error Tracking**: Sentry

## **3\. Feature Specifications**

### **3.1 Authentication & User Management**

**User Stories**

* As a user, I can sign up with email/password or social providers  
* As a user, I can reset my password via email  
* As a user, I can manage my profile and preferences  
* As a user, I can see my usage statistics and limits

**Technical Requirements**

* Clerk SDK integration with Next.js middleware  
* User data synchronization via Clerk webhooks  
* Profile data stored in PostgreSQL for app-specific metadata  
* Session management through Clerk's JWT tokens

**Implementation Approach**

typescript

```ts
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/features", "/pricing"],
  afterAuth(auth, req) {
    // Handle post-auth logic
  }
});

// app/api/webhooks/clerk/route.ts
export async function POST(req: Request) {
  const event = await validateWebhookEvent(req);
  
  switch (event.type) {
    case 'user.created':
      await createUserProfile(event.data);
      break;
    case 'user.updated':
      await updateUserProfile(event.data);
      break;
  }
}
```

**User Flow**

1. User clicks "Sign Up" → Clerk modal appears  
2. User enters credentials → Clerk validates  
3. On success → Webhook creates user profile in database  
4. User redirected to onboarding flow  
5. Profile preferences saved via Server Action

**API Endpoints** (Server Actions)

* `updateUserProfile(data: UserProfileInput): Promise<UserProfile>`  
* `updateUserPreferences(preferences: UserPreferences): Promise<void>`  
* `getUserStats(): Promise<UserStatistics>`

**Data Models**

prisma

```
model User {
  id            String   @id @default(cuid())
  clerkId       String   @unique
  email         String   @unique
  name          String?
  avatar        String?
  preferences   Json     @default("{}")
  onboarded     Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  prompts       Prompt[]
  folders       Folder[]
  tags          Tag[]
  templates     Template[]
}
```

**Error Handling**

* Clerk authentication errors show inline messages  
* Network errors trigger retry with exponential backoff  
* Webhook failures logged to Sentry with retry queue

**Performance Considerations**

* User profiles cached in React Query for 5 minutes  
* Clerk session cached in httpOnly cookies  
* Minimal database queries through careful data modeling

### **3.2 Prompt Organization**

**User Stories**

* As a user, I can create nested folders to organize prompts  
* As a user, I can drag and drop prompts between folders  
* As a user, I can create smart collections with rules  
* As a user, I can tag prompts for multi-dimensional organization

**Technical Requirements**

* Recursive folder structure with PostgreSQL CTEs  
* Optimistic UI updates for drag-and-drop operations  
* Many-to-many relationships for prompt-tag associations  
* Smart collection rule engine with dynamic queries

**Implementation Approach**

typescript

```ts
// Recursive folder query
const getFolderTree = async (userId: string) => {
  return prisma.$queryRaw`
    WITH RECURSIVE folder_tree AS (
      SELECT * FROM folders 
      WHERE user_id = ${userId} AND parent_id IS NULL
      
      UNION ALL
      
      SELECT f.* FROM folders f
      INNER JOIN folder_tree ft ON f.parent_id = ft.id
    )
    SELECT * FROM folder_tree
    ORDER BY parent_id, position
  `;
};

// Drag and drop handler
async function moveItem(itemId: string, targetFolderId: string, position: number) {
  // Optimistic update
  updateCache(itemId, { folderId: targetFolderId, position });
  
  try {
    await movePromptServerAction(itemId, targetFolderId, position);
  } catch (error) {
    // Revert on failure
    revertCache(itemId);
    throw error;
  }
}
```

**User Flow**

1. User creates folder via modal dialog  
2. Folder appears in sidebar with animation  
3. User drags prompt to folder  
4. UI updates optimistically  
5. Server Action persists change  
6. On error, UI reverts with error toast

**Data Models**

prisma

```
model Folder {
  id        String   @id @default(cuid())
  name      String
  color     String?
  icon      String?
  userId    String
  parentId  String?
  position  Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user      User     @relation(fields: [userId], references: [id])
  parent    Folder?  @relation("FolderHierarchy", fields: [parentId], references: [id])
  children  Folder[] @relation("FolderHierarchy")
  prompts   Prompt[]
  
  @@index([userId, parentId])
}

model SmartCollection {
  id        String   @id @default(cuid())
  name      String
  userId    String
  rules     Json     // Rule engine configuration
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
}
```

**Error Handling**

* Cascade delete protection with confirmation dialog  
* Circular reference prevention in folder moves  
* Maximum nesting depth of 10 levels  
* Optimistic updates with automatic rollback

### **3.3 Search & Filtering**

**User Stories**

* As a user, I can search prompts by title, content, or tags  
* As a user, I can filter by platform, date range, and author  
* As a user, I can see search suggestions as I type  
* As a user, I can save frequent searches

**Technical Requirements**

* PostgreSQL full-text search with GIN indexes  
* Real-time search with debouncing  
* Faceted search with count aggregations  
* Search result ranking by relevance

**Implementation Approach**

typescript

```ts
// Database indexes
CREATE INDEX prompt_search_idx ON prompts 
USING GIN (to_tsvector('english', title || ' ' || content));

// Server Action for search
export async function searchPrompts(query: SearchQuery) {
  const { text, filters, page = 1, limit = 20 } = query;
  
  const results = await prisma.$queryRaw`
    SELECT 
      p.*,
      ts_rank(to_tsvector('english', p.title || ' ' || p.content), 
              plainto_tsquery('english', ${text})) AS rank
    FROM prompts p
    WHERE 
      to_tsvector('english', p.title || ' ' || p.content) @@ 
      plainto_tsquery('english', ${text})
      ${filters.platform ? Prisma.sql`AND p.platform = ${filters.platform}` : Prisma.empty}
    ORDER BY rank DESC
    LIMIT ${limit} OFFSET ${(page - 1) * limit}
  `;
  
  return results;
}
```

**User Flow**

1. User types in search box  
2. Debounced search triggers after 300ms  
3. Loading skeleton appears  
4. Results render with highlighting  
5. Filters update result count in real-time  
6. Click result to view/edit prompt

**Data Models**

prisma

```
model SearchHistory {
  id        String   @id @default(cuid())
  userId    String
  query     String
  filters   Json?
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
  
  @@index([userId, createdAt])
}
```

**Performance Considerations**

* GIN indexes for full-text search performance  
* Search results cached for 60 seconds  
* Pagination with cursor-based navigation  
* Query suggestion from popular searches

### **3.4 Prompt Creation & Editing**

**User Stories**

* As a user, I can create prompts with rich text formatting  
* As a user, I can use variables in my prompts  
* As a user, I can see version history and restore old versions  
* As a user, I can preview prompts before saving

**Technical Requirements**

* CodeMirror 6 for syntax highlighting and editing  
* Real-time Markdown/XML parsing and preview  
* Automatic version creation on save  
* Diff algorithm for version comparison

**Implementation Approach**

typescript

```ts
// Rich text editor setup
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";

const editorConfig = {
  extensions: [
    markdown(),
    syntaxHighlighting(),
    variableDetection(),
    autoSave({ delay: 2000 })
  ]
};

// Version control
export async function savePromptVersion(
  promptId: string, 
  content: string,
  userId: string
) {
  const lastVersion = await getLastVersion(promptId);
  
  if (hasSignificantChanges(lastVersion?.content, content)) {
    await prisma.promptVersion.create({
      data: {
        promptId,
        content,
        versionNumber: (lastVersion?.versionNumber || 0) + 1,
        createdBy: userId,
        changeSummary: generateChangeSummary(lastVersion?.content, content)
      }
    });
  }
}
```

**User Flow**

1. User clicks "New Prompt"  
2. Editor opens with template  
3. User types with syntax highlighting  
4. Preview updates in real-time  
5. Auto-save triggers every 2 seconds  
6. Version created on significant changes

**Data Models**

prisma

```
model Prompt {
  id          String   @id @default(cuid())
  title       String
  content     String   @db.Text
  description String?
  platform    Platform @default(GENERAL)
  userId      String
  folderId    String?
  isTemplate  Boolean  @default(false)
  isPublic    Boolean  @default(false)
  variables   Json?    // Template variables
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User     @relation(fields: [userId], references: [id])
  folder      Folder?  @relation(fields: [folderId], references: [id])
  versions    PromptVersion[]
  tags        PromptTag[]
  
  @@index([userId, folderId])
  @@index([platform])
}

model PromptVersion {
  id            String   @id @default(cuid())
  promptId      String
  content       String   @db.Text
  versionNumber Int
  changeSummary String?
  createdBy     String
  createdAt     DateTime @default(now())
  
  prompt        Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)
}
```

### **3.5 Templates & Snippets**

**User Stories**

* As a user, I can browse pre-built prompt templates  
* As a user, I can create custom snippets for reuse  
* As a user, I can use variables in templates  
* As a user, I can see template usage analytics

**Technical Requirements**

* Template categorization and search  
* Variable substitution engine  
* Snippet insertion with keyboard shortcuts  
* Usage tracking for popular templates

**Implementation Approach**

typescript

```ts
// Template variable system
interface TemplateVariable {
  name: string;
  type: 'text' | 'select' | 'number';
  default?: string;
  options?: string[];
  validation?: string; // Regex pattern
}

// Variable substitution
export function processTemplate(
  template: string, 
  variables: Record<string, any>
): string {
  return template.replace(
    /\{\{(\w+)\}\}/g, 
    (match, varName) => variables[varName] || match
  );
}

// Server Action
export async function createPromptFromTemplate(
  templateId: string,
  variables: Record<string, any>
) {
  const template = await prisma.template.findUnique({
    where: { id: templateId }
  });
  
  const processedContent = processTemplate(
    template.content, 
    variables
  );
  
  // Track usage
  await prisma.template.update({
    where: { id: templateId },
    data: { usageCount: { increment: 1 } }
  });
  
  return createPrompt({
    title: processTemplate(template.name, variables),
    content: processedContent,
    isTemplate: false
  });
}
```

**Data Models**

prisma

```
model Template {
  id          String   @id @default(cuid())
  name        String
  description String?
  category    String
  content     String   @db.Text
  variables   Json?    // Variable definitions
  isPublic    Boolean  @default(true)
  usageCount  Int      @default(0)
  createdBy   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  creator     User     @relation(fields: [createdBy], references: [id])
  
  @@index([category])
  @@index([usageCount])
}

model Snippet {
  id        String   @id @default(cuid())
  name      String
  content   String
  shortcut  String?  // Keyboard shortcut
  userId    String
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
}
```

## **4\. Data Architecture**

### **4.1 Data Models**

**User Entity**

prisma

```
model User {
  id              String    @id @default(cuid())
  clerkId         String    @unique
  email           String    @unique
  name            String?
  avatar          String?
  bio             String?
  preferences     Json      @default("{}")
  onboarded       Boolean   @default(false)
  role            UserRole  @default(USER)
  storageUsed     BigInt    @default(0)
  promptCount     Int       @default(0)
  lastActiveAt    DateTime  @default(now())
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  prompts         Prompt[]
  folders         Folder[]
  tags            Tag[]
  templates       Template[]
  searchHistory   SearchHistory[]
  activities      Activity[]
  
  @@index([clerkId])
  @@index([email])
}

enum UserRole {
  USER
  ADMIN
}
```

**Prompt Entity**

prisma

```
model Prompt {
  id              String    @id @default(cuid())
  title           String
  content         String    @db.Text
  description     String?
  platform        Platform  @default(GENERAL)
  model           String?   // AI model specification
  userId          String
  folderId        String?
  isTemplate      Boolean   @default(false)
  isPublic        Boolean   @default(false)
  isFavorite      Boolean   @default(false)
  variables       Json?     // Template variables
  metadata        Json?     // Additional metadata
  lastUsedAt      DateTime?
  viewCount       Int       @default(0)
  copyCount       Int       @default(0)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  folder          Folder?   @relation(fields: [folderId], references: [id], onDelete: SetNull)
  versions        PromptVersion[]
  tags            PromptTag[]
  activities      Activity[]
  
  // Indexes
  @@index([userId, folderId])
  @@index([platform])
  @@index([isPublic])
  @@index([createdAt])
}

enum Platform {
  GENERAL
  CHATGPT
  CLAUDE
  GEMINI
  MIDJOURNEY
  DALLE
  STABLE_DIFFUSION
  CUSTOM
}
```

**Folder Entity**

prisma

```
model Folder {
  id              String    @id @default(cuid())
  name            String
  description     String?
  color           String?   @default("#8B5CF6")
  icon            String?   @default("folder")
  userId          String
  parentId        String?
  position        Int       @default(0)
  isExpanded      Boolean   @default(false)
  promptCount     Int       @default(0) // Denormalized for performance
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  parent          Folder?   @relation("FolderHierarchy", fields: [parentId], references: [id], onDelete: Cascade)
  children        Folder[]  @relation("FolderHierarchy")
  prompts         Prompt[]
  
  // Constraints
  @@unique([userId, parentId, name]) // Unique folder names within same parent
  @@index([userId, parentId])
  @@index([position])
}
```

**Tag Entity**

prisma

```
model Tag {
  id              String    @id @default(cuid())
  name            String
  color           String?   @default("#A78BFA")
  userId          String
  usageCount      Int       @default(0) // Denormalized
  createdAt       DateTime  @default(now())
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  prompts         PromptTag[]
  
  // Constraints
  @@unique([userId, name])
  @@index([userId])
  @@index([usageCount])
}

model PromptTag {
  promptId        String
  tagId           String
  createdAt       DateTime  @default(now())
  
  // Relations
  prompt          Prompt    @relation(fields: [promptId], references: [id], onDelete: Cascade)
  tag             Tag       @relation(fields: [tagId], references: [id], onDelete: Cascade)
  
  @@id([promptId, tagId])
  @@index([tagId])
}
```

**Version Control**

prisma

```
model PromptVersion {
  id              String    @id @default(cuid())
  promptId        String
  content         String    @db.Text
  versionNumber   Int
  changeSummary   String?
  metadata        Json?     // Diff metadata
  createdBy       String
  createdAt       DateTime  @default(now())
  
  // Relations
  prompt          Prompt    @relation(fields: [promptId], references: [id], onDelete: Cascade)
  
  // Constraints
  @@unique([promptId, versionNumber])
  @@index([promptId, createdAt])
}
```

**Activity Tracking**

prisma

```
model Activity {
  id              String    @id @default(cuid())
  userId          String
  action          Action
  entityType      EntityType
  entityId        String
  metadata        Json?     // Additional context
  ipAddress       String?
  userAgent       String?
  createdAt       DateTime  @default(now())
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, createdAt])
  @@index([entityType, entityId])
}

enum Action {
  CREATE
  UPDATE
  DELETE
  VIEW
  COPY
  SHARE
  EXPORT
  IMPORT
}

enum EntityType {
  PROMPT
  FOLDER
  TAG
  TEMPLATE
}
```

### **4.2 Data Storage**

**Database Selection**

* **Supabase PostgreSQL**: Primary database for all application data  
* **Rationale**:  
  * Native full-text search capabilities  
  * JSONB support for flexible metadata  
  * Row-level security for multi-tenancy  
  * Recursive CTEs for folder hierarchies  
  * Built-in connection pooling

**Data Persistence Strategies**

* **Write-through caching**: React Query cache with database as source of truth  
* **Optimistic updates**: Immediate UI updates with rollback on failure  
* **Soft deletes**: Prompts marked as deleted, purged after 30 days  
* **Audit trail**: All modifications tracked in Activity table

**Caching Mechanisms**

typescript

```ts
// React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

// Cache key patterns
const cacheKeys = {
  prompts: {
    all: ['prompts'],
    lists: () => [...cacheKeys.prompts.all, 'list'],
    list: (filters: any) => [...cacheKeys.prompts.lists(), filters],
    details: () => [...cacheKeys.prompts.all, 'detail'],
    detail: (id: string) => [...cacheKeys.prompts.details(), id],
  },
  folders: {
    tree: (userId: string) => ['folders', 'tree', userId],
  },
};
```

**Backup and Recovery**

* **Automated backups**: Supabase daily backups with 30-day retention  
* **Point-in-time recovery**: Available for last 7 days  
* **Export functionality**: Users can export all prompts as JSON/Markdown  
* **Import validation**: Schema validation before importing data

## **5\. API Specifications**

### **5.1 Internal APIs (Server Actions)**

**Authentication Actions**

typescript

```ts
// app/actions/auth.ts
export async function updateUserProfile(input: {
  name?: string;
  bio?: string;
  preferences?: UserPreferences;
}) {
  const user = await requireAuth();
  
  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });
  
  revalidatePath('/settings');
  return updated;
}
```

**Prompt Management Actions**

typescript

```ts
// app/actions/prompts.ts
export async function createPrompt(input: {
  title: string;
  content: string;
  description?: string;
  platform?: Platform;
  folderId?: string;
  tags?: string[];
}) {
  const user = await requireAuth();
  
  const prompt = await prisma.prompt.create({
    data: {
      ...input,
      userId: user.id,
      tags: {
        create: input.tags?.map(tagName => ({
          tag: {
            connectOrCreate: {
              where: { userId_name: { userId: user.id, name: tagName } },
              create: { name: tagName, userId: user.id },
            },
          },
        })),
      },
    },
    include: { tags: { include: { tag: true } } },
  });
  
  // Track activity
  await trackActivity({
    action: 'CREATE',
    entityType: 'PROMPT',
    entityId: prompt.id,
  });
  
  revalidatePath('/prompts');
  return prompt;
}

export async function updatePrompt(
  id: string,
  input: Partial<PromptInput>
) {
  const user = await requireAuth();
  
  // Verify ownership
  const existing = await prisma.prompt.findFirst({
    where: { id, userId: user.id },
  });
  
  if (!existing) throw new Error('Prompt not found');
  
  // Create version if content changed
  if (input.content && input.content !== existing.content) {
    await createPromptVersion(id, existing.content);
  }
  
  const updated = await prisma.prompt.update({
    where: { id },
    data: input,
  });
  
  revalidatePath(`/prompts/${id}`);
  return updated;
}

export async function deletePrompt(id: string) {
  const user = await requireAuth();
  
  await prisma.prompt.deleteMany({
    where: { id, userId: user.id },
  });
  
  revalidatePath('/prompts');
}

export async function searchPrompts(query: {
  text?: string;
  platform?: Platform;
  tags?: string[];
  folderId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}) {
  const user = await requireAuth();
  const { page = 1, limit = 20, ...filters } = query;
  
  const where: any = { userId: user.id };
  
  if (filters.text) {
    where.OR = [
      { title: { contains: filters.text, mode: 'insensitive' } },
      { content: { contains: filters.text, mode: 'insensitive' } },
    ];
  }
  
  if (filters.platform) where.platform = filters.platform;
  if (filters.folderId) where.folderId = filters.folderId;
  
  if (filters.tags?.length) {
    where.tags = {
      some: {
        tag: { name: { in: filters.tags } },
      },
    };
  }
  
  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
    if (filters.dateTo) where.createdAt.lte = filters.dateTo;
  }
  
  const [prompts, total] = await Promise.all([
    prisma.prompt.findMany({
      where,
      include: { tags: { include: { tag: true } } },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.prompt.count({ where }),
  ]);
  
  return {
    prompts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}
```

**Folder Management Actions**

typescript

```ts
// app/actions/folders.ts
export async function createFolder(input: {
  name: string;
  parentId?: string;
  color?: string;
  icon?: string;
}) {
  const user = await requireAuth();
  
  // Get next position
  const maxPosition = await prisma.folder.findFirst({
    where: { userId: user.id, parentId: input.parentId },
    orderBy: { position: 'desc' },
    select: { position: true },
  });
  
  const folder = await prisma.folder.create({
    data: {
      ...input,
      userId: user.id,
      position: (maxPosition?.position ?? -1) + 1,
    },
  });
  
  revalidatePath('/prompts');
  return folder;
}

export async function moveFolder(
  id: string,
  targetParentId: string | null,
  position: number
) {
  const user = await requireAuth();
  
  // Verify ownership and prevent circular reference
  const folder = await prisma.folder.findFirst({
    where: { id, userId: user.id },
  });
  
  if (!folder) throw new Error('Folder not found');
  
  // Check for circular reference
  if (targetParentId) {
    const isCircular = await checkCircularReference(id, targetParentId);
    if (isCircular) throw new Error('Circular reference detected');
  }
  
  // Update positions
  await prisma.$transaction([
    // Shift positions in target location
    prisma.folder.updateMany({
      where: {
        userId: user.id,
        parentId: targetParentId,
        position: { gte: position },
      },
      data: { position: { increment: 1 } },
    }),
    // Move folder
    prisma.folder.update({
      where: { id },
      data: { parentId: targetParentId, position },
    }),
  ]);
  
  revalidatePath('/prompts');
}

export async function getFolderTree(userId: string) {
  const folders = await prisma.$queryRaw<Folder[]>`
    WITH RECURSIVE folder_tree AS (
      SELECT * FROM "Folder" 
      WHERE "userId" = ${userId} AND "parentId" IS NULL
      
      UNION ALL
      
      SELECT f.* FROM "Folder" f
      INNER JOIN folder_tree ft ON f."parentId" = ft.id
    )
    SELECT * FROM folder_tree
    ORDER BY "parentId", position
  `;
  
  // Build tree structure
  return buildFolderTree(folders);
}
```

**Response Schemas** All Server Actions return typed responses using Zod schemas:

typescript

```ts
// schemas/api.ts
import { z } from 'zod';

export const PromptSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  description: z.string().optional(),
  platform: z.enum(['GENERAL', 'CHATGPT', 'CLAUDE', ...]),
  userId: z.string(),
  folderId: z.string().optional(),
  isTemplate: z.boolean(),
  isPublic: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tags: z.array(TagSchema).optional(),
});

export const PaginatedResponseSchema = z.object({
  data: z.array(z.unknown()),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
  }),
});

export const ErrorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.string()).optional(),
});
```

### **5.2 External Integrations**

**Clerk Authentication**

typescript

```ts
// Integration: Clerk webhooks
// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET');
  }
  
  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
  
  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);
  
  // Verify webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;
  
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id!,
      "svix-timestamp": svix_timestamp!,
      "svix-signature": svix_signature!,
    }) as WebhookEvent;
  } catch (err) {
    return new Response('Error verifying webhook', { status: 400 });
  }
  
  // Handle events
  switch (evt.type) {
    case 'user.created':
      await handleUserCreated(evt.data);
      break;
    case 'user.updated':
      await handleUserUpdated(evt.data);
      break;
    case 'user.deleted':
      await handleUserDeleted(evt.data);
      break;
  }
  
  return new Response('', { status: 200 });
}

async function handleUserCreated(userData: any) {
  await prisma.user.create({
    data: {
      clerkId: userData.id,
      email: userData.email_addresses[0].email_address,
      name: `${userData.first_name} ${userData.last_name}`.trim(),
      avatar: userData.image_url,
    },
  });
}
```

**Supabase Database**

typescript

```ts
// lib/supabase.ts
import { PrismaClient } from '@prisma/client';

// Connection URL from environment
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
```

**Future Integrations**

typescript

```ts
// AI Platform Integration (future)
interface AIIntegration {
  provider: 'openai' | 'anthropic' | 'google';
  apiKey: string;
  testPrompt: (prompt: string) => Promise<string>;
  validatePrompt: (prompt: string) => Promise<ValidationResult>;
}

// Export Integration (future)
interface ExportIntegration {
  format: 'json' | 'markdown' | 'csv';
  export: (prompts: Prompt[]) => Promise<Blob>;
  import: (file: File) => Promise<Prompt[]>;
}
```

## **6\. Security & Privacy**

### **6.1 Authentication & Authorization**

**Authentication Mechanism**

* **Provider**: Clerk with JWT-based authentication  
* **Session Management**: HTTP-only cookies with secure flag  
* **Token Handling**: Automatic refresh with 15-minute access tokens  
* **Multi-factor**: Optional TOTP-based 2FA through Clerk

**Authorization Strategy**

typescript

```ts
// middleware.ts
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default authMiddleware({
  publicRoutes: ['/', '/features', '/pricing', '/blog(.*)'],
  afterAuth(auth, req) {
    // Redirect logged out users to sign-in
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    
    // Redirect onboarding if needed
    if (auth.userId && !auth.isPublicRoute) {
      const user = await getUserProfile(auth.userId);
      if (!user?.onboarded && req.nextUrl.pathname !== '/onboarding') {
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }
    }
  },
});

// Server-side authorization
export async function requireAuth() {
  const { userId } = auth();
  if (!userId) throw new Error('Unauthorized');
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  
  if (!user) throw new Error('User not found');
  return user;
}

// Role-based access
export async function requireRole(role: UserRole) {
  const user = await requireAuth();
  if (user.role !== role) throw new Error('Insufficient permissions');
  return user;
}
```

### **6.2 Data Security**

**Encryption Strategies**

* **At Rest**: Supabase encrypts all data at rest using AES-256  
* **In Transit**: All connections use TLS 1.3  
* **Sensitive Data**: User tokens encrypted with APP\_SECRET before storage

typescript

```ts
// lib/encryption.ts
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-gcm';
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');

export function encrypt(text: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, secretKey, iv);
  
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);
  
  const authTag = cipher.getAuthTag();
  
  return Buffer.concat([authTag, iv, encrypted]).toString('hex');
}

export function decrypt(encryptedHex: string): string {
  const encrypted = Buffer.from(encryptedHex, 'hex');
  
  const authTag = encrypted.slice(0, 16);
  const iv = encrypted.slice(16, 32);
  const text = encrypted.slice(32);
  
  const decipher = createDecipheriv(algorithm, secretKey, iv);
  decipher.setAuthTag(authTag);
  
  return decipher.update(text) + decipher.final('utf8');
}
```

**PII Handling**

* Email addresses hashed for logging  
* No PII in URL parameters  
* User data deletion on account closure  
* Export functionality for data portability

**Compliance Requirements**

* **GDPR**: Data export, deletion rights, consent management  
* **CCPA**: California privacy rights support  
* **SOC 2**: Audit logging, access controls

### **6.3 Application Security**

**Input Validation**

typescript

```ts
// lib/validation.ts
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// Prompt content validation
export const PromptContentSchema = z.string()
  .min(1, 'Content is required')
  .max(50000, 'Content too long')
  .transform((content) => {
    // Sanitize HTML but preserve markdown
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    });
  });

// SQL injection prevention via Prisma
// XSS prevention via React's default escaping
// CSRF protection via Server Actions
```

**Security Headers**

typescript

```ts
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];
```

**Rate Limiting**

typescript

```ts
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function checkRateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await ratelimit.limit(
    identifier
  );
  
  if (!success) {
    throw new Error('Rate limit exceeded');
  }
  
  return { limit, reset, remaining };
}

// Usage in Server Actions
export async function createPrompt(input: PromptInput) {
  const user = await requireAuth();
  await checkRateLimit(`create-prompt:${user.id}`);
  
  // ... rest of implementation
}
```

## **7\. User Interface Specifications**

### **7.1 Design System**

**Visual Design Principles**

* **Bold Simplicity**: Clean interfaces with purposeful complexity  
* **Breathable Whitespace**: Strategic negative space for cognitive comfort  
* **Motion Choreography**: Physics-based transitions for spatial continuity  
* **Content-First**: Prioritize user objectives over decoration

**Component Library Structure**

```
/components
  /ui              # Base UI components
    /button
    /input
    /card
    /modal
  /features        # Feature-specific components
    /prompts
    /folders
    /editor
  /layouts         # Layout components
    /sidebar
    /header
    /footer
```

**Responsive Design Approach**

* Mobile-first development  
* Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)  
* Touch-optimized interactions for mobile  
* Adaptive layouts for different screen sizes

**Accessibility Standards**

* WCAG 2.1 AA compliance  
* Keyboard navigation support  
* Screen reader optimization  
* Focus indicators and skip links  
* Reduced motion preferences

### **7.2 Design Foundations**

#### **7.2.1 Color System**

**Primary Colors**

css

```css
:root {
  /* Primary */
  --primary-dark: #0F0F14;        /* Deep charcoal backgrounds */
  --primary-surface: #1A1A1F;     /* Elevated surfaces */
  --primary-light: #F8F9FA;       /* Text and highlights */
  
  /* Secondary */
  --secondary-purple: #8B5CF6;    /* Primary accent */
  --secondary-purple-light: #A78BFA; /* Hover states */
  --secondary-purple-pale: #EDE9FE;  /* Subtle backgrounds */
  
  /* Accent Gradient */
  --gradient-start: #8B5CF6;      /* Purple */
  --gradient-end: #EC4899;        /* Pink */
  --gradient: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  
  /* Functional */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
  
  /* Neutrals */
  --neutral-50: #FAFAFA;
  --neutral-100: #F4F4F5;
  --neutral-200: #E4E4E7;
  --neutral-400: #A1A1AA;
  --neutral-500: #71717A;
  --neutral-600: #52525B;
  --neutral-700: #3F3F46;
  --neutral-800: #27272A;
  --neutral-900: #18181B;
}
```

#### **7.2.2 Typography**

css

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.75rem;    /* 28px */
  --text-4xl: 2rem;       /* 32px */
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}

/* Typography Classes */
.heading-1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.body-large {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.code-block {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}
```

#### **7.2.3 Spacing & Layout**

css

```css
:root {
  /* Base Unit: 4px */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  
  /* Container */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  
  /* Border Radius */
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;
}
```

#### **7.2.4 Interactive Elements**

css

```css
/* Button Base */
.button {
  height: 40px;
  padding: 0 var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  border-radius: var(--radius-md);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

/* Primary Button */
.button-primary {
  background: var(--gradient);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.25);
}

.button-primary:hover {
  filter: brightness(1.1);
  transform: scale(1.02);
}

.button-primary:active {
  transform: scale(0.98);
}

/* Input Fields */
.input {
  height: 40px;
  padding: 0 var(--space-4);
  background: var(--primary-dark);
  border: 1px solid var(--neutral-800);
  border-radius: var(--radius-md);
  color: var(--neutral-100);
  font-size: var(--text-sm);
  transition: all 150ms ease-out;
}

.input:focus {
  outline: none;
  border-color: var(--secondary-purple);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

/* Cards */
.card {
  background: var(--primary-surface);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  transition: all 200ms ease-out;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  transform: translateY(-1px);
}
```

#### **7.2.5 Component Specifications**

**Design Tokens Structure**

typescript

```ts
// theme/tokens.ts
export const tokens = {
  colors: {
    primary: {
      dark: '#0F0F14',
      surface: '#1A1A1F',
      light: '#F8F9FA',
    },
    secondary: {
      purple: '#8B5CF6',
      purpleLight: '#A78BFA',
      purplePale: '#EDE9FE',
    },
    // ... rest of colors
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    // ... rest of spacing
  },
  typography: {
    fonts: {
      sans: 'Inter, -apple-system, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      // ... rest of sizes
    },
  },
};
```

### **7.3 User Experience Flows**

**Key User Journeys**

1. **First-Time User Onboarding**  
   * Landing page → Sign up → Email verification  
   * Welcome screen → Feature tour  
   * Create first prompt → Organization tutorial  
   * Dashboard with sample content  
2. **Prompt Creation Flow**  
   * Dashboard → New prompt button  
   * Editor opens with template selection  
   * Write/edit with live preview  
   * Add tags and folder  
   * Save with auto-versioning  
3. **Search and Discovery**  
   * Search bar with suggestions  
   * Filter sidebar with facets  
   * Results with highlighting  
   * Quick actions on hover  
   * Bulk operations

**Navigation Structure**

```
/                     # Landing page
/sign-in             # Authentication
/sign-up
/dashboard           # Main dashboard
/prompts             # Prompt list/grid
  /new               # Create new prompt
  /[id]              # View/edit prompt
  /templates         # Template gallery
/folders             # Folder management
/search              # Advanced search
/settings            # User settings
  /profile
  /preferences
  /billing
/admin               # Admin panel (role-based)
```

**State Management**

typescript

```ts
// stores/ui.ts
interface UIState {
  sidebar: {
    isOpen: boolean;
    activeFolder: string | null;
  };
  editor: {
    mode: 'edit' | 'preview' | 'split';
    isDirty: boolean;
    autoSaveEnabled: boolean;
  };
  search: {
    query: string;
    filters: SearchFilters;
    view: 'grid' | 'list';
  };
}

// stores/prompts.ts
interface PromptsState {
  prompts: Map<string, Prompt>;
  selected: Set<string>;
  sortBy: 'updated' | 'created' | 'title';
  filterBy: FilterOptions;
}
```

## **8\. Infrastructure & Deployment**

### **8.1 Infrastructure Requirements**

**Hosting Environment**

* **Platform**: Vercel (serverless)  
* **Regions**: Auto-scaled globally via Vercel Edge Network  
* **Environment**: Node.js 20.x runtime

**Server Requirements**

* **Compute**: Serverless functions with 10s default timeout  
* **Memory**: 1024MB per function (configurable up to 3008MB)  
* **Concurrent Executions**: 1000 (Vercel Pro plan)

**Network Architecture**

* **CDN**: Vercel Edge Network for static assets  
* **API Routes**: Serverless functions at edge locations  
* **Database Connection**: Direct connection to Supabase  
* **WebSockets**: Not required for MVP

**Storage Requirements**

* **Database Storage**:  
  * Initial: 8GB (Supabase free tier)  
  * Growth projection: \~1GB per 10,000 active users  
  * Scaling: Automatic with Supabase Pro  
* **File Storage**:  
  * Vercel Blob for future attachments  
  * 1GB included, $0.03/GB additional  
* **Build Artifacts**:  
  * Vercel handles automatically  
  * Retained for 90 days

### **8.2 Deployment Strategy**

**CI/CD Pipeline**

yaml

```
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      
      # Database migrations check
      - run: npx prisma validate
      - run: npx prisma generate
  
  deploy-preview:
    needs: test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
  
  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      # Run migrations
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      
      # Deploy to Vercel
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Environment Management**

typescript

```ts
// env.mjs - Runtime environment validation
import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // Authentication
  CLERK_SECRET_KEY: z.string(),
  CLERK_WEBHOOK_SECRET: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  
  // Application
  NEXT_PUBLIC_APP_URL: z.string().url(),
  ENCRYPTION_KEY: z.string().length(64), // 32 bytes hex
  
  // External Services
  SENTRY_DSN: z.string().url().optional(),
  VERCEL_ENV: z.enum(['development', 'preview', 'production']),
});

export const env = envSchema.parse(process.env);
```

**Deployment Procedures**

1. **Development Workflow**  
    bash

```shell
# Local development
npm run dev

# Run migrations
npm run db:migrate

# Type checking
npm run type-check

# Testing
npm run test
```

3. 

4. **Staging Deployment**  
   * Push to `develop` branch  
   * Automatic deployment to staging-\[project\].vercel.app  
   * Run E2E tests against staging  
   * Manual QA verification  
5. **Production Deployment**  
   * Merge PR to `main` branch  
   * Automated tests run  
   * Database migrations applied  
   * Deployment to production  
   * Monitor error rates and performance

**Rollback Strategy**

bash

```shell
# Instant rollback via Vercel
vercel rollback [
```

Retry

S

Continue

Edit

**Rollback Strategy** (continued)

bash

```shell
# Instant rollback via Vercel
vercel rollback [deployment-url]

# Database rollback
npx prisma migrate resolve --rolled-back [migration-name]

# Feature flag rollback (future)
# Disable feature via environment variable without redeploy
```

**Configuration Management**

typescript

```ts
// config/index.ts
export const config = {
  app: {
    name: 'AI Prompt Manager',
    url: env.NEXT_PUBLIC_APP_URL,
    version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'dev',
  },
  features: {
    templateSharing: process.env.FEATURE_TEMPLATE_SHARING === 'true',
    aiSuggestions: process.env.FEATURE_AI_SUGGESTIONS === 'true',
    collaboration: process.env.FEATURE_COLLABORATION === 'true',
  },
  limits: {
    maxPromptsPerUser: 1000,
    maxFolderDepth: 10,
    maxTagsPerPrompt: 20,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
  cache: {
    promptTTL: 5 * 60 * 1000, // 5 minutes
    folderTTL: 10 * 60 * 1000, // 10 minutes
    searchTTL: 60 * 1000, // 1 minute
  },
};
```

## **9\. Performance & Monitoring**

### **9.1 Performance Optimization**

**Frontend Optimizations**

typescript

```ts
// next.config.js
const nextConfig = {
  images: {
    domains: ['img.clerk.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

// Dynamic imports for code splitting
const Editor = dynamic(() => import('@/components/editor'), {
  loading: () => <EditorSkeleton />,
  ssr: false,
});

// Image optimization
import Image from 'next/image';

// Font optimization
import { Inter } from 'next/font/google';
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

**Database Optimizations**

sql

```sql
-- Indexes for performance
CREATE INDEX idx_prompts_user_folder ON prompts(user_id, folder_id);
CREATE INDEX idx_prompts_created ON prompts(created_at DESC);
CREATE INDEX idx_prompts_search ON prompts USING GIN(to_tsvector('english', title || ' ' || content));
CREATE INDEX idx_folders_user_parent ON folders(user_id, parent_id);
CREATE INDEX idx_tags_user_usage ON tags(user_id, usage_count DESC);

-- Materialized view for folder statistics
CREATE MATERIALIZED VIEW folder_stats AS
SELECT 
  f.id,
  f.user_id,
  COUNT(p.id) as prompt_count,
  MAX(p.updated_at) as last_activity
FROM folders f
LEFT JOIN prompts p ON f.id = p.folder_id
GROUP BY f.id, f.user_id;

-- Refresh periodically
CREATE OR REPLACE FUNCTION refresh_folder_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY folder_stats;
END;
$$ LANGUAGE plpgsql;
```

**Caching Strategy**

typescript

```ts
// React Query cache configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false;
        return failureCount < 3;
      },
    },
  },
});

// Prefetching
export async function prefetchUserData() {
  await queryClient.prefetchQuery({
    queryKey: ['user', 'profile'],
    queryFn: getUserProfile,
  });
  
  await queryClient.prefetchQuery({
    queryKey: ['folders', 'tree'],
    queryFn: getFolderTree,
  });
}
```

### **9.2 Monitoring & Analytics**

**Application Monitoring**

typescript

```ts
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

// Error tracking with Sentry
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

**Performance Metrics**

typescript

```ts
// lib/metrics.ts
export function trackPerformance(metric: string, value: number) {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value),
      event_category: 'Performance',
    });
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance: ${metric} = ${value}ms`);
  }
}

// Usage
const startTime = performance.now();
await searchPrompts(query);
trackPerformance('search_duration', performance.now() - startTime);
```

**Health Checks**

typescript

```ts
// app/api/health/route.ts
export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    checks: {
      database: 'unknown',
      auth: 'unknown',
    },
  };
  
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;
    checks.checks.database = 'healthy';
  } catch (error) {
    checks.checks.database = 'unhealthy';
    checks.status = 'degraded';
  }
  
  try {
    // Check auth service
    const response = await fetch('https://api.clerk.dev/v1/health');
    checks.checks.auth = response.ok ? 'healthy' : 'unhealthy';
  } catch (error) {
    checks.checks.auth = 'unhealthy';
    checks.status = 'degraded';
  }
  
  return NextResponse.json(checks);
}
```

## **10\. Testing Strategy**

### **10.1 Testing Approach**

**Unit Testing**

typescript

```ts
// __tests__/actions/prompts.test.ts
import { createPrompt, updatePrompt } from '@/app/actions/prompts';
import { prismaMock } from '@/test/prisma-mock';

describe('Prompt Actions', () => {
  it('should create a prompt', async () => {
    const input = {
      title: 'Test Prompt',
      content: 'Test content',
      platform: 'CHATGPT',
    };
    
    prismaMock.prompt.create.mockResolvedValue({
      id: '1',
      ...input,
      userId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    const result = await createPrompt(input);
    
    expect(result).toHaveProperty('id');
    expect(result.title).toBe(input.title);
  });
});
```

**Integration Testing**

typescript

```ts
// __tests__/integration/search.test.ts
import { POST } from '@/app/api/search/route';

describe('Search Integration', () => {
  it('should return search results', async () => {
    const request = new Request('http://localhost/api/search', {
      method: 'POST',
      body: JSON.stringify({
        query: 'test prompt',
        filters: { platform: 'CHATGPT' },
      }),
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('results');
    expect(data).toHaveProperty('total');
  });
});
```

**E2E Testing**

typescript

```ts
// e2e/prompt-creation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Prompt Creation', () => {
  test('should create and save a new prompt', async ({ page }) => {
    // Login
    await page.goto('/sign-in');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password');
    await page.click('button[type="submit"]');
    
    // Navigate to new prompt
    await page.goto('/prompts/new');
    
    // Fill prompt details
    await page.fill('[name="title"]', 'Test Prompt');
    await page.fill('[name="content"]', 'This is a test prompt');
    
    // Save
    await page.click('button:has-text("Save")');
    
    // Verify redirect and success
    await expect(page).toHaveURL(/\/prompts\/[\w-]+$/);
    await expect(page.locator('text=Prompt saved')).toBeVisible();
  });
});
```

### **10.2 Quality Assurance**

**Code Quality Tools**

json

```json
// package.json scripts
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "analyze": "ANALYZE=true next build"
  }
}
```

**Pre-commit Hooks**

json

```json
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run type-check
npm run test -- --passWithNoTests
```

**Performance Budget**

javascript

```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
  },
};
```

## **11\. Future Considerations**

### **11.1 Scalability Planning**

**Database Scaling**

* Implement read replicas for search queries  
* Partition prompts table by user\_id  
* Archive old versions to cold storage  
* Implement connection pooling with pgBouncer

**Application Scaling**

* Implement Redis for session storage  
* Add CDN for static assets  
* Implement queue system for heavy operations  
* Add WebSocket support for real-time features

### **11.2 Feature Roadmap**

**Phase 2 Features**

* AI-powered prompt suggestions  
* Collaborative editing  
* Public prompt marketplace  
* API access for developers  
* Mobile applications

**Phase 3 Features**

* Advanced analytics dashboard  
* Team workspaces  
* Custom AI model integration  
* Prompt performance tracking  
* Export to various AI platforms

## **12\. Project Structure**

```
ai-prompt-manager/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth group routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (dashboard)/         # Dashboard group routes
│   │   ├── layout.tsx       # Dashboard layout
│   │   ├── page.tsx         # Dashboard home
│   │   ├── prompts/
│   │   │   ├── page.tsx     # Prompts list
│   │   │   ├── new/
│   │   │   └── [id]/
│   │   ├── folders/
│   │   ├── search/
│   │   └── settings/
│   ├── api/                 # API routes
│   │   ├── webhooks/
│   │   └── health/
│   ├── actions/             # Server Actions
│   │   ├── auth.ts
│   │   ├── prompts.ts
│   │   ├── folders.ts
│   │   └── search.ts
│   └── globals.css
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── features/            # Feature components
│   └── layouts/             # Layout components
├── lib/                     # Utilities
│   ├── prisma.ts
│   ├── auth.ts
│   ├── validation.ts
│   └── utils.ts
├── hooks/                   # Custom React hooks
├── stores/                  # Zustand stores
├── types/                   # TypeScript types
├── prisma/                  # Database
│   ├── schema.prisma
│   └── migrations/
├── public/                  # Static assets
├── tests/                   # Test files
└── config/                  # Configuration
```

# Step \#6 \- Rules

No prompt here

# Step \#7 \- Planner

\<goal\>You are an AI-engineer tasked with breaking down a complicated technical specification into detailed steps that retain a high-degree of granularity based on the original specifications. 

Your goal is to generate a highly-detailed, step-wise task plan that leaves no detail un-addressed.

You should pass-back-through your output several times to ensure no data is left out.

The main context for this task is provided in the Context section below, namely:

- The tech specification  
- Any critical project rules  
- The core application intent documentation

Wrap your thought process in \<thinking\> tags  
\</goal\>  
\<format\>

\#\# \[Section N\]  
\- \[ \] Step 1: \[Brief title\]  
  \- \*\*Task\*\*: \[Detailed explanation of what needs to be implemented\]  
  \- \*\*Files\*\*: \[Maximum of 15 files, ideally less\]  
    \- \`path/to/file1.ts\`: \[Description of changes\]  
  \- \*\*Step Dependencies\*\*: \[Step Dependencies\]  
  \- \*\*User Instructions\*\*: \[Instructions for User\]

\#\# \[Section N \+ 1\]  
\#\# \[Section N \+ 2\]

Repeat for all steps

\<format\>  
\<warnings-and-guidelines\>

- You ARE allowed to mix backend and frontend steps together if it makes sense  
- Each step must not modify more then 15 files in a single-run. If it does, you need to ask the user for permission and explain why it’s a special case.

\<guidelines\>

- Always start with project setup and critical-path configurations  
- Try to make each new step contained, so that the app can be built and functional between tasks  
- Mark dependencies between steps

\</guidelines\>  
\</warnings-and-guidelines\>  
\<context\>  
\<tech-specification\>**AI Prompt Manager Technical Specification**

## **1\. Executive Summary**

The AI Prompt Manager is a web-based application designed to help AI developers and prompt engineers organize, manage, and optimize their prompt library. The system provides a comprehensive solution for storing prompts with rich text editing, version control, advanced search capabilities, and intelligent organization through folders and tags.

### **Key Technical Decisions**

* **Frontend**: Next.js 14+ App Router for server-side rendering and optimal performance  
* **Backend**: Server Actions instead of traditional REST APIs for seamless client-server communication  
* **Database**: Supabase (PostgreSQL) for robust data storage with full-text search capabilities  
* **Authentication**: Clerk for enterprise-grade authentication with minimal implementation overhead  
* **Deployment**: Vercel for automatic scaling and global edge distribution

### **High-level Architecture**

mermaid

```
graph TB
    subgraph "Client Layer"
        UI[Next.js App Router<br/>React 18+]
        STATE[Zustand Store]
        CACHE[React Query Cache]
    end
    
    subgraph "Edge Layer"
        MW[Next.js Middleware]
        CDN[Vercel Edge Network]
    end
    
    subgraph "Application Layer"
        SA[Server Actions]
        WH[Webhook Handlers]
    end
    
    subgraph "Data Layer"
        PRISMA[Prisma ORM]
        PG[(Supabase PostgreSQL)]
    end
    
    subgraph "External Services"
        CLERK[Clerk Auth]
        VERCEL[Vercel Platform]
    end
    
    UI --> STATE
    UI --> CACHE
    UI --> MW
    MW --> CLERK
    MW --> SA
    
    CACHE --> SA
    SA --> PRISMA
    PRISMA --> PG
    
    CLERK --> WH
    WH --> PRISMA
    
    UI --> CDN
    CDN --> VERCEL
```

## **2\. System Architecture**

### **2.1 Architecture Overview**

The system follows a modern, serverless architecture optimized for developer experience and performance:

**Frontend Architecture**

* Next.js App Router with React Server Components for optimal performance  
* Zustand for lightweight client-side state management  
* React Query for server state synchronization and caching  
* Progressive enhancement with JavaScript optional for core features

**Backend Architecture**

* Server Actions for type-safe server mutations  
* Edge middleware for authentication and request routing  
* Webhook handlers for external service integration  
* Database-first design with Prisma ORM

**Data Flow**

1. User requests hit Vercel Edge Network  
2. Middleware validates authentication via Clerk  
3. Server Components fetch data directly from database  
4. Client Components hydrate with cached data  
5. Mutations occur through Server Actions  
6. Real-time updates via React Query invalidation

### **2.2 Technology Stack**

**Frontend Technologies**

* **Framework**: Next.js 14+ (App Router)  
* **UI Library**: React 18+  
* **State Management**: Zustand 4+  
* **Data Fetching**: TanStack Query (React Query) v5  
* **Styling**: TailwindCSS 3.4+  
* **Animation**: Framer Motion 11+  
* **Rich Text Editor**: CodeMirror 6  
* **Drag & Drop**: @dnd-kit/sortable  
* **Icons**: Lucide React  
* **Forms**: React Hook Form \+ Zod  
* **Date Handling**: date-fns

**Backend Technologies**

* **Runtime**: Node.js 20+ (Vercel)  
* **API Layer**: Next.js Server Actions  
* **ORM**: Prisma 5+  
* **Validation**: Zod  
* **Error Tracking**: Sentry  
* **Logging**: Pino

**Database & Storage**

* **Primary Database**: Supabase (PostgreSQL 15+)  
* **Caching**: React Query in-memory cache  
* **File Storage**: Vercel Blob (for future attachments)  
* **Search**: PostgreSQL Full-Text Search with GIN indexes

**Third-party Services**

* **Authentication**: Clerk  
* **Hosting**: Vercel  
* **Monitoring**: Vercel Analytics  
* **Error Tracking**: Sentry

## **3\. Feature Specifications**

### **3.1 Authentication & User Management**

**User Stories**

* As a user, I can sign up with email/password or social providers  
* As a user, I can reset my password via email  
* As a user, I can manage my profile and preferences  
* As a user, I can see my usage statistics and limits

**Technical Requirements**

* Clerk SDK integration with Next.js middleware  
* User data synchronization via Clerk webhooks  
* Profile data stored in PostgreSQL for app-specific metadata  
* Session management through Clerk's JWT tokens

**Implementation Approach**

typescript

```ts
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/features", "/pricing"],
  afterAuth(auth, req) {
    // Handle post-auth logic
  }
});

// app/api/webhooks/clerk/route.ts
export async function POST(req: Request) {
  const event = await validateWebhookEvent(req);
  
  switch (event.type) {
    case 'user.created':
      await createUserProfile(event.data);
      break;
    case 'user.updated':
      await updateUserProfile(event.data);
      break;
  }
}
```

**User Flow**

1. User clicks "Sign Up" → Clerk modal appears  
2. User enters credentials → Clerk validates  
3. On success → Webhook creates user profile in database  
4. User redirected to onboarding flow  
5. Profile preferences saved via Server Action

**API Endpoints** (Server Actions)

* `updateUserProfile(data: UserProfileInput): Promise<UserProfile>`  
* `updateUserPreferences(preferences: UserPreferences): Promise<void>`  
* `getUserStats(): Promise<UserStatistics>`

**Data Models**

prisma

```
model User {
  id            String   @id @default(cuid())
  clerkId       String   @unique
  email         String   @unique
  name          String?
  avatar        String?
  preferences   Json     @default("{}")
  onboarded     Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  prompts       Prompt[]
  folders       Folder[]
  tags          Tag[]
  templates     Template[]
}
```

**Error Handling**

* Clerk authentication errors show inline messages  
* Network errors trigger retry with exponential backoff  
* Webhook failures logged to Sentry with retry queue

**Performance Considerations**

* User profiles cached in React Query for 5 minutes  
* Clerk session cached in httpOnly cookies  
* Minimal database queries through careful data modeling

### **3.2 Prompt Organization**

**User Stories**

* As a user, I can create nested folders to organize prompts  
* As a user, I can drag and drop prompts between folders  
* As a user, I can create smart collections with rules  
* As a user, I can tag prompts for multi-dimensional organization

**Technical Requirements**

* Recursive folder structure with PostgreSQL CTEs  
* Optimistic UI updates for drag-and-drop operations  
* Many-to-many relationships for prompt-tag associations  
* Smart collection rule engine with dynamic queries

**Implementation Approach**

typescript

```ts
// Recursive folder query
const getFolderTree = async (userId: string) => {
  return prisma.$queryRaw`
    WITH RECURSIVE folder_tree AS (
      SELECT * FROM folders 
      WHERE user_id = ${userId} AND parent_id IS NULL
      
      UNION ALL
      
      SELECT f.* FROM folders f
      INNER JOIN folder_tree ft ON f.parent_id = ft.id
    )
    SELECT * FROM folder_tree
    ORDER BY parent_id, position
  `;
};

// Drag and drop handler
async function moveItem(itemId: string, targetFolderId: string, position: number) {
  // Optimistic update
  updateCache(itemId, { folderId: targetFolderId, position });
  
  try {
    await movePromptServerAction(itemId, targetFolderId, position);
  } catch (error) {
    // Revert on failure
    revertCache(itemId);
    throw error;
  }
}
```

**User Flow**

1. User creates folder via modal dialog  
2. Folder appears in sidebar with animation  
3. User drags prompt to folder  
4. UI updates optimistically  
5. Server Action persists change  
6. On error, UI reverts with error toast

**Data Models**

prisma

```
model Folder {
  id        String   @id @default(cuid())
  name      String
  color     String?
  icon      String?
  userId    String
  parentId  String?
  position  Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user      User     @relation(fields: [userId], references: [id])
  parent    Folder?  @relation("FolderHierarchy", fields: [parentId], references: [id])
  children  Folder[] @relation("FolderHierarchy")
  prompts   Prompt[]
  
  @@index([userId, parentId])
}

model SmartCollection {
  id        String   @id @default(cuid())
  name      String
  userId    String
  rules     Json     // Rule engine configuration
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
}
```

**Error Handling**

* Cascade delete protection with confirmation dialog  
* Circular reference prevention in folder moves  
* Maximum nesting depth of 10 levels  
* Optimistic updates with automatic rollback

### **3.3 Search & Filtering**

**User Stories**

* As a user, I can search prompts by title, content, or tags  
* As a user, I can filter by platform, date range, and author  
* As a user, I can see search suggestions as I type  
* As a user, I can save frequent searches

**Technical Requirements**

* PostgreSQL full-text search with GIN indexes  
* Real-time search with debouncing  
* Faceted search with count aggregations  
* Search result ranking by relevance

**Implementation Approach**

typescript

```ts
// Database indexes
CREATE INDEX prompt_search_idx ON prompts 
USING GIN (to_tsvector('english', title || ' ' || content));

// Server Action for search
export async function searchPrompts(query: SearchQuery) {
  const { text, filters, page = 1, limit = 20 } = query;
  
  const results = await prisma.$queryRaw`
    SELECT 
      p.*,
      ts_rank(to_tsvector('english', p.title || ' ' || p.content), 
              plainto_tsquery('english', ${text})) AS rank
    FROM prompts p
    WHERE 
      to_tsvector('english', p.title || ' ' || p.content) @@ 
      plainto_tsquery('english', ${text})
      ${filters.platform ? Prisma.sql`AND p.platform = ${filters.platform}` : Prisma.empty}
    ORDER BY rank DESC
    LIMIT ${limit} OFFSET ${(page - 1) * limit}
  `;
  
  return results;
}
```

**User Flow**

1. User types in search box  
2. Debounced search triggers after 300ms  
3. Loading skeleton appears  
4. Results render with highlighting  
5. Filters update result count in real-time  
6. Click result to view/edit prompt

**Data Models**

prisma

```
model SearchHistory {
  id        String   @id @default(cuid())
  userId    String
  query     String
  filters   Json?
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
  
  @@index([userId, createdAt])
}
```

**Performance Considerations**

* GIN indexes for full-text search performance  
* Search results cached for 60 seconds  
* Pagination with cursor-based navigation  
* Query suggestion from popular searches

### **3.4 Prompt Creation & Editing**

**User Stories**

* As a user, I can create prompts with rich text formatting  
* As a user, I can use variables in my prompts  
* As a user, I can see version history and restore old versions  
* As a user, I can preview prompts before saving

**Technical Requirements**

* CodeMirror 6 for syntax highlighting and editing  
* Real-time Markdown/XML parsing and preview  
* Automatic version creation on save  
* Diff algorithm for version comparison

**Implementation Approach**

typescript

```ts
// Rich text editor setup
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";

const editorConfig = {
  extensions: [
    markdown(),
    syntaxHighlighting(),
    variableDetection(),
    autoSave({ delay: 2000 })
  ]
};

// Version control
export async function savePromptVersion(
  promptId: string, 
  content: string,
  userId: string
) {
  const lastVersion = await getLastVersion(promptId);
  
  if (hasSignificantChanges(lastVersion?.content, content)) {
    await prisma.promptVersion.create({
      data: {
        promptId,
        content,
        versionNumber: (lastVersion?.versionNumber || 0) + 1,
        createdBy: userId,
        changeSummary: generateChangeSummary(lastVersion?.content, content)
      }
    });
  }
}
```

**User Flow**

1. User clicks "New Prompt"  
2. Editor opens with template  
3. User types with syntax highlighting  
4. Preview updates in real-time  
5. Auto-save triggers every 2 seconds  
6. Version created on significant changes

**Data Models**

prisma

```
model Prompt {
  id          String   @id @default(cuid())
  title       String
  content     String   @db.Text
  description String?
  platform    Platform @default(GENERAL)
  userId      String
  folderId    String?
  isTemplate  Boolean  @default(false)
  isPublic    Boolean  @default(false)
  variables   Json?    // Template variables
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User     @relation(fields: [userId], references: [id])
  folder      Folder?  @relation(fields: [folderId], references: [id])
  versions    PromptVersion[]
  tags        PromptTag[]
  
  @@index([userId, folderId])
  @@index([platform])
}

model PromptVersion {
  id            String   @id @default(cuid())
  promptId      String
  content       String   @db.Text
  versionNumber Int
  changeSummary String?
  createdBy     String
  createdAt     DateTime @default(now())
  
  prompt        Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)
}
```

### **3.5 Templates & Snippets**

**User Stories**

* As a user, I can browse pre-built prompt templates  
* As a user, I can create custom snippets for reuse  
* As a user, I can use variables in templates  
* As a user, I can see template usage analytics

**Technical Requirements**

* Template categorization and search  
* Variable substitution engine  
* Snippet insertion with keyboard shortcuts  
* Usage tracking for popular templates

**Implementation Approach**

typescript

```ts
// Template variable system
interface TemplateVariable {
  name: string;
  type: 'text' | 'select' | 'number';
  default?: string;
  options?: string[];
  validation?: string; // Regex pattern
}

// Variable substitution
export function processTemplate(
  template: string, 
  variables: Record<string, any>
): string {
  return template.replace(
    /\{\{(\w+)\}\}/g, 
    (match, varName) => variables[varName] || match
  );
}

// Server Action
export async function createPromptFromTemplate(
  templateId: string,
  variables: Record<string, any>
) {
  const template = await prisma.template.findUnique({
    where: { id: templateId }
  });
  
  const processedContent = processTemplate(
    template.content, 
    variables
  );
  
  // Track usage
  await prisma.template.update({
    where: { id: templateId },
    data: { usageCount: { increment: 1 } }
  });
  
  return createPrompt({
    title: processTemplate(template.name, variables),
    content: processedContent,
    isTemplate: false
  });
}
```

**Data Models**

prisma

```
model Template {
  id          String   @id @default(cuid())
  name        String
  description String?
  category    String
  content     String   @db.Text
  variables   Json?    // Variable definitions
  isPublic    Boolean  @default(true)
  usageCount  Int      @default(0)
  createdBy   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  creator     User     @relation(fields: [createdBy], references: [id])
  
  @@index([category])
  @@index([usageCount])
}

model Snippet {
  id        String   @id @default(cuid())
  name      String
  content   String
  shortcut  String?  // Keyboard shortcut
  userId    String
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
}
```

## **4\. Data Architecture**

### **4.1 Data Models**

**User Entity**

prisma

```
model User {
  id              String    @id @default(cuid())
  clerkId         String    @unique
  email           String    @unique
  name            String?
  avatar          String?
  bio             String?
  preferences     Json      @default("{}")
  onboarded       Boolean   @default(false)
  role            UserRole  @default(USER)
  storageUsed     BigInt    @default(0)
  promptCount     Int       @default(0)
  lastActiveAt    DateTime  @default(now())
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  prompts         Prompt[]
  folders         Folder[]
  tags            Tag[]
  templates       Template[]
  searchHistory   SearchHistory[]
  activities      Activity[]
  
  @@index([clerkId])
  @@index([email])
}

enum UserRole {
  USER
  ADMIN
}
```

**Prompt Entity**

prisma

```
model Prompt {
  id              String    @id @default(cuid())
  title           String
  content         String    @db.Text
  description     String?
  platform        Platform  @default(GENERAL)
  model           String?   // AI model specification
  userId          String
  folderId        String?
  isTemplate      Boolean   @default(false)
  isPublic        Boolean   @default(false)
  isFavorite      Boolean   @default(false)
  variables       Json?     // Template variables
  metadata        Json?     // Additional metadata
  lastUsedAt      DateTime?
  viewCount       Int       @default(0)
  copyCount       Int       @default(0)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  folder          Folder?   @relation(fields: [folderId], references: [id], onDelete: SetNull)
  versions        PromptVersion[]
  tags            PromptTag[]
  activities      Activity[]
  
  // Indexes
  @@index([userId, folderId])
  @@index([platform])
  @@index([isPublic])
  @@index([createdAt])
}

enum Platform {
  GENERAL
  CHATGPT
  CLAUDE
  GEMINI
  MIDJOURNEY
  DALLE
  STABLE_DIFFUSION
  CUSTOM
}
```

**Folder Entity**

prisma

```
model Folder {
  id              String    @id @default(cuid())
  name            String
  description     String?
  color           String?   @default("#8B5CF6")
  icon            String?   @default("folder")
  userId          String
  parentId        String?
  position        Int       @default(0)
  isExpanded      Boolean   @default(false)
  promptCount     Int       @default(0) // Denormalized for performance
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  parent          Folder?   @relation("FolderHierarchy", fields: [parentId], references: [id], onDelete: Cascade)
  children        Folder[]  @relation("FolderHierarchy")
  prompts         Prompt[]
  
  // Constraints
  @@unique([userId, parentId, name]) // Unique folder names within same parent
  @@index([userId, parentId])
  @@index([position])
}
```

**Tag Entity**

prisma

```
model Tag {
  id              String    @id @default(cuid())
  name            String
  color           String?   @default("#A78BFA")
  userId          String
  usageCount      Int       @default(0) // Denormalized
  createdAt       DateTime  @default(now())
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  prompts         PromptTag[]
  
  // Constraints
  @@unique([userId, name])
  @@index([userId])
  @@index([usageCount])
}

model PromptTag {
  promptId        String
  tagId           String
  createdAt       DateTime  @default(now())
  
  // Relations
  prompt          Prompt    @relation(fields: [promptId], references: [id], onDelete: Cascade)
  tag             Tag       @relation(fields: [tagId], references: [id], onDelete: Cascade)
  
  @@id([promptId, tagId])
  @@index([tagId])
}
```

**Version Control**

prisma

```
model PromptVersion {
  id              String    @id @default(cuid())
  promptId        String
  content         String    @db.Text
  versionNumber   Int
  changeSummary   String?
  metadata        Json?     // Diff metadata
  createdBy       String
  createdAt       DateTime  @default(now())
  
  // Relations
  prompt          Prompt    @relation(fields: [promptId], references: [id], onDelete: Cascade)
  
  // Constraints
  @@unique([promptId, versionNumber])
  @@index([promptId, createdAt])
}
```

**Activity Tracking**

prisma

```
model Activity {
  id              String    @id @default(cuid())
  userId          String
  action          Action
  entityType      EntityType
  entityId        String
  metadata        Json?     // Additional context
  ipAddress       String?
  userAgent       String?
  createdAt       DateTime  @default(now())
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, createdAt])
  @@index([entityType, entityId])
}

enum Action {
  CREATE
  UPDATE
  DELETE
  VIEW
  COPY
  SHARE
  EXPORT
  IMPORT
}

enum EntityType {
  PROMPT
  FOLDER
  TAG
  TEMPLATE
}
```

### **4.2 Data Storage**

**Database Selection**

* **Supabase PostgreSQL**: Primary database for all application data  
* **Rationale**:  
  * Native full-text search capabilities  
  * JSONB support for flexible metadata  
  * Row-level security for multi-tenancy  
  * Recursive CTEs for folder hierarchies  
  * Built-in connection pooling

**Data Persistence Strategies**

* **Write-through caching**: React Query cache with database as source of truth  
* **Optimistic updates**: Immediate UI updates with rollback on failure  
* **Soft deletes**: Prompts marked as deleted, purged after 30 days  
* **Audit trail**: All modifications tracked in Activity table

**Caching Mechanisms**

typescript

```ts
// React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

// Cache key patterns
const cacheKeys = {
  prompts: {
    all: ['prompts'],
    lists: () => [...cacheKeys.prompts.all, 'list'],
    list: (filters: any) => [...cacheKeys.prompts.lists(), filters],
    details: () => [...cacheKeys.prompts.all, 'detail'],
    detail: (id: string) => [...cacheKeys.prompts.details(), id],
  },
  folders: {
    tree: (userId: string) => ['folders', 'tree', userId],
  },
};
```

**Backup and Recovery**

* **Automated backups**: Supabase daily backups with 30-day retention  
* **Point-in-time recovery**: Available for last 7 days  
* **Export functionality**: Users can export all prompts as JSON/Markdown  
* **Import validation**: Schema validation before importing data

## **5\. API Specifications**

### **5.1 Internal APIs (Server Actions)**

**Authentication Actions**

typescript

```ts
// app/actions/auth.ts
export async function updateUserProfile(input: {
  name?: string;
  bio?: string;
  preferences?: UserPreferences;
}) {
  const user = await requireAuth();
  
  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });
  
  revalidatePath('/settings');
  return updated;
}
```

**Prompt Management Actions**

typescript

```ts
// app/actions/prompts.ts
export async function createPrompt(input: {
  title: string;
  content: string;
  description?: string;
  platform?: Platform;
  folderId?: string;
  tags?: string[];
}) {
  const user = await requireAuth();
  
  const prompt = await prisma.prompt.create({
    data: {
      ...input,
      userId: user.id,
      tags: {
        create: input.tags?.map(tagName => ({
          tag: {
            connectOrCreate: {
              where: { userId_name: { userId: user.id, name: tagName } },
              create: { name: tagName, userId: user.id },
            },
          },
        })),
      },
    },
    include: { tags: { include: { tag: true } } },
  });
  
  // Track activity
  await trackActivity({
    action: 'CREATE',
    entityType: 'PROMPT',
    entityId: prompt.id,
  });
  
  revalidatePath('/prompts');
  return prompt;
}

export async function updatePrompt(
  id: string,
  input: Partial<PromptInput>
) {
  const user = await requireAuth();
  
  // Verify ownership
  const existing = await prisma.prompt.findFirst({
    where: { id, userId: user.id },
  });
  
  if (!existing) throw new Error('Prompt not found');
  
  // Create version if content changed
  if (input.content && input.content !== existing.content) {
    await createPromptVersion(id, existing.content);
  }
  
  const updated = await prisma.prompt.update({
    where: { id },
    data: input,
  });
  
  revalidatePath(`/prompts/${id}`);
  return updated;
}

export async function deletePrompt(id: string) {
  const user = await requireAuth();
  
  await prisma.prompt.deleteMany({
    where: { id, userId: user.id },
  });
  
  revalidatePath('/prompts');
}

export async function searchPrompts(query: {
  text?: string;
  platform?: Platform;
  tags?: string[];
  folderId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}) {
  const user = await requireAuth();
  const { page = 1, limit = 20, ...filters } = query;
  
  const where: any = { userId: user.id };
  
  if (filters.text) {
    where.OR = [
      { title: { contains: filters.text, mode: 'insensitive' } },
      { content: { contains: filters.text, mode: 'insensitive' } },
    ];
  }
  
  if (filters.platform) where.platform = filters.platform;
  if (filters.folderId) where.folderId = filters.folderId;
  
  if (filters.tags?.length) {
    where.tags = {
      some: {
        tag: { name: { in: filters.tags } },
      },
    };
  }
  
  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
    if (filters.dateTo) where.createdAt.lte = filters.dateTo;
  }
  
  const [prompts, total] = await Promise.all([
    prisma.prompt.findMany({
      where,
      include: { tags: { include: { tag: true } } },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.prompt.count({ where }),
  ]);
  
  return {
    prompts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}
```

**Folder Management Actions**

typescript

```ts
// app/actions/folders.ts
export async function createFolder(input: {
  name: string;
  parentId?: string;
  color?: string;
  icon?: string;
}) {
  const user = await requireAuth();
  
  // Get next position
  const maxPosition = await prisma.folder.findFirst({
    where: { userId: user.id, parentId: input.parentId },
    orderBy: { position: 'desc' },
    select: { position: true },
  });
  
  const folder = await prisma.folder.create({
    data: {
      ...input,
      userId: user.id,
      position: (maxPosition?.position ?? -1) + 1,
    },
  });
  
  revalidatePath('/prompts');
  return folder;
}

export async function moveFolder(
  id: string,
  targetParentId: string | null,
  position: number
) {
  const user = await requireAuth();
  
  // Verify ownership and prevent circular reference
  const folder = await prisma.folder.findFirst({
    where: { id, userId: user.id },
  });
  
  if (!folder) throw new Error('Folder not found');
  
  // Check for circular reference
  if (targetParentId) {
    const isCircular = await checkCircularReference(id, targetParentId);
    if (isCircular) throw new Error('Circular reference detected');
  }
  
  // Update positions
  await prisma.$transaction([
    // Shift positions in target location
    prisma.folder.updateMany({
      where: {
        userId: user.id,
        parentId: targetParentId,
        position: { gte: position },
      },
      data: { position: { increment: 1 } },
    }),
    // Move folder
    prisma.folder.update({
      where: { id },
      data: { parentId: targetParentId, position },
    }),
  ]);
  
  revalidatePath('/prompts');
}

export async function getFolderTree(userId: string) {
  const folders = await prisma.$queryRaw<Folder[]>`
    WITH RECURSIVE folder_tree AS (
      SELECT * FROM "Folder" 
      WHERE "userId" = ${userId} AND "parentId" IS NULL
      
      UNION ALL
      
      SELECT f.* FROM "Folder" f
      INNER JOIN folder_tree ft ON f."parentId" = ft.id
    )
    SELECT * FROM folder_tree
    ORDER BY "parentId", position
  `;
  
  // Build tree structure
  return buildFolderTree(folders);
}
```

**Response Schemas** All Server Actions return typed responses using Zod schemas:

typescript

```ts
// schemas/api.ts
import { z } from 'zod';

export const PromptSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  description: z.string().optional(),
  platform: z.enum(['GENERAL', 'CHATGPT', 'CLAUDE', ...]),
  userId: z.string(),
  folderId: z.string().optional(),
  isTemplate: z.boolean(),
  isPublic: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tags: z.array(TagSchema).optional(),
});

export const PaginatedResponseSchema = z.object({
  data: z.array(z.unknown()),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
  }),
});

export const ErrorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.string()).optional(),
});
```

### **5.2 External Integrations**

**Clerk Authentication**

typescript

```ts
// Integration: Clerk webhooks
// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET');
  }
  
  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
  
  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);
  
  // Verify webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;
  
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id!,
      "svix-timestamp": svix_timestamp!,
      "svix-signature": svix_signature!,
    }) as WebhookEvent;
  } catch (err) {
    return new Response('Error verifying webhook', { status: 400 });
  }
  
  // Handle events
  switch (evt.type) {
    case 'user.created':
      await handleUserCreated(evt.data);
      break;
    case 'user.updated':
      await handleUserUpdated(evt.data);
      break;
    case 'user.deleted':
      await handleUserDeleted(evt.data);
      break;
  }
  
  return new Response('', { status: 200 });
}

async function handleUserCreated(userData: any) {
  await prisma.user.create({
    data: {
      clerkId: userData.id,
      email: userData.email_addresses[0].email_address,
      name: `${userData.first_name} ${userData.last_name}`.trim(),
      avatar: userData.image_url,
    },
  });
}
```

**Supabase Database**

typescript

```ts
// lib/supabase.ts
import { PrismaClient } from '@prisma/client';

// Connection URL from environment
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
```

**Future Integrations**

typescript

```ts
// AI Platform Integration (future)
interface AIIntegration {
  provider: 'openai' | 'anthropic' | 'google';
  apiKey: string;
  testPrompt: (prompt: string) => Promise<string>;
  validatePrompt: (prompt: string) => Promise<ValidationResult>;
}

// Export Integration (future)
interface ExportIntegration {
  format: 'json' | 'markdown' | 'csv';
  export: (prompts: Prompt[]) => Promise<Blob>;
  import: (file: File) => Promise<Prompt[]>;
}
```

## **6\. Security & Privacy**

### **6.1 Authentication & Authorization**

**Authentication Mechanism**

* **Provider**: Clerk with JWT-based authentication  
* **Session Management**: HTTP-only cookies with secure flag  
* **Token Handling**: Automatic refresh with 15-minute access tokens  
* **Multi-factor**: Optional TOTP-based 2FA through Clerk

**Authorization Strategy**

typescript

```ts
// middleware.ts
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default authMiddleware({
  publicRoutes: ['/', '/features', '/pricing', '/blog(.*)'],
  afterAuth(auth, req) {
    // Redirect logged out users to sign-in
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    
    // Redirect onboarding if needed
    if (auth.userId && !auth.isPublicRoute) {
      const user = await getUserProfile(auth.userId);
      if (!user?.onboarded && req.nextUrl.pathname !== '/onboarding') {
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }
    }
  },
});

// Server-side authorization
export async function requireAuth() {
  const { userId } = auth();
  if (!userId) throw new Error('Unauthorized');
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  
  if (!user) throw new Error('User not found');
  return user;
}

// Role-based access
export async function requireRole(role: UserRole) {
  const user = await requireAuth();
  if (user.role !== role) throw new Error('Insufficient permissions');
  return user;
}
```

### **6.2 Data Security**

**Encryption Strategies**

* **At Rest**: Supabase encrypts all data at rest using AES-256  
* **In Transit**: All connections use TLS 1.3  
* **Sensitive Data**: User tokens encrypted with APP\_SECRET before storage

typescript

```ts
// lib/encryption.ts
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-gcm';
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');

export function encrypt(text: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, secretKey, iv);
  
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);
  
  const authTag = cipher.getAuthTag();
  
  return Buffer.concat([authTag, iv, encrypted]).toString('hex');
}

export function decrypt(encryptedHex: string): string {
  const encrypted = Buffer.from(encryptedHex, 'hex');
  
  const authTag = encrypted.slice(0, 16);
  const iv = encrypted.slice(16, 32);
  const text = encrypted.slice(32);
  
  const decipher = createDecipheriv(algorithm, secretKey, iv);
  decipher.setAuthTag(authTag);
  
  return decipher.update(text) + decipher.final('utf8');
}
```

**PII Handling**

* Email addresses hashed for logging  
* No PII in URL parameters  
* User data deletion on account closure  
* Export functionality for data portability

**Compliance Requirements**

* **GDPR**: Data export, deletion rights, consent management  
* **CCPA**: California privacy rights support  
* **SOC 2**: Audit logging, access controls

### **6.3 Application Security**

**Input Validation**

typescript

```ts
// lib/validation.ts
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// Prompt content validation
export const PromptContentSchema = z.string()
  .min(1, 'Content is required')
  .max(50000, 'Content too long')
  .transform((content) => {
    // Sanitize HTML but preserve markdown
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    });
  });

// SQL injection prevention via Prisma
// XSS prevention via React's default escaping
// CSRF protection via Server Actions
```

**Security Headers**

typescript

```ts
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];
```

**Rate Limiting**

typescript

```ts
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function checkRateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await ratelimit.limit(
    identifier
  );
  
  if (!success) {
    throw new Error('Rate limit exceeded');
  }
  
  return { limit, reset, remaining };
}

// Usage in Server Actions
export async function createPrompt(input: PromptInput) {
  const user = await requireAuth();
  await checkRateLimit(`create-prompt:${user.id}`);
  
  // ... rest of implementation
}
```

## **7\. User Interface Specifications**

### **7.1 Design System**

**Visual Design Principles**

* **Bold Simplicity**: Clean interfaces with purposeful complexity  
* **Breathable Whitespace**: Strategic negative space for cognitive comfort  
* **Motion Choreography**: Physics-based transitions for spatial continuity  
* **Content-First**: Prioritize user objectives over decoration

**Component Library Structure**

```
/components
  /ui              # Base UI components
    /button
    /input
    /card
    /modal
  /features        # Feature-specific components
    /prompts
    /folders
    /editor
  /layouts         # Layout components
    /sidebar
    /header
    /footer
```

**Responsive Design Approach**

* Mobile-first development  
* Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)  
* Touch-optimized interactions for mobile  
* Adaptive layouts for different screen sizes

**Accessibility Standards**

* WCAG 2.1 AA compliance  
* Keyboard navigation support  
* Screen reader optimization  
* Focus indicators and skip links  
* Reduced motion preferences

### **7.2 Design Foundations**

#### **7.2.1 Color System**

**Primary Colors**

css

```css
:root {
  /* Primary */
  --primary-dark: #0F0F14;        /* Deep charcoal backgrounds */
  --primary-surface: #1A1A1F;     /* Elevated surfaces */
  --primary-light: #F8F9FA;       /* Text and highlights */
  
  /* Secondary */
  --secondary-purple: #8B5CF6;    /* Primary accent */
  --secondary-purple-light: #A78BFA; /* Hover states */
  --secondary-purple-pale: #EDE9FE;  /* Subtle backgrounds */
  
  /* Accent Gradient */
  --gradient-start: #8B5CF6;      /* Purple */
  --gradient-end: #EC4899;        /* Pink */
  --gradient: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  
  /* Functional */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
  
  /* Neutrals */
  --neutral-50: #FAFAFA;
  --neutral-100: #F4F4F5;
  --neutral-200: #E4E4E7;
  --neutral-400: #A1A1AA;
  --neutral-500: #71717A;
  --neutral-600: #52525B;
  --neutral-700: #3F3F46;
  --neutral-800: #27272A;
  --neutral-900: #18181B;
}
```

#### **7.2.2 Typography**

css

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.75rem;    /* 28px */
  --text-4xl: 2rem;       /* 32px */
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}

/* Typography Classes */
.heading-1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.body-large {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.code-block {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}
```

#### **7.2.3 Spacing & Layout**

css

```css
:root {
  /* Base Unit: 4px */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  
  /* Container */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  
  /* Border Radius */
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;
}
```

#### **7.2.4 Interactive Elements**

css

```css
/* Button Base */
.button {
  height: 40px;
  padding: 0 var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  border-radius: var(--radius-md);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

/* Primary Button */
.button-primary {
  background: var(--gradient);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.25);
}

.button-primary:hover {
  filter: brightness(1.1);
  transform: scale(1.02);
}

.button-primary:active {
  transform: scale(0.98);
}

/* Input Fields */
.input {
  height: 40px;
  padding: 0 var(--space-4);
  background: var(--primary-dark);
  border: 1px solid var(--neutral-800);
  border-radius: var(--radius-md);
  color: var(--neutral-100);
  font-size: var(--text-sm);
  transition: all 150ms ease-out;
}

.input:focus {
  outline: none;
  border-color: var(--secondary-purple);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

/* Cards */
.card {
  background: var(--primary-surface);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  transition: all 200ms ease-out;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  transform: translateY(-1px);
}
```

#### **7.2.5 Component Specifications**

**Design Tokens Structure**

typescript

```ts
// theme/tokens.ts
export const tokens = {
  colors: {
    primary: {
      dark: '#0F0F14',
      surface: '#1A1A1F',
      light: '#F8F9FA',
    },
    secondary: {
      purple: '#8B5CF6',
      purpleLight: '#A78BFA',
      purplePale: '#EDE9FE',
    },
    // ... rest of colors
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    // ... rest of spacing
  },
  typography: {
    fonts: {
      sans: 'Inter, -apple-system, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      // ... rest of sizes
    },
  },
};
```

### **7.3 User Experience Flows**

**Key User Journeys**

1. **First-Time User Onboarding**  
   * Landing page → Sign up → Email verification  
   * Welcome screen → Feature tour  
   * Create first prompt → Organization tutorial  
   * Dashboard with sample content  
2. **Prompt Creation Flow**  
   * Dashboard → New prompt button  
   * Editor opens with template selection  
   * Write/edit with live preview  
   * Add tags and folder  
   * Save with auto-versioning  
3. **Search and Discovery**  
   * Search bar with suggestions  
   * Filter sidebar with facets  
   * Results with highlighting  
   * Quick actions on hover  
   * Bulk operations

**Navigation Structure**

```
/                     # Landing page
/sign-in             # Authentication
/sign-up
/dashboard           # Main dashboard
/prompts             # Prompt list/grid
  /new               # Create new prompt
  /[id]              # View/edit prompt
  /templates         # Template gallery
/folders             # Folder management
/search              # Advanced search
/settings            # User settings
  /profile
  /preferences
  /billing
/admin               # Admin panel (role-based)
```

**State Management**

typescript

```ts
// stores/ui.ts
interface UIState {
  sidebar: {
    isOpen: boolean;
    activeFolder: string | null;
  };
  editor: {
    mode: 'edit' | 'preview' | 'split';
    isDirty: boolean;
    autoSaveEnabled: boolean;
  };
  search: {
    query: string;
    filters: SearchFilters;
    view: 'grid' | 'list';
  };
}

// stores/prompts.ts
interface PromptsState {
  prompts: Map<string, Prompt>;
  selected: Set<string>;
  sortBy: 'updated' | 'created' | 'title';
  filterBy: FilterOptions;
}
```

## **8\. Infrastructure & Deployment**

### **8.1 Infrastructure Requirements**

**Hosting Environment**

* **Platform**: Vercel (serverless)  
* **Regions**: Auto-scaled globally via Vercel Edge Network  
* **Environment**: Node.js 20.x runtime

**Server Requirements**

* **Compute**: Serverless functions with 10s default timeout  
* **Memory**: 1024MB per function (configurable up to 3008MB)  
* **Concurrent Executions**: 1000 (Vercel Pro plan)

**Network Architecture**

* **CDN**: Vercel Edge Network for static assets  
* **API Routes**: Serverless functions at edge locations  
* **Database Connection**: Direct connection to Supabase  
* **WebSockets**: Not required for MVP

**Storage Requirements**

* **Database Storage**:  
  * Initial: 8GB (Supabase free tier)  
  * Growth projection: \~1GB per 10,000 active users  
  * Scaling: Automatic with Supabase Pro  
* **File Storage**:  
  * Vercel Blob for future attachments  
  * 1GB included, $0.03/GB additional  
* **Build Artifacts**:  
  * Vercel handles automatically  
  * Retained for 90 days

### **8.2 Deployment Strategy**

**CI/CD Pipeline**

yaml

```
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      
      # Database migrations check
      - run: npx prisma validate
      - run: npx prisma generate
  
  deploy-preview:
    needs: test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
  
  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      # Run migrations
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      
      # Deploy to Vercel
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Environment Management**

typescript

```ts
// env.mjs - Runtime environment validation
import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // Authentication
  CLERK_SECRET_KEY: z.string(),
  CLERK_WEBHOOK_SECRET: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  
  // Application
  NEXT_PUBLIC_APP_URL: z.string().url(),
  ENCRYPTION_KEY: z.string().length(64), // 32 bytes hex
  
  // External Services
  SENTRY_DSN: z.string().url().optional(),
  VERCEL_ENV: z.enum(['development', 'preview', 'production']),
});

export const env = envSchema.parse(process.env);
```

**Deployment Procedures**

1. **Development Workflow**  
    bash

```shell
# Local development
npm run dev

# Run migrations
npm run db:migrate

# Type checking
npm run type-check

# Testing
npm run test
```

3. 

4. **Staging Deployment**  
   * Push to `develop` branch  
   * Automatic deployment to staging-\[project\].vercel.app  
   * Run E2E tests against staging  
   * Manual QA verification  
5. **Production Deployment**  
   * Merge PR to `main` branch  
   * Automated tests run  
   * Database migrations applied  
   * Deployment to production  
   * Monitor error rates and performance

**Rollback Strategy**

bash

```shell
# Instant rollback via Vercel
vercel rollback [
```

Retry  
S

Continue

Edit

**Rollback Strategy** (continued)

bash

```shell
# Instant rollback via Vercel
vercel rollback [deployment-url]

# Database rollback
npx prisma migrate resolve --rolled-back [migration-name]

# Feature flag rollback (future)
# Disable feature via environment variable without redeploy
```

**Configuration Management**

typescript

```ts
// config/index.ts
export const config = {
  app: {
    name: 'AI Prompt Manager',
    url: env.NEXT_PUBLIC_APP_URL,
    version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'dev',
  },
  features: {
    templateSharing: process.env.FEATURE_TEMPLATE_SHARING === 'true',
    aiSuggestions: process.env.FEATURE_AI_SUGGESTIONS === 'true',
    collaboration: process.env.FEATURE_COLLABORATION === 'true',
  },
  limits: {
    maxPromptsPerUser: 1000,
    maxFolderDepth: 10,
    maxTagsPerPrompt: 20,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
  cache: {
    promptTTL: 5 * 60 * 1000, // 5 minutes
    folderTTL: 10 * 60 * 1000, // 10 minutes
    searchTTL: 60 * 1000, // 1 minute
  },
};
```

## **9\. Performance & Monitoring**

### **9.1 Performance Optimization**

**Frontend Optimizations**

typescript

```ts
// next.config.js
const nextConfig = {
  images: {
    domains: ['img.clerk.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

// Dynamic imports for code splitting
const Editor = dynamic(() => import('@/components/editor'), {
  loading: () => <EditorSkeleton />,
  ssr: false,
});

// Image optimization
import Image from 'next/image';

// Font optimization
import { Inter } from 'next/font/google';
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

**Database Optimizations**

sql

```sql
-- Indexes for performance
CREATE INDEX idx_prompts_user_folder ON prompts(user_id, folder_id);
CREATE INDEX idx_prompts_created ON prompts(created_at DESC);
CREATE INDEX idx_prompts_search ON prompts USING GIN(to_tsvector('english', title || ' ' || content));
CREATE INDEX idx_folders_user_parent ON folders(user_id, parent_id);
CREATE INDEX idx_tags_user_usage ON tags(user_id, usage_count DESC);

-- Materialized view for folder statistics
CREATE MATERIALIZED VIEW folder_stats AS
SELECT 
  f.id,
  f.user_id,
  COUNT(p.id) as prompt_count,
  MAX(p.updated_at) as last_activity
FROM folders f
LEFT JOIN prompts p ON f.id = p.folder_id
GROUP BY f.id, f.user_id;

-- Refresh periodically
CREATE OR REPLACE FUNCTION refresh_folder_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY folder_stats;
END;
$$ LANGUAGE plpgsql;
```

**Caching Strategy**

typescript

```ts
// React Query cache configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false;
        return failureCount < 3;
      },
    },
  },
});

// Prefetching
export async function prefetchUserData() {
  await queryClient.prefetchQuery({
    queryKey: ['user', 'profile'],
    queryFn: getUserProfile,
  });
  
  await queryClient.prefetchQuery({
    queryKey: ['folders', 'tree'],
    queryFn: getFolderTree,
  });
}
```

### **9.2 Monitoring & Analytics**

**Application Monitoring**

typescript

```ts
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

// Error tracking with Sentry
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

**Performance Metrics**

typescript

```ts
// lib/metrics.ts
export function trackPerformance(metric: string, value: number) {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value),
      event_category: 'Performance',
    });
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance: ${metric} = ${value}ms`);
  }
}

// Usage
const startTime = performance.now();
await searchPrompts(query);
trackPerformance('search_duration', performance.now() - startTime);
```

**Health Checks**

typescript

```ts
// app/api/health/route.ts
export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    checks: {
      database: 'unknown',
      auth: 'unknown',
    },
  };
  
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;
    checks.checks.database = 'healthy';
  } catch (error) {
    checks.checks.database = 'unhealthy';
    checks.status = 'degraded';
  }
  
  try {
    // Check auth service
    const response = await fetch('https://api.clerk.dev/v1/health');
    checks.checks.auth = response.ok ? 'healthy' : 'unhealthy';
  } catch (error) {
    checks.checks.auth = 'unhealthy';
    checks.status = 'degraded';
  }
  
  return NextResponse.json(checks);
}
```

## **10\. Testing Strategy**

### **10.1 Testing Approach**

**Unit Testing**

typescript

```ts
// __tests__/actions/prompts.test.ts
import { createPrompt, updatePrompt } from '@/app/actions/prompts';
import { prismaMock } from '@/test/prisma-mock';

describe('Prompt Actions', () => {
  it('should create a prompt', async () => {
    const input = {
      title: 'Test Prompt',
      content: 'Test content',
      platform: 'CHATGPT',
    };
    
    prismaMock.prompt.create.mockResolvedValue({
      id: '1',
      ...input,
      userId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    const result = await createPrompt(input);
    
    expect(result).toHaveProperty('id');
    expect(result.title).toBe(input.title);
  });
});
```

**Integration Testing**

typescript

```ts
// __tests__/integration/search.test.ts
import { POST } from '@/app/api/search/route';

describe('Search Integration', () => {
  it('should return search results', async () => {
    const request = new Request('http://localhost/api/search', {
      method: 'POST',
      body: JSON.stringify({
        query: 'test prompt',
        filters: { platform: 'CHATGPT' },
      }),
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('results');
    expect(data).toHaveProperty('total');
  });
});
```

**E2E Testing**

typescript

```ts
// e2e/prompt-creation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Prompt Creation', () => {
  test('should create and save a new prompt', async ({ page }) => {
    // Login
    await page.goto('/sign-in');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password');
    await page.click('button[type="submit"]');
    
    // Navigate to new prompt
    await page.goto('/prompts/new');
    
    // Fill prompt details
    await page.fill('[name="title"]', 'Test Prompt');
    await page.fill('[name="content"]', 'This is a test prompt');
    
    // Save
    await page.click('button:has-text("Save")');
    
    // Verify redirect and success
    await expect(page).toHaveURL(/\/prompts\/[\w-]+$/);
    await expect(page.locator('text=Prompt saved')).toBeVisible();
  });
});
```

### **10.2 Quality Assurance**

**Code Quality Tools**

json

```json
// package.json scripts
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "analyze": "ANALYZE=true next build"
  }
}
```

**Pre-commit Hooks**

json

```json
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run type-check
npm run test -- --passWithNoTests
```

**Performance Budget**

javascript

```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
  },
};
```

## **11\. Future Considerations**

### **11.1 Scalability Planning**

**Database Scaling**

* Implement read replicas for search queries  
* Partition prompts table by user\_id  
* Archive old versions to cold storage  
* Implement connection pooling with pgBouncer

**Application Scaling**

* Implement Redis for session storage  
* Add CDN for static assets  
* Implement queue system for heavy operations  
* Add WebSocket support for real-time features

### **11.2 Feature Roadmap**

**Phase 2 Features**

* AI-powered prompt suggestions  
* Collaborative editing  
* Public prompt marketplace  
* API access for developers  
* Mobile applications

**Phase 3 Features**

* Advanced analytics dashboard  
* Team workspaces  
* Custom AI model integration  
* Prompt performance tracking  
* Export to various AI platforms

## **12\. Project Structure**

```
ai-prompt-manager/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth group routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (dashboard)/         # Dashboard group routes
│   │   ├── layout.tsx       # Dashboard layout
│   │   ├── page.tsx         # Dashboard home
│   │   ├── prompts/
│   │   │   ├── page.tsx     # Prompts list
│   │   │   ├── new/
│   │   │   └── [id]/
│   │   ├── folders/
│   │   ├── search/
│   │   └── settings/
│   ├── api/                 # API routes
│   │   ├── webhooks/
│   │   └── health/
│   ├── actions/             # Server Actions
│   │   ├── auth.ts
│   │   ├── prompts.ts
│   │   ├── folders.ts
│   │   └── search.ts
│   └── globals.css
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── features/            # Feature components
│   └── layouts/             # Layout components
├── lib/                     # Utilities
│   ├── prisma.ts
│   ├── auth.ts
│   ├── validation.ts
│   └── utils.ts
├── hooks/                   # Custom React hooks
├── stores/                  # Zustand stores
├── types/                   # TypeScript types
├── prisma/                  # Database
│   ├── schema.prisma
│   └── migrations/
├── public/                  # Static assets
├── tests/                   # Test files
└── config/                  # Configuration
```

\</tech-specification\>  
\<project-rules\>---  
description: This rule explains Next.js conventions and best practices for fullstack development.  
globs: \*\*/\*.js,\*\*/\*.jsx,\*\*/\*.ts,\*\*/\*.tsx  
alwaysApply: false  
\---

\# Next.js rules

\- Use the App Router structure with \`page.tsx\` files in route directories.  
\- Client components must be explicitly marked with \`'use client'\` at the top of the file.  
\- Use kebab-case for directory names (e.g., \`components/auth-form\`) and PascalCase for component files.  
\- Prefer named exports over default exports, i.e. \`export function Button() { /\* ... \*/ }\` instead of \`export default function Button() { /\* ... \*/ }\`.  
\- Minimize \`'use client'\` directives:  
  \- Keep most components as React Server Components (RSC)  
  \- Only use client components when you need interactivity and wrap in \`Suspense\` with fallback UI  
  \- Create small client component wrappers around interactive elements  
\- Avoid unnecessary \`useState\` and \`useEffect\` when possible:  
  \- Use server components for data fetching  
  \- Use React Server Actions for form handling  
  \- Use URL search params for shareable state  
\- Use \`nuqs\` for URL search param state management  
\</project-rules\>  
\<core-app-intent\>

## **Elevator Pitch**

A centralized prompt management platform that transforms scattered AI prompts into an organized, searchable, and shareable knowledge base \- think "GitHub for prompts" where users can version, collaborate, and monetize their best AI interactions.

## **Problem Statement**

AI users repeatedly lose valuable prompts across multiple platforms (ChatGPT, Claude, Midjourney, etc.), struggle to find and reuse their best work, and lack ways to collaborate or learn from others' proven prompts. This leads to duplicated effort, inconsistent results, and missed opportunities for knowledge sharing.

## **Target Audience**

* **Primary**: Power users of AI tools (developers, content creators, researchers) who use prompts daily  
* **Secondary**: Teams collaborating on AI projects who need standardized prompts  
* **Tertiary**: Prompt engineers looking to monetize their expertise

## **USP**

Unlike simple note-taking apps or platform-specific histories, we provide a dedicated prompt management system with version control, advanced formatting support (Markdown/XML), collaboration features, and cross-platform compatibility \- making prompts as manageable as code.

## **Target Platforms**

* Web application (responsive design)  
* Browser extension for quick capture  
* Mobile apps (iOS/Android) for on-the-go access  
* API for third-party integrations

## **Features List**

### **Authentication & User Management**

* User registration with email verification  
* OAuth integration (Google, GitHub, Microsoft)  
* Password reset functionality  
* Profile management and settings

### **Prompt Organization**

* Create folder/tag hierarchy for organization  
  * Nested folders with drag-and-drop  
  * Multiple tags per prompt  
  * Smart collections based on rules  
* Search across all prompts with filters  
  * Full-text search  
  * Filter by platform, date, tags, author  
  * Search within results

### **Prompt Creation & Editing**

* Rich text editor with Markdown/XML support  
  * Syntax highlighting  
  * Live preview  
  * Template variables ({{name}}, {{context}})  
* Version control for prompts  
  * Save revision history  
  * Compare versions  
  * Restore previous versions  
* Prompt templates and snippets  
  * Pre-built templates by category  
  * Custom snippet library

### **Sharing & Collaboration**

* Privacy settings (private, unlisted, public)  
* Share via unique links  
* Team workspaces  
  * Role-based permissions  
  * Shared folders  
  * Comments and annotations  
* Fork and remix public prompts

### **Import/Export & Integrations**

* Import from ChatGPT/Claude exports  
* Browser extension for quick capture  
* Export to various formats (JSON, Markdown, PDF)  
* API for programmatic access

### **UX/UI Considerations**

* **Dashboard Screen**  
  * Recent prompts carousel  
  * Quick actions (new prompt, import)  
  * Usage statistics  
  * Search bar prominently placed  
* **Prompt Editor**  
  * Split-screen editor/preview  
  * Collapsible sidebar for organization  
  * Floating toolbar for formatting  
  * Auto-save with status indicator  
* **Browse/Discover Screen**  
  * Grid/list view toggle  
  * Infinite scroll with lazy loading  
  * Preview on hover  
  * Quick actions (save, fork, share)  
* **Mobile Optimization**  
  * Swipe gestures for navigation  
  * Simplified editor for mobile  
  * Offline mode with sync

### **Non-Functional Requirements**

* **Performance**  
  * Sub-second search results  
  * Instant preview rendering  
  * Optimistic UI updates  
* **Scalability**  
  * Support 10k+ prompts per user  
  * Handle concurrent editing in teams  
  * CDN for static assets  
* **Security**  
  * End-to-end encryption option  
  * API rate limiting  
  * Regular security audits  
  * GDPR compliance  
* **Accessibility**  
  * WCAG 2.1 AA compliance  
  * Keyboard navigation  
  * Screen reader support

## **Monetization**

* **Freemium Model**:  
  * Free: 100 prompts, basic features  
  * Pro ($9/mo): Unlimited prompts, version control, API access  
  * Team ($19/user/mo): Collaboration features, admin controls  
* **Marketplace**: Commission on premium prompt sales  
* **Enterprise**: Custom pricing for API access and white-label solutions  
1. 

\</core-app-intent\>  
\</context\>

# Output \- 7

Of course. Evaluating the implementation plan through a UX/UI lens is a critical step. A feature that is functionally complete but offers a poor user experience is ultimately unsuccessful.

### **Self-Evaluation of the Plan's UX/UI Considerations**

First, I will evaluate the previous 25-step plan against the user experience criteria you've provided.

* How well did you specify the UX/UI considerations?  
  The plan made a solid effort by incorporating key high-level UX concepts from the specification. It explicitly included tasks for skeleton loaders, optimistic UI updates for drag-and-drop, and debouncing for search. It also correctly identified the need to install framer-motion for animations. However, it fell short in specifying the more granular, but equally important, micro-interactions. For instance, it did not detail button loading states (e.g., showing a spinner on submit), clear and immediate feedback mechanisms for all actions (e.g., success/error toasts), or the "physics-based transitions" mentioned in the spec for list items and layout changes. The plan focused more on what to build and less on how it should feel.

* How well did we consider different screen/feature states and how they change?  
  The plan improved significantly from the initial version by explicitly calling out loading, empty, and error states for the primary data-fetching components like the folder tree and prompt list. This was a major step forward. However, this consideration was not applied with universal consistency. Simpler server actions, like updating a user's profile, did not have their loading and feedback states specified. Furthermore, the plan did not address crucial accessibility (A11y) states, such as focus management (e.g., trapping focus in modals, managing focus on route changes) or providing keyboard accessibility for complex interactions like drag-and-drop, both of which are fundamental to a complete UX.

In summary, the plan laid a good foundation for a functional UI but requires a more rigorous and consistent application of UX principles and state management across every user-facing step to fully realize the vision in the technical specification.

Below is the revised, end-to-end plan, with a new **UX/UI** section added to each step to address these gaps.

---

# **Implementation Plan**

## **Phase 1: Project & Environment Setup**

* \[ \] Step 1: Initialize Project, Version Control, and Core Dependencies

  * **Task**: Bootstrap a new Next.js 14+ application using the App Router, initialize a Git repository, and install the primary project dependencies.  
  * **Files**: package.json, .gitignore, README.md  
  * **Step Dependencies**: None  
  * **User Instructions**: Run npx create-next-app@latest ai-prompt-manager. Run git init.  
  * **UX/UI**: A fast, modern foundation ensures snappy initial page loads, which is the first user impression.  
* \[ \] Step 2: Configure TailwindCSS with Full Design System

  * **Task**: Configure Tailwind CSS to use the specific design tokens from the UI specifications (Section 7.2).  
  * **Files**: tailwind.config.ts, app/globals.css  
  * **Step Dependencies**: Step 1  
  * **User Instructions**: Copy :root variables and extend the Tailwind theme.  
  * **UX/UI**: Establishes a consistent visual language, making the interface predictable and easier to learn.  
* \[ \] Step 3: Define Database Schema in Prisma

  * **Task**: Initialize Prisma and define every data model, enum, and relation from the technical specification.  
  * **Files**: prisma/schema.prisma, .env  
  * **Step Dependencies**: Step 1  
  * **User Instructions**: Create a Supabase project, add DATABASE\_URL to .env, and populate the schema.  
  * **UX/UI**: A well-structured schema prevents data inconsistencies that lead to confusing UI bugs later.  
* \[ \] Step 4: Run Initial DB Migration & Set Up Prisma Client

  * **Task**: Apply the new schema to the Supabase database and create the Prisma client singleton.  
  * **Files**: prisma/migrations/\[timestamp\]\_init/migration.sql, lib/prisma.ts  
  * **Step Dependencies**: Step 3  
  * **User Instructions**: Run npx prisma migrate dev \--name init.  
  * **UX/UI**: Ensures the backend is ready to serve data reliably, preventing unexpected UI errors.  
* \[ \] Step 5: Configure and Validate Environment Variables

  * **Task**: Implement runtime environment variable validation using Zod.  
  * **Files**: env.mjs, next.config.mjs  
  * **Step Dependencies**: Step 3  
  * **User Instructions**: Create env.mjs and add placeholder variables to .env.  
  * **UX/UI**: Prevents runtime errors due to misconfiguration, providing stability for the end-user.

## **Phase 2: State Management & Core Providers**

* \[ \] Step 6: Install & Configure TanStack Query (React Query)

  * **Task**: Install and set up TanStack Query for server state management with specified caching strategies.  
  * **Files**: package.json, lib/react-query.ts, lib/cache-keys.ts  
  * **Step Dependencies**: Step 1  
  * **User Instructions**: npm install @tanstack/react-query @tanstack/react-query-devtools and create config files.  
  * **UX/UI**: Enables caching for instant data display on revisit and provides hooks for robust loading/error state management.  
* \[ \] Step 7: Install & Configure Zustand for UI State

  * **Task**: Install and set up Zustand for lightweight, global client-side state management.  
  * **Files**: package.json, stores/ui.ts  
  * **Step Dependencies**: Step 1  
  * **User Instructions**: npm install zustand and create the initial store.  
  * **UX/UI**: Manages shared UI state (like sidebar visibility) without causing unnecessary re-renders.  
* \[ \] Step 8: Create Unified Application Providers

  * **Task**: Create a single, client-side provider component to wrap the entire application.  
  * **Files**: components/providers/AppProviders.tsx, app/layout.tsx  
  * **Step Dependencies**: Step 6, Step 7  
  * **User Instructions**: Refactor the root layout to use the unified provider.  
  * **UX/UI**: Centralizes context logic, ensuring a consistent state management environment for all components.

## **Phase 3: Authentication & Core User Features**

* \[ \] Step 9: Implement Clerk Authentication UI & Middleware

  * **Task**: Set up all Clerk-related UI and server logic for sign-in, sign-up, and route protection.  
  * **Files**: app/(auth)/sign-in/\[\[...sign-in\]\]/page.tsx, app/(auth)/sign-up/\[\[...sign-up\]\]/page.tsx, middleware.ts  
  * **Step Dependencies**: Step 8  
  * **User Instructions**: Configure Clerk and implement the auth pages and middleware.  
  * **UX/UI**: Provides a seamless and secure sign-in/sign-up flow using a trusted, professional-looking modal.  
* \[ \] Step 10: Implement Clerk Webhooks for User Data Sync

  * **Task**: Create the webhook handler to synchronize user data from Clerk to your application's database.  
  * **Files**: app/api/webhooks/clerk/route.ts, lib/auth.ts  
  * **Step Dependencies**: Step 9  
  * **User Instructions**: Configure the webhook endpoint in Clerk and test the sign-up flow.  
  * **UX/UI**: Ensures user profile information (like name and avatar) is instantly available in the UI after sign-up.  
* \[ \] Step 11: Create User Profile & Settings Pages

  * **Task**: Build the UI for users to manage their profile information and application preferences.  
  * **Files**: app/(dashboard)/settings/profile/page.tsx, app/actions/auth.ts, components/features/settings/ProfileForm.tsx  
  * **Step Dependencies**: Step 10  
  * **User Instructions**: Build the settings pages and connect them to the server action.  
  * **UX/UI**: The form's "Save" button must have a disabled/loading state; provide clear success toast feedback upon completion.

## **Phase 4: Application Layout & Core UI Components**

* \[ \] Step 12: Build Main Dashboard Layout

  * **Task**: Create the primary UI shell for authenticated users, including a persistent header and sidebar.  
  * **Files**: app/(dashboard)/layout.tsx, components/layouts/Header.tsx, components/layouts/Sidebar.tsx  
  * **Step Dependencies**: Step 9  
  * **User Instructions**: Construct the main layout files for a consistent look and feel.  
  * **UX/UI**: A consistent and predictable layout reduces cognitive load and helps users navigate intuitively.  
* \[ \] Step 13: Build Out Reusable UI Component Library

  * **Task**: Implement the core, reusable UI components and install utility libraries for icons and animations.  
  * **Files**: package.json, components/ui/button.tsx, card.tsx, modal.tsx, etc., lib/icons.ts  
  * **Step Dependencies**: Step 2  
  * **User Instructions**: npm install lucide-react framer-motion date-fns and build the UI components.  
  * **UX/UI**: For modals, focus must be trapped and restored on close. Buttons must have clear hover, focus, active, and disabled states.

## **Phase 5: Folder Management**

* \[ \] Step 14: Implement Folder Server Actions

  * **Task**: Create the backend server actions for creating folders and recursively fetching the folder hierarchy.  
  * **Files**: app/actions/folders.ts, lib/utils.ts  
  * **Step Dependencies**: Step 4, Step 10  
  * **User Instructions**: Implement the createFolder and getFolderTree server actions.  
  * **UX/UI**: Fast backend logic is critical for a responsive UI when creating and loading folders.  
* \[ \] Step 15: Implement Folder Tree UI with All States

  * **Task**: Build the folder tree UI in the sidebar, ensuring it correctly handles all data-fetching states.  
  * **Files**: components/features/folders/FolderTree.tsx, FolderItem.tsx, FolderTreeSkeleton.tsx, CreateFolderButton.tsx  
  * **Step Dependencies**: Step 14, Step 13  
  * **User Instructions**: Build the folder UI, ensuring loading, empty, error, and success states are handled.  
  * **UX/UI**: Use subtle animations (framer-motion) when folders expand/collapse to create a smooth, non-jarring experience.

## **Phase 6: Prompt Management**

* \[ \] Step 16: Implement Prompt CRUD Server Actions

  * **Task**: Create the backend server actions for Creating, Reading, Updating, and Deleting prompts.  
  * **Files**: app/actions/prompts.ts  
  * **Step Dependencies**: Step 4, Step 10  
  * **User Instructions**: Implement the core prompt management server actions.  
  * **UX/UI**: Actions should be idempotent and return clear data to ensure the UI can update reliably.  
* \[ \] Step 17: Build the Prompt Editor with CodeMirror

  * **Task**: Create the prompt editing interface using the CodeMirror 6 editor.  
  * **Files**: app/(dashboard)/prompts/new/page.tsx, PromptForm.tsx, CodeMirrorEditor.tsx  
  * **Step Dependencies**: Step 16, Step 13  
  * **User Instructions**: Install CodeMirror packages and build the editor interface.  
  * **UX/UI**: The editor should have an auto-save indicator to give users confidence their work is being saved.  
* \[ \] Step 18: Implement Prompt List View with All States

  * **Task**: Create the UI to display lists of prompts, ensuring all data fetching states are handled.  
  * **Files**: app/(dashboard)/folders/\[folderId\]/page.tsx, PromptList.tsx, PromptCard.tsx, PromptListSkeleton.tsx  
  * **Step Dependencies**: Step 17  
  * **User Instructions**: Build the prompt list, handling all loading, empty, and error states.  
  * **UX/UI**: Animate new prompts into the list (framer-motion) to provide visual continuity.  
* \[ \] Step 19: Implement Automatic Prompt Versioning

  * **Task**: Add the logic to automatically create a new version of a prompt when its content is changed.  
  * **Files**: app/actions/versions.ts, app/actions/prompts.ts, lib/diff.ts  
  * **Step Dependencies**: Step 16  
  * **User Instructions**: Implement the versioning logic in the updatePrompt action.  
  * **UX/UI**: This is a background task; the UI should provide subtle, non-blocking feedback that a version has been saved.

## **Phase 7: Advanced Features & Polish**

* \[ \] Step 20: Configure Full-Text Search Database Index

  * **Task**: Create a database migration to add a GIN index to the prompts table.  
  * **Files**: prisma/migrations/\[timestamp\]\_add\_fts\_index/migration.sql  
  * **Step Dependencies**: Step 4  
  * **User Instructions**: Run prisma migrate dev and add the specified CREATE INDEX SQL.  
  * **UX/UI**: A proper index is crucial for sub-second search results, which is a core expectation for any search feature.  
* \[ \] Step 21: Implement Full-Text Search UI and Logic

  * **Task**: Build the complete search experience, from the input bar to the results page.  
  * **Files**: app/actions/search.ts, app/(dashboard)/search/page.tsx, GlobalSearchBar.tsx, SearchResultsList.tsx  
  * **Step Dependencies**: Step 20, Step 18  
  * **User Instructions**: Build the search UI and connect it to the debounced search action.  
  * **UX/UI**: Debouncing the input prevents excessive API calls and provides a smooth typing experience. Highlight matching terms in results.  
* \[ \] Step 22: Implement Drag-and-Drop with Optimistic Updates

  * **Task**: Implement drag-and-drop for organizing prompts and folders with an optimistic UI.  
  * **Files**: package.json, app/actions/prompts.ts, hooks/useOptimisticMove.ts, FolderTree.tsx  
  * **Step Dependencies**: Step 15, Step 18  
  * **User Instructions**: Install dnd-kit and implement the optimistic update hook.  
  * **UX/UI**: The UI must provide clear visual feedback: a drop indicator, a "ghost" of the item being dragged, and keyboard support for accessibility.

## **Phase 8: Production Readiness**

* \[ \] Step 23: Implement Security Hardening

  * **Task**: Secure the application by adding HTTP security headers and API rate limiting.  
  * **Files**: next.config.mjs, lib/rate-limit.ts, app/actions/\*.ts  
  * **Step Dependencies**: All previous action steps.  
  * **User Instructions**: Sign up for Upstash and apply the security configurations.  
  * **UX/UI**: On rate-limit exceeded, show a friendly, non-technical error message and a "try again later" suggestion.  
* \[ \] Step 24: Configure Monitoring, Logging, and Health Checks

  * **Task**: Integrate Sentry, Vercel Analytics, a structured logger, and a health check endpoint.  
  * **Files**: package.json, lib/logger.ts, sentry.\*.config.ts, app/layout.tsx, app/api/health/route.ts  
  * **Step Dependencies**: Step 9  
  * **User Instructions**: Install Pino, run the Sentry wizard, and add the health check route.  
  * **UX/UI**: Seamless error tracking allows for proactive bug fixing, improving the user experience over time.  
* \[ \] Step 25: Configure and Deploy with CI/CD

  * **Task**: Create a GitHub Actions workflow for a complete CI/CD pipeline.  
  * **Files**: .github/workflows/deploy.yml  
  * **Step Dependencies**: All previous steps.  
  * **User Instructions**: Create the workflow file and add secrets to your GitHub repository.  
  * **UX/UI**: A fast and reliable CI/CD pipeline means bug fixes and new features get to users quickly.

# Step \#8

\<goal\>You are an AI-engineer tasked with breaking down a complicated technical specification into detailed steps that retain a high-degree of granularity based on the original specifications. 

Your goal is to generate a highly-detailed, step-wise task plan that leaves no detail un-addressed.

You should pass-back-through your output several times to ensure no data is left out.

The main context for this task is provided in the Context section below, namely:

The tech specification

Any critical project rules

The core application intent documentation

Wrap your thought process in \<thinking\> tags

\</goal\>

\<format\>

\#\# \[Section N\]

\- \[ \] Step 1: \[Brief title\]

  \- \*\*Task\*\*: \[Detailed explanation of what needs to be implemented\]

  \- \*\*Files\*\*: \[Maximum of 15 files, ideally less\]

    \- \`path/to/file1.ts\`: \[Description of changes\]

  \- \*\*Step Dependencies\*\*: \[Step Dependencies\]

  \- \*\*User Instructions\*\*: \[Instructions for User\]

\#\# \[Section N \+ 1\]

\#\# \[Section N \+ 2\]

Repeat for all steps

\<format\>

\<warnings-and-guidelines\>

You ARE allowed to mix backend and frontend steps together if it makes sense

Each step must not modify more then 15 files in a single-run. If it does, you need to ask the user for permission and explain why it’s a special case.

\<guidelines\>

Always start with project setup and critical-path configurations

Try to make each new step contained, so that the app can be built and functional between tasks

Mark dependencies between steps

\</guidelines\>

\</warnings-and-guidelines\>

\<context\>

\<tech-specification\>AI Prompt Manager Technical Specification

1\. Executive Summary

The AI Prompt Manager is a web-based application designed to help AI developers and prompt engineers organize, manage, and optimize their prompt library. The system provides a comprehensive solution for storing prompts with rich text editing, version control, advanced search capabilities, and intelligent organization through folders and tags.

Key Technical Decisions

Frontend: Next.js 14+ App Router for server-side rendering and optimal performance

Backend: Server Actions instead of traditional REST APIs for seamless client-server communication

Database: Supabase (PostgreSQL) for robust data storage with full-text search capabilities

Authentication: Clerk for enterprise-grade authentication with minimal implementation overhead

Deployment: Vercel for automatic scaling and global edge distribution

High-level Architecture

mermaid

graph TB

    subgraph "Client Layer"

        UI\[Next.js App Router\<br/\>React 18+\]

        STATE\[Zustand Store\]

        CACHE\[React Query Cache\]

    end

 	

    subgraph "Edge Layer"

        MW\[Next.js Middleware\]

        CDN\[Vercel Edge Network\]

    end

 	

    subgraph "Application Layer"

        SA\[Server Actions\]

        WH\[Webhook Handlers\]

    end

 	

    subgraph "Data Layer"

        PRISMA\[Prisma ORM\]

        PG\[(Supabase PostgreSQL)\]

    end

 	

    subgraph "External Services"

        CLERK\[Clerk Auth\]

        VERCEL\[Vercel Platform\]

    end

 	

    UI \--\> STATE

    UI \--\> CACHE

    UI \--\> MW

    MW \--\> CLERK

    MW \--\> SA

 	

    CACHE \--\> SA

    SA \--\> PRISMA

    PRISMA \--\> PG

 	

    CLERK \--\> WH

    WH \--\> PRISMA

 	

    UI \--\> CDN

    CDN \--\> VERCEL

2\. System Architecture

2.1 Architecture Overview

The system follows a modern, serverless architecture optimized for developer experience and performance:

Frontend Architecture

Next.js App Router with React Server Components for optimal performance

Zustand for lightweight client-side state management

React Query for server state synchronization and caching

Progressive enhancement with JavaScript optional for core features

Backend Architecture

Server Actions for type-safe server mutations

Edge middleware for authentication and request routing

Webhook handlers for external service integration

Database-first design with Prisma ORM

Data Flow

User requests hit Vercel Edge Network

Middleware validates authentication via Clerk

Server Components fetch data directly from database

Client Components hydrate with cached data

Mutations occur through Server Actions

Real-time updates via React Query invalidation

2.2 Technology Stack

Frontend Technologies

Framework: Next.js 14+ (App Router)

UI Library: React 18+

State Management: Zustand 4+

Data Fetching: TanStack Query (React Query) v5

Styling: TailwindCSS 3.4+

Animation: Framer Motion 11+

Rich Text Editor: CodeMirror 6

Drag & Drop: @dnd-kit/sortable

Icons: Lucide React

Forms: React Hook Form \+ Zod

Date Handling: date-fns

Backend Technologies

Runtime: Node.js 20+ (Vercel)

API Layer: Next.js Server Actions

ORM: Prisma 5+

Validation: Zod

Error Tracking: Sentry

Logging: Pino

Database & Storage

Primary Database: Supabase (PostgreSQL 15+)

Caching: React Query in-memory cache

File Storage: Vercel Blob (for future attachments)

Search: PostgreSQL Full-Text Search with GIN indexes

Third-party Services

Authentication: Clerk

Hosting: Vercel

Monitoring: Vercel Analytics

Error Tracking: Sentry

3\. Feature Specifications

3.1 Authentication & User Management

User Stories

As a user, I can sign up with email/password or social providers

As a user, I can reset my password via email

As a user, I can manage my profile and preferences

As a user, I can see my usage statistics and limits

Technical Requirements

Clerk SDK integration with Next.js middleware

User data synchronization via Clerk webhooks

Profile data stored in PostgreSQL for app-specific metadata

Session management through Clerk's JWT tokens

Implementation Approach

typescript

// middleware.ts

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({

  publicRoutes: \["/", "/features", "/pricing"\],

  afterAuth(auth, req) {

    // Handle post-auth logic

  }

});

// app/api/webhooks/clerk/route.ts

export async function POST(req: Request) {

  const event \= await validateWebhookEvent(req);


  switch (event.type) {

    case 'user.created':

      await createUserProfile(event.data);

      break;

    case 'user.updated':

      await updateUserProfile(event.data);

      break;

  }

}

User Flow

User clicks "Sign Up" → Clerk modal appears

User enters credentials → Clerk validates

On success → Webhook creates user profile in database

User redirected to onboarding flow

Profile preferences saved via Server Action

API Endpoints (Server Actions)

updateUserProfile(data: UserProfileInput): Promise\<UserProfile\>

updateUserPreferences(preferences: UserPreferences): Promise\<void\>

getUserStats(): Promise\<UserStatistics\>

Data Models

prisma

model User {

  id            String   @id @default(cuid())

  clerkId       String   @unique

  email         String   @unique

  name          String?

  avatar        String?

  preferences   Json     @default("{}")

  onboarded     Boolean  @default(false)

  createdAt     DateTime @default(now())

  updatedAt     DateTime @updatedAt


  prompts       Prompt\[\]

  folders       Folder\[\]

  tags          Tag\[\]

  templates     Template\[\]

}

Error Handling

Clerk authentication errors show inline messages

Network errors trigger retry with exponential backoff

Webhook failures logged to Sentry with retry queue

Performance Considerations

User profiles cached in React Query for 5 minutes

Clerk session cached in httpOnly cookies

Minimal database queries through careful data modeling

3.2 Prompt Organization

User Stories

As a user, I can create nested folders to organize prompts

As a user, I can drag and drop prompts between folders

As a user, I can create smart collections with rules

As a user, I can tag prompts for multi-dimensional organization

Technical Requirements

Recursive folder structure with PostgreSQL CTEs

Optimistic UI updates for drag-and-drop operations

Many-to-many relationships for prompt-tag associations

Smart collection rule engine with dynamic queries

Implementation Approach

typescript

// Recursive folder query

const getFolderTree \= async (userId: string) \=\> {

  return prisma.$queryRaw\`

    WITH RECURSIVE folder\_tree AS (

      SELECT \* FROM folders 

      WHERE user\_id \= ${userId} AND parent\_id IS NULL

   	

      UNION ALL

   	

      SELECT f.\* FROM folders f

      INNER JOIN folder\_tree ft ON f.parent\_id \= ft.id

    )

    SELECT \* FROM folder\_tree

    ORDER BY parent\_id, position

  \`;

};

// Drag and drop handler

async function moveItem(itemId: string, targetFolderId: string, position: number) {

  // Optimistic update

  updateCache(itemId, { folderId: targetFolderId, position });


  try {

    await movePromptServerAction(itemId, targetFolderId, position);

  } catch (error) {

    // Revert on failure

    revertCache(itemId);

    throw error;

  }

}

User Flow

User creates folder via modal dialog

Folder appears in sidebar with animation

User drags prompt to folder

UI updates optimistically

Server Action persists change

On error, UI reverts with error toast

Data Models

prisma

model Folder {

  id        String   @id @default(cuid())

  name      String

  color     String?

  icon      String?

  userId    String

  parentId  String?

  position  Int      @default(0)

  createdAt DateTime @default(now())

  updatedAt DateTime @updatedAt


  user      User     @relation(fields: \[userId\], references: \[id\])

  parent    Folder?  @relation("FolderHierarchy", fields: \[parentId\], references: \[id\])

  children  Folder\[\] @relation("FolderHierarchy")

  prompts   Prompt\[\]


  @@index(\[userId, parentId\])

}

model SmartCollection {

  id        String   @id @default(cuid())

  name      String

  userId    String

  rules     Json     // Rule engine configuration

  createdAt DateTime @default(now())


  user      User     @relation(fields: \[userId\], references: \[id\])

}

Error Handling

Cascade delete protection with confirmation dialog

Circular reference prevention in folder moves

Maximum nesting depth of 10 levels

Optimistic updates with automatic rollback

3.3 Search & Filtering

User Stories

As a user, I can search prompts by title, content, or tags

As a user, I can filter by platform, date range, and author

As a user, I can see search suggestions as I type

As a user, I can save frequent searches

Technical Requirements

PostgreSQL full-text search with GIN indexes

Real-time search with debouncing

Faceted search with count aggregations

Search result ranking by relevance

Implementation Approach

typescript

// Database indexes

CREATE INDEX prompt\_search\_idx ON prompts 

USING GIN (to\_tsvector('english', title || ' ' || content));

// Server Action for search

export async function searchPrompts(query: SearchQuery) {

  const { text, filters, page \= 1, limit \= 20 } \= query;


  const results \= await prisma.$queryRaw\`

    SELECT 

      p.\*,

      ts\_rank(to\_tsvector('english', p.title || ' ' || p.content), 

              plainto\_tsquery('english', ${text})) AS rank

    FROM prompts p

    WHERE 

      to\_tsvector('english', p.title || ' ' || p.content) @@ 

      plainto\_tsquery('english', ${text})

      ${filters.platform ? Prisma.sql\`AND p.platform \= ${filters.platform}\` : Prisma.empty}

    ORDER BY rank DESC

    LIMIT ${limit} OFFSET ${(page \- 1\) \* limit}

  \`;


  return results;

}

User Flow

User types in search box

Debounced search triggers after 300ms

Loading skeleton appears

Results render with highlighting

Filters update result count in real-time

Click result to view/edit prompt

Data Models

prisma

model SearchHistory {

  id        String   @id @default(cuid())

  userId    String

  query     String

  filters   Json?

  createdAt DateTime @default(now())


  user      User     @relation(fields: \[userId\], references: \[id\])


  @@index(\[userId, createdAt\])

}

Performance Considerations

GIN indexes for full-text search performance

Search results cached for 60 seconds

Pagination with cursor-based navigation

Query suggestion from popular searches

3.4 Prompt Creation & Editing

User Stories

As a user, I can create prompts with rich text formatting

As a user, I can use variables in my prompts

As a user, I can see version history and restore old versions

As a user, I can preview prompts before saving

Technical Requirements

CodeMirror 6 for syntax highlighting and editing

Real-time Markdown/XML parsing and preview

Automatic version creation on save

Diff algorithm for version comparison

Implementation Approach

typescript

// Rich text editor setup

import { EditorState } from "@codemirror/state";

import { markdown } from "@codemirror/lang-markdown";

const editorConfig \= {

  extensions: \[

    markdown(),

    syntaxHighlighting(),

    variableDetection(),

    autoSave({ delay: 2000 })

  \]

};

// Version control

export async function savePromptVersion(

  promptId: string, 

  content: string,

  userId: string

) {

  const lastVersion \= await getLastVersion(promptId);


  if (hasSignificantChanges(lastVersion?.content, content)) {

    await prisma.promptVersion.create({

      data: {

        promptId,

        content,

        versionNumber: (lastVersion?.versionNumber || 0\) \+ 1,

        createdBy: userId,

        changeSummary: generateChangeSummary(lastVersion?.content, content)

      }

    });

  }

}

User Flow

User clicks "New Prompt"

Editor opens with template

User types with syntax highlighting

Preview updates in real-time

Auto-save triggers every 2 seconds

Version created on significant changes

Data Models

prisma

model Prompt {

  id          String   @id @default(cuid())

  title       String

  content     String   @db.Text

  description String?

  platform    Platform @default(GENERAL)

  userId      String

  folderId    String?

  isTemplate  Boolean  @default(false)

  isPublic    Boolean  @default(false)

  variables   Json?    // Template variables

  createdAt   DateTime @default(now())

  updatedAt   DateTime @updatedAt


  user        User     @relation(fields: \[userId\], references: \[id\])

  folder      Folder?  @relation(fields: \[folderId\], references: \[id\])

  versions    PromptVersion\[\]

  tags        PromptTag\[\]


  @@index(\[userId, folderId\])

  @@index(\[platform\])

}

model PromptVersion {

  id            String   @id @default(cuid())

  promptId      String

  content       String   @db.Text

  versionNumber Int

  changeSummary String?

  createdBy     String

  createdAt     DateTime @default(now())


  prompt        Prompt   @relation(fields: \[promptId\], references: \[id\], onDelete: Cascade)

}

3.5 Templates & Snippets

User Stories

As a user, I can browse pre-built prompt templates

As a user, I can create custom snippets for reuse

As a user, I can use variables in templates

As a user, I can see template usage analytics

Technical Requirements

Template categorization and search

Variable substitution engine

Snippet insertion with keyboard shortcuts

Usage tracking for popular templates

Implementation Approach

typescript

// Template variable system

interface TemplateVariable {

  name: string;

  type: 'text' | 'select' | 'number';

  default?: string;

  options?: string\[\];

  validation?: string; // Regex pattern

}

// Variable substitution

export function processTemplate(

  template: string, 

  variables: Record\<string, any\>

): string {

  return template.replace(

    /\\{\\{(\\w+)\\}\\}/g, 

    (match, varName) \=\> variables\[varName\] || match

  );

}

// Server Action

export async function createPromptFromTemplate(

  templateId: string,

  variables: Record\<string, any\>

) {

  const template \= await prisma.template.findUnique({

    where: { id: templateId }

  });


  const processedContent \= processTemplate(

    template.content, 

    variables

  );


  // Track usage

  await prisma.template.update({

    where: { id: templateId },

    data: { usageCount: { increment: 1 } }

  });


  return createPrompt({

    title: processTemplate(template.name, variables),

    content: processedContent,

    isTemplate: false

  });

}

Data Models

prisma

model Template {

  id          String   @id @default(cuid())

  name        String

  description String?

  category    String

  content     String   @db.Text

  variables   Json?    // Variable definitions

  isPublic    Boolean  @default(true)

  usageCount  Int      @default(0)

  createdBy   String

  createdAt   DateTime @default(now())

  updatedAt   DateTime @updatedAt


  creator     User     @relation(fields: \[createdBy\], references: \[id\])


  @@index(\[category\])

  @@index(\[usageCount\])

}

model Snippet {

  id        String   @id @default(cuid())

  name      String

  content   String

  shortcut  String?  // Keyboard shortcut

  userId    String

  createdAt DateTime @default(now())


  user      User     @relation(fields: \[userId\], references: \[id\])

}

4\. Data Architecture

4.1 Data Models

User Entity

prisma

model User {

  id              String    @id @default(cuid())

  clerkId         String    @unique

  email           String    @unique

  name            String?

  avatar          String?

  bio             String?

  preferences     Json      @default("{}")

  onboarded       Boolean   @default(false)

  role            UserRole  @default(USER)

  storageUsed     BigInt    @default(0)

  promptCount     Int       @default(0)

  lastActiveAt    DateTime  @default(now())

  createdAt       DateTime  @default(now())

  updatedAt       DateTime  @updatedAt


  // Relations

  prompts         Prompt\[\]

  folders         Folder\[\]

  tags            Tag\[\]

  templates       Template\[\]

  searchHistory   SearchHistory\[\]

  activities      Activity\[\]


  @@index(\[clerkId\])

  @@index(\[email\])

}

enum UserRole {

  USER

  ADMIN

}

Prompt Entity

prisma

model Prompt {

  id              String    @id @default(cuid())

  title           String

  content         String    @db.Text

  description     String?

  platform        Platform  @default(GENERAL)

  model           String?   // AI model specification

  userId          String

  folderId        String?

  isTemplate      Boolean   @default(false)

  isPublic        Boolean   @default(false)

  isFavorite      Boolean   @default(false)

  variables       Json?     // Template variables

  metadata        Json?     // Additional metadata

  lastUsedAt      DateTime?

  viewCount       Int       @default(0)

  copyCount       Int       @default(0)

  createdAt       DateTime  @default(now())

  updatedAt       DateTime  @updatedAt


  // Relations

  user            User      @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)

  folder          Folder?   @relation(fields: \[folderId\], references: \[id\], onDelete: SetNull)

  versions        PromptVersion\[\]

  tags            PromptTag\[\]

  activities      Activity\[\]


  // Indexes

  @@index(\[userId, folderId\])

  @@index(\[platform\])

  @@index(\[isPublic\])

  @@index(\[createdAt\])

}

enum Platform {

  GENERAL

  CHATGPT

  CLAUDE

  GEMINI

  MIDJOURNEY

  DALLE

  STABLE\_DIFFUSION

  CUSTOM

}

Folder Entity

prisma

model Folder {

  id              String    @id @default(cuid())

  name            String

  description     String?

  color           String?   @default("\#8B5CF6")

  icon            String?   @default("folder")

  userId          String

  parentId        String?

  position        Int       @default(0)

  isExpanded      Boolean   @default(false)

  promptCount     Int       @default(0) // Denormalized for performance

  createdAt       DateTime  @default(now())

  updatedAt       DateTime  @updatedAt


  // Relations

  user            User      @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)

  parent          Folder?   @relation("FolderHierarchy", fields: \[parentId\], references: \[id\], onDelete: Cascade)

  children        Folder\[\]  @relation("FolderHierarchy")

  prompts         Prompt\[\]


  // Constraints

  @@unique(\[userId, parentId, name\]) // Unique folder names within same parent

  @@index(\[userId, parentId\])

  @@index(\[position\])

}

Tag Entity

prisma

model Tag {

  id              String    @id @default(cuid())

  name            String

  color           String?   @default("\#A78BFA")

  userId          String

  usageCount      Int       @default(0) // Denormalized

  createdAt       DateTime  @default(now())


  // Relations

  user            User      @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)

  prompts         PromptTag\[\]


  // Constraints

  @@unique(\[userId, name\])

  @@index(\[userId\])

  @@index(\[usageCount\])

}

model PromptTag {

  promptId        String

  tagId           String

  createdAt       DateTime  @default(now())


  // Relations

  prompt          Prompt    @relation(fields: \[promptId\], references: \[id\], onDelete: Cascade)

  tag             Tag       @relation(fields: \[tagId\], references: \[id\], onDelete: Cascade)


  @@id(\[promptId, tagId\])

  @@index(\[tagId\])

}

Version Control

prisma

model PromptVersion {

  id              String    @id @default(cuid())

  promptId        String

  content         String    @db.Text

  versionNumber   Int

  changeSummary   String?

  metadata        Json?     // Diff metadata

  createdBy       String

  createdAt       DateTime  @default(now())


  // Relations

  prompt          Prompt    @relation(fields: \[promptId\], references: \[id\], onDelete: Cascade)


  // Constraints

  @@unique(\[promptId, versionNumber\])

  @@index(\[promptId, createdAt\])

}

Activity Tracking

prisma

model Activity {

  id              String    @id @default(cuid())

  userId          String

  action          Action

  entityType      EntityType

  entityId        String

  metadata        Json?     // Additional context

  ipAddress       String?

  userAgent       String?

  createdAt       DateTime  @default(now())


  // Relations

  user            User      @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)


  @@index(\[userId, createdAt\])

  @@index(\[entityType, entityId\])

}

enum Action {

  CREATE

  UPDATE

  DELETE

  VIEW

  COPY

  SHARE

  EXPORT

  IMPORT

}

enum EntityType {

  PROMPT

  FOLDER

  TAG

  TEMPLATE

}

4.2 Data Storage

Database Selection

Supabase PostgreSQL: Primary database for all application data

Rationale:

Native full-text search capabilities

JSONB support for flexible metadata

Row-level security for multi-tenancy

Recursive CTEs for folder hierarchies

Built-in connection pooling

Data Persistence Strategies

Write-through caching: React Query cache with database as source of truth

Optimistic updates: Immediate UI updates with rollback on failure

Soft deletes: Prompts marked as deleted, purged after 30 days

Audit trail: All modifications tracked in Activity table

Caching Mechanisms

typescript

// React Query configuration

const queryClient \= new QueryClient({

  defaultOptions: {

    queries: {

      staleTime: 5 \* 60 \* 1000, // 5 minutes

      cacheTime: 10 \* 60 \* 1000, // 10 minutes

      refetchOnWindowFocus: false,

      retry: 3,

    },

  },

});

// Cache key patterns

const cacheKeys \= {

  prompts: {

    all: \['prompts'\],

    lists: () \=\> \[...cacheKeys.prompts.all, 'list'\],

    list: (filters: any) \=\> \[...cacheKeys.prompts.lists(), filters\],

    details: () \=\> \[...cacheKeys.prompts.all, 'detail'\],

    detail: (id: string) \=\> \[...cacheKeys.prompts.details(), id\],

  },

  folders: {

    tree: (userId: string) \=\> \['folders', 'tree', userId\],

  },

};

Backup and Recovery

Automated backups: Supabase daily backups with 30-day retention

Point-in-time recovery: Available for last 7 days

Export functionality: Users can export all prompts as JSON/Markdown

Import validation: Schema validation before importing data

5\. API Specifications

5.1 Internal APIs (Server Actions)

Authentication Actions

typescript

// app/actions/auth.ts

export async function updateUserProfile(input: {

  name?: string;

  bio?: string;

  preferences?: UserPreferences;

}) {

  const user \= await requireAuth();


  const updated \= await prisma.user.update({

    where: { id: user.id },

    data: {

      ...input,

      updatedAt: new Date(),

    },

  });


  revalidatePath('/settings');

  return updated;

}

Prompt Management Actions

typescript

// app/actions/prompts.ts

export async function createPrompt(input: {

  title: string;

  content: string;

  description?: string;

  platform?: Platform;

  folderId?: string;

  tags?: string\[\];

}) {

  const user \= await requireAuth();


  const prompt \= await prisma.prompt.create({

    data: {

      ...input,

      userId: user.id,

      tags: {

        create: input.tags?.map(tagName \=\> ({

          tag: {

            connectOrCreate: {

              where: { userId\_name: { userId: user.id, name: tagName } },

              create: { name: tagName, userId: user.id },

            },

          },

        })),

      },

    },

    include: { tags: { include: { tag: true } } },

  });


  // Track activity

  await trackActivity({

    action: 'CREATE',

    entityType: 'PROMPT',

    entityId: prompt.id,

  });


  revalidatePath('/prompts');

  return prompt;

}

export async function updatePrompt(

  id: string,

  input: Partial\<PromptInput\>

) {

  const user \= await requireAuth();


  // Verify ownership

  const existing \= await prisma.prompt.findFirst({

    where: { id, userId: user.id },

  });


  if (\!existing) throw new Error('Prompt not found');


  // Create version if content changed

  if (input.content && input.content \!== existing.content) {

    await createPromptVersion(id, existing.content);

  }


  const updated \= await prisma.prompt.update({

    where: { id },

    data: input,

  });


  revalidatePath(\`/prompts/${id}\`);

  return updated;

}

export async function deletePrompt(id: string) {

  const user \= await requireAuth();


  await prisma.prompt.deleteMany({

    where: { id, userId: user.id },

  });


  revalidatePath('/prompts');

}

export async function searchPrompts(query: {

  text?: string;

  platform?: Platform;

  tags?: string\[\];

  folderId?: string;

  dateFrom?: Date;

  dateTo?: Date;

  page?: number;

  limit?: number;

}) {

  const user \= await requireAuth();

  const { page \= 1, limit \= 20, ...filters } \= query;


  const where: any \= { userId: user.id };


  if (filters.text) {

    where.OR \= \[

      { title: { contains: filters.text, mode: 'insensitive' } },

      { content: { contains: filters.text, mode: 'insensitive' } },

    \];

  }


  if (filters.platform) where.platform \= filters.platform;

  if (filters.folderId) where.folderId \= filters.folderId;


  if (filters.tags?.length) {

    where.tags \= {

      some: {

        tag: { name: { in: filters.tags } },

      },

    };

  }


  if (filters.dateFrom || filters.dateTo) {

    where.createdAt \= {};

    if (filters.dateFrom) where.createdAt.gte \= filters.dateFrom;

    if (filters.dateTo) where.createdAt.lte \= filters.dateTo;

  }


  const \[prompts, total\] \= await Promise.all(\[

    prisma.prompt.findMany({

      where,

      include: { tags: { include: { tag: true } } },

      orderBy: { updatedAt: 'desc' },

      skip: (page \- 1\) \* limit,

      take: limit,

    }),

    prisma.prompt.count({ where }),

  \]);


  return {

    prompts,

    pagination: {

      page,

      limit,

      total,

      pages: Math.ceil(total / limit),

    },

  };

}

Folder Management Actions

typescript

// app/actions/folders.ts

export async function createFolder(input: {

  name: string;

  parentId?: string;

  color?: string;

  icon?: string;

}) {

  const user \= await requireAuth();


  // Get next position

  const maxPosition \= await prisma.folder.findFirst({

    where: { userId: user.id, parentId: input.parentId },

    orderBy: { position: 'desc' },

    select: { position: true },

  });


  const folder \= await prisma.folder.create({

    data: {

      ...input,

      userId: user.id,

      position: (maxPosition?.position ?? \-1) \+ 1,

    },

  });


  revalidatePath('/prompts');

  return folder;

}

export async function moveFolder(

  id: string,

  targetParentId: string | null,

  position: number

) {

  const user \= await requireAuth();


  // Verify ownership and prevent circular reference

  const folder \= await prisma.folder.findFirst({

    where: { id, userId: user.id },

  });


  if (\!folder) throw new Error('Folder not found');


  // Check for circular reference

  if (targetParentId) {

    const isCircular \= await checkCircularReference(id, targetParentId);

    if (isCircular) throw new Error('Circular reference detected');

  }


  // Update positions

  await prisma.$transaction(\[

    // Shift positions in target location

    prisma.folder.updateMany({

      where: {

        userId: user.id,

        parentId: targetParentId,

        position: { gte: position },

      },

      data: { position: { increment: 1 } },

    }),

    // Move folder

    prisma.folder.update({

      where: { id },

      data: { parentId: targetParentId, position },

    }),

  \]);


  revalidatePath('/prompts');

}

export async function getFolderTree(userId: string) {

  const folders \= await prisma.$queryRaw\<Folder\[\]\>\`

    WITH RECURSIVE folder\_tree AS (

      SELECT \* FROM "Folder" 

      WHERE "userId" \= ${userId} AND "parentId" IS NULL

   	

      UNION ALL

   	

      SELECT f.\* FROM "Folder" f

      INNER JOIN folder\_tree ft ON f."parentId" \= ft.id

    )

    SELECT \* FROM folder\_tree

    ORDER BY "parentId", position

  \`;


  // Build tree structure

  return buildFolderTree(folders);

}

Response Schemas All Server Actions return typed responses using Zod schemas:

typescript

// schemas/api.ts

import { z } from 'zod';

export const PromptSchema \= z.object({

  id: z.string(),

  title: z.string(),

  content: z.string(),

  description: z.string().optional(),

  platform: z.enum(\['GENERAL', 'CHATGPT', 'CLAUDE', ...\]),

  userId: z.string(),

  folderId: z.string().optional(),

  isTemplate: z.boolean(),

  isPublic: z.boolean(),

  createdAt: z.date(),

  updatedAt: z.date(),

  tags: z.array(TagSchema).optional(),

});

export const PaginatedResponseSchema \= z.object({

  data: z.array(z.unknown()),

  pagination: z.object({

    page: z.number(),

    limit: z.number(),

    total: z.number(),

    pages: z.number(),

  }),

});

export const ErrorResponseSchema \= z.object({

  error: z.string(),

  code: z.string().optional(),

  details: z.record(z.string()).optional(),

});

5.2 External Integrations

Clerk Authentication

typescript

// Integration: Clerk webhooks

// app/api/webhooks/clerk/route.ts

import { Webhook } from 'svix';

import { headers } from 'next/headers';

import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {

  const WEBHOOK\_SECRET \= process.env.CLERK\_WEBHOOK\_SECRET;


  if (\!WEBHOOK\_SECRET) {

    throw new Error('Missing CLERK\_WEBHOOK\_SECRET');

  }


  // Get headers

  const headerPayload \= headers();

  const svix\_id \= headerPayload.get("svix-id");

  const svix\_timestamp \= headerPayload.get("svix-timestamp");

  const svix\_signature \= headerPayload.get("svix-signature");


  // Get body

  const payload \= await req.json();

  const body \= JSON.stringify(payload);


  // Verify webhook

  const wh \= new Webhook(WEBHOOK\_SECRET);

  let evt: WebhookEvent;


  try {

    evt \= wh.verify(body, {

      "svix-id": svix\_id\!,

      "svix-timestamp": svix\_timestamp\!,

      "svix-signature": svix\_signature\!,

    }) as WebhookEvent;

  } catch (err) {

    return new Response('Error verifying webhook', { status: 400 });

  }


  // Handle events

  switch (evt.type) {

    case 'user.created':

      await handleUserCreated(evt.data);

      break;

    case 'user.updated':

      await handleUserUpdated(evt.data);

      break;

    case 'user.deleted':

      await handleUserDeleted(evt.data);

      break;

  }


  return new Response('', { status: 200 });

}

async function handleUserCreated(userData: any) {

  await prisma.user.create({

    data: {

      clerkId: userData.id,

      email: userData.email\_addresses\[0\].email\_address,

      name: \`${userData.first\_name} ${userData.last\_name}\`.trim(),

      avatar: userData.image\_url,

    },

  });

}

Supabase Database

typescript

// lib/supabase.ts

import { PrismaClient } from '@prisma/client';

// Connection URL from environment

const prismaClientSingleton \= () \=\> {

  return new PrismaClient({

    datasources: {

      db: {

        url: process.env.DATABASE\_URL,

      },

    },

    log: process.env.NODE\_ENV \=== 'development' 

      ? \['query', 'error', 'warn'\] 

      : \['error'\],

  });

};

declare global {

  var prisma: undefined | ReturnType\<typeof prismaClientSingleton\>;

}

export const prisma \= globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE\_ENV \!== 'production') {

  globalThis.prisma \= prisma;

}

Future Integrations

typescript

// AI Platform Integration (future)

interface AIIntegration {

  provider: 'openai' | 'anthropic' | 'google';

  apiKey: string;

  testPrompt: (prompt: string) \=\> Promise\<string\>;

  validatePrompt: (prompt: string) \=\> Promise\<ValidationResult\>;

}

// Export Integration (future)

interface ExportIntegration {

  format: 'json' | 'markdown' | 'csv';

  export: (prompts: Prompt\[\]) \=\> Promise\<Blob\>;

  import: (file: File) \=\> Promise\<Prompt\[\]\>;

}

6\. Security & Privacy

6.1 Authentication & Authorization

Authentication Mechanism

Provider: Clerk with JWT-based authentication

Session Management: HTTP-only cookies with secure flag

Token Handling: Automatic refresh with 15-minute access tokens

Multi-factor: Optional TOTP-based 2FA through Clerk

Authorization Strategy

typescript

// middleware.ts

export const config \= {

  matcher: \['/((?\!api|\_next/static|\_next/image|favicon.ico).\*)'\],

};

export default authMiddleware({

  publicRoutes: \['/', '/features', '/pricing', '/blog(.\*)'\],

  afterAuth(auth, req) {

    // Redirect logged out users to sign-in

    if (\!auth.userId && \!auth.isPublicRoute) {

      return redirectToSignIn({ returnBackUrl: req.url });

    }

 	

    // Redirect onboarding if needed

    if (auth.userId && \!auth.isPublicRoute) {

      const user \= await getUserProfile(auth.userId);

      if (\!user?.onboarded && req.nextUrl.pathname \!== '/onboarding') {

        return NextResponse.redirect(new URL('/onboarding', req.url));

      }

    }

  },

});

// Server-side authorization

export async function requireAuth() {

  const { userId } \= auth();

  if (\!userId) throw new Error('Unauthorized');


  const user \= await prisma.user.findUnique({

    where: { clerkId: userId },

  });


  if (\!user) throw new Error('User not found');

  return user;

}

// Role-based access

export async function requireRole(role: UserRole) {

  const user \= await requireAuth();

  if (user.role \!== role) throw new Error('Insufficient permissions');

  return user;

}

6.2 Data Security

Encryption Strategies

At Rest: Supabase encrypts all data at rest using AES-256

In Transit: All connections use TLS 1.3

Sensitive Data: User tokens encrypted with APP\_SECRET before storage

typescript

// lib/encryption.ts

import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm \= 'aes-256-gcm';

const secretKey \= Buffer.from(process.env.ENCRYPTION\_KEY\!, 'hex');

export function encrypt(text: string): string {

  const iv \= randomBytes(16);

  const cipher \= createCipheriv(algorithm, secretKey, iv);


  const encrypted \= Buffer.concat(\[

    cipher.update(text, 'utf8'),

    cipher.final(),

  \]);


  const authTag \= cipher.getAuthTag();


  return Buffer.concat(\[authTag, iv, encrypted\]).toString('hex');

}

export function decrypt(encryptedHex: string): string {

  const encrypted \= Buffer.from(encryptedHex, 'hex');


  const authTag \= encrypted.slice(0, 16);

  const iv \= encrypted.slice(16, 32);

  const text \= encrypted.slice(32);


  const decipher \= createDecipheriv(algorithm, secretKey, iv);

  decipher.setAuthTag(authTag);


  return decipher.update(text) \+ decipher.final('utf8');

}

PII Handling

Email addresses hashed for logging

No PII in URL parameters

User data deletion on account closure

Export functionality for data portability

Compliance Requirements

GDPR: Data export, deletion rights, consent management

CCPA: California privacy rights support

SOC 2: Audit logging, access controls

6.3 Application Security

Input Validation

typescript

// lib/validation.ts

import { z } from 'zod';

import DOMPurify from 'isomorphic-dompurify';

// Prompt content validation

export const PromptContentSchema \= z.string()

  .min(1, 'Content is required')

  .max(50000, 'Content too long')

  .transform((content) \=\> {

    // Sanitize HTML but preserve markdown

    return DOMPurify.sanitize(content, {

      ALLOWED\_TAGS: \[\],

      ALLOWED\_ATTR: \[\],

      KEEP\_CONTENT: true,

    });

  });

// SQL injection prevention via Prisma

// XSS prevention via React's default escaping

// CSRF protection via Server Actions

Security Headers

typescript

// next.config.js

const securityHeaders \= \[

  {

    key: 'X-DNS-Prefetch-Control',

    value: 'on'

  },

  {

    key: 'Strict-Transport-Security',

    value: 'max-age=63072000; includeSubDomains; preload'

  },

  {

    key: 'X-XSS-Protection',

    value: '1; mode=block'

  },

  {

    key: 'X-Frame-Options',

    value: 'SAMEORIGIN'

  },

  {

    key: 'X-Content-Type-Options',

    value: 'nosniff'

  },

  {

    key: 'Referrer-Policy',

    value: 'origin-when-cross-origin'

  },

  {

    key: 'Content-Security-Policy',

    value: ContentSecurityPolicy.replace(/\\s{2,}/g, ' ').trim()

  }

\];

Rate Limiting

typescript

// lib/rate-limit.ts

import { Ratelimit } from '@upstash/ratelimit';

import { Redis } from '@upstash/redis';

const ratelimit \= new Ratelimit({

  redis: Redis.fromEnv(),

  limiter: Ratelimit.slidingWindow(10, '10 s'),

});

export async function checkRateLimit(identifier: string) {

  const { success, limit, reset, remaining } \= await ratelimit.limit(

    identifier

  );


  if (\!success) {

    throw new Error('Rate limit exceeded');

  }


  return { limit, reset, remaining };

}

// Usage in Server Actions

export async function createPrompt(input: PromptInput) {

  const user \= await requireAuth();

  await checkRateLimit(\`create-prompt:${user.id}\`);


  // ... rest of implementation

}

7\. User Interface Specifications

7.1 Design System

Visual Design Principles

Bold Simplicity: Clean interfaces with purposeful complexity

Breathable Whitespace: Strategic negative space for cognitive comfort

Motion Choreography: Physics-based transitions for spatial continuity

Content-First: Prioritize user objectives over decoration

Component Library Structure

/components

  /ui              \# Base UI components

    /button

    /input

    /card

    /modal

  /features        \# Feature-specific components

    /prompts

    /folders

    /editor

  /layouts         \# Layout components

    /sidebar

    /header

    /footer

Responsive Design Approach

Mobile-first development

Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

Touch-optimized interactions for mobile

Adaptive layouts for different screen sizes

Accessibility Standards

WCAG 2.1 AA compliance

Keyboard navigation support

Screen reader optimization

Focus indicators and skip links

Reduced motion preferences

7.2 Design Foundations

7.2.1 Color System

Primary Colors

css

:root {

  /\* Primary \*/

  \--primary-dark: \#0F0F14;        /\* Deep charcoal backgrounds \*/

  \--primary-surface: \#1A1A1F;     /\* Elevated surfaces \*/

  \--primary-light: \#F8F9FA;       /\* Text and highlights \*/


  /\* Secondary \*/

  \--secondary-purple: \#8B5CF6;    /\* Primary accent \*/

  \--secondary-purple-light: \#A78BFA; /\* Hover states \*/

  \--secondary-purple-pale: \#EDE9FE;  /\* Subtle backgrounds \*/


  /\* Accent Gradient \*/

  \--gradient-start: \#8B5CF6;      /\* Purple \*/

  \--gradient-end: \#EC4899;        /\* Pink \*/

  \--gradient: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));


  /\* Functional \*/

  \--success: \#10B981;

  \--warning: \#F59E0B;

  \--error: \#EF4444;

  \--info: \#3B82F6;


  /\* Neutrals \*/

  \--neutral-50: \#FAFAFA;

  \--neutral-100: \#F4F4F5;

  \--neutral-200: \#E4E4E7;

  \--neutral-400: \#A1A1AA;

  \--neutral-500: \#71717A;

  \--neutral-600: \#52525B;

  \--neutral-700: \#3F3F46;

  \--neutral-800: \#27272A;

  \--neutral-900: \#18181B;

}

7.2.2 Typography

css

:root {

  /\* Font Families \*/

  \--font-sans: 'Inter', \-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  \--font-mono: 'JetBrains Mono', 'Courier New', monospace;


  /\* Font Sizes \*/

  \--text-xs: 0.75rem;     /\* 12px \*/

  \--text-sm: 0.875rem;    /\* 14px \*/

  \--text-base: 1rem;      /\* 16px \*/

  \--text-lg: 1.125rem;    /\* 18px \*/

  \--text-xl: 1.25rem;     /\* 20px \*/

  \--text-2xl: 1.5rem;     /\* 24px \*/

  \--text-3xl: 1.75rem;    /\* 28px \*/

  \--text-4xl: 2rem;       /\* 32px \*/


  /\* Line Heights \*/

  \--leading-tight: 1.25;

  \--leading-normal: 1.5;

  \--leading-relaxed: 1.75;


  /\* Font Weights \*/

  \--font-light: 300;

  \--font-normal: 400;

  \--font-medium: 500;

  \--font-semibold: 600;

  \--font-bold: 700;

}

/\* Typography Classes \*/

.heading-1 {

  font-size: var(--text-4xl);

  font-weight: var(--font-bold);

  line-height: var(--leading-tight);

  letter-spacing: \-0.025em;

}

.body-large {

  font-size: var(--text-base);

  font-weight: var(--font-normal);

  line-height: var(--leading-normal);

}

.code-block {

  font-family: var(--font-mono);

  font-size: var(--text-sm);

  line-height: var(--leading-normal);

}

7.2.3 Spacing & Layout

css

:root {

  /\* Base Unit: 4px \*/

  \--space-1: 0.25rem;   /\* 4px \*/

  \--space-2: 0.5rem;    /\* 8px \*/

  \--space-3: 0.75rem;   /\* 12px \*/

  \--space-4: 1rem;      /\* 16px \*/

  \--space-5: 1.25rem;   /\* 20px \*/

  \--space-6: 1.5rem;    /\* 24px \*/

  \--space-8: 2rem;      /\* 32px \*/

  \--space-10: 2.5rem;   /\* 40px \*/

  \--space-12: 3rem;     /\* 48px \*/

  \--space-16: 4rem;     /\* 64px \*/


  /\* Container \*/

  \--container-sm: 640px;

  \--container-md: 768px;

  \--container-lg: 1024px;

  \--container-xl: 1280px;


  /\* Border Radius \*/

  \--radius-sm: 0.25rem;   /\* 4px \*/

  \--radius-md: 0.5rem;    /\* 8px \*/

  \--radius-lg: 0.75rem;   /\* 12px \*/

  \--radius-xl: 1rem;      /\* 16px \*/

  \--radius-full: 9999px;

}

7.2.4 Interactive Elements

css

/\* Button Base \*/

.button {

  height: 40px;

  padding: 0 var(--space-6);

  font-size: var(--text-sm);

  font-weight: var(--font-medium);

  border-radius: var(--radius-md);

  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  cursor: pointer;

}

/\* Primary Button \*/

.button-primary {

  background: var(--gradient);

  color: white;

  box-shadow: 0 4px 6px \-1px rgba(139, 92, 246, 0.25);

}

.button-primary:hover {

  filter: brightness(1.1);

  transform: scale(1.02);

}

.button-primary:active {

  transform: scale(0.98);

}

/\* Input Fields \*/

.input {

  height: 40px;

  padding: 0 var(--space-4);

  background: var(--primary-dark);

  border: 1px solid var(--neutral-800);

  border-radius: var(--radius-md);

  color: var(--neutral-100);

  font-size: var(--text-sm);

  transition: all 150ms ease-out;

}

.input:focus {

  outline: none;

  border-color: var(--secondary-purple);

  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);

}

/\* Cards \*/

.card {

  background: var(--primary-surface);

  border: 1px solid rgba(255, 255, 255, 0.06);

  border-radius: var(--radius-lg);

  padding: var(--space-6);

  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);

  transition: all 200ms ease-out;

}

.card:hover {

  box-shadow: 0 4px 6px \-1px rgba(0, 0, 0, 0.4);

  transform: translateY(-1px);

}

7.2.5 Component Specifications

Design Tokens Structure

typescript

// theme/tokens.ts

export const tokens \= {

  colors: {

    primary: {

      dark: '\#0F0F14',

      surface: '\#1A1A1F',

      light: '\#F8F9FA',

    },

    secondary: {

      purple: '\#8B5CF6',

      purpleLight: '\#A78BFA',

      purplePale: '\#EDE9FE',

    },

    // ... rest of colors

  },

  spacing: {

    xs: '0.25rem',

    sm: '0.5rem',

    md: '1rem',

    lg: '1.5rem',

    xl: '2rem',

    // ... rest of spacing

  },

  typography: {

    fonts: {

      sans: 'Inter, \-apple-system, sans-serif',

      mono: 'JetBrains Mono, monospace',

    },

    sizes: {

      xs: '0.75rem',

      sm: '0.875rem',

      base: '1rem',

      // ... rest of sizes

    },

  },

};

7.3 User Experience Flows

Key User Journeys

First-Time User Onboarding

Landing page → Sign up → Email verification

Welcome screen → Feature tour

Create first prompt → Organization tutorial

Dashboard with sample content

Prompt Creation Flow

Dashboard → New prompt button

Editor opens with template selection

Write/edit with live preview

Add tags and folder

Save with auto-versioning

Search and Discovery

Search bar with suggestions

Filter sidebar with facets

Results with highlighting

Quick actions on hover

Bulk operations

Navigation Structure

/                     \# Landing page

/sign-in             \# Authentication

/sign-up

/dashboard           \# Main dashboard

/prompts             \# Prompt list/grid

  /new               \# Create new prompt

  /\[id\]              \# View/edit prompt

  /templates         \# Template gallery

/folders             \# Folder management

/search              \# Advanced search

/settings            \# User settings

  /profile

  /preferences

  /billing

/admin               \# Admin panel (role-based)

State Management

typescript

// stores/ui.ts

interface UIState {

  sidebar: {

    isOpen: boolean;

    activeFolder: string | null;

  };

  editor: {

    mode: 'edit' | 'preview' | 'split';

    isDirty: boolean;

    autoSaveEnabled: boolean;

  };

  search: {

    query: string;

    filters: SearchFilters;

    view: 'grid' | 'list';

  };

}

// stores/prompts.ts

interface PromptsState {

  prompts: Map\<string, Prompt\>;

  selected: Set\<string\>;

  sortBy: 'updated' | 'created' | 'title';

  filterBy: FilterOptions;

}

8\. Infrastructure & Deployment

8.1 Infrastructure Requirements

Hosting Environment

Platform: Vercel (serverless)

Regions: Auto-scaled globally via Vercel Edge Network

Environment: Node.js 20.x runtime

Server Requirements

Compute: Serverless functions with 10s default timeout

Memory: 1024MB per function (configurable up to 3008MB)

Concurrent Executions: 1000 (Vercel Pro plan)

Network Architecture

CDN: Vercel Edge Network for static assets

API Routes: Serverless functions at edge locations

Database Connection: Direct connection to Supabase

WebSockets: Not required for MVP

Storage Requirements

Database Storage:

Initial: 8GB (Supabase free tier)

Growth projection: \~1GB per 10,000 active users

Scaling: Automatic with Supabase Pro

File Storage:

Vercel Blob for future attachments

1GB included, $0.03/GB additional

Build Artifacts:

Vercel handles automatically

Retained for 90 days

8.2 Deployment Strategy

CI/CD Pipeline

yaml

\# .github/workflows/deploy.yml

name: Deploy to Vercel

on:

  push:

    branches: \[main, develop\]

  pull\_request:

    branches: \[main\]

jobs:

  test:

    runs-on: ubuntu-latest

    steps:

      \- uses: actions/checkout@v3

      \- uses: actions/setup-node@v3

        with:

          node-version: '20'

          cache: 'npm'

   	

      \- run: npm ci

      \- run: npm run lint

      \- run: npm run type-check

      \- run: npm run test

   	

      \# Database migrations check

      \- run: npx prisma validate

      \- run: npx prisma generate


  deploy-preview:

    needs: test

    if: github.event\_name \== 'pull\_request'

    runs-on: ubuntu-latest

    steps:

      \- uses: actions/checkout@v3

      \- uses: amondnet/vercel-action@v20

        with:

          vercel-token: ${{ secrets.VERCEL\_TOKEN }}

          vercel-org-id: ${{ secrets.VERCEL\_ORG\_ID }}

          vercel-project-id: ${{ secrets.VERCEL\_PROJECT\_ID }}


  deploy-production:

    needs: test

    if: github.ref \== 'refs/heads/main'

    runs-on: ubuntu-latest

    steps:

      \- uses: actions/checkout@v3

   	

      \# Run migrations

      \- run: npx prisma migrate deploy

        env:

          DATABASE\_URL: ${{ secrets.DATABASE\_URL }}

   	

      \# Deploy to Vercel

      \- uses: amondnet/vercel-action@v20

        with:

          vercel-token: ${{ secrets.VERCEL\_TOKEN }}

          vercel-org-id: ${{ secrets.VERCEL\_ORG\_ID }}

          vercel-project-id: ${{ secrets.VERCEL\_PROJECT\_ID }}

          vercel-args: '--prod'

Environment Management

typescript

// env.mjs \- Runtime environment validation

import { z } from 'zod';

const envSchema \= z.object({

  // Database

  DATABASE\_URL: z.string().url(),


  // Authentication

  CLERK\_SECRET\_KEY: z.string(),

  CLERK\_WEBHOOK\_SECRET: z.string(),

  NEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY: z.string(),


  // Application

  NEXT\_PUBLIC\_APP\_URL: z.string().url(),

  ENCRYPTION\_KEY: z.string().length(64), // 32 bytes hex


  // External Services

  SENTRY\_DSN: z.string().url().optional(),

  VERCEL\_ENV: z.enum(\['development', 'preview', 'production'\]),

});

export const env \= envSchema.parse(process.env);

Deployment Procedures

Development Workflow

bash

\# Local development

npm run dev

\# Run migrations

npm run db:migrate

\# Type checking

npm run type-check

\# Testing

npm run test

Staging Deployment

Push to develop branch

Automatic deployment to staging-\[project\].vercel.app

Run E2E tests against staging

Manual QA verification

Production Deployment

Merge PR to main branch

Automated tests run

Database migrations applied

Deployment to production

Monitor error rates and performance

Rollback Strategy

bash

\# Instant rollback via Vercel

vercel rollback \[

Retry

S

Continue

Edit

Rollback Strategy (continued)

bash

\# Instant rollback via Vercel

vercel rollback \[deployment-url\]

\# Database rollback

npx prisma migrate resolve \--rolled-back \[migration-name\]

\# Feature flag rollback (future)

\# Disable feature via environment variable without redeploy

Configuration Management

typescript

// config/index.ts

export const config \= {

  app: {

    name: 'AI Prompt Manager',

    url: env.NEXT\_PUBLIC\_APP\_URL,

    version: process.env.NEXT\_PUBLIC\_VERCEL\_GIT\_COMMIT\_SHA || 'dev',

  },

  features: {

    templateSharing: process.env.FEATURE\_TEMPLATE\_SHARING \=== 'true',

    aiSuggestions: process.env.FEATURE\_AI\_SUGGESTIONS \=== 'true',

    collaboration: process.env.FEATURE\_COLLABORATION \=== 'true',

  },

  limits: {

    maxPromptsPerUser: 1000,

    maxFolderDepth: 10,

    maxTagsPerPrompt: 20,

    maxFileSize: 5 \* 1024 \* 1024, // 5MB

  },

  cache: {

    promptTTL: 5 \* 60 \* 1000, // 5 minutes

    folderTTL: 10 \* 60 \* 1000, // 10 minutes

    searchTTL: 60 \* 1000, // 1 minute

  },

};

9\. Performance & Monitoring

9.1 Performance Optimization

Frontend Optimizations

typescript

// next.config.js

const nextConfig \= {

  images: {

    domains: \['img.clerk.com'\],

    formats: \['image/avif', 'image/webp'\],

  },

  experimental: {

    optimizeCss: true,

    optimizePackageImports: \['lucide-react', 'date-fns'\],

  },

  compiler: {

    removeConsole: process.env.NODE\_ENV \=== 'production',

  },

};

// Dynamic imports for code splitting

const Editor \= dynamic(() \=\> import('@/components/editor'), {

  loading: () \=\> \<EditorSkeleton /\>,

  ssr: false,

});

// Image optimization

import Image from 'next/image';

// Font optimization

import { Inter } from 'next/font/google';

const inter \= Inter({ 

  subsets: \['latin'\],

  display: 'swap',

  variable: '--font-inter',

});

Database Optimizations

sql

\-- Indexes for performance

CREATE INDEX idx\_prompts\_user\_folder ON prompts(user\_id, folder\_id);

CREATE INDEX idx\_prompts\_created ON prompts(created\_at DESC);

CREATE INDEX idx\_prompts\_search ON prompts USING GIN(to\_tsvector('english', title || ' ' || content));

CREATE INDEX idx\_folders\_user\_parent ON folders(user\_id, parent\_id);

CREATE INDEX idx\_tags\_user\_usage ON tags(user\_id, usage\_count DESC);

\-- Materialized view for folder statistics

CREATE MATERIALIZED VIEW folder\_stats AS

SELECT 

  f.id,

  f.user\_id,

  COUNT(p.id) as prompt\_count,

  MAX(p.updated\_at) as last\_activity

FROM folders f

LEFT JOIN prompts p ON f.id \= p.folder\_id

GROUP BY f.id, f.user\_id;

\-- Refresh periodically

CREATE OR REPLACE FUNCTION refresh\_folder\_stats()

RETURNS void AS $$

BEGIN

  REFRESH MATERIALIZED VIEW CONCURRENTLY folder\_stats;

END;

$$ LANGUAGE plpgsql;

Caching Strategy

typescript

// React Query cache configuration

export const queryClient \= new QueryClient({

  defaultOptions: {

    queries: {

      staleTime: 5 \* 60 \* 1000, // 5 minutes

      cacheTime: 10 \* 60 \* 1000, // 10 minutes

      refetchOnWindowFocus: false,

      retry: (failureCount, error: any) \=\> {

        if (error?.status \=== 404\) return false;

        return failureCount \< 3;

      },

    },

  },

});

// Prefetching

export async function prefetchUserData() {

  await queryClient.prefetchQuery({

    queryKey: \['user', 'profile'\],

    queryFn: getUserProfile,

  });


  await queryClient.prefetchQuery({

    queryKey: \['folders', 'tree'\],

    queryFn: getFolderTree,

  });

}

9.2 Monitoring & Analytics

Application Monitoring

typescript

// app/layout.tsx

import { Analytics } from '@vercel/analytics/react';

import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {

  return (

    \<html\>

      \<body\>

        {children}

        \<Analytics /\>

        \<SpeedInsights /\>

      \</body\>

    \</html\>

  );

}

// Error tracking with Sentry

import \* as Sentry from '@sentry/nextjs';

Sentry.init({

  dsn: process.env.SENTRY\_DSN,

  environment: process.env.VERCEL\_ENV,

  tracesSampleRate: 0.1,

  integrations: \[

    new Sentry.BrowserTracing(),

    new Sentry.Replay({

      maskAllText: true,

      blockAllMedia: true,

    }),

  \],

});

Performance Metrics

typescript

// lib/metrics.ts

export function trackPerformance(metric: string, value: number) {

  // Send to analytics

  if (window.gtag) {

    window.gtag('event', 'timing\_complete', {

      name: metric,

      value: Math.round(value),

      event\_category: 'Performance',

    });

  }


  // Log to console in development

  if (process.env.NODE\_ENV \=== 'development') {

    console.log(\`Performance: ${metric} \= ${value}ms\`);

  }

}

// Usage

const startTime \= performance.now();

await searchPrompts(query);

trackPerformance('search\_duration', performance.now() \- startTime);

Health Checks

typescript

// app/api/health/route.ts

export async function GET() {

  const checks \= {

    status: 'healthy',

    timestamp: new Date().toISOString(),

    version: process.env.NEXT\_PUBLIC\_VERCEL\_GIT\_COMMIT\_SHA,

    checks: {

      database: 'unknown',

      auth: 'unknown',

    },

  };


  try {

    // Check database

    await prisma.$queryRaw\`SELECT 1\`;

    checks.checks.database \= 'healthy';

  } catch (error) {

    checks.checks.database \= 'unhealthy';

    checks.status \= 'degraded';

  }


  try {

    // Check auth service

    const response \= await fetch('https://api.clerk.dev/v1/health');

    checks.checks.auth \= response.ok ? 'healthy' : 'unhealthy';

  } catch (error) {

    checks.checks.auth \= 'unhealthy';

    checks.status \= 'degraded';

  }


  return NextResponse.json(checks);

}

10\. Testing Strategy

10.1 Testing Approach

Unit Testing

typescript

// \_\_tests\_\_/actions/prompts.test.ts

import { createPrompt, updatePrompt } from '@/app/actions/prompts';

import { prismaMock } from '@/test/prisma-mock';

describe('Prompt Actions', () \=\> {

  it('should create a prompt', async () \=\> {

    const input \= {

      title: 'Test Prompt',

      content: 'Test content',

      platform: 'CHATGPT',

    };

 	

    prismaMock.prompt.create.mockResolvedValue({

      id: '1',

      ...input,

      userId: 'user-1',

      createdAt: new Date(),

      updatedAt: new Date(),

    });

 	

    const result \= await createPrompt(input);

 	

    expect(result).toHaveProperty('id');

    expect(result.title).toBe(input.title);

  });

});

Integration Testing

typescript

// \_\_tests\_\_/integration/search.test.ts

import { POST } from '@/app/api/search/route';

describe('Search Integration', () \=\> {

  it('should return search results', async () \=\> {

    const request \= new Request('http://localhost/api/search', {

      method: 'POST',

      body: JSON.stringify({

        query: 'test prompt',

        filters: { platform: 'CHATGPT' },

      }),

    });

 	

    const response \= await POST(request);

    const data \= await response.json();

 	

    expect(response.status).toBe(200);

    expect(data).toHaveProperty('results');

    expect(data).toHaveProperty('total');

  });

});

E2E Testing

typescript

// e2e/prompt-creation.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Prompt Creation', () \=\> {

  test('should create and save a new prompt', async ({ page }) \=\> {

    // Login

    await page.goto('/sign-in');

    await page.fill('\[name="email"\]', 'test@example.com');

    await page.fill('\[name="password"\]', 'password');

    await page.click('button\[type="submit"\]');

 	

    // Navigate to new prompt

    await page.goto('/prompts/new');

 	

    // Fill prompt details

    await page.fill('\[name="title"\]', 'Test Prompt');

    await page.fill('\[name="content"\]', 'This is a test prompt');

 	

    // Save

    await page.click('button:has-text("Save")');

 	

    // Verify redirect and success

    await expect(page).toHaveURL(/\\/prompts\\/\[\\w-\]+$/);

    await expect(page.locator('text=Prompt saved')).toBeVisible();

  });

});

10.2 Quality Assurance

Code Quality Tools

json

// package.json scripts

{

  "scripts": {

    "lint": "next lint",

    "lint:fix": "next lint \--fix",

    "type-check": "tsc \--noEmit",

    "test": "jest",

    "test:watch": "jest \--watch",

    "test:coverage": "jest \--coverage",

    "test:e2e": "playwright test",

    "analyze": "ANALYZE=true next build"

  }

}

Pre-commit Hooks

json

// .husky/pre-commit

\#\!/bin/sh

. "$(dirname "$0")/\_/husky.sh"

npm run lint

npm run type-check

npm run test \-- \--passWithNoTests

Performance Budget

javascript

// lighthouse.config.js

module.exports \= {

  ci: {

    collect: {

      url: \['http://localhost:3000/'\],

      numberOfRuns: 3,

    },

    assert: {

      assertions: {

        'categories:performance': \['error', { minScore: 0.9 }\],

        'categories:accessibility': \['error', { minScore: 0.95 }\],

        'categories:best-practices': \['error', { minScore: 0.9 }\],

        'categories:seo': \['error', { minScore: 0.9 }\],

        'first-contentful-paint': \['error', { maxNumericValue: 2000 }\],

        'largest-contentful-paint': \['error', { maxNumericValue: 3000 }\],

        'cumulative-layout-shift': \['error', { maxNumericValue: 0.1 }\],

        'total-blocking-time': \['error', { maxNumericValue: 300 }\],

      },

    },

  },

};

11\. Future Considerations

11.1 Scalability Planning

Database Scaling

Implement read replicas for search queries

Partition prompts table by user\_id

Archive old versions to cold storage

Implement connection pooling with pgBouncer

Application Scaling

Implement Redis for session storage

Add CDN for static assets

Implement queue system for heavy operations

Add WebSocket support for real-time features

11.2 Feature Roadmap

Phase 2 Features

AI-powered prompt suggestions

Collaborative editing

Public prompt marketplace

API access for developers

Mobile applications

Phase 3 Features

Advanced analytics dashboard

Team workspaces

Custom AI model integration

Prompt performance tracking

Export to various AI platforms

12\. Project Structure

ai-prompt-manager/

├── app/                      \# Next.js App Router

│   ├── (auth)/              \# Auth group routes

│   │   ├── sign-in/

│   │   └── sign-up/

│   ├── (dashboard)/         \# Dashboard group routes

│   │   ├── layout.tsx       \# Dashboard layout

│   │   ├── page.tsx         \# Dashboard home

│   │   ├── prompts/

│   │   │   ├── page.tsx     \# Prompts list

│   │   │   ├── new/

│   │   │   └── \[id\]/

│   │   ├── folders/

│   │   ├── search/

│   │   └── settings/

│   ├── api/                 \# API routes

│   │   ├── webhooks/

│   │   └── health/

│   ├── actions/             \# Server Actions

│   │   ├── auth.ts

│   │   ├── prompts.ts

│   │   ├── folders.ts

│   │   └── search.ts

│   └── globals.css

├── components/              \# React components

│   ├── ui/                  \# Base UI components

│   ├── features/            \# Feature components

│   └── layouts/             \# Layout components

├── lib/                     \# Utilities

│   ├── prisma.ts

│   ├── auth.ts

│   ├── validation.ts

│   └── utils.ts

├── hooks/                   \# Custom React hooks

├── stores/                  \# Zustand stores

├── types/                   \# TypeScript types

├── prisma/                  \# Database

│   ├── schema.prisma

│   └── migrations/

├── public/                  \# Static assets

├── tests/                   \# Test files

└── config/                  \# Configuration

\</tech-specification\>

\<project-rules\>---

description: This rule explains Next.js conventions and best practices for fullstack development.

globs: \*\*/\*.js,\*\*/\*.jsx,\*\*/\*.ts,\*\*/\*.tsx

alwaysApply: false

\---

\# Next.js rules

\- Use the App Router structure with \`page.tsx\` files in route directories.

\- Client components must be explicitly marked with \`'use client'\` at the top of the file.

\- Use kebab-case for directory names (e.g., \`components/auth-form\`) and PascalCase for component files.

\- Prefer named exports over default exports, i.e. \`export function Button() { /\* ... \*/ }\` instead of \`export default function Button() { /\* ... \*/ }\`.

\- Minimize \`'use client'\` directives:

  \- Keep most components as React Server Components (RSC)

  \- Only use client components when you need interactivity and wrap in \`Suspense\` with fallback UI

  \- Create small client component wrappers around interactive elements

\- Avoid unnecessary \`useState\` and \`useEffect\` when possible:

  \- Use server components for data fetching

  \- Use React Server Actions for form handling

  \- Use URL search params for shareable state

\- Use \`nuqs\` for URL search param state management

\</project-rules\>

\<core-app-intent\>

Elevator Pitch

A centralized prompt management platform that transforms scattered AI prompts into an organized, searchable, and shareable knowledge base \- think "GitHub for prompts" where users can version, collaborate, and monetize their best AI interactions.

Problem Statement

AI users repeatedly lose valuable prompts across multiple platforms (ChatGPT, Claude, Midjourney, etc.), struggle to find and reuse their best work, and lack ways to collaborate or learn from others' proven prompts. This leads to duplicated effort, inconsistent results, and missed opportunities for knowledge sharing.

Target Audience

Primary: Power users of AI tools (developers, content creators, researchers) who use prompts daily

Secondary: Teams collaborating on AI projects who need standardized prompts

Tertiary: Prompt engineers looking to monetize their expertise

USP

Unlike simple note-taking apps or platform-specific histories, we provide a dedicated prompt management system with version control, advanced formatting support (Markdown/XML), collaboration features, and cross-platform compatibility \- making prompts as manageable as code.

Target Platforms

Web application (responsive design)

Browser extension for quick capture

Mobile apps (iOS/Android) for on-the-go access

API for third-party integrations

Features List

Authentication & User Management

User registration with email verification

OAuth integration (Google, GitHub, Microsoft)

Password reset functionality

Profile management and settings

Prompt Organization

Create folder/tag hierarchy for organization

Nested folders with drag-and-drop

Multiple tags per prompt

Smart collections based on rules

Search across all prompts with filters

Full-text search

Filter by platform, date, tags, author

Search within results

Prompt Creation & Editing

Rich text editor with Markdown/XML support

Syntax highlighting

Live preview

Template variables ({{name}}, {{context}})

Version control for prompts

Save revision history

Compare versions

Restore previous versions

Prompt templates and snippets

Pre-built templates by category

Custom snippet library

Sharing & Collaboration

Privacy settings (private, unlisted, public)

Share via unique links

Team workspaces

Role-based permissions

Shared folders

Comments and annotations

Fork and remix public prompts

Import/Export & Integrations

Import from ChatGPT/Claude exports

Browser extension for quick capture

Export to various formats (JSON, Markdown, PDF)

API for programmatic access

UX/UI Considerations

Dashboard Screen

Recent prompts carousel

Quick actions (new prompt, import)

Usage statistics

Search bar prominently placed

Prompt Editor

Split-screen editor/preview

Collapsible sidebar for organization

Floating toolbar for formatting

Auto-save with status indicator

Browse/Discover Screen

Grid/list view toggle

Infinite scroll with lazy loading

Preview on hover

Quick actions (save, fork, share)

Mobile Optimization

Swipe gestures for navigation

Simplified editor for mobile

Offline mode with sync

Non-Functional Requirements

Performance

Sub-second search results

Instant preview rendering

Optimistic UI updates

Scalability

Support 10k+ prompts per user

Handle concurrent editing in teams

CDN for static assets

Security

End-to-end encryption option

API rate limiting

Regular security audits

GDPR compliance

Accessibility

WCAG 2.1 AA compliance

Keyboard navigation

Screen reader support

Monetization

Freemium Model:

Free: 100 prompts, basic features

Pro ($9/mo): Unlimited prompts, version control, API access

Team ($19/user/mo): Collaboration features, admin controls

Marketplace: Commission on premium prompt sales

Enterprise: Custom pricing for API access and white-label solutions

\</core-app-intent\>

\</context\>

