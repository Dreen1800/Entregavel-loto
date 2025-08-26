# 🔥 Hotmart Webhook - Integração Automática

## 📡 Endpoint para Hotmart
```
POST http://localhost:3004/api/webhook/hotmart
```

## 🎯 Funcionalidade
Este webhook processa automaticamente compras aprovadas da Hotmart e:
- ✅ **Cria usuários** automaticamente
- ✅ **Libera acesso premium** baseado no produto comprado
- ✅ **Atualiza usuários existentes** com novos acessos
- ✅ **Loga tudo** para monitoramento

## 🛡️ Segurança
❌ **SEM SECRET KEY** - A Hotmart não usa chaves secretas
✅ **Validação de payload** - Verifica estrutura e eventos válidos
✅ **Sanitização** - Limpa e valida todos os dados recebidos

## 📋 Eventos Processados

### ✅ Eventos Aceitos:
- `PURCHASE_APPROVED` - Compra aprovada
- `PURCHASE_COMPLETE` - Compra completa  
- `SUBSCRIPTION_PURCHASE_APPROVED` - Assinatura aprovada

### ❌ Eventos Ignorados:
- `PURCHASE_CANCELED` - Compra cancelada
- `PURCHASE_REFUNDED` - Compra reembolsada
- `PURCHASE_DELAYED` - Compra atrasada

## 🎮 Configuração de Produtos

### Por ID do Produto (Recomendado)
Edite a função `getAccessByProductId()` no webhook:

```javascript
function getAccessByProductId(productId) {
  const idConfig = {
    123456: { loto_gains_10x: true, loto_turbo: true },   // Premium Completo
    123457: { loto_gains_10x: true, loto_turbo: false },  // Apenas LotoGains 10X
    123458: { loto_gains_10x: false, loto_turbo: true },  // Apenas LotoTurbo
    // Adicione seus produtos aqui
  }
  
  return idConfig[productId] || { loto_gains_10x: false, loto_turbo: false }
}
```

### Por Nome do Produto (Fallback)
O sistema também detecta por palavras-chave no nome:
- **"premium", "completo", "full"** → Acesso completo
- **"10x", "gains"** → Apenas LotoGains 10X
- **"turbo"** → Apenas LotoTurbo

## 🧪 Como Testar

### 1. Teste Automático
```bash
node hotmart-webhook-test.js
```

### 2. Teste Manual (curl)
```bash
curl -X POST http://localhost:3004/api/webhook/hotmart \
  -H "Content-Type: application/json" \
  -d '{
    "event": "PURCHASE_APPROVED",
    "version": "2.0.0",
    "data": {
      "product": {
        "id": 123456,
        "name": "LotoGains Premium"
      },
      "buyer": {
        "email": "teste@hotmart.com",
        "name": "Cliente Teste"
      },
      "purchase": {
        "transaction": "HP12345678901234567890",
        "status": "approved",
        "approved_date": "2024-08-26T03:15:00-03:00",
        "order_date": "2024-08-26T03:10:00-03:00"
      }
    }
  }'
```

## 🔧 Configuração na Hotmart

### 1. Acesse sua conta Hotmart
- Vá para **Ferramentas** → **Webhooks**

### 2. Criar Novo Webhook
- **URL:** `https://seudominio.com/api/webhook/hotmart`
- **Eventos:** Marque apenas:
  - ✅ Compra aprovada
  - ✅ Compra completa
  - ✅ Assinatura aprovada

### 3. Teste na Hotmart
- Use a funcionalidade "Testar Webhook" da Hotmart
- Verifique os logs no seu console

## 📊 Logs e Monitoramento

### Console Logs
Todos os webhooks são logados automaticamente:
```
🔔 Webhook Hotmart recebido
📦 Payload recebido: {...}
👤 Processando compra para: João Silva (joao@email.com)
🎯 Produto: LotoGains Premium
💳 Transação: HP12345678901234567890
🎯 Acesso determinado para "LotoGains Premium" (ID: 123456): {...}
✅ Usuário processado com sucesso: joao@email.com
```

### Respostas HTTP

#### ✅ Compra Processada (200)
```json
{
  "message": "Purchase processed successfully",
  "user": {
    "id": "uuid",
    "email": "cliente@email.com",
    "name": "Cliente Nome",
    "loto_gains_10x_access": true,
    "loto_turbo_access": true,
    "created_at": "2024-08-26T06:15:00Z"
  }
}
```

#### ⚠️ Evento Ignorado (200)
```json
{
  "message": "Event ignored - not an approved purchase"
}
```

#### ❌ Erro de Processamento (500)
```json
{
  "error": "Failed to process purchase",
  "details": "Database error details..."
}
```

## 🎯 Cenários de Uso

### Cenário 1: Novo Cliente
1. Cliente compra "LotoGains Premium" na Hotmart
2. Hotmart envia webhook → seu servidor
3. Sistema cria novo usuário com acesso completo
4. Cliente pode fazer login direto no site

### Cenário 2: Cliente Existente
1. Cliente já tem conta (acesso básico)
2. Compra produto premium na Hotmart  
3. Webhook atualiza acesso do cliente existente
4. Cliente ganha acesso aos produtos premium

### Cenário 3: Múltiplas Compras
1. Cliente compra "LotoGains 10X"
2. Depois compra "LotoTurbo"
3. Cada compra atualiza/amplia seus acessos
4. Cliente fica com acesso completo

## ⚙️ Customização

### Lógica de Produtos Personalizada
Para criar regras específicas, edite a função `determinePremiumAccess()`:

```javascript
function determinePremiumAccess(productName, productId) {
  // Sua lógica personalizada aqui
  
  if (productId === 999999) {
    return { loto_gains_10x: true, loto_turbo: true }
  }
  
  if (productName.includes('VIP')) {
    return { loto_gains_10x: true, loto_turbo: true }
  }
  
  // Continue sua lógica...
}
```

### Ações Adicionais
Adicione código personalizado após processar o usuário:

```javascript
// Enviar email de boas-vindas
// Integrar com outros sistemas  
// Notificar administradores
// etc...
```

## 🚀 Deploy em Produção

### 1. Configure HTTPS
A Hotmart exige HTTPS em produção.

### 2. URL de Produção
Configure na Hotmart:
```
https://seudominio.com/api/webhook/hotmart
```

### 3. Teste Antes de Lançar
Sempre teste o webhook antes de ativar vendas:
```bash
# Teste local
node hotmart-webhook-test.js

# Teste no domínio de produção  
curl -X POST https://seudominio.com/api/webhook/hotmart -d '{...}'
```

## 💡 Dicas Importantes

### ✅ Boas Práticas:
- Configure IDs de produtos específicos (mais confiável que nomes)
- Monitore logs regularmente
- Teste sempre após mudanças
- Mantenha backup da configuração

### ⚠️ Cuidados:
- Hotmart pode enviar o mesmo evento múltiplas vezes
- Sempre valide dados antes de processar
- Não confie apenas no nome do produto
- Teste com dados reais da Hotmart

### 🔍 Debug:
- Verifique console logs para troubleshooting
- Use payload real da Hotmart para testes
- Confirme IDs dos produtos na sua conta Hotmart
- Teste cenários de erro

---

## 📞 Suporte

Em caso de problemas:
1. Verifique logs no console
2. Confirme URL na configuração da Hotmart
3. Teste payload com o script fornecido
4. Verifique se produtos estão configurados corretamente