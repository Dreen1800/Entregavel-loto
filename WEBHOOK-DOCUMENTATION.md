# 🔗 Webhook System Documentation

## 📡 Endpoint
```
POST http://localhost:3004/api/webhook/users
```

## 🔐 Authentication
Todas as requisições devem incluir o header de autenticação:
```
x-webhook-secret: super-secret-webhook-key-2024
```

## 📋 Payload Structure

### Campos Obrigatórios
```json
{
  "email": "user@example.com",
  "name": "Nome do Usuário"
}
```

### Campos Opcionais
```json
{
  "email": "user@example.com",
  "name": "Nome do Usuário",
  "loto_gains_10x_access": true,
  "loto_turbo_access": false,
  "action": "create"
}
```

### Actions Disponíveis
- `create` (padrão) - Criar novo usuário
- `update` - Atualizar usuário existente  
- `delete` - Deletar usuário

## 🎯 Exemplos de Uso

### 1. Criar Usuário Básico
```bash
curl -X POST http://localhost:3004/api/webhook/users \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: super-secret-webhook-key-2024" \
  -d '{
    "email": "novousuario@example.com",
    "name": "Novo Usuário"
  }'
```

### 2. Criar Usuário Premium
```bash
curl -X POST http://localhost:3004/api/webhook/users \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: super-secret-webhook-key-2024" \
  -d '{
    "email": "premium@example.com",
    "name": "Usuário Premium",
    "loto_gains_10x_access": true,
    "loto_turbo_access": true,
    "action": "create"
  }'
```

### 3. Atualizar Usuário
```bash
curl -X POST http://localhost:3004/api/webhook/users \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: super-secret-webhook-key-2024" \
  -d '{
    "email": "usuario@example.com",
    "name": "Nome Atualizado",
    "loto_gains_10x_access": true,
    "action": "update"
  }'
```

### 4. Deletar Usuário
```bash
curl -X POST http://localhost:3004/api/webhook/users \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: super-secret-webhook-key-2024" \
  -d '{
    "email": "usuario@deletar.com",
    "action": "delete"
  }'
```

## 📤 Respostas

### ✅ Sucesso (201 - Created)
```json
{
  "message": "User created successfully",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "Nome do Usuário",
    "loto_gains_10x_access": false,
    "loto_turbo_access": false,
    "created_at": "2024-08-26T03:00:00Z"
  }
}
```

### ✅ Usuário Já Existe (200 - OK)
```json
{
  "message": "User already exists",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "Nome Existente"
  }
}
```

### ❌ Erro de Autenticação (401)
```json
{
  "error": "Unauthorized: Invalid webhook secret"
}
```

### ❌ Dados Inválidos (400)
```json
{
  "error": "Missing required fields: email and name"
}
```

### ❌ Email Inválido (400)
```json
{
  "error": "Invalid email format"
}
```

### ❌ Usuário Não Encontrado (404)
```json
{
  "error": "User not found"
}
```

## 🧪 Como Testar

### Usando Node.js
```bash
node webhook-test.js
```

### Usando curl
```bash
curl -X POST http://localhost:3004/api/webhook/users \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: super-secret-webhook-key-2024" \
  -d '{
    "email": "teste@example.com",
    "name": "Usuário Teste"
  }'
```

### Usando Postman
1. **Method:** POST
2. **URL:** `http://localhost:3004/api/webhook/users`
3. **Headers:**
   - `Content-Type: application/json`
   - `x-webhook-secret: super-secret-webhook-key-2024`
4. **Body (raw JSON):**
```json
{
  "email": "teste@postman.com",
  "name": "Usuário Postman",
  "loto_gains_10x_access": true
}
```

## 🔒 Segurança

### Headers Obrigatórios
- `x-webhook-secret`: Chave secreta definida no `.env`
- `Content-Type: application/json`

### Validações
- ✅ Verificação de webhook secret
- ✅ Validação de formato de email
- ✅ Validação de campos obrigatórios
- ✅ Sanitização de dados
- ✅ Tratamento de erros

### Configuração de Segurança
A chave secreta pode ser alterada no arquivo `.env`:
```
WEBHOOK_SECRET=sua-nova-chave-super-secreta
```

## 📊 Logs

O webhook registra automaticamente:
- Todas as tentativas de acesso
- Erros de autenticação
- Erros de validação
- Operações bem-sucedidas

Verifique os logs no console do Next.js durante o desenvolvimento.

## 🚀 Deploy em Produção

Para usar em produção:

1. **Configure HTTPS**: O webhook deve estar em uma URL HTTPS
2. **Altere o WEBHOOK_SECRET**: Use uma chave mais segura
3. **Configure CORS**: Se necessário para requisições de outros domínios
4. **Rate Limiting**: Considere implementar rate limiting
5. **Logs Avançados**: Configure logging em arquivo ou serviço externo

## 💡 Casos de Uso

### Integração com Sistemas de Pagamento
```javascript
// Exemplo: Após pagamento aprovado
webhook.call({
  email: customer.email,
  name: customer.name,
  loto_gains_10x_access: true,
  loto_turbo_access: true,
  action: "create"
})
```

### Sincronização com CRM
```javascript
// Exemplo: Atualizar status de cliente
webhook.call({
  email: client.email,
  name: client.updated_name,
  loto_gains_10x_access: client.is_premium,
  action: "update"
})
```

### Sistema de Afiliados
```javascript
// Exemplo: Novo afiliado cadastrado
webhook.call({
  email: affiliate.email,
  name: affiliate.name,
  loto_gains_10x_access: false,
  loto_turbo_access: false,
  action: "create"
})
```