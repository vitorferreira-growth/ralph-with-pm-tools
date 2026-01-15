import { test, expect } from '@playwright/test'

test.describe('Navegação (sem autenticação)', () => {
  test.describe('Páginas públicas', () => {
    test('página inicial deve redirecionar para login ou dashboard', async ({ page }) => {
      await page.goto('/')

      // Root page redirects to dashboard, which redirects to login if not authenticated
      await expect(page).toHaveURL(/\/(login|dashboard)/)
    })

    test('página de login deve carregar corretamente', async ({ page }) => {
      await page.goto('/login')

      await expect(page).toHaveURL(/\/login/)
      await expect(page.getByText(/infinitepay/i)).toBeVisible()
    })

    test('página de registro deve carregar corretamente', async ({ page }) => {
      await page.goto('/registro')

      await expect(page).toHaveURL(/\/registro/)
      await expect(page.getByText(/infinitepay/i)).toBeVisible()
    })
  })

  test.describe('Página 404', () => {
    test('deve exibir página não encontrada para rota inválida', async ({ page }) => {
      await page.goto('/rota-que-nao-existe')

      await expect(page.getByText(/página não encontrada|not found/i)).toBeVisible()
    })
  })

  test.describe('Links de navegação entre auth pages', () => {
    test('deve navegar de login para registro', async ({ page }) => {
      await page.goto('/login')

      await page.getByRole('link', { name: /criar conta/i }).click()

      await expect(page).toHaveURL(/\/registro/)
    })

    test('deve navegar de registro para login', async ({ page }) => {
      await page.goto('/registro')

      await page.getByRole('link', { name: /entrar/i }).click()

      await expect(page).toHaveURL(/\/login/)
    })
  })
})

test.describe('Layout e Responsividade', () => {
  test('página de login deve ter layout responsivo', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/login')

    const card = page.locator('[class*="card"]').first()
    await expect(card).toBeVisible()

    // Desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })
    await expect(card).toBeVisible()
  })

  test('página de registro deve ter layout responsivo', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/registro')

    const card = page.locator('[class*="card"]').first()
    await expect(card).toBeVisible()

    // Desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })
    await expect(card).toBeVisible()
  })
})
