// Teste do Webhook Hotmart REAL - Execute com: node hotmart-webhook-test.js

const WEBHOOK_URL = 'http://localhost:3004/api/webhook/hotmart'

// Função para criar FormData (formato real da Hotmart)
function createHotmartFormData(data) {
  const formData = new FormData()
  
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key].toString())
    }
  })
  
  return formData
}

// Dados reais que a Hotmart envia (formato correto)
const hotmartDataApproved = {
  hottok: 'ABC123DEF456', // Token da Hotmart
  email: 'cliente@example.com',
  name: 'João Silva',
  doc: '12345678901',
  prod: '123456', // ID do produto na Hotmart
  prod_name: 'LotoGains Premium',
  off: '1', // ID da oferta
  transaction: 'HP12345678901234567890',
  status: 'approved',
  full_price: '97.00',
  currency: 'BRL',
  commission_as: '50.00',
  payment_type: 'credit_card',
  purchase_date: '1640995200' // timestamp
}

const hotmartData10X = {
  hottok: 'XYZ789ABC123',
  email: 'cliente10x@example.com', 
  name: 'Maria Santos',
  prod: '123457',
  prod_name: 'LotoGains 10X',
  transaction: 'HP09876543210987654321',
  status: 'approved',
  full_price: '67.00',
  currency: 'BRL'
}

const hotmartDataTurbo = {
  hottok: 'DEF456GHI789',
  email: 'clienteturbo@example.com',
  name: 'Pedro Costa', 
  prod: '123458',
  prod_name: 'LotoTurbo',
  transaction: 'HP11111111111111111111',
  status: 'approved',
  full_price: '47.00',
  currency: 'BRL'
}

// Dados que devem ser ignorados (não aprovado)
const hotmartDataCanceled = {
  hottok: 'GHI123JKL456',
  email: 'cancelado@example.com',
  name: 'Cliente Cancelado',
  prod: '123456',
  prod_name: 'LotoGains Premium',
  transaction: 'HP33333333333333333333',
  status: 'canceled', // Não aprovado
  full_price: '97.00',
  currency: 'BRL'
}

// Dados com campos obrigatórios faltando
const hotmartDataInvalid = {
  hottok: 'INVALID123',
  name: 'Cliente Inválido',
  // email: 'faltando@example.com', // Campo obrigatório ausente
  prod: '123456',
  status: 'approved'
}

// Função para testar o webhook
async function testHotmartWebhook(data, testName) {
  try {
    console.log(`\n🧪 Teste: ${testName}`)
    console.log(`📡 Enviando para: ${WEBHOOK_URL}`)
    console.log(`📋 Dados:`, data)
    
    const formData = createHotmartFormData(data)
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'Hotmart-Webhook/2.0'
      }
    })

    const responseData = await response.json()
    
    console.log(`✅ Status: ${response.status}`)
    console.log(`📄 Response:`, JSON.stringify(responseData, null, 2))
    
    return { success: response.ok, data: responseData, status: response.status }
    
  } catch (error) {
    console.error(`❌ Erro no teste ${testName}:`, error.message)
    return { success: false, error: error.message }
  }
}

// Teste usando curl (alternativa)
function generateCurlCommand(data, testName) {
  console.log(`\n📋 Comando curl para "${testName}":`);
  
  let curlCmd = `curl -X POST ${WEBHOOK_URL} \\
  -H "User-Agent: Hotmart-Webhook/2.0" \\`
  
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      curlCmd += `\n  -d "${key}=${encodeURIComponent(data[key])}" \\`
    }
  })
  
  // Remove o último backslash
  curlCmd = curlCmd.replace(/\s\\$/, '')
  
  console.log(curlCmd)
}

// Executar todos os testes
async function runHotmartTests() {
  console.log('🚀 Iniciando testes do webhook Hotmart (formato real)...')
  console.log('=' .repeat(60))
  
  // Teste 1: Compra Premium aprovada (acesso completo)
  await testHotmartWebhook(
    hotmartDataApproved, 
    'Compra Premium Aprovada (Acesso Completo)'
  )
  
  // Teste 2: Compra LotoGains 10X (apenas 10X)
  await testHotmartWebhook(
    hotmartData10X, 
    'Compra LotoGains 10X (Acesso Parcial)'
  )
  
  // Teste 3: Compra LotoTurbo (apenas Turbo)
  await testHotmartWebhook(
    hotmartDataTurbo, 
    'Compra LotoTurbo (Acesso Parcial)'
  )
  
  // Teste 4: Compra cancelada (deve ser ignorada)
  await testHotmartWebhook(
    hotmartDataCanceled, 
    'Compra Cancelada (Deve ser Ignorada)'
  )
  
  // Teste 5: Dados inválidos (deve falhar)
  await testHotmartWebhook(
    hotmartDataInvalid, 
    'Dados Inválidos (Deve Falhar)'
  )
  
  // Teste 6: Atualizar usuário existente (reenviar primeiro)
  await testHotmartWebhook(
    hotmartDataApproved, 
    'Atualizar Usuário Existente'
  )
  
  console.log('\n' + '='.repeat(60))
  console.log('✅ Testes concluídos!')
  
  console.log('\n🛠️ Comandos curl para teste manual:')
  generateCurlCommand(hotmartDataApproved, 'Compra Premium')
  generateCurlCommand(hotmartData10X, 'Compra 10X') 
  generateCurlCommand(hotmartDataTurbo, 'Compra Turbo')
  
  console.log('\n💡 Dicas:')
  console.log('• Verifique a tabela users no Supabase')
  console.log('• Os logs detalhados estão no console do Next.js')
  console.log('• Configure os IDs reais dos produtos na linha 156 do webhook')
  console.log('• Hotmart envia form-data, não JSON!')
}

// Executar se o arquivo for chamado diretamente
if (require.main === module) {
  runHotmartTests()
}

module.exports = { testHotmartWebhook, createHotmartFormData }