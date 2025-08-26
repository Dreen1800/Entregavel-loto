import { NextRequest, NextResponse } from 'next/server'
import { createWebhookClient } from '@/lib/supabase/server'

// Interface para o payload real da Hotmart (form-data parameters)
interface HotmartWebhookData {
  hottok?: string        // Token de verificação da Hotmart
  email: string          // Email do comprador  
  name?: string          // Nome do comprador
  doc?: string           // Documento do comprador
  prod: string           // ID do produto
  prod_name?: string     // Nome do produto
  off?: string           // ID da oferta
  transaction: string    // ID da transação
  status: string         // Status da compra: approved, canceled, etc.
  full_price?: string    // Valor total da compra
  currency?: string      // Moeda (BRL, USD, etc.)
  commission_as?: string // Valor da comissão
  payment_type?: string  // Tipo de pagamento
  purchase_date?: string // Data da compra
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔔 Webhook Hotmart recebido')
    
    // Fazer log dos headers para debug
    const contentType = request.headers.get('content-type')
    console.log('📋 Content-Type recebido:', contentType)
    console.log('📋 Todos os headers:', Object.fromEntries(request.headers.entries()))
    
    let data: HotmartWebhookData
    
    // Verificar o content-type e processar adequadamente
    if (contentType?.includes('application/json')) {
      // Se for JSON
      console.log('📦 Processando como JSON...')
      const jsonData = await request.json()
      console.log('📦 Dados JSON recebidos:', JSON.stringify(jsonData, null, 2))
      
      // Converter JSON para nosso formato esperado (baseado no payload real da Hotmart)
      const buyerData = jsonData.data?.buyer || jsonData.buyer || {}
      const productData = jsonData.data?.product || jsonData.product || {}
      const purchaseData = jsonData.data?.purchase || jsonData.purchase || {}
      
      // Construir nome completo
      const fullName = buyerData.name || 
                      `${buyerData.first_name || ''} ${buyerData.last_name || ''}`.trim() ||
                      undefined
      
      // Para product ID, usar ucode se id for 0 ou vazio
      const productId = productData.id && productData.id !== 0 ? 
                       productData.id.toString() : 
                       (productData.ucode || jsonData.id || '')
      
      // Status baseado no event
      const eventStatusMap: { [key: string]: string } = {
        'PURCHASE_COMPLETE': 'approved',
        'PURCHASE_APPROVED': 'approved',
        'PURCHASE_CANCELED': 'canceled',
        'PURCHASE_REFUNDED': 'refunded',
        'PURCHASE_CHARGEBACK': 'chargeback'
      }
      
      const mappedStatus = eventStatusMap[jsonData.event] || 
                          purchaseData.status?.toLowerCase() || 
                          ''
      
      data = {
        hottok: jsonData.hottok,
        email: buyerData.email || '',
        name: fullName,
        doc: buyerData.document,
        prod: productId,
        prod_name: productData.name,
        off: purchaseData.offer?.code,
        transaction: purchaseData.transaction || jsonData.id || '',
        status: mappedStatus,
        full_price: purchaseData.price?.value?.toString() || purchaseData.full_price?.value?.toString(),
        currency: purchaseData.price?.currency_value || purchaseData.full_price?.currency_value,
        commission_as: jsonData.data?.commissions?.[0]?.value?.toString(),
        payment_type: purchaseData.payment?.type,
        purchase_date: purchaseData.approved_date ? new Date(purchaseData.approved_date).toISOString() :
                      (jsonData.creation_date ? new Date(jsonData.creation_date).toISOString() : undefined)
      }
    } else if (contentType?.includes('application/x-www-form-urlencoded')) {
      // Se for URL encoded
      console.log('📦 Processando como URL encoded...')
      const formData = await request.formData()
      console.log('📦 FormData entries:', Array.from(formData.entries()))
      
      // Converter FormData para objeto
      data = {
        hottok: formData.get('hottok')?.toString(),
        email: formData.get('email')?.toString() || '',
        name: formData.get('name')?.toString(),
        doc: formData.get('doc')?.toString(),
        prod: formData.get('prod')?.toString() || '',
        prod_name: formData.get('prod_name')?.toString(),
        off: formData.get('off')?.toString(),
        transaction: formData.get('transaction')?.toString() || '',
        status: formData.get('status')?.toString() || '',
        full_price: formData.get('full_price')?.toString(),
        currency: formData.get('currency')?.toString(),
        commission_as: formData.get('commission_as')?.toString(),
        payment_type: formData.get('payment_type')?.toString(),
        purchase_date: formData.get('purchase_date')?.toString()
      }
    } else {
      // Tentar como texto puro primeiro para ver o que está vindo
      console.log('📦 Content-Type não reconhecido, tentando ler como texto...')
      const textData = await request.text()
      console.log('📦 Dados como texto:', textData)
      
      // Tentar fazer parse manual se for query string
      if (textData.includes('=') && textData.includes('&')) {
        console.log('📦 Tentando fazer parse como query string...')
        const params = new URLSearchParams(textData)
        console.log('📦 Params parseados:', Array.from(params.entries()))
        
        data = {
          hottok: params.get('hottok') || undefined,
          email: params.get('email') || '',
          name: params.get('name') || undefined,
          doc: params.get('doc') || undefined,
          prod: params.get('prod') || '',
          prod_name: params.get('prod_name') || undefined,
          off: params.get('off') || undefined,
          transaction: params.get('transaction') || '',
          status: params.get('status') || '',
          full_price: params.get('full_price') || undefined,
          currency: params.get('currency') || undefined,
          commission_as: params.get('commission_as') || undefined,
          payment_type: params.get('payment_type') || undefined,
          purchase_date: params.get('purchase_date') || undefined
        }
      } else {
        throw new Error(`Content-Type não suportado: ${contentType}. Dados recebidos: ${textData.substring(0, 500)}`)
      }
    }
    
