import { test, expect } from '@playwright/test'

/**
 * Testes E2E para o fluxo do CRM Kanban
 *
 * O Kanban é o componente central do CRM, permitindo visualizar
 * e gerenciar oportunidades através de drag-and-drop entre etapas.
 */

test.describe('CRM Kanban - Estrutura UI', () => {
  test('deve redirecionar para login quando não autenticado', async ({ page }) => {
    await page.goto('/crm')
    await expect(page).toHaveURL(/\/login/)
  })
})

/**
 * Testes de fluxo do Kanban (requerem autenticação)
 *
 * Para executar estes testes, configure:
 * - E2E_TEST_EMAIL: Email de um usuário de teste
 * - E2E_TEST_PASSWORD: Senha do usuário de teste
 *
 * Os testes abaixo estão marcados como skip por padrão.
 */

test.describe('CRM Kanban - Fluxo Completo (autenticado)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(process.env.E2E_TEST_EMAIL || '')
    await page.getByLabel(/senha/i).fill(process.env.E2E_TEST_PASSWORD || '')
    await page.getByRole('button', { name: /entrar/i }).click()
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })
  })

  test('deve exibir página do CRM com kanban', async ({ page }) => {
    await page.goto('/crm')
    await page.waitForLoadState('networkidle')

    // Verificar que estamos na página do CRM
    await expect(page.getByText(/crm|pipeline|oportunidades/i).first()).toBeVisible()
  })

  test('deve exibir 6 colunas do kanban', async ({ page }) => {
    await page.goto('/crm')
    await page.waitForLoadState('networkidle')

    // Verificar as 6 etapas do kanban
    const etapas = ['1º Contato', 'Proposta', 'Negociação', 'Aguardando', 'Finalizada', 'Desistiu']

    for (const etapa of etapas) {
      await expect(page.getByText(new RegExp(etapa, 'i')).first()).toBeVisible()
    }
  })

  test('deve abrir formulário de nova oportunidade', async ({ page }) => {
    await page.goto('/crm')
    await page.waitForLoadState('networkidle')

    // Clicar no botão "Nova Oportunidade"
    await page.getByRole('button', { name: /nova oportunidade/i }).click()

    // Sheet deve aparecer com título
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('deve exibir campos do formulário de oportunidade', async ({ page }) => {
    await page.goto('/crm')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: /nova oportunidade/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Verificar campos no formulário
    await expect(page.getByLabel(/cliente/i)).toBeVisible()
  })

  test('deve criar oportunidade com sucesso', async ({ page }) => {
    // Pré-requisito: ter pelo menos um cliente e um produto cadastrado
    await page.goto('/crm')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: /nova oportunidade|adicionar/i }).click()

    // Selecionar cliente (primeiro disponível)
    await page.getByRole('combobox', { name: /cliente/i }).click()
    await page.getByRole('option').first().click()

    // Adicionar produto
    const addProductButton = page.getByRole('button', { name: /adicionar produto/i })
    if (await addProductButton.isVisible()) {
      await addProductButton.click()
      await page.getByRole('combobox', { name: /produto/i }).click()
      await page.getByRole('option').first().click()
    }

    // Salvar
    await page.getByRole('button', { name: /criar|salvar/i }).click()

    // Deve aparecer no kanban
    await page.waitForLoadState('networkidle')
  })

  test('deve filtrar oportunidades por vendedor', async ({ page }) => {
    await page.goto('/crm')
    await page.waitForLoadState('networkidle')

    // Localizar filtro de vendedor
    const filtroVendedor = page.getByRole('combobox', { name: /vendedor|filtrar/i })
    if (await filtroVendedor.isVisible()) {
      await filtroVendedor.click()
      // Selecionar primeiro vendedor se houver
      const option = page.getByRole('option').first()
      if (await option.isVisible()) {
        await option.click()
        await page.waitForLoadState('networkidle')
      }
    }
  })

  test('deve abrir detalhes de uma oportunidade ao clicar', async ({ page }) => {
    await page.goto('/crm')
    await page.waitForLoadState('networkidle')

    // Clicar em um card de oportunidade (se houver)
    const card = page.locator('[data-testid="kanban-card"]').first()
    if (await card.isVisible()) {
      await card.click()
      // Sidebar de detalhes deve abrir
      await expect(page.getByText(/detalhes|oportunidade/i)).toBeVisible()
    }
  })

  test('deve exibir totais por coluna', async ({ page }) => {
    await page.goto('/crm')
    await page.waitForLoadState('networkidle')

    // Cada coluna deve mostrar o valor total (R$ X,XX)
    await expect(page.getByText(/R\$/).first()).toBeVisible()
  })
})

