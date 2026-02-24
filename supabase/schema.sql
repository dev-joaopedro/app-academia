-- SCHEMA PARA DATABASE ACASaaS (Postgres Puro / Neon)

-- 0. Habilitar extensões necessárias para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Criar Tipos de Usuários
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'trainer', 'student');
    END IF;
END $$;

-- 2. Tabela de Perfis
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT, -- Para autenticação manual se necessário
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'student',
    
    -- Campos de Aluno
    age INTEGER,
    weight TEXT,
    goal TEXT,
    
    -- Campos de Professor
    cref TEXT,
    specialty TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Exercícios (Biblioteca)
CREATE TABLE IF NOT EXISTS exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    muscle TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    category TEXT NOT NULL,
    equipment TEXT,
    description TEXT,
    tips TEXT[], -- Array de texto para as dicas
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Modelos de Treino
CREATE TABLE IF NOT EXISTS workout_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabela de Exercícios dentro dos Treinos
CREATE TABLE IF NOT EXISTS workout_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_id UUID REFERENCES workout_models(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
    sets INTEGER DEFAULT 3,
    reps TEXT NOT NULL,
    rest TEXT DEFAULT '60s',
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabela de Atribuição de Treinos a Alunos
CREATE TABLE IF NOT EXISTS student_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    workout_id UUID REFERENCES workout_models(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Inserir Admin inicial (Exemplo)
-- Você pode rodar este comando trocando os valores:
-- INSERT INTO profiles (email, full_name, role) VALUES ('seu-email@admin.com', 'Admin Inicial', 'admin');

-- 8. Inserir todos os exercícios da biblioteca
INSERT INTO exercises (name, muscle, difficulty, category, equipment, description, tips) 
VALUES 
-- PEITO
('Supino Reto com Barra', 'Peitoral', 'Intermediário', 'Peito', 'Barra', 'Exercício básico para o desenvolvimento da massa muscular do peitoral maior.', ARRAY['Mantenha os pés firmes no chão', 'Retraia as escápulas', 'Não trave os joelhos no topo']),
('Supino Inclinado com Barra', 'Peitoral', 'Intermediário', 'Peito', 'Barra', 'Foco na porção clavicular (superior) do peito.', ARRAY['Desça a barra até a parte superior do tórax', 'Controle o movimento na descida', 'Mantenha o core firme']),
('Supino Declinado com Barra', 'Peitoral', 'Intermediário', 'Peito', 'Barra', 'Foco na porção inferior do peitoral.', ARRAY['Cuidado com a pressão na cabeça', 'Use um ajudante se necessário', 'Amplitude controlada']),
('Supino Pegada Fechada', 'Peitoral', 'Intermediário', 'Peito', 'Barra', 'Trabalha o miolo do peito e intensifica a ação do tríceps.', ARRAY['Mãos na largura dos ombros', 'Cotovelos rente ao corpo', 'Foque na contração central']),
('Pullover com Barra', 'Peitoral', 'Avançado', 'Peito', 'Barra', 'Exercício de expansão torácica que trabalha peito e serrátil.', ARRAY['Mantenha os braços levemente flexionados', 'Não desça além do ponto de conforto do ombro', 'Sinta o alongamento']),
('Supino Reto com Halteres', 'Peitoral', 'Intermediário', 'Peito', 'Halteres', 'Permite maior amplitude de movimento e trabalha a estabilização.', ARRAY['Aproxime os halteres no topo sem batê-los', 'Desça até sentir o alongamento', 'Controle a rotação dos punhos']),
('Supino Inclinado com Halteres', 'Peitoral', 'Intermediário', 'Peito', 'Halteres', 'Foco no peitoral superior com a versatilidade dos halteres.', ARRAY['Mantenha o ângulo do banco em 30-45 graus', 'Movimento em arco', 'Estabilidade total do core']),
('Supino Declinado com Halteres', 'Peitoral', 'Intermediário', 'Peito', 'Halteres', 'Trabalha a parte inferior do peito com liberdade de movimento.', ARRAY['Pés bem presos no banco', 'Cuidado ao pegar os pesos', 'Foco no controle']),
('Crucifixo Reto', 'Peitoral', 'Iniciante', 'Peito', 'Halteres', 'Exercício de isolamento para alongamento e abertura do peitoral.', ARRAY['Braços levemente flexionados', 'Movimento lento para sentir o alongamento', 'Não ultrapasse a linha do corpo']),
('Crucifixo Inclinado', 'Peitoral', 'Intermediário', 'Peito', 'Halteres', 'Foco no alongamento da porção superior do peito.', ARRAY['Simule um abraço em uma árvore', 'Mantenha o peito estufado', 'Sincronize a respiração']),
('Crucifixo Declinado', 'Peitoral', 'Intermediário', 'Peito', 'Halteres', 'Trabalha o alongamento da porção inferior.', ARRAY['Controle máximo na fase negativa', 'Não use cargas excessivas', 'Foco na conexão mente-músculo']),
('Pullover com Halter', 'Peitoral', 'Intermediário', 'Peito', 'Halteres', 'Promove a expansão da caixa torácica e trabalha o serrátil anterior.', ARRAY['Apoie apenas as costas no banco (opcional)', 'Mantenha o quadril baixo', 'Inspire na descida']),
('Peck Deck (Voador)', 'Peitoral', 'Iniciante', 'Peito', 'Máquina', 'Isolamento mecânico do peitoral, ideal para atingir a falha com segurança.', ARRAY['Costas bem apoiadas', 'Cotovelos na altura dos ombros', 'Segure 1 segundo na contração máxima']),
('Crossover Polia Alta', 'Peitoral', 'Intermediário', 'Peito', 'Máquina', 'Trabalha a definição da parte inferior e central do peito.', ARRAY['Flexione levemente o tronco à frente', 'Puxe no sentido de baixo e para o centro', 'Não balance o corpo']),
('Crossover Polia Média', 'Peitoral', 'Intermediário', 'Peito', 'Máquina', 'Foco no miolo do peito com tensão constante dos cabos.', ARRAY['Mantenha os braços na linha dos ombros', 'Movimento de fechamento frontal', 'Sinta a contração no centro']),
('Crossover Polia Baixa', 'Peitoral', 'Intermediário', 'Peito', 'Máquina', 'Foco na parte superior do peito puxando de baixo para cima.', ARRAY['Mãos começam abaixo do quadril', 'Puxe em direção ao queixo', 'Foco no deltóide anterior e peito superior']),
('Supino Máquina / Chest Press', 'Peitoral', 'Iniciante', 'Peito', 'Máquina', 'Alternativa estável ao supino com pesos livres.', ARRAY['Ajuste o assento para que as pegadas fiquem na linha do peito', 'Não estenda totalmente o cotovelo', 'Cadência controlada']),
('Chest Press Articulado / Convergente', 'Peitoral', 'Iniciante', 'Peito', 'Máquina', 'Simula o movimento do supino mantendo a convergência natural dos braços.', ARRAY['Empurre de forma explosiva', 'Controle a volta', 'Mantenha o apoio lombar']),
('Flexão de Braços Tradicional', 'Peitoral', 'Iniciante', 'Peito', 'Livre', 'Exercício calistênico fundamental para força e estabilidade de tronco.', ARRAY['Corpo alinhado como uma prancha', 'Cotovelos a 45 graus do corpo', 'Amplitude máxima']),

-- COSTAS
('Barra Fixa Pronada (Pull-up)', 'Costas', 'Avançado', 'Costas', 'Livre', 'Exercício fundamental para largura das costas.', ARRAY['Palmas viradas para fora', 'Puxe o peito em direção à barra', 'Evite o balanço das pernas']),
('Barra Fixa Supinada (Chin-up)', 'Costas', 'Intermediário', 'Costas', 'Livre', 'Trabalha dorsais e bíceps intensamente.', ARRAY['Palmas viradas para você', 'Amplitude completa', 'Controle a descida']),
('Remada Curvada com Barra', 'Costas', 'Avançado', 'Costas', 'Barra', 'Exercício de base para espessura das costas.', ARRAY['Coluna neutra', 'Incline o tronco a 45-90 graus', 'Puxe em direção ao umbigo']),
('Remada Cavalinho (T-Bar Row)', 'Costas', 'Intermediário', 'Costas', 'Barra/Máquina', 'Variante potente da remada focando no centro das costas.', ARRAY['Mantenha os joelhos flexionados', 'Não arredonde a coluna', 'Puxe as escápulas para trás']),
('Levantamento Terra (Deadlift)', 'Costas', 'Avançado', 'Costas', 'Barra', 'Um dos exercícios mais completos. Foco em toda a cadeia posterior.', ARRAY['Barra rente à canela', 'Peito aberto', 'Tração no chão com os calcanhares']),
('Remada Unilateral / Serrote', 'Costas', 'Iniciante', 'Costas', 'Halteres', 'Exercício isolado para correção de assimetrias nas costas.', ARRAY['Apoie no banco', 'Cotovelo passa a linha do tronco', 'Não gire os ombros']),
('Puxada Frente (Pulldown)', 'Costas', 'Iniciante', 'Costas', 'Máquina', 'Alternativa principal à barra fixa para iniciantes.', ARRAY['Não puxe atrás da nuca', 'Incline levemente para trás', 'Puxe com os cotovelos']),
('Remada Baixa (Seated Row)', 'Costas', 'Iniciante', 'Costas', 'Máquina', 'Foco na musculatura central das costas.', ARRAY['Não balance o tronco', 'Escápulas se unem na contração', 'Pés firmes no apoio']),

-- PERNAS
('Agachamento Livre', 'Pernas', 'Avançado', 'Pernas', 'Barra', 'Rainha dos exercícios de perna.', ARRAY['Coluna neutra', 'Quadril para trás', 'Joelhos não colapsam para dentro']),
('Leg Press 45°', 'Pernas', 'Intermediário', 'Pernas', 'Máquina', 'Grande recrutamento de quadríceps e glúteos.', ARRAY['Não trave os joelhos', 'Pés na largura dos ombros', 'Costas bem apoiadas']),
('Cadeira Extensora', 'Pernas', 'Iniciante', 'Pernas', 'Máquina', 'Isolamento frontal de quadríceps.', ARRAY['Ajuste o rolo no tornozelo', 'Joelho alinhado com o eixo da máquina', 'Pausa no topo']),
('Mesa Flexora', 'Pernas', 'Iniciante', 'Pernas', 'Máquina', 'Isolamento de posteriores.', ARRAY['Mantenha o quadril colado', 'Não use impulso', 'Amplitude total']),
('Afundo / Avanço (Lunge)', 'Pernas', 'Intermediário', 'Pernas', 'Livre/Halter', 'Trabalha equilíbrio, glúteos e quadríceps de forma unilateral.', ARRAY['Passo largo', 'Joelho de trás quase toca o chão', 'Tronco ereto']),
('Elevação Pélvica (Hip Thrust)', 'Pernas', 'Intermediário', 'Pernas', 'Barra/Máquina', 'Melhor exercício para construção de glúteos.', ARRAY['Queixo no peito', 'Contraia o glúteo no topo', 'Pés empurrando o chão']),
('Elevação de Panturrilha', 'Pernas', 'Iniciante', 'Pernas', 'Livre/Máquina', 'Desenvolvimento das panturrilhas.', ARRAY['Alongamento máximo embaixo', 'Fique na ponta dos pés', 'Alta repetição']),

-- OMBROS
('Desenvolvimento Militar (OHP)', 'Ombros', 'Avançado', 'Ombros', 'Barra', 'Exercício clássico de força para os ombros (em pé).', ARRAY['Glúteos e abdômen contraídos', 'Passe a barra rente ao rosto', 'Barra sobre a cabeça no topo']),
('Elevação Lateral', 'Ombros', 'Iniciante', 'Ombros', 'Halteres', 'Isolamento para a porção lateral do deltoide.', ARRAY['Pequena inclinação à frente', 'Não ultrapasse a linha dos ombros', 'Cotovelos levemente acima das mãos']),
('Elevação Frontal', 'Ombros', 'Iniciante', 'Ombros', 'Halteres/Barra/Cabo', 'Foco no deltoide anterior.', ARRAY['Não use impulso', 'Suba até a linha dos olhos', 'Alternado ou simultâneo']),
('Arnold Press', 'Ombros', 'Intermediário', 'Ombros', 'Halteres', 'Desenvolvimento com rotação, atingindo as três porções do deltoide.', ARRAY['Inicie com palmas para você', 'Gire os halteres durante a subida', 'Movimento fluido']),

-- BRAÇOS
('Rosca Direta com Barra', 'Braços', 'Iniciante', 'Braços', 'Barra', 'O construtor clássico de bíceps.', ARRAY['Não balance o tronco', 'Cotovelos fixos ao lado do corpo', 'Punhos estáveis']),
('Rosca Scott', 'Braços', 'Iniciante', 'Braços', 'Barra/Máquina', 'Isolamento total do bíceps eliminando qualquer impulso.', ARRAY['Braços bem apoiados', 'Amplitude completa', 'Não hiperestenda os cotovelos']),
('Tríceps Testa', 'Braços', 'Intermediário', 'Braços', 'Barra/Halter', 'Um dos melhores para a cabeça longa do tríceps.', ARRAY['Cotovelos apontados para o teto', 'Desça até a testa', 'Não abra os cotovelos']),
('Tríceps Pulley (Corda ou Barra)', 'Braços', 'Iniciante', 'Braços', 'Máquina', 'Exercício fundamental de extensão de tríceps.', ARRAY['Mantenha os cotovelos fixos', 'Coluna reta', 'Extensão total embaixo']),

-- ABDÔMEN
('Abdominal Supra', 'Abdômen', 'Iniciante', 'Abdômen', 'Livre', 'Foco na parte superior do abdômen.', ARRAY['Não puxe o pescoço', 'Tire apenas as escápulas do chão', 'Solte o ar na subida']),
('Abdominal Infra', 'Abdômen', 'Iniciante', 'Abdômen', 'Livre', 'Foco na parte inferior do abdômen (elevação de pernas).', ARRAY['Mantenha a lombar no chão', 'Desça as pernas com controle', 'Mantenha o core ativado']),
('Prancha Abdominal (Plank)', 'Abdômen', 'Iniciante', 'Abdômen', 'Livre', 'Excelente para estabilidade do core.', ARRAY['Corpo reto como uma linha', 'Não deixe o quadril cair', 'Respire normalmente']),

-- COSTAS (Adicionais)
('Remada Unilateral / Serrote', 'Costas', 'Iniciante', 'Costas', 'Halteres', 'Exercício isolado para correção de assimetrias nas costas.', ARRAY['Apoie no banco', 'Cotovelo passa a linha do tronco', 'Não gire os ombros']),
('Pullover (Costas focus)', 'Costas', 'Intermediário', 'Costas', 'Halteres/Cabo', 'Apesar de trabalhar peito, é excelente para latíssimo se feito corretamente.', ARRAY['Foque no movimento dos cotovelos', 'Amplitude controlada', 'Conexão com a dorsal']),
('Encolhimento para Trapézio', 'Costas', 'Iniciante', 'Costas', 'Barra/Halter', 'Isolamento dos trapézios superiores.', ARRAY['Não gire os ombros', 'Suba de forma vertical', 'Pausa no topo']),
('Pulldown com Braços Estendidos', 'Costas', 'Intermediário', 'Costas', 'Máquina', 'Isolamento de latíssimo sem usar os bíceps.', ARRAY['Mantenha os cotovelos travados', 'Puxe até a coxa', 'Sinta o alongamento no topo']),
('Face Pull', 'Costas', 'Iniciante', 'Costas', 'Máquina/Cabo', 'Excelente para deltoide posterior e saúde dos ombros.', ARRAY['Puxe a corda em direção ao rosto', 'Abra a corda no final', 'Controle total']),

-- PERNAS (Adicionais)
('Stiff', 'Pernas', 'Intermediário', 'Pernas', 'Barra/Halter', 'Foco total na cadeia posterior (isquiosurais/glúteos).', ARRAY['Joelhos semi-flexionados', 'Barra rente às pernas', 'Sinta o alongamento dos posteriores']),

-- BRAÇOS (Adicionais)
('Rosca Alternada', 'Braços', 'Iniciante', 'Braços', 'Halteres', 'Trabalha cada braço individualmente, focando na supinação.', ARRAY['Gire a palma da mão para cima', 'Foco na contração', 'Alternância ritmada']),
('Rosca Martelo', 'Braços', 'Iniciante', 'Braços', 'Halteres', 'Pegada neutra. Foco no braquial e braquiorradial.', ARRAY['Mantenha a pegada neutra o tempo todo', 'Postura ereta', 'Ótimo para volume do braço']),
('Rosca Concentrada', 'Braços', 'Iniciante', 'Braços', 'Halteres', 'Isolamento máximo sentado para o pico do bíceps.', ARRAY['Cotovelo apoiado na coxa', 'Movimento lento', 'Foco no pico de contração']),
('Tríceps Francês', 'Braços', 'Intermediário', 'Braços', 'Halter/Cabo', 'Extensão acima da cabeça, ótimo alongamento.', ARRAY['Mantenha o braço vertical', 'Core firme para não curvar as costas', 'Amplitude máxima']),
('Tríceps Coice (Kickback)', 'Braços', 'Iniciante', 'Braços', 'Halter/Cabo', 'Isolamento focado na contração final do tríceps.', ARRAY['Braço paralelo ao chão', 'Apenas o antebraço move', 'Extensão máxima']),
('Rosca de Punho', 'Braços', 'Iniciante', 'Braços', 'Barra/Halter', 'Trabalha a parte flexora do antebraço.', ARRAY['Apoie os braços no banco', 'Role a barra até a ponta dos dedos', 'Controle na subida']),

-- COMPOSTOS
('Burpee', 'Compostos', 'Intermediário', 'Cardio', 'Livre', 'Exercício cardio de corpo inteiro.', ARRAY['Movimento fluido', 'Salte com as mãos para cima', 'Mantenha o ritmo']),
('Kettlebell Swing', 'Compostos', 'Intermediário', 'Funcional', 'Kettlebell', 'Potência de quadril e condicionamento físico.', ARRAY['Explosão no quadril', 'Braços são apenas cordas', 'Coluna reta'])

ON CONFLICT DO NOTHING;
