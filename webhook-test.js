// Teste do Webhook - Execute com: node webhook-test.js

const WEBHOOK_URL = 'http://localhost:3004/api/webhook/users'
const WEBHOOK_SECRET = 'super-secret-webhook-key-2024'

// Função para testar o webhook
async function testWebhook(payload, action = 'create') {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': WEBHOOK_SECRET
      },
      body: JSON.stringify({
        ...payload,
        action: action
      })
    })

    const data = await response.json()
    
    console.log(`\n📡 Webhook Test - ${action.toUpperCase()}`)
    console.log(`Status: ${response.status}`)
    console.log(`Response:`, data)
    
    return { success: response.ok, data }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message)
    return { success: false, error: error.message }
  }
}

// Executar testes
async function runTests() {
  console.log('🚀 Iniciando testes do webhook...')
  
  // Teste 1: Criar usuário básico
  await testWebhook({
    email: 'webhook-test@example.com',
    name: 'Usuário Webhook'
  }, 'create')
  
  // Teste 2: Criar usuário premium
  await testWebhook({
    email: 'webhook-premium@example.com',
    name: 'Usuário Premium Webhook',
    loto_gains_10x_access: true,
    loto_turbo_access: true
  }, 'create')
  
  // Teste 3: Tentar criar usuário que já existe
  await testWebhook({
    email: 'webhook-test@example.com',
    name: 'Usuário Duplicado'
  }, 'create')
  
  // Teste 4: Atualizar usuário
  await testWebhook({
    email: 'webhook-test@example.com',
    name: 'Usuário Atualizado',
    loto_gains_10x_access: true
  }, 'update')
  
  // Teste 5: Teste com email inválido
  await testWebhook({
    email: 'email-invalido',
    name: 'Teste Inválido'
  }, 'create')
  
  // Teste 6: Teste sem autenticação (deve falhar)
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Sem x-webhook-secret
      },
      body: JSON.stringify({
        email: 'test@test.com',
        name: 'Test'
      })
    })
    
    const data = await response.json()
    console.log(`\n🔒 Teste de Segurança (sem auth)`)
    console.log(`Status: ${response.status}`)
    console.log(`Response:`, data)
    
  } catch (error) {
    console.error('❌ Erro no teste de segurança:', error.message)
  }
  
  console.log('\n✅ Testes concluídos!')
}

// Executar se o arquivo for chamado diretamente
if (require.main === module) {
  runTests()
}

module.exports = { testWebhook }