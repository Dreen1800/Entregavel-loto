-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    loto_gains_10x_access BOOLEAN DEFAULT false,
    loto_turbo_access BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar índice no email para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - permite acesso público por enquanto
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Política para permitir SELECT público
CREATE POLICY "Allow public select on users" ON public.users
    FOR SELECT USING (true);

-- Política para permitir INSERT público
CREATE POLICY "Allow public insert on users" ON public.users
    FOR INSERT WITH CHECK (true);

-- Política para permitir UPDATE público
CREATE POLICY "Allow public update on users" ON public.users
    FOR UPDATE USING (true);

-- Inserir alguns dados de exemplo (opcional)
INSERT INTO public.users (email, name, loto_gains_10x_access, loto_turbo_access) VALUES
('admin@lotogains.com', 'Admin', true, true),
('premium@example.com', 'Usuário Premium', true, true),
('basic@example.com', 'Usuário Básico', false, false)
ON CONFLICT (email) DO NOTHING;