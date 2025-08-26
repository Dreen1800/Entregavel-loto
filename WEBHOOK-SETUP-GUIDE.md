# 🔗 Guia de Configuração de Webhooks - loto.rewardsmoneyclub.com

## 📋 URLs das APIs na Produção

Com seu domínio personalizado, as URLs ficam:

```
🔹 Webhook Hotmart: https://loto.rewardsmoneyclub.com/api/webhook/hotmart
🔹 Webhook LotoGains: https://loto.rewardsmoneyclub.com/api/webhook/lotogains
🔹 Webhook LotoTurbo: https://loto.rewardsmoneyclub.com/api/webhook/lototurbo
🔹 Webhook Users: https://loto.rewardsmoneyclub.com/api/webhook/users
```

## 🏪 Configuração na Hotmart

### 1. **Acessar Painel da Hotmart**
1. Entre na sua conta Hotmart (produtor)
2. Vá em **"Produtos"** → Selecione seu produto
3. Clique em **"Configurações"** → **"Postback/Webhook"**

### 2. **Configurar URL do Webhook**
```
URL do Postback: https://loto.rewardsmoneyclub.com/api/webhook/hotmart
Método: POST
Formato: JSON ou Form-Data (ambos suportados)
```

### 3. **Eventos para Configurar**
Marque os seguintes eventos:
- ✅ **PURCHASE_COMPLETE** - Compra finalizada
- ✅ **PURCHASE_APPROVED** - Compra aprovada  
- ✅ **PURCHASE_CANCELED** - Compra cancelada
- ✅ **PURCHASE_REFUNDED** - Compra reembolsada

### 4. **Configuração de Segurança (Opcional)**
- **Token de Segurança**: Configure um token se necessário
- **IP Whitelist**: IPs da Hotmart (consulte documentação oficial)

## 🧪 Teste dos Webhooks

### **Teste Webhook Hotmart**
```bash
curl -X POST https://loto.rewardsmoneyclub.com/api/webhook/hotmart \
  -H "Content-Type: application/json" \
  -d '{
    "event": "PURCHASE_COMPLETE",
    "data": {
      "buyer": {
        "email": "teste@email.com",
        "name": "João Silva"
      },
      "product": {
        "id": "123456",
        "name": "LotoGains Premium"
      },
      "purchase": {
        "transaction": "TXN123456789",
        "status": "approved"
      }
    }
  }'
```

### **Teste Webhook Users**
```bash
curl -X POST https://loto.rewardsmoneyclub.com/api/webhook/users \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: SEU_SECRET_AQUI" \
  -d '{
    "email": "teste@email.com",
    "name": "João Silva",
    "loto_gains_10x_access": true,
    "loto_turbo_access": true,
    "action": "create"
  }'
```

## 🔍 Monitoramento e Debug

### **Logs na Vercel**
1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá na aba **"Functions"**
4. Clique na função `api/webhook/hotmart`
5. Veja logs em tempo real

### **Comandos para Debug Local**
```bash
# Ver logs do webhook
vercel logs --follow

# Deploy e ver logs
vercel --prod && vercel logs --follow
```

## ⚙️ Variáveis de Ambiente Necessárias

Na Vercel, configure:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

# Webhook Security
WEBHOOK_SECRET=seu_webhook_secret_forte

# App Configuration  
NEXTAUTH_URL=https://loto.rewardsmoneyclub.com
NEXTAUTH_SECRET=seu_nextauth_secret
NODE_ENV=production
```

## 🎯 IDs dos Produtos na Hotmart

Atualize no arquivo `/app/api/webhook/hotmart/route.ts` linha 245-254:

```typescript
const productIdConfig: { [key: string]: { loto_gains_10x: boolean, loto_turbo: boolean } } = {
  // SEUS PRODUTOS REAIS:
  'ID_PRODUTO_PREMIUM_COMPLETO': { loto_gains_10x: true, loto_turbo: true },
  'ID_PRODUTO_LOTO_GAINS_10X': { loto_gains_10x: true, loto_turbo: false },
  'ID_PRODUTO_LOTO_TURBO': { loto_gains_10x: false, loto_turbo: true },
  
  // Remover em produção:
  'fb056612-bcc6-4217-9e6d-2a5d1110ac2f': { loto_gains_10x: true, loto_turbo: true },
}
```

## 🚀 Fluxo de Funcionamento

1. **Cliente compra na Hotmart** → Hotmart envia webhook
2. **Webhook recebido** → `https://loto.rewardsmoneyclub.com/api/webhook/hotmart`  
3. **Dados processados** → Usuário criado/atualizado no Supabase
4. **Acesso liberado** → Cliente pode usar produtos premium

## 🆘 Troubleshooting

### **Webhook não funciona**
- ✅ Verifique URL na Hotmart
- ✅ Teste manualmente com curl
- ✅ Veja logs na Vercel
- ✅ Confirme variáveis de ambiente

### **Usuário não criado**
- ✅ Verifique conexão Supabase
- ✅ Confirme SUPABASE_SERVICE_ROLE_KEY
- ✅ Veja erros nos logs da função

### **Produto não reconhecido**
- ✅ Atualize IDs dos produtos no código
- ✅ Veja logs do webhook para ID recebido
- ✅ Configure mapeamento correto

---

✅ **APIs prontas e configuradas para https://loto.rewardsmoneyclub.com** 🚀