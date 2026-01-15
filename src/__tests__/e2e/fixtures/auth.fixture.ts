import { test as base, expect } from '@playwright/test'

/**
 * Fixture de autenticação para testes E2E
 *
 * Para usar em testes que requerem usuário autenticado:
 * 1. Configurar variáveis de ambiente: E2E_TEST_EMAIL e E2E_TEST_PASSWORD
 * 2. Importar este fixture ao invés do test padrão do Playwright
 *
 * Exemplo:
 * ```typescript
 * import { test, expect } from './fixtures/auth.fixture'
 *
 * test('teste autenticado', async ({ authenticatedPage }) => {
 *   await authenticatedPage.goto('/dashboard')
 *   // ...
 * })
 * ```
 */

// Credenciais de teste (definir via variáveis de ambiente)
const TEST_EMAIL = process.env.E2E_TEST_EMAIL || 'teste@e2e.test'
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD || 'teste123'

export const test = base.extend<{
  authenticatedPage: typeof base.prototype
}>({
  authenticatedPage: async ({ page }, use) => {
    // Tentar fazer login
    await page.goto('/login')

    // Preencher formulário de login
    await page.getByLabel(/email/i).fill(TEST_EMAIL)
    await page.getByLabel(/senha/i).fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /entrar/i }).click()

    // Aguardar redirecionamento para dashboard ou erro
    try {
      await page.waitForURL(/\/dashboard/, { timeout: 10000 })
    } catch {
      // Se falhar, o teste deve lidar com isso
      console.warn(
        'Login falhou ou demorou muito. Verifique as credenciais de teste ou se o Supabase está configurado.'
      )
    }

    await use(page)
  },
})

export { expect }
