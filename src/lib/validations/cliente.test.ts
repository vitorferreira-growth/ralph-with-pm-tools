import { describe, it, expect } from 'vitest'
import {
  clienteSchema,
  clienteUpdateSchema,
  validarEmail,
  validarCEP,
  validarWhatsApp,
  formatarCEP,
  formatarWhatsApp,
} from './cliente'

describe('clienteSchema', () => {
  describe('campo nome', () => {
    it('deve aceitar nome válido', () => {
      const result = clienteSchema.safeParse({
        nome: 'João Silva',
        email: 'joao@email.com',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.nome).toBe('João Silva')
      }
    })

    it('deve fazer trim do nome', () => {
      const result = clienteSchema.safeParse({
        nome: '  João Silva  ',
        email: 'joao@email.com',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.nome).toBe('João Silva')
      }
    })

    it('deve rejeitar nome vazio', () => {
      const result = clienteSchema.safeParse({
        nome: '',
        email: 'joao@email.com',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Nome é obrigatório')
      }
    })

    it('deve rejeitar nome com menos de 2 caracteres', () => {
      const result = clienteSchema.safeParse({
        nome: 'J',
        email: 'joao@email.com',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Nome deve ter pelo menos 2 caracteres')
      }
    })
  })

  describe('campo email', () => {
    it('deve aceitar email válido', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
      })
      expect(result.success).toBe(true)
    })

    it('deve converter email para lowercase', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'JOAO@EMAIL.COM',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('joao@email.com')
      }
    })

    it('deve fazer trim do email', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: '  joao@email.com  ',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('joao@email.com')
      }
    })

    it('deve rejeitar email vazio', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: '',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email é obrigatório')
      }
    })

    it('deve rejeitar email inválido', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'email-invalido',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email inválido')
      }
    })
  })

  describe('campo whatsapp', () => {
    it('deve aceitar whatsapp com formato (11) 99999-9999', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        whatsapp: '(11) 99999-9999',
      })
      expect(result.success).toBe(true)
    })

    it('deve aceitar whatsapp apenas com números', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        whatsapp: '11999999999',
      })
      expect(result.success).toBe(true)
    })

    it('deve aceitar whatsapp com +55', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        whatsapp: '+55 11 99999-9999',
      })
      expect(result.success).toBe(true)
    })

    it('deve aceitar whatsapp vazio', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        whatsapp: '',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.whatsapp).toBeNull()
      }
    })

    it('deve aceitar whatsapp null', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        whatsapp: null,
      })
      expect(result.success).toBe(true)
    })

    it('deve rejeitar whatsapp inválido', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        whatsapp: '123',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('WhatsApp inválido')
      }
    })
  })

  describe('campo cep', () => {
    it('deve aceitar CEP com hífen', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        cep: '01310-100',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.cep).toBe('01310100')
      }
    })

    it('deve aceitar CEP sem hífen', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        cep: '01310100',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.cep).toBe('01310100')
      }
    })

    it('deve aceitar CEP vazio', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        cep: '',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.cep).toBeNull()
      }
    })

    it('deve aceitar CEP null', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        cep: null,
      })
      expect(result.success).toBe(true)
    })

    it('deve rejeitar CEP com menos de 8 dígitos', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        cep: '1234567',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('CEP inválido')
      }
    })

    it('deve rejeitar CEP com mais de 8 dígitos', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        cep: '123456789',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('campo dataNascimento', () => {
    it('deve aceitar data válida', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        dataNascimento: '1990-05-15',
      })
      expect(result.success).toBe(true)
    })

    it('deve aceitar data vazia', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        dataNascimento: '',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.dataNascimento).toBeNull()
      }
    })

    it('deve aceitar data null', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        dataNascimento: null,
      })
      expect(result.success).toBe(true)
    })

    it('deve rejeitar data no futuro', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        dataNascimento: futureDate.toISOString().split('T')[0],
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Data de nascimento não pode ser no futuro')
      }
    })

    it('deve rejeitar data muito antiga', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        dataNascimento: '1800-01-01',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Data de nascimento inválida')
      }
    })

    it('deve rejeitar data inválida', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        dataNascimento: 'data-invalida',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('campo vendedorId', () => {
    it('deve aceitar UUID válido', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        vendedorId: '123e4567-e89b-12d3-a456-426614174000',
      })
      expect(result.success).toBe(true)
    })

    it('deve aceitar vendedorId null', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        vendedorId: null,
      })
      expect(result.success).toBe(true)
    })

    it('deve aceitar vendedorId vazio e converter para null', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        vendedorId: '',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.vendedorId).toBeNull()
      }
    })

    it('deve rejeitar UUID inválido', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        vendedorId: 'id-invalido',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('ID do vendedor inválido')
      }
    })
  })

  describe('campos opcionais (endereco, cidade, estado)', () => {
    it('deve aceitar todos os campos opcionais preenchidos', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        endereco: 'Rua das Flores, 123',
        cidade: 'São Paulo',
        estado: 'SP',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.endereco).toBe('Rua das Flores, 123')
        expect(result.data.cidade).toBe('São Paulo')
        expect(result.data.estado).toBe('SP')
      }
    })

    it('deve converter estado para uppercase', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        estado: 'sp',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.estado).toBe('SP')
      }
    })

    it('deve aceitar campos vazios e converter para null', () => {
      const result = clienteSchema.safeParse({
        nome: 'João',
        email: 'joao@email.com',
        endereco: '',
        cidade: '',
        estado: '',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.endereco).toBeNull()
        expect(result.data.cidade).toBeNull()
        expect(result.data.estado).toBeNull()
      }
    })
  })
})

