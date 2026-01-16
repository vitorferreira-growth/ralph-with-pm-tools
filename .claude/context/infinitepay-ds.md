# InfinitePay Design System

Este arquivo define o Design System oficial do InfinitePay, que DEVE ser usado em todos os projetos gerados pelo Ralph.

---

## 1. Instalacao

### GitHub Packages Registry

O pacote `@cloudwalk/infinitepay-ds-web` esta hospedado no GitHub Packages. Para instalar:

**1. Criar arquivo `.npmrc` na raiz do projeto:**

```
@cloudwalk:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_GITHUB_TOKEN
```

**2. Criar GitHub Personal Access Token:**
- Acesse: https://github.com/settings/tokens
- Clique em "Generate new token (classic)"
- Selecione permissao: `read:packages`
- Copie o token e substitua `SEU_GITHUB_TOKEN` no `.npmrc`

**3. Instalar pacotes:**

```bash
npm install @cloudwalk/infinitepay-ds-web react-calendar date-fns
```

### Peer Dependencies

O Design System requer:
- `react` >= 16.8.0
- `react-dom` >= 16.8.0
- `react-calendar` (para CalendarRange)
- `date-fns` (para formatacao de datas)
- `recharts` (opcional, para CashflowChart)

---

## 2. Configuracao Tailwind

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'
import { infinitepayPreset } from '@cloudwalk/infinitepay-ds-web/preset'

