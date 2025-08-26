import { NextRequest, NextResponse } from 'next/server'
import { createWebhookClient } from '@/lib/supabase/server'

// Interface para o payload da Hotmart
interface HotmartWebhookData {
  hottok?: string
  email: string
  name?: string
  doc?: string
  prod: string
  prod_name?: string
  off?: string
  transaction: string
  status: string
  full_price?: string
  currency?: string
  commission_as?: string
  payment_type?: string
  purchase_date?: string
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Webhook LotoTurbo recebido')
    
    // Fazer log dos headers
    const contentType = request.headers.get('content-type')
    console.log('📋 Content-Type recebido:', contentType)
    
    let data: HotmartWebhookData
    
    // Processar JSON da Hotmart
    if (contentType?.includes('application/json')) {
      const jsonData = await request.json()
      console.log('📦 Dados JSON recebidos:', JSON.stringify(jsonData, null, 2))
      
      const buyerData = jsonData.data?.buyer || jsonData.buyer || {}
      const productData = jsonData.data?.product || jsonData.product || {}
      const purchaseData = jsonData.data?.purchase || jsonData.purchase || {}
      
      const fullName = buyerData.name || 
                      `${buyerData.first_name || ''} ${buyerData.last_name || ''}`.trim() ||
                      undefined
      
      const productId = productData.id && productData.id !== 0 ? 
                       productData.id.toString() : 
                       (productData.ucode || jsonData.id || '')
      
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
    } else {
      throw new Error(`Content-Type não suportado: ${contentType}`)
    }
    
    console.log('📦 Dados processados:', data)
    
    // Validar compra aprovada
    if (!isValidApprovedPurchase(data)) {
      console.log('⚠️ Compra não aprovada ou dados inválidos, ignorando...')
      return NextResponse.json(
        { message: 'Purchase not approved or invalid data' },
        { status: 200 }
      )
    }

    console.log(`🚀 Ativando LotoTurbo para: ${data.name} (${data.email})`)
    
    // Ativar LotoTurbo para o usuário
    const result = await activateLotoTurbo(data.email)

    if (result.success) {
      console.log('✅ LotoTurbo ativado com sucesso:', data.email)
      return NextResponse.json(
        { 
          message: 'LotoTurbo activated successfully',
          user: result.user
        },
        { status: 200 }
      )
    } else {
      console.error('❌ Erro ao ativar LotoTurbo:', result.error)
      return NextResponse.json(
        { 
          error: 'Failed to activate LotoTurbo',
          details: result.error 
        },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('💥 Erro no webhook LotoTurbo:', error)
    
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
  if (!data.email || !data.transaction) {
    console.log('❌ Campos obrigatórios ausentes:', {
      email: !!data.email,
      transaction: !!data.transaction
    })
    return false
  }

  const approvedStatuses = ['approved', 'completed', 'complete']
  if (!approvedStatuses.includes(data.status.toLowerCase())) {
    console.log('❌ Status não aprovado:', data.status)
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    console.log('❌ Email inválido:', data.email)
    return false
  }

  return true
}

// Ativar LotoTurbo para o usuário
async function activateLotoTurbo(email: string) {
  try {
    const supabase = createWebhookClient()
    
    console.log('🚀 Ativando LotoTurbo para:', email)
    
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({
        loto_turbo_access: true,
        updated_at: new Date().toISOString()
      })
      .eq('email', email)
      .select()
      .single()

    if (updateError) {
      throw updateError
    }

    if (!updatedUser) {
      throw new Error('Usuário não encontrado')
    }

    console.log('✅ LotoTurbo ativado com sucesso')
    return { success: true, user: updatedUser }

  } catch (error: any) {
    console.error('💥 Erro ao ativar LotoTurbo:', error)
    return { 
      success: false, 
      error: error.message,
      code: error.code 
    }
  }
}

// Permitir apenas POST
export async function GET() {
  return NextResponse.json(
    { message: 'LotoTurbo webhook endpoint - POST only' },
    { status: 405 }
  )
}