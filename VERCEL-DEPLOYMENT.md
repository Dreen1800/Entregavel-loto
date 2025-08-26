# Deployment na Vercel - Guia Completo

## 📋 Pré-requisitos

1. Conta na [Vercel](https://vercel.com)
2. Projeto Supabase configurado
3. Repositório Git (GitHub, GitLab, ou Bitbucket)

## 🚀 Passos para Deploy

### 1. Preparação do Projeto

O projeto já está configurado com:
- ✅ `package.json` otimizado para Vercel
- ✅ `vercel.json` com configurações de API routes
- ✅ `next.config.mjs` configurado
- ✅ `.env.example` com variáveis necessárias

### 2. Configuração das Variáveis de Ambiente

Na Vercel, configure as seguintes variáveis de ambiente:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key  
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Webhook Configuration
WEBHOOK_SECRET=your_webhook_secret_key

# Next.js Configuration  
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.vercel.app

# Environment
NODE_ENV=production
```

### 3. Deploy via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Deploy
vercel --prod
```

### 4. Deploy via Vercel Dashboard

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique em "New Project"
3. Conecte seu repositório Git
4. Configure as variáveis de ambiente
5. Clique em "Deploy"

## 🔧 Configurações Específicas

### API Routes Configuradas

O projeto possui as seguintes rotas de API prontas para produção:

- `/api/webhook/hotmart` - Webhook da Hotmart
- `/api/webhook/lotogains` - Webhook do LotoGains
- `/api/webhook/lototurbo` - Webhook do LotoTurbo  
- `/api/webhook/users` - Gestão de usuários

### Configurações do Vercel.json

- ⏱️ Timeout de 30 segundos para webhooks
- 🌐 CORS configurado para APIs
- 🔄 Rotas otimizadas para performance

## 🛡️ Segurança

### Variáveis Sensíveis
- `SUPABASE_SERVICE_ROLE_KEY` - Para operações de webhook
- `WEBHOOK_SECRET` - Para validação de webhooks
- `NEXTAUTH_SECRET` - Para autenticação

### Validações Implementadas
- ✅ Validação de email
- ✅ Verificação de webhook secret
- ✅ Tratamento de erros robusto

## 🧪 Testando as APIs

### Webhook Hotmart
```bash
curl -X POST https://seu-domain.vercel.app/api/webhook/hotmart \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### Webhook Users
```bash
curl -X POST https://seu-domain.vercel.app/api/webhook/users \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your_secret" \
  -d '{"email": "test@example.com", "name": "Test User", "action": "create"}'
```

## 📊 Monitoramento

Na Vercel Dashboard você pode monitorar:

- 📈 Performance das funções
- 📋 Logs em tempo real
- 🔍 Erros e debugging
- 📊 Analytics de uso

## 🔄 Atualizações

Para atualizações futuras:

1. Faça push das mudanças no repositório
2. Vercel fará deploy automático
3. Monitore os logs para garantir sucesso

## 🆘 Troubleshooting

### Problema: "Environment variables not found"
**Solução**: Verifique se todas as variáveis estão configuradas na Vercel

### Problema: "API timeout"
**Solução**: Verifique o `vercel.json` e aumente o `maxDuration` se necessário

### Problema: "Supabase connection failed"  
**Solução**: Verifique as credenciais do Supabase e conectividade

## 📞 Suporte

Se precisar de ajuda:

1. Verifique os logs na Vercel Dashboard
2. Teste as APIs localmente primeiro
3. Confirme as configurações do Supabase
4. Verifique as variáveis de ambiente

---

✅ **Projeto pronto para production na Vercel!**