describe('clienteUpdateSchema', () => {
  it('deve aceitar atualização parcial apenas com nome', () => {
    const result = clienteUpdateSchema.safeParse({
      nome: 'Novo Nome',
    })
    expect(result.success).toBe(true)
  })

  it('deve aceitar atualização parcial apenas com email', () => {
    const result = clienteUpdateSchema.safeParse({
      email: 'novo@email.com',
    })
    expect(result.success).toBe(true)
  })

  it('deve aceitar objeto vazio', () => {
    const result = clienteUpdateSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('deve validar campos quando fornecidos', () => {
    const result = clienteUpdateSchema.safeParse({
      email: 'email-invalido',
    })
    expect(result.success).toBe(false)
  })
})

describe('validarEmail', () => {
  it('deve retornar true para email válido', () => {
    expect(validarEmail('teste@email.com')).toBe(true)
    expect(validarEmail('usuario.nome@empresa.com.br')).toBe(true)
  })

  it('deve retornar false para email inválido', () => {
    expect(validarEmail('email-invalido')).toBe(false)
    expect(validarEmail('@email.com')).toBe(false)
    expect(validarEmail('email@')).toBe(false)
  })
})

describe('validarCEP', () => {
  it('deve retornar true para CEP válido', () => {
    expect(validarCEP('01310-100')).toBe(true)
    expect(validarCEP('01310100')).toBe(true)
  })

  it('deve retornar false para CEP inválido', () => {
    expect(validarCEP('1234567')).toBe(false)
    expect(validarCEP('123456789')).toBe(false)
    expect(validarCEP('abcde-fgh')).toBe(false)
  })
})

describe('validarWhatsApp', () => {
  it('deve retornar true para WhatsApp válido', () => {
    expect(validarWhatsApp('(11) 99999-9999')).toBe(true)
    expect(validarWhatsApp('11999999999')).toBe(true)
    expect(validarWhatsApp('+55 11 99999-9999')).toBe(true)
  })

  it('deve retornar false para WhatsApp inválido', () => {
    expect(validarWhatsApp('123')).toBe(false)
    expect(validarWhatsApp('abcdefghijk')).toBe(false)
  })
})

describe('formatarCEP', () => {
  it('deve formatar CEP de 8 dígitos', () => {
    expect(formatarCEP('01310100')).toBe('01310-100')
  })

  it('deve retornar vazio para null ou undefined', () => {
    expect(formatarCEP(null)).toBe('')
    expect(formatarCEP(undefined)).toBe('')
  })

  it('deve retornar original se não tiver 8 dígitos', () => {
    expect(formatarCEP('1234567')).toBe('1234567')
  })
})

describe('formatarWhatsApp', () => {
  it('deve formatar WhatsApp com 11 dígitos (celular)', () => {
    expect(formatarWhatsApp('11999999999')).toBe('(11) 99999-9999')
  })

  it('deve formatar WhatsApp com 10 dígitos (fixo)', () => {
    expect(formatarWhatsApp('1133333333')).toBe('(11) 3333-3333')
  })

  it('deve retornar vazio para null ou undefined', () => {
    expect(formatarWhatsApp(null)).toBe('')
    expect(formatarWhatsApp(undefined)).toBe('')
  })

  it('deve retornar original se formato não reconhecido', () => {
    expect(formatarWhatsApp('123')).toBe('123')
  })
})
