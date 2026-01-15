import { test, expect } from '@playwright/test'

/**
 * Testes E2E para fluxos de cadastro (CRUD)
 *
 * Estes testes verificam a estrutura e interatividade dos formulários
 * de cadastro. Para testes com dados reais, configure as credenciais
 * de teste via variáveis de ambiente.
 */

test.describe('Fluxo de Cadastros - Estrutura UI', () => {
  // Estes testes são executados sem autenticação para verificar
  // que os redirecionamentos funcionam corretamente

  test.describe('Vendedores', () => {
    test('deve redirecionar para login quando não autenticado', async ({ page }) => {
      await page.goto('/vendedores')
      await expect(page).toHaveURL(/\/login/)
    })
  })

  test.describe('Produtos', () => {
    test('deve redirecionar para login quando não autenticado', async ({ page }) => {
      await page.goto('/produtos')
      await expect(page).toHaveURL(/\/login/)
    })
  })

  test.describe('Clientes', () => {
    test('deve redirecionar para login quando não autenticado', async ({ page }) => {
      await page.goto('/clientes')
      await expect(page).toHaveURL(/\/login/)
    })
  })
})

/**
 * Testes de fluxos de cadastro (requerem autenticação)
 *
 * Para executar estes testes, configure:
 * - E2E_TEST_EMAIL: Email de um usuário de teste
 * - E2E_TEST_PASSWORD: Senha do usuário de teste
 *
 * Os testes abaixo estão marcados como skip por padrão.
 * Remova o .skip quando tiver um ambiente de teste configurado.
 */

test.describe('Vendedores - Fluxo Completo (autenticado)', () => {
  test.beforeEach(async ({ page }) => {
    // Login antes de cada teste
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(process.env.E2E_TEST_EMAIL || '')
    await page.getByLabel(/senha/i).fill(process.env.E2E_TEST_PASSWORD || '')
    await page.getByRole('button', { name: /entrar/i }).click()
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })
  })

  test('deve exibir página de vendedores com tabela ou estado vazio', async ({ page }) => {
    await page.goto('/vendedores')

    // Aguardar carregamento
    await page.waitForLoadState('networkidle')

    // Deve ter título da página (h1 específico, não o link da sidebar)
    await expect(page.locator('main h1')).toBeVisible()
  })

  test('deve abrir modal de criação ao clicar em adicionar', async ({ page }) => {
    await page.goto('/vendedores')
    await page.waitForLoadState('networkidle')

    // Clicar no botão de adicionar vendedor
    await page.getByRole('button', { name: /adicionar vendedor/i }).click()

    // Modal deve aparecer
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('deve criar vendedor com sucesso', async ({ page }) => {
    await page.goto('/vendedores')
    await page.waitForLoadState('networkidle')

    // Abrir modal
    await page.getByRole('button', { name: /adicionar vendedor/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Preencher formulário
    const nomeUnico = `Vendedor E2E ${Date.now()}`
    await page.getByLabel(/nome/i).fill(nomeUnico)
    await page.getByLabel(/email/i).fill(`vendedor-e2e-${Date.now()}@teste.com`)

    // Salvar (botão "Adicionar" no modal)
    await page.getByRole('button', { name: 'Adicionar' }).click()

    // Modal deve fechar (indica sucesso da API)
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 10000 })
  })
})

test.describe('Produtos - Fluxo Completo (autenticado)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(process.env.E2E_TEST_EMAIL || '')
    await page.getByLabel(/senha/i).fill(process.env.E2E_TEST_PASSWORD || '')
    await page.getByRole('button', { name: /entrar/i }).click()
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })
  })

  test('deve exibir página de produtos', async ({ page }) => {
    await page.goto('/produtos')
    await page.waitForLoadState('networkidle')

    // Verificar título da página (h1 dentro do main)
    await expect(page.locator('main h1')).toBeVisible()
  })

  test('deve criar produto com sucesso', async ({ page }) => {
    await page.goto('/produtos')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: /adicionar produto/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    const nomeUnico = `Produto E2E ${Date.now()}`
    await page.getByLabel(/nome/i).fill(nomeUnico)
    await page.getByLabel(/valor/i).fill('99,90')

    await page.getByRole('button', { name: 'Adicionar' }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 })
    await expect(page.getByText(nomeUnico)).toBeVisible()
  })
})

test.describe('Clientes - Fluxo Completo (autenticado)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(process.env.E2E_TEST_EMAIL || '')
    await page.getByLabel(/senha/i).fill(process.env.E2E_TEST_PASSWORD || '')
    await page.getByRole('button', { name: /entrar/i }).click()
    await page.waitForURL(/\/dashboard/, { timeout: 10000 })
  })

  test('deve exibir página de clientes', async ({ page }) => {
    await page.goto('/clientes')
    await page.waitForLoadState('networkidle')

    // Verificar título da página (h1 dentro do main)
    await expect(page.locator('main h1')).toBeVisible()
  })

  test('deve criar cliente com sucesso', async ({ page }) => {
    await page.goto('/clientes')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: /adicionar cliente/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    const nomeUnico = `Cliente E2E ${Date.now()}`
    await page.getByLabel(/nome/i).fill(nomeUnico)
    await page.getByLabel(/email/i).fill(`cliente-e2e-${Date.now()}@teste.com`)

    await page.getByRole('button', { name: 'Adicionar' }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 })
    await expect(page.getByText(nomeUnico)).toBeVisible()
  })

  test('deve buscar cliente por nome', async ({ page }) => {
    await page.goto('/clientes')
    await page.waitForLoadState('networkidle')

    // Verificar campo de busca
    const searchInput = page.getByPlaceholder(/buscar/i)
    await expect(searchInput).toBeVisible()
    await searchInput.fill('teste')
    // Aguardar debounce
    await page.waitForTimeout(500)
  })
})
