import { test, expect } from '@playwright/test'

test.describe('Autenticação', () => {
  test.describe('Página de Login', () => {
    test('deve exibir formulário de login', async ({ page }) => {
      await page.goto('/login')

      await expect(page.getByRole('heading', { name: /entrar/i })).toBeVisible()
      await expect(page.getByLabel(/email/i)).toBeVisible()
      await expect(page.getByLabel(/senha/i)).toBeVisible()
      await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible()
    })

    test('deve exibir link para registro', async ({ page }) => {
      await page.goto('/login')

      await expect(page.getByRole('link', { name: /criar conta/i })).toBeVisible()
    })

    test('deve exibir erro com credenciais inválidas', async ({ page }) => {
      await page.goto('/login')

      await page.getByLabel(/email/i).fill('teste@invalido.com')
      await page.getByLabel(/senha/i).fill('senhaerrada')
      await page.getByRole('button', { name: /entrar/i }).click()

      await expect(page.getByText(/email ou senha inválidos|credenciais inválidas/i)).toBeVisible({
        timeout: 10000,
      })
    })

    test('deve validar campos obrigatórios', async ({ page }) => {
      await page.goto('/login')

      await page.getByRole('button', { name: /entrar/i }).click()

      // HTML5 validation or custom error
      const emailInput = page.getByLabel(/email/i)
      await expect(emailInput).toHaveAttribute('required', '')
    })
  })

  test.describe('Página de Registro', () => {
    test('deve exibir formulário de registro', async ({ page }) => {
      await page.goto('/registro')

      await expect(page.getByRole('heading', { name: /criar conta/i })).toBeVisible()
      await expect(page.getByLabel(/seu nome/i)).toBeVisible()
      await expect(page.getByLabel(/nome da empresa/i)).toBeVisible()
      await expect(page.getByLabel(/email/i)).toBeVisible()
      await expect(page.getByLabel(/^senha$/i)).toBeVisible()
      await expect(page.getByLabel(/confirmar senha/i)).toBeVisible()
      await expect(page.getByRole('button', { name: /criar conta/i })).toBeVisible()
    })

    test('deve exibir link para login', async ({ page }) => {
      await page.goto('/registro')

      await expect(page.getByRole('link', { name: /entrar/i })).toBeVisible()
    })

    test('deve validar senhas diferentes', async ({ page }) => {
      await page.goto('/registro')

      await page.getByLabel(/seu nome/i).fill('Teste Usuario')
      await page.getByLabel(/nome da empresa/i).fill('Empresa Teste')
      await page.getByLabel(/email/i).fill('teste@teste.com')
      await page.getByLabel(/^senha$/i).fill('senha123')
      await page.getByLabel(/confirmar senha/i).fill('senha456')
      await page.getByRole('button', { name: /criar conta/i }).click()

      await expect(page.getByText(/senhas não coincidem/i)).toBeVisible()
    })

    test('deve validar senha mínima', async ({ page }) => {
      await page.goto('/registro')

      await page.getByLabel(/seu nome/i).fill('Teste Usuario')
      await page.getByLabel(/nome da empresa/i).fill('Empresa Teste')
      await page.getByLabel(/email/i).fill('teste@teste.com')
      await page.getByLabel(/^senha$/i).fill('123')
      await page.getByLabel(/confirmar senha/i).fill('123')
      await page.getByRole('button', { name: /criar conta/i }).click()

      await expect(page.getByText(/mínimo 6 caracteres/i)).toBeVisible()
    })
  })

  test.describe('Proteção de Rotas', () => {
    test('deve redirecionar para login quando não autenticado', async ({ page }) => {
      await page.goto('/dashboard')

      await expect(page).toHaveURL(/\/login/)
    })

    test('deve redirecionar para login ao acessar clientes', async ({ page }) => {
      await page.goto('/clientes')

      await expect(page).toHaveURL(/\/login/)
    })

    test('deve redirecionar para login ao acessar produtos', async ({ page }) => {
      await page.goto('/produtos')

      await expect(page).toHaveURL(/\/login/)
    })

    test('deve redirecionar para login ao acessar vendedores', async ({ page }) => {
      await page.goto('/vendedores')

      await expect(page).toHaveURL(/\/login/)
    })

    test('deve redirecionar para login ao acessar crm', async ({ page }) => {
      await page.goto('/crm')

      await expect(page).toHaveURL(/\/login/)
    })
  })
})