    console.log('📦 Dados recebidos da Hotmart:', data)
    
    // Validar se é uma compra aprovada
    if (!isValidApprovedPurchase(data)) {
      console.log('⚠️ Compra não aprovada ou dados inválidos, ignorando...')
      return NextResponse.json(
        { message: 'Purchase not approved or invalid data' },
        { status: 200 }
      )
    }

    // Extrair informações do comprador
    const buyerEmail = data.email
    const buyerName = data.name || data.email.split('@')[0] // Fallback para nome
    const productId = data.prod
    const productName = data.prod_name || `Produto ${productId}`
    const transactionId = data.transaction

    console.log(`👤 Processando compra para: ${buyerName} (${buyerEmail})`)
    console.log(`🎯 Produto: ${productName} (ID: ${productId})`)
    console.log(`💳 Transação: ${transactionId}`)
    console.log(`💰 Status: ${data.status}`)

    // Processar usuário no banco de dados (apenas criar usuário básico)
    const result = await processHotmartPurchase({
      email: buyerEmail,
      name: buyerName,
      productName,
      productId,
      transactionId,
      rawData: data
    })

    if (result.success) {
      console.log('✅ Usuário processado com sucesso:', result.user.email)
      return NextResponse.json(
        { 
          message: 'Purchase processed successfully',
          user: {
            email: result.user.email,
            name: result.user.name,
            loto_gains_10x_access: result.user.loto_gains_10x_access,
            loto_turbo_access: result.user.loto_turbo_access
          }
        },
        { status: 200 }
      )
    } else {
      console.error('❌ Erro ao processar usuário:', result.error)
      return NextResponse.json(
        { 
          error: 'Failed to process purchase',
          details: result.error 
        },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('💥 Erro no webhook Hotmart:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// Verificar se é uma compra aprovada válida
function isValidApprovedPurchase(data: HotmartWebhookData): boolean {
  // Verificar campos obrigatórios
  if (!data.email || !data.prod || !data.transaction) {
    console.log('❌ Campos obrigatórios ausentes:', {
      email: !!data.email,
      prod: !!data.prod,
      transaction: !!data.transaction
    })
    return false
  }

  // Verificar se é compra aprovada
  const approvedStatuses = ['approved', 'completed', 'complete']
  if (!approvedStatuses.includes(data.status.toLowerCase())) {
    console.log('❌ Status não aprovado:', data.status)
    return false
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    console.log('❌ Email inválido:', data.email)
    return false
  }

  return true
}

// Determinar qual acesso premium conceder baseado no produto
function determinePremiumAccess(productName: string, productId: string) {
  // Configuração por ID do produto (substitua pelos IDs reais dos seus produtos na Hotmart)
  const productIdConfig: { [key: string]: { loto_gains_10x: boolean, loto_turbo: boolean } } = {
    // CONFIGURE AQUI OS IDs REAIS DOS SEUS PRODUTOS:
    
    // Exemplo para o produto de teste atual:
    'fb056612-bcc6-4217-9e6d-2a5d1110ac2f': { loto_gains_10x: true, loto_turbo: true },   // Produto test postback2 (REMOVER EM PRODUÇÃO)
    
    // ADICIONE AQUI OS IDs REAIS DOS SEUS PRODUTOS:
    // 'ID_PRODUTO_PREMIUM_COMPLETO': { loto_gains_10x: true, loto_turbo: true },
    // 'ID_PRODUTO_LOTO_GAINS': { loto_gains_10x: true, loto_turbo: false },
    // 'ID_PRODUTO_LOTO_TURBO': { loto_gains_10x: false, loto_turbo: true },
  }
  
  // Tentar por ID primeiro
  let access = productIdConfig[productId]
  
  // Se não encontrar por ID, usar lógica por nome
  if (!access) {
    access = getAccessByProductName(productName)
  }

  console.log(`🎯 Acesso determinado para "${productName}" (ID: ${productId}):`, access)
  
  return access
}

// Determinar acesso por nome do produto
function getAccessByProductName(productName: string) {
  const name = productName.toLowerCase()
  
  // Produto premium completo
  if (name.includes('premium') || name.includes('completo') || name.includes('full') || name.includes('vip')) {
    return { loto_gains_10x: true, loto_turbo: true }
  }
  
  // Apenas LotoGains 10X
  if (name.includes('10x') || name.includes('gains')) {
    return { loto_gains_10x: true, loto_turbo: false }
  }
  
  // Apenas LotoTurbo
  if (name.includes('turbo')) {
    return { loto_gains_10x: false, loto_turbo: true }
  }
  
  // Padrão: dar acesso completo (ajuste conforme necessário)
  console.log('⚠️ Produto não reconhecido, dando acesso completo por padrão')
  return { loto_gains_10x: true, loto_turbo: true }
}

// Processar a compra no banco de dados (apenas criar usuário básico)
async function processHotmartPurchase(data: {
  email: string
  name: string
  productName: string
  productId: string
  transactionId: string
  rawData: HotmartWebhookData
}) {
  try {
    const supabase = createWebhookClient()
    
    // Criar usuário apenas se não existir (com acessos false por padrão)
    console.log('👤 Criando usuário básico se não existir...')
    
    const { data: upsertedUser, error: upsertError } = await supabase
      .from('users')
      .upsert({
        email: data.email,
        name: data.name,
        loto_gains_10x_access: false,  // Padrão false
        loto_turbo_access: false,      // Padrão false
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'email',
        ignoreDuplicates: false  // Sempre atualizar nome se mudou
      })
      .select()
      .single()

    if (upsertError) {
      throw upsertError
    }

    console.log('✅ Usuário básico processado com sucesso')
    return { success: true, user: upsertedUser, action: 'upserted' }

  } catch (error: any) {
    console.error('💥 Erro ao processar no banco:', error)
    return { 
      success: false, 
      error: error.message,
      code: error.code 
    }
  }
}

// Permitir apenas POST (Hotmart sempre usa POST)
export async function GET() {
  return NextResponse.json(
    { message: 'Hotmart webhook endpoint - POST only' },
    { status: 405 }
  )
}