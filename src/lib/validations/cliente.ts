import { z } from 'zod'

/**
 * Schema de validação para cadastro de clientes
 * Campos obrigatórios: nome, email
 * Campos opcionais: whatsapp, endereco, cidade, estado, cep, dataNascimento, vendedorId
 */

// Regex para validação de CEP brasileiro (8 dígitos, com ou sem hífen)
const CEP_REGEX = /^\d{5}-?\d{3}$/

// Regex para validação de WhatsApp (formato brasileiro)
// Aceita: (11) 99999-9999, 11999999999, +55 11 99999-9999, etc.
const WHATSAPP_REGEX = /^(\+55\s?)?(\(?\d{2}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/

// Schema base para criação de cliente
export const clienteSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres')
    .transform((val) => val.trim()),

  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .transform((val) => val.trim().toLowerCase()),

  whatsapp: z
    .string()
    .max(20, 'WhatsApp deve ter no máximo 20 caracteres')
    .refine((val) => !val || WHATSAPP_REGEX.test(val), {
      message: 'WhatsApp inválido. Use o formato: (11) 99999-9999',
    })
    .transform((val) => val?.trim() || null)
    .nullable()
    .optional(),

  endereco: z
    .string()
    .max(500, 'Endereço deve ter no máximo 500 caracteres')
    .transform((val) => val?.trim() || null)
    .nullable()
    .optional(),

  cidade: z
    .string()
    .max(100, 'Cidade deve ter no máximo 100 caracteres')
    .transform((val) => val?.trim() || null)
    .nullable()
    .optional(),

  estado: z
    .string()
    .max(2, 'Estado deve ter 2 caracteres (sigla)')
    .transform((val) => val?.trim().toUpperCase() || null)
    .nullable()
    .optional(),

  cep: z
    .string()
    .refine((val) => !val || CEP_REGEX.test(val), {
      message: 'CEP inválido. Use o formato: 00000-000 ou 00000000',
    })
    .transform((val) => {
      if (!val) return null
      // Remove hífen e espaços para armazenamento padronizado
      return val.replace(/\D/g, '')
    })
    .nullable()
    .optional(),

  dataNascimento: z
    .string()
    .refine(
      (val) => {
        if (!val) return true
        const date = new Date(val)
        return !isNaN(date.getTime())
      },
      { message: 'Data de nascimento inválida' }
    )
    .refine(
      (val) => {
        if (!val) return true
        const date = new Date(val)
        const today = new Date()
        return date <= today
      },
      { message: 'Data de nascimento não pode ser no futuro' }
    )
    .refine(
      (val) => {
        if (!val) return true
        const date = new Date(val)
        const minDate = new Date('1900-01-01')
        return date >= minDate
      },
      { message: 'Data de nascimento inválida' }
    )
    .transform((val) => val || null)
    .nullable()
    .optional(),

  vendedorId: z
    .string()
    .uuid('ID do vendedor inválido')
    .nullable()
    .optional()
    .transform((val) => val || null),
})

// Schema para atualização de cliente (todos os campos opcionais)
export const clienteUpdateSchema = clienteSchema.partial()

// Tipo inferido do schema
export type ClienteFormData = z.infer<typeof clienteSchema>
export type ClienteUpdateFormData = z.infer<typeof clienteUpdateSchema>

// Funções de validação utilitárias
export function validarEmail(email: string): boolean {
  const result = z.string().email().safeParse(email)
  return result.success
}

export function validarCEP(cep: string): boolean {
  return CEP_REGEX.test(cep)
}

export function validarWhatsApp(whatsapp: string): boolean {
  return WHATSAPP_REGEX.test(whatsapp)
}

// Função para formatar CEP para exibição
export function formatarCEP(cep: string | null | undefined): string {
  if (!cep) return ''
  const numeros = cep.replace(/\D/g, '')
  if (numeros.length !== 8) return cep
  return `${numeros.slice(0, 5)}-${numeros.slice(5)}`
}

// Função para formatar WhatsApp para exibição
export function formatarWhatsApp(whatsapp: string | null | undefined): string {
  if (!whatsapp) return ''
  const numeros = whatsapp.replace(/\D/g, '')
  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
  }
  if (numeros.length === 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`
  }
  return whatsapp
}

// Estados brasileiros para dropdown
export const ESTADOS_BRASILEIROS = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' },
] as const

export type EstadoBrasileiro = (typeof ESTADOS_BRASILEIROS)[number]['sigla']
