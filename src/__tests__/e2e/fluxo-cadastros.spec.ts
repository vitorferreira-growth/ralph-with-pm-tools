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

test.describe.skip('Vendedores - Fluxo Completo (autenticado)', () => {
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

    // Deve ter título ou elemento identificador da página
    await expect(
      page.getByRole('heading', { name: /vendedores/i }).or(page.getByText(/vendedores/i).first())
    ).toBeVisible()
  })

  test('deve abrir modal de criação ao clicar em adicionar', async ({ page }) => {
    await page.goto('/vendedores')
    await page.waitForLoadState('networkidle')

    // Clicar no botão de adicionar
    await page.getByRole('button', { name: /adicionar|novo/i }).click()

    // Modal deve aparecer
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('deve criar vendedor com sucesso', async ({ page }) => {
    await page.goto('/vendedores')
    await page.waitForLoadState('networkidle')

    // Abrir modal
    await page.getByRole('button', { name: /adicionar|novo/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Preencher formulário
    const nomeUnico = `Vendedor E2E ${Date.now()}`
    await page.getByLabel(/nome/i).fill(nomeUnico)
    await page.getByLabel(/email/i).fill(`vendedor-e2e-${Date.now()}@teste.com`)

    // Salvar
    await page.getByRole('button', { name: /salvar|criar/i }).click()

    // Modal deve fechar e vendedor deve aparecer na lista
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 })
    await expect(page.getByText(nomeUnico)).toBeVisible()
  })
})

test.describe.skip('Produtos - Fluxo Completo (autenticado)', () => {
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

    await expect(
      page.getByRole('heading', { name: /produtos/i }).or(page.getByText(/produtos/i).first())
    ).toBeVisible()
  })

  test('deve criar produto com sucesso', async ({ page }) => {
    await page.goto('/produtos')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: /adicionar|novo/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    const nomeUnico = `Produto E2E ${Date.now()}`
    await page.getByLabel(/nome/i).fill(nomeUnico)
    await page.getByLabel(/valor|preço/i).fill('99,90')

    await page.getByRole('button', { name: /salvar|criar/i }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 })
    await expect(page.getByText(nomeUnico)).toBeVisible()
  })
})

test.describe.skip('Clientes - Fluxo Completo (autenticado)', () => {
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

    await expect(
      page.getByRole('heading', { name: /clientes/i }).or(page.getByText(/clientes/i).first())
    ).toBeVisible()
  })

  test('deve criar cliente com sucesso', async ({ page }) => {
    await page.goto('/clientes')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: /adicionar|novo/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    const nomeUnico = `Cliente E2E ${Date.now()}`
    await page.getByLabel(/nome/i).fill(nomeUnico)
    await page.getByLabel(/email/i).fill(`cliente-e2e-${Date.now()}@teste.com`)

    await page.getByRole('button', { name: /salvar|criar/i }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 })
    await expect(page.getByText(nomeUnico)).toBeVisible()
  })

  test('deve buscar cliente por nome', async ({ page }) => {
    await page.goto('/clientes')
    await page.waitForLoadState('networkidle')

    // Se houver campo de busca
    const searchInput = page.getByPlaceholder(/buscar/i)
    if (await searchInput.isVisible()) {
      await searchInput.fill('teste')
      // Aguardar debounce e resultados
      await page.waitForTimeout(500)
    }
  })
})