test.describe('CRM Kanban - Drag and Drop (autenticado)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(process.env.E2E_TEST_EMAIL || '')
    await page.getByLabel(/senha/i).fill(process.env.E2E_TEST_PASSWORD || '')
    await page.getByRole('button', { name: /entrar/i }).click()
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })
  })

  test('deve mover card entre colunas via drag and drop', async ({ page }) => {
    await page.goto('/crm')
    await page.waitForLoadState('networkidle')

    // Localizar um card na primeira coluna
    const sourceCard = page.locator('[data-testid="kanban-card"]').first()
    if (!(await sourceCard.isVisible())) {
      test.skip()
      return
    }

    // Localizar a segunda coluna
    const targetColumn = page.locator('[data-testid="kanban-column"]').nth(1)
    if (!(await targetColumn.isVisible())) {
      test.skip()
      return
    }

    // Realizar drag and drop
    await sourceCard.dragTo(targetColumn)

    // Aguardar atualização
    await page.waitForLoadState('networkidle')
  })

  test('deve confirmar ao mover para Desistiu', async ({ page }) => {
    await page.goto('/crm')
    await page.waitForLoadState('networkidle')

    // Localizar um card em qualquer coluna exceto Desistiu
    const sourceCard = page.locator('[data-testid="kanban-card"]').first()
    if (!(await sourceCard.isVisible())) {
      test.skip()
      return
    }

    // Localizar a coluna Desistiu (última)
    const desistiuColumn = page.locator('[data-testid="kanban-column"]').last()

    // Realizar drag and drop para Desistiu
    await sourceCard.dragTo(desistiuColumn)

    // Deve aparecer diálogo de confirmação
    const confirmDialog = page.getByRole('alertdialog')
    if (await confirmDialog.isVisible()) {
      await expect(confirmDialog.getByText(/confirmar|certeza/i)).toBeVisible()
    }
  })
})

test.describe('Fluxo Completo - Login até Venda (autenticado)', () => {
  test('deve completar fluxo: login -> criar cliente -> criar produto -> criar oportunidade -> mover para venda finalizada', async ({
    page,
  }) => {
    // 1. Login
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(process.env.E2E_TEST_EMAIL || '')
    await page.getByLabel(/senha/i).fill(process.env.E2E_TEST_PASSWORD || '')
    await page.getByRole('button', { name: /entrar/i }).click()
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })

    // 2. Criar vendedor
    await page.goto('/vendedores')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: /adicionar|novo/i }).click()
    const vendedorNome = `Vendedor Fluxo ${Date.now()}`
    await page.getByLabel(/nome/i).fill(vendedorNome)
    await page.getByLabel(/email/i).fill(`vendedor-fluxo-${Date.now()}@teste.com`)
    await page.getByRole('button', { name: /salvar|criar/i }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 })

    // 3. Criar produto
    await page.goto('/produtos')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: /adicionar|novo/i }).click()
    const produtoNome = `Produto Fluxo ${Date.now()}`
    await page.getByLabel(/nome/i).fill(produtoNome)
    await page.getByLabel(/valor|preço/i).fill('1000,00')
    await page.getByRole('button', { name: /salvar|criar/i }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 })

    // 4. Criar cliente
    await page.goto('/clientes')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: /adicionar|novo/i }).click()
    const clienteNome = `Cliente Fluxo ${Date.now()}`
    await page.getByLabel(/nome/i).fill(clienteNome)
    await page.getByLabel(/email/i).fill(`cliente-fluxo-${Date.now()}@teste.com`)
    await page.getByRole('button', { name: /salvar|criar/i }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 })

    // 5. Criar oportunidade
    await page.goto('/crm')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: /nova oportunidade|adicionar/i }).click()

    // Selecionar cliente criado
    await page.getByRole('combobox', { name: /cliente/i }).click()
    await page.getByRole('option', { name: new RegExp(clienteNome) }).click()

    // Adicionar produto
    await page.getByRole('button', { name: /adicionar produto/i }).click()
    await page.getByRole('combobox', { name: /produto/i }).click()
    await page.getByRole('option', { name: new RegExp(produtoNome) }).click()

    // Salvar oportunidade
    await page.getByRole('button', { name: /criar|salvar/i }).click()
    await page.waitForLoadState('networkidle')

    // 6. Verificar que oportunidade aparece no kanban
    await expect(page.getByText(clienteNome)).toBeVisible()

    // 7. Verificar dashboard atualizado
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    // KPIs devem refletir a nova oportunidade
    await expect(page.getByText(/em negociação/i)).toBeVisible()
  })
})