const config: Config = {
  presets: [infinitepayPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@cloudwalk/infinitepay-ds-web/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}

export default config
```

### postcss.config.mjs

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

### globals.css

```css
@import '@cloudwalk/infinitepay-ds-web/styles.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 3. Componentes Disponiveis

### Atoms

| Componente | Import | Uso |
|------------|--------|-----|
| `Button` | `@cloudwalk/infinitepay-ds-web` | Botoes primarios, secundarios, ghost |
| `Input` | `@cloudwalk/infinitepay-ds-web` | Campos de texto com label e error |
| `Icon` | `@cloudwalk/infinitepay-ds-web` | 582 icones vetoriais |
| `Tag` | `@cloudwalk/infinitepay-ds-web` | Tags de status e categorias |
| `Select` | `@cloudwalk/infinitepay-ds-web` | Dropdowns com busca |
| `Checkbox` | `@cloudwalk/infinitepay-ds-web` | Checkboxes com label |
| `Radio` | `@cloudwalk/infinitepay-ds-web` | Radio buttons |
| `Switch` | `@cloudwalk/infinitepay-ds-web` | Toggle switches |
| `Tooltip` | `@cloudwalk/infinitepay-ds-web` | Tooltips informativos |
| `Avatar` | `@cloudwalk/infinitepay-ds-web` | Avatares de usuario |

### Molecules

| Componente | Import | Uso |
|------------|--------|-----|
| `Search` | `@cloudwalk/infinitepay-ds-web` | Campo de busca com icone |

### Templates (Modais)

| Componente | Import | Uso |
|------------|--------|-----|
| `PopupModal` | `@cloudwalk/infinitepay-ds-web` | Modal central |
| `DrawerModal` | `@cloudwalk/infinitepay-ds-web` | Modal lateral (drawer) |
| `AnnouncementModal` | `@cloudwalk/infinitepay-ds-web` | Modal de anuncios |

### Dataviz

| Componente | Import | Uso |
|------------|--------|-----|
| `CalendarRange` | `@cloudwalk/infinitepay-ds-web` | Seletor de periodo |
| `CashflowChart` | `@cloudwalk/infinitepay-ds-web` | Grafico de fluxo de caixa |

---

## 4. Sistema de Icones (582 disponiveis)

### Como usar

```tsx
import { Icon } from '@cloudwalk/infinitepay-ds-web'

<Icon name="icon-check-circle" size="md" color="primary" />
```

### Props do Icon

| Prop | Tipo | Valores | Padrao |
|------|------|---------|--------|
| `name` | string | Ver lista abaixo | required |
| `size` | string | `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"` | `"md"` |
| `color` | string | `"primary"`, `"secondary"`, `"success"`, `"error"`, `"warning"`, `"currentColor"` | `"currentColor"` |

### Icones por Categoria

**Navegacao:**
- `icon-chevron-left`, `icon-chevron-right`, `icon-chevron-up`, `icon-chevron-down`
- `icon-arrow-left`, `icon-arrow-right`, `icon-arrow-up`, `icon-arrow-down`
- `icon-menu`, `icon-close`, `icon-more-horizontal`, `icon-more-vertical`

**Acoes:**
- `icon-plus`, `icon-minus`, `icon-edit`, `icon-trash`, `icon-copy`
- `icon-download`, `icon-upload`, `icon-share`, `icon-link`
- `icon-search`, `icon-filter`, `icon-sort`, `icon-refresh`

**Status:**
- `icon-check`, `icon-check-circle`, `icon-check-square`
- `icon-x`, `icon-x-circle`, `icon-x-square`
- `icon-alert-circle`, `icon-alert-triangle`, `icon-info`
- `icon-clock`, `icon-loader`, `icon-spinner`

**Financeiro:**
- `icon-dollar-sign`, `icon-credit-card`, `icon-wallet`
- `icon-trending-up`, `icon-trending-down`, `icon-bar-chart`
- `icon-pie-chart`, `icon-activity`, `icon-percent`
- `icon-receipt`, `icon-file-text`, `icon-clipboard`

**Usuario:**
- `icon-user`, `icon-users`, `icon-user-plus`, `icon-user-minus`
- `icon-settings`, `icon-log-out`, `icon-lock`, `icon-unlock`
- `icon-eye`, `icon-eye-off`, `icon-bell`, `icon-bell-off`

**Comunicacao:**
- `icon-mail`, `icon-message-circle`, `icon-phone`, `icon-video`
- `icon-send`, `icon-inbox`, `icon-paperclip`

**Arquivos:**
- `icon-file`, `icon-folder`, `icon-image`, `icon-film`
- `icon-archive`, `icon-save`, `icon-printer`

**Dispositivos:**
- `icon-smartphone`, `icon-tablet`, `icon-monitor`, `icon-terminal`
- `icon-wifi`, `icon-bluetooth`, `icon-battery`

### REGRA CRITICA

**SEMPRE verifique se o icone existe antes de usar!**

Se precisar de um icone especifico e nao encontrar na lista, use um icone similar ou generico. Nao invente nomes de icones.

---

## 5. Cores Semanticas

### Background

| Classe | Uso |
|--------|-----|
| `bg-primary` | Fundo principal de pagina |
| `bg-secondary` | Fundo de cards e secoes |
| `bg-tertiary` | Fundo de elementos elevados |
| `bg-inverse` | Fundo escuro (para contraste) |

### Texto

| Classe | Uso |
|--------|-----|
| `text-primary` | Texto principal (titulos, corpo) |
| `text-secondary` | Texto secundario (labels, hints) |
| `text-tertiary` | Texto terciario (placeholders) |
| `text-inverse` | Texto em fundos escuros |
| `text-success` | Texto de sucesso |
| `text-error` | Texto de erro |
| `text-warning` | Texto de aviso |

### Bordas

| Classe | Uso |
|--------|-----|
| `border-primary` | Borda principal |
| `border-secondary` | Borda secundaria |
| `border-tertiary` | Borda sutil |
| `border-success` | Borda de sucesso |
| `border-error` | Borda de erro |

### Estados

| Classe | Uso |
|--------|-----|
| `bg-success` | Background de sucesso |
| `bg-error` | Background de erro |
| `bg-warning` | Background de aviso |
| `bg-info` | Background informativo |

---

## 6. Tipografia

### Font Family

O DS usa a fonte **CeraPro**. Ela e carregada automaticamente pelo CSS do pacote.

### Classes de Titulo

| Classe | Uso |
|--------|-----|
| `font-heading-1` | Titulo principal (h1) |
| `font-heading-2` | Subtitulo (h2) |
| `font-heading-3` | Secao (h3) |
| `font-heading-4` | Subsecao (h4) |
| `font-heading-5` | Card title (h5) |
| `font-heading-6` | Small heading (h6) |

### Classes de Conteudo

| Classe | Uso |
|--------|-----|
| `font-content-primary` | Texto de corpo principal |
| `font-content-secondary` | Texto secundario |
| `font-content-caption` | Legendas e footnotes |
| `font-content-label` | Labels de formulario |

---

## 7. Exemplos de Uso

### Button

```tsx
import { Button } from '@cloudwalk/infinitepay-ds-web'

// Variantes
<Button variant="primary">Confirmar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="ghost">Saiba mais</Button>
<Button variant="destructive">Excluir</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="md">Medio</Button>
<Button size="lg">Grande</Button>

// Estados
<Button disabled>Desabilitado</Button>
<Button loading>Carregando</Button>

// Com icone
<Button iconLeft="icon-plus">Adicionar</Button>
<Button iconRight="icon-arrow-right">Proximo</Button>
```

### Input

```tsx
import { Input } from '@cloudwalk/infinitepay-ds-web'

<Input
  label="Email"
  placeholder="seu@email.com"
  type="email"
/>

<Input
  label="Senha"
  type="password"
  error="Senha invalida"
/>

<Input
  label="Buscar"
  iconLeft="icon-search"
/>
```

### Tag

```tsx
import { Tag } from '@cloudwalk/infinitepay-ds-web'

<Tag context="success">Aprovado</Tag>
<Tag context="error">Rejeitado</Tag>
<Tag context="warning">Pendente</Tag>
<Tag context="info">Em analise</Tag>
<Tag context="neutral">Rascunho</Tag>
```

### PopupModal

```tsx
import { PopupModal } from '@cloudwalk/infinitepay-ds-web'

<PopupModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmar acao"
  description="Tem certeza que deseja continuar?"
  primaryAction={{
    label: "Confirmar",
    onClick: handleConfirm
  }}
  secondaryAction={{
    label: "Cancelar",
    onClick: () => setIsOpen(false)
  }}
/>
```

### Select

```tsx
import { Select } from '@cloudwalk/infinitepay-ds-web'

<Select
  label="Status"
  options={[
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
  ]}
  value={status}
  onChange={setStatus}
/>
```

---

## 8. Regras Criticas para AI Agents

### NUNCA fazer:

1. **NUNCA use `className` para override de estilos dos componentes**
   - Os componentes do DS sao closed para customizacao de estilo
   - Use apenas as props disponiveis (variant, size, context)

2. **NUNCA crie cores customizadas**
   - Use apenas cores semanticas do DS (bg-primary, text-success, etc.)
   - Nao use cores hexadecimais diretas

3. **NUNCA invente nomes de icones**
   - Sempre verifique a lista de icones disponiveis
   - Se nao encontrar, use um icone similar

4. **NUNCA recrie componentes que ja existem**
   - Use Button do DS, nao crie botoes customizados
   - Use Input do DS, nao crie inputs customizados

### SEMPRE fazer:

1. **SEMPRE use cores semanticas**
   ```tsx
   // Correto
   <div className="bg-primary text-secondary">

   // Errado
   <div className="bg-white text-gray-500">
   ```

2. **SEMPRE use props dos componentes**
   ```tsx
   // Correto
   <Button variant="primary" size="lg">

   // Errado
   <Button className="bg-blue-500 text-white px-8 py-4">
   ```

3. **SEMPRE use tipografia do DS**
   ```tsx
   // Correto
   <h1 className="font-heading-1">

   // Errado
   <h1 className="text-3xl font-bold">
   ```

4. **SEMPRE verifique icones**
   ```tsx
   // Antes de usar, confirme que o icone existe
   <Icon name="icon-check-circle" />  // OK se existir na lista
   ```

### Excecoes permitidas (apenas para layout):

Voce pode usar `className` APENAS para:
- Spacing: `mt-4`, `mb-8`, `px-6`, `py-4`, `gap-4`
- Layout: `flex`, `grid`, `w-full`, `max-w-md`
- Positioning: `absolute`, `relative`, `fixed`

```tsx
// Correto - className apenas para layout
<Button variant="primary" className="w-full mt-4">
  Enviar
</Button>

// Errado - className para estilo visual
<Button className="bg-green-500 rounded-full shadow-lg">
  Enviar
</Button>
```

---

## 9. Utilitarios

### Formatacao de Valores

```tsx
import { brlc_formatter, formatDate } from '@cloudwalk/infinitepay-ds-web'

// Formatar moeda
brlc_formatter(1234.56)  // "R$ 1.234,56"

// Formatar data
formatDate(new Date(), 'dd/MM/yyyy')  // "15/01/2024"
```

### Formatacao de Documentos

```tsx
import { formatCPF, formatCNPJ, formatPhone } from '@cloudwalk/infinitepay-ds-web'

formatCPF('12345678900')     // "123.456.789-00"
formatCNPJ('12345678000100') // "12.345.678/0001-00"
formatPhone('11999998888')   // "(11) 99999-8888"
```

---

## 10. Dark Mode

O DS suporta dark mode via classe `dark` no elemento root.

```tsx
// Ativar dark mode
<html className="dark">

// Toggle dark mode
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}
```

Todos os componentes e cores semanticas se adaptam automaticamente.

---

## 11. Checklist de Implementacao

Ao implementar frontend com InfinitePay DS:

- [ ] `.npmrc` configurado com GitHub token
- [ ] Pacote `@cloudwalk/infinitepay-ds-web` instalado
- [ ] `tailwind.config.ts` com preset do DS
- [ ] `globals.css` importando estilos do DS
- [ ] Usando apenas componentes do DS (Button, Input, Icon, etc.)
- [ ] Usando apenas cores semanticas (bg-primary, text-success, etc.)
- [ ] Usando tipografia do DS (font-heading-*, font-content-*)
- [ ] Verificado que todos os icones existem
- [ ] Nenhum override de className nos componentes (exceto layout)

---

## Resumo para PRD

```markdown
## Design System

**Package:** `@cloudwalk/infinitepay-ds-web`

**Setup:**
1. Configurar GitHub Packages (.npmrc com token)
2. Instalar: `npm install @cloudwalk/infinitepay-ds-web react-calendar date-fns`
3. Configurar Tailwind com preset do DS

**Componentes:** Button, Input, Icon (582), Tag, Select, Modal, etc.

**Cores:** Semanticas (bg-primary, text-primary, border-primary)

**Tipografia:** CeraPro (font-heading-*, font-content-*)

**Dark Mode:** Suportado via class 'dark'

**Regra:** NUNCA fazer override de estilos com className (apenas layout)
```
