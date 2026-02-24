export interface Exercise {
    id: string;
    name: string;
    muscle: string;
    equipment: string;
    difficulty: "Iniciante" | "Intermediário" | "Avançado";
    description: string;
    tips: string[];
}

export const EXERCISES_DB: Exercise[] = [
    // --- PEITO ---
    {
        id: "p1",
        name: "Supino Reto com Barra",
        muscle: "Peitoral",
        equipment: "Barra",
        difficulty: "Intermediário",
        description: "Exercício básico para o desenvolvimento da massa muscular do peitoral maior.",
        tips: ["Mantenha os pés firmes no chão", "Retraia as escápulas", "Não trave os joelhos no topo"]
    },
    {
        id: "p2",
        name: "Supino Inclinado com Barra",
        muscle: "Peitoral",
        equipment: "Barra",
        difficulty: "Intermediário",
        description: "Foco na porção clavicular (superior) do peito.",
        tips: ["Desça a barra até a parte superior do tórax", "Controle o movimento na descida", "Mantenha o core firme"]
    },
    {
        id: "p3",
        name: "Supino Declinado com Barra",
        muscle: "Peitoral",
        equipment: "Barra",
        difficulty: "Intermediário",
        description: "Foco na porção inferior do peitoral.",
        tips: ["Cuidado com a pressão na cabeça", "Use um ajudante se necessário", "Amplitude controlada"]
    },
    {
        id: "p4",
        name: "Supino Pegada Fechada",
        muscle: "Peitoral",
        equipment: "Barra",
        difficulty: "Intermediário",
        description: "Trabalha o miolo do peito e intensifica a ação do tríceps.",
        tips: ["Mãos na largura dos ombros", "Cotovelos rente ao corpo", "Foque na contração central"]
    },
    {
        id: "p5",
        name: "Pullover com Barra",
        muscle: "Peitoral",
        equipment: "Barra",
        difficulty: "Avançado",
        description: "Exercício de expansão torácica que trabalha peito e serrátil.",
        tips: ["Mantenha os braços levemente flexionados", "Não desça além do ponto de conforto do ombro", "Sinta o alongamento"]
    },
    {
        id: "p6",
        name: "Supino Reto com Halteres",
        muscle: "Peitoral",
        equipment: "Halteres",
        difficulty: "Intermediário",
        description: "Permite maior amplitude de movimento e trabalha a estabilização.",
        tips: ["Aproxime os halteres no topo sem batê-los", "Desça até sentir o alongamento", "Controle a rotação dos punhos"]
    },
    {
        id: "p7",
        name: "Supino Inclinado com Halteres",
        muscle: "Peitoral",
        equipment: "Halteres",
        difficulty: "Intermediário",
        description: "Foco no peitoral superior com a versatilidade dos halteres.",
        tips: ["Mantenha o ângulo do banco em 30-45 graus", "Movimento em arco", "Estabilidade total do core"]
    },
    {
        id: "p8",
        name: "Supino Declinado com Halteres",
        muscle: "Peitoral",
        equipment: "Halteres",
        difficulty: "Intermediário",
        description: "Trabalha a parte inferior do peito com liberdade de movimento.",
        tips: ["Pés bem presos no banco", "Cuidado ao pegar os pesos", "Foco no controle"]
    },
    {
        id: "p9",
        name: "Crucifixo Reto",
        muscle: "Peitoral",
        equipment: "Halteres",
        difficulty: "Iniciante",
        description: "Exercício de isolamento para alongamento e abertura do peitoral.",
        tips: ["Braços levemente flexionados", "Movimento lento para sentir o alongamento", "Não ultrapasse a linha do corpo"]
    },
    {
        id: "p10",
        name: "Crucifixo Inclinado",
        muscle: "Peitoral",
        equipment: "Halteres",
        difficulty: "Intermediário",
        description: "Foco no alongamento da porção superior do peito.",
        tips: ["Simule um abraço em uma árvore", "Mantenha o peito estufado", "Sincronize a respiração"]
    },
    {
        id: "p11",
        name: "Crucifixo Declinado",
        muscle: "Peitoral",
        equipment: "Halteres",
        difficulty: "Intermediário",
        description: "Trabalha o alongamento da porção inferior.",
        tips: ["Controle máximo na fase negativa", "Não use cargas excessivas", "Foco na conexão mente-músculo"]
    },
    {
        id: "p12",
        name: "Pullover com Halter",
        muscle: "Peitoral",
        equipment: "Halteres",
        difficulty: "Intermediário",
        description: "Promove a expansão da caixa torácica e trabalha o serrátil anterior.",
        tips: ["Apoie apenas as costas no banco (opcional)", "Mantenha o quadril baixo", "Inspire na descida"]
    },
    {
        id: "p13",
        name: "Peck Deck (Voador)",
        muscle: "Peitoral",
        equipment: "Máquina",
        difficulty: "Iniciante",
        description: "Isolamento mecânico do peitoral, ideal para atingir a falha com segurança.",
        tips: ["Costas bem apoiadas", "Cotovelos na altura dos ombros", "Segure 1 segundo na contração máxima"]
    },
    {
        id: "p14",
        name: "Crossover Polia Alta",
        muscle: "Peitoral",
        equipment: "Máquina",
        difficulty: "Intermediário",
        description: "Trabalha a definição da parte inferior e central do peito.",
        tips: ["Flexione levemente o tronco à frente", "Puxe no sentido de baixo e para o centro", "Não balance o corpo"]
    },
    {
        id: "p15",
        name: "Crossover Polia Média",
        muscle: "Peitoral",
        equipment: "Máquina",
        difficulty: "Intermediário",
        description: "Foco no miolo do peito com tensão constante dos cabos.",
        tips: ["Mantenha os braços na linha dos ombros", "Movimento de fechamento frontal", "Sinta a contração no centro"]
    },
    {
        id: "p16",
        name: "Crossover Polia Baixa",
        muscle: "Peitoral",
        equipment: "Máquina",
        difficulty: "Intermediário",
        description: "Foco na parte superior do peito puxando de baixo para cima.",
        tips: ["Mãos começam abaixo do quadril", "Puxe em direção ao queixo", "Foco no deltóide anterior e peito superior"]
    },
    {
        id: "p17",
        name: "Supino Máquina / Chest Press",
        muscle: "Peitoral",
        equipment: "Máquina",
        difficulty: "Iniciante",
        description: "Alternativa estável ao supino com pesos livres.",
        tips: ["Ajuste o assento para que as pegadas fiquem na linha do peito", "Não estenda totalmente o cotovelo", "Cadência controlada"]
    },
    {
        id: "p18",
        name: "Chest Press Articulado / Convergente",
        muscle: "Peitoral",
        equipment: "Máquina",
        difficulty: "Iniciante",
        description: "Simula o movimento do supino mantendo a convergência natural dos braços.",
        tips: ["Empurre de forma explosiva", "Controle a volta", "Mantenha o apoio lombar"]
    },
    {
        id: "p19",
        name: "Crucifixo na Máquina Articulada",
        muscle: "Peitoral",
        equipment: "Máquina",
        difficulty: "Iniciante",
        description: "Isolamento preciso com estabilidade máxima.",
        tips: ["Ajuste os braços da máquina conforme sua flexibilidade", "Foco no pico de contração", "Não dê trancos"]
    },
    {
        id: "p20",
        name: "Flexão de Braços Tradicional",
        muscle: "Peitoral",
        equipment: "Livre",
        difficulty: "Iniciante",
        description: "Exercício calistênico fundamental para força e estabilidade de tronco.",
        tips: ["Corpo alinhado como uma prancha", "Cotovelos a 45 graus do corpo", "Amplitude máxima"]
    },
    {
        id: "p21",
        name: "Flexão Inclinada",
        muscle: "Peitoral",
        equipment: "Livre",
        difficulty: "Iniciante",
        description: "Mãos em superfície elevada. Foco na porção inferior do peito (mais fácil).",
        tips: ["Use um banco ou step", "Mantenha o abdômen contraído", "Excelente para iniciantes"]
    },
    {
        id: "p22",
        name: "Flexão Declinada",
        muscle: "Peitoral",
        equipment: "Livre",
        difficulty: "Intermediário",
        description: "Pés em superfície elevada. Foco na porção superior do peito.",
        tips: ["Pés no banco ou cadeira", "Cuidado com o equilíbrio", "Aumenta a carga nos ombros"]
    },
    {
        id: "p23",
        name: "Flexão Diamante",
        muscle: "Peitoral",
        equipment: "Livre",
        difficulty: "Intermediário",
        description: "Mãos juntas formando um diamante. Foco intenso em tríceps e miolo do peito.",
        tips: ["Mãos abaixo do esterno", "Mantenha os cotovelos fechados", "Exige mais do core"]
    },
    {
        id: "p24",
        name: "Flexão Explosiva",
        muscle: "Peitoral",
        equipment: "Livre",
        difficulty: "Avançado",
        description: "Empurre com força suficiente para tirar as mãos do chão.",
        tips: ["Aterrisagem suave", "Potência máxima na subida", "Cuidado com os pulsos"]
    },

    // --- COSTAS ---
    {
        id: "c1",
        name: "Barra Fixa Pronada (Pull-up)",
        muscle: "Costas",
        equipment: "Livre",
        difficulty: "Avançado",
        description: "Exercício fundamental para largura das costas.",
        tips: ["Palmas viradas para fora", "Puxe o peito em direção à barra", "Evite o balanço das pernas"]
    },
    {
        id: "c2",
        name: "Barra Fixa Supinada (Chin-up)",
        muscle: "Costas",
        equipment: "Livre",
        difficulty: "Intermediário",
        description: "Trabalha dorsais e bíceps intensamente.",
        tips: ["Palmas viradas para você", "Amplitude completa", "Controle a descida"]
    },
    {
        id: "c3",
        name: "Barra Fixa Neutra",
        muscle: "Costas",
        equipment: "Livre",
        difficulty: "Intermediário",
        description: "Pegada paralela, mais confortável para os ombros.",
        tips: ["Ótimo para volume de treino", "Foco no braquiorradial e latíssimo", "Cadência lenta"]
    },
    {
        id: "c4",
        name: "Remada Curvada com Barra",
        muscle: "Costas",
        equipment: "Barra",
        difficulty: "Avançado",
        description: "Exercício de base para espessura das costas.",
        tips: ["Coluna neutra", "Incline o tronco a 45-90 graus", "Puxe em direção ao umbigo"]
    },
    {
        id: "c5",
        name: "Remada Cavalinho (T-Bar Row)",
        muscle: "Costas",
        equipment: "Barra/Máquina",
        difficulty: "Intermediário",
        description: "Variante potente da remada focando no centro das costas.",
        tips: ["Mantenha os joelhos flexionados", "Não arredonde a coluna", "Puxe as escápulas para trás"]
    },
    {
        id: "c6",
        name: "Levantamento Terra (Deadlift)",
        muscle: "Costas",
        equipment: "Barra",
        difficulty: "Avançado",
        description: "Um dos exercícios mais completos. Foco em toda a cadeia posterior.",
        tips: ["Barra rente à canela", "Peito aberto", "Tração no chão com os calcanhares"]
    },
    {
        id: "c7",
        name: "Terra Romeno (Stiff-Leg)",
        muscle: "Costas",
        equipment: "Barra/Halter",
        difficulty: "Intermediário",
        description: "Foco nos posteriores de coxa e lombar.",
        tips: ["Quadril para trás", "Não flexione os joelhos excessivamente", "Coluna reta sempre"]
    },
    {
        id: "c8",
        name: "Remada Unilateral / Serrote",
        muscle: "Costas",
        equipment: "Halteres",
        difficulty: "Iniciante",
        description: "Exercício isolado para correção de assimetrias nas costas.",
        tips: ["Apoie no banco", "Cotovelo passa a linha do tronco", "Não gire os ombros"]
    },
    {
        id: "c9",
        name: "Pullover (Costas focus)",
        muscle: "Costas",
        equipment: "Halteres/Cabo",
        difficulty: "Intermediário",
        description: "Apesar de trabalhar peito, é excelente para latíssimo se feito corretamente.",
        tips: ["Foque no movimento dos cotovelos", "Amplitude controlada", "Conexão com a dorsal"]
    },
    {
        id: "c10",
        name: "Encolhimento para Trapézio",
        muscle: "Costas",
        equipment: "Barra/Halter",
        difficulty: "Iniciante",
        description: "Isolamento dos trapézios superiores.",
        tips: ["Não gire os ombros", "Suba de forma vertical", "Pausa no topo"]
    },
    {
        id: "c11",
        name: "Puxada Frente (Pulldown)",
        muscle: "Costas",
        equipment: "Máquina",
        difficulty: "Iniciante",
        description: "Alternativa principal à barra fixa para iniciantes.",
        tips: ["Não puxe atrás da nuca", "Incline levemente para trás", "Puxe com os cotovelos"]
    },
    {
        id: "c12",
        name: "Remada Baixa (Seated Row)",
        muscle: "Costas",
        equipment: "Máquina",
        difficulty: "Iniciante",
        description: "Foco na musculatura central das costas.",
        tips: ["Não balance o tronco", "Escápulas se unem na contração", "Pés firmes no apoio"]
    },
    {
        id: "c13",
        name: "Remada Articulada",
        muscle: "Costas",
        equipment: "Máquina",
        difficulty: "Iniciante",
        description: "Remada em máquina para segurança e isolamento.",
        tips: ["Peito encostado no apoio", "Movimento focado na dorsal", "Amplitude máxima"]
    },
    {
        id: "c14",
        name: "Pulldown com Braços Estendidos",
        muscle: "Costas",
        equipment: "Máquina",
        difficulty: "Intermediário",
        description: "Isolamento de latíssimo sem usar os bíceps.",
        tips: ["Mantenha os cotovelos travados", "Puxe até a coxa", "Sinta o alongamento no topo"]
    },
    {
        id: "c15",
        name: "Face Pull",
        muscle: "Costas",
        equipment: "Máquina/Cabo",
        difficulty: "Iniciante",
        description: "Excelente para deltoide posterior e saúde dos ombros.",
        tips: ["Puxe a corda em direção ao rosto", "Abra a corda no final", "Controle total"]
    },

    // --- OMBROS ---
    {
        id: "s1",
        name: "Desenvolvimento Militar (OHP)",
        muscle: "Ombros",
        equipment: "Barra",
        difficulty: "Avançado",
        description: "Exercício clássico de força para os ombros (em pé).",
        tips: ["Glúteos e abdômen contraídos", "Passe a barra rente ao rosto", "Barra sobre a cabeça no topo"]
    },
    {
        id: "s2",
        name: "Elevação Lateral",
        muscle: "Ombros",
        equipment: "Halteres",
        difficulty: "Iniciante",
        description: "Isolamento para a porção lateral do deltoide.",
        tips: ["Pequena inclinação à frente", "Não ultrapasse a linha dos ombros", "Cotovelos levemente acima das mãos"]
    },
    {
        id: "s3",
        name: "Elevação Frontal",
        muscle: "Ombros",
        equipment: "Halteres/Barra/Cabo",
        difficulty: "Iniciante",
        description: "Foco no deltoide anterior.",
        tips: ["Não use impulso", "Suba até a linha dos olhos", "Alternado ou simultâneo"]
    },
    {
        id: "s4",
        name: "Arnold Press",
        muscle: "Ombros",
        equipment: "Halteres",
        difficulty: "Intermediário",
        description: "Desenvolvimento com rotação, atingindo as três porções do deltoide.",
        tips: ["Inicie com palmas para você", "Gire os halteres durante a subida", "Movimento fluido"]
    },
    {
        id: "s5",
        name: "Crucifixo Inverso (Face Pull / Posterior Halter)",
        muscle: "Ombros",
        equipment: "Halteres/Máquina",
        difficulty: "Iniciante",
        description: "Desenvolvimento da porção posterior do ombro.",
        tips: ["Incline o tronco", "Amplitude focada no posterior", "Não use os trapézios"]
    },
    {
        id: "s6",
        name: "Desenvolvimento Máquina",
        muscle: "Ombros",
        equipment: "Máquina",
        difficulty: "Iniciante",
        description: "Desenvolvimento vertical seguro e estabilizado.",
        tips: ["Ajuste a altura do banco", "Mantenha a lombar apoiada", "Cadência lenta"]
    },

    // --- BRAÇOS (BÍCEPS/TRÍCEPS/ANTEBRAÇO) ---
    {
        id: "a1",
        name: "Rosca Direta com Barra",
        muscle: "Braços",
        equipment: "Barra",
        difficulty: "Iniciante",
        description: "O construtor clássico de bíceps.",
        tips: ["Não balance o tronco", "Cotovelos fixos ao lado do corpo", "Punhos estáveis"]
    },
    {
        id: "a2",
        name: "Rosca Scott",
        muscle: "Braços",
        equipment: "Barra/Máquina",
        difficulty: "Iniciante",
        description: "Isolamento total do bíceps eliminando qualquer impulso.",
        tips: ["Braços bem apoiados", "Amplitude completa", "Não hiperestenda os cotovelos"]
    },
    {
        id: "a3",
        name: "Rosca Alternada",
        muscle: "Braços",
        equipment: "Halteres",
        difficulty: "Iniciante",
        description: "Trabalha cada braço individualmente, focando na supinação.",
        tips: ["Gire a palma da mão para cima", "Foco na contração", "Alternância ritmada"]
    },
    {
        id: "a4",
        name: "Rosca Martelo",
        muscle: "Braços",
        equipment: "Halteres",
        difficulty: "Iniciante",
        description: "Pegada neutra. Foco no braquial e braquiorradial.",
        tips: ["Mantenha a pegada neutra o tempo todo", "Postura ereta", "Ótimo para volume do braço"]
    },
    {
        id: "a5",
        name: "Rosca Concentrada",
        muscle: "Braços",
        equipment: "Halteres",
        difficulty: "Iniciante",
        description: "Isolamento máximo sentado para o pico do bíceps.",
        tips: ["Cotovelo apoiado na coxa", "Movimento lento", "Foco no pico de contração"]
    },
    {
        id: "a6",
        name: "Tríceps Testa",
        muscle: "Braços",
        equipment: "Barra/Halter",
        difficulty: "Intermediário",
        description: "Um dos melhores para a cabeça longa do tríceps.",
        tips: ["Cotovelos apontados para o teto", "Desça até a testa", "Não abra os cotovelos"]
    },
    {
        id: "a7",
        name: "Tríceps Pulley (Corda ou Barra)",
        muscle: "Braços",
        equipment: "Máquina",
        difficulty: "Iniciante",
        description: "Exercício fundamental de extensão de tríceps.",
        tips: ["Mantenha os cotovelos fixos", "Coluna reta", "Extensão total embaixo"]
    },
    {
        id: "a8",
        name: "Tríceps Francês",
        muscle: "Braços",
        equipment: "Halter/Cabo",
        difficulty: "Intermediário",
        description: "Extensão acima da cabeça, ótimo alongamento.",
        tips: ["Mantenha o braço vertical", "Core firme para não curvar as costas", "Amplitude máxima"]
    },
    {
        id: "a9",
        name: "Tríceps Coice (Kickback)",
        muscle: "Braços",
        equipment: "Halter/Cabo",
        difficulty: "Iniciante",
        description: "Isolamento focado na contração final do tríceps.",
        tips: ["Braço paralelo ao chão", "Apenas o antebraço move", "Extensão máxima"]
    },
    {
        id: "a10",
        name: "Rosca de Punho",
        muscle: "Braços",
        equipment: "Barra/Halter",
        difficulty: "Iniciante",
        description: "Trabalha a parte flexora do antebraço.",
        tips: ["Apoie os braços no banco", "Role a barra até a ponta dos dedos", "Controle na subida"]
    },

    // --- PERNAS / GLÚTEO ---
    {
        id: "l1",
        name: "Agachamento Livre",
        muscle: "Pernas",
        equipment: "Barra",
        difficulty: "Avançado",
        description: "Rainha dos exercícios de perna.",
        tips: ["Coluna neutra", "Quadril para trás", "Joelhos não colapsam para dentro"]
    },
    {
        id: "l2",
        name: "Leg Press 45°",
        muscle: "Pernas",
        equipment: "Máquina",
        difficulty: "Intermediário",
        description: "Grande recrutamento de quadríceps e glúteos.",
        tips: ["Não trave os joelhos", "Pés na largura dos ombros", "Costas bem apoiadas"]
    },
    {
        id: "l3",
        name: "Cadeira Extensora",
        muscle: "Pernas",
        equipment: "Máquina",
        difficulty: "Iniciante",
        description: "Isolamento frontal de quadríceps.",
        tips: ["Ajuste o rolo no tornozelo", "Joelho alinhado com o eixo da máquina", "Pausa no topo"]
    },
    {
        id: "l4",
        name: "Mesa Flexora",
        muscle: "Pernas",
        equipment: "Máquina",
        difficulty: "Iniciante",
        description: "Isolamento de posteriores.",
        tips: ["Mantenha o quadril colado", "Não use impulso", "Amplitude total"]
    },
    {
        id: "l5",
        name: "Afundo / Avanço (Lunge)",
        muscle: "Pernas",
        equipment: "Livre/Halter",
        difficulty: "Intermediário",
        description: "Trabalha equilíbrio, glúteos e quadríceps de forma unilateral.",
        tips: ["Passo largo", "Joelho de trás quase toca o chão", "Tronco ereto"]
    },
    {
        id: "l6",
        name: "Stiff",
        muscle: "Pernas",
        equipment: "Barra/Halter",
        difficulty: "Intermediário",
        description: "Foco total na cadeia posterior (isquiosurais/glúteos).",
        tips: ["Joelhos semi-flexionados", "Barra rente às pernas", "Sinta o alongamento dos posteriores"]
    },
    {
        id: "l7",
        name: "Elevação Pélvica (Hip Thrust)",
        muscle: "Pernas",
        equipment: "Barra/Máquina",
        difficulty: "Intermediário",
        description: "Melhor exercício para construção de glúteos.",
        tips: ["Queixo no peito", "Contraia o glúteo no topo", "Pés empurrando o chão"]
    },
    {
        id: "l8",
        name: "Elevação de Panturrilha (Livre/Máquina)",
        muscle: "Pernas",
        equipment: "Livre/Máquina",
        difficulty: "Iniciante",
        description: "Desenvolvimento das panturrilhas.",
        tips: ["Alongamento máximo embaixo", "Fique na ponta dos pés", "Alta repetição"]
    },

    // --- ABDÔMEN ---
    {
        id: "ab1",
        name: "Abdominal Supra",
        muscle: "Abdômen",
        equipment: "Livre",
        difficulty: "Iniciante",
        description: "Foco na parte superior do abdômen.",
        tips: ["Não puxe o pescoço", "Tire apenas as escápulas do chão", "Solte o ar na subida"]
    },
    {
        id: "ab2",
        name: "Abdominal Infra",
        muscle: "Abdômen",
        equipment: "Livre",
        difficulty: "Iniciante",
        description: "Foco na parte inferior do abdômen (elevação de pernas).",
        tips: ["Mantenha a lombar no chão", "Desça as pernas com controle", "Mantenha o core ativado"]
    },
    {
        id: "ab3",
        name: "Prancha Abdominal (Plank)",
        muscle: "Abdômen",
        equipment: "Livre",
        difficulty: "Iniciante",
        description: "Excelente para estabilidade do core.",
        tips: ["Corpo reto como uma linha", "Não deixe o quadril cair", "Respire normalmente"]
    },
    {
        id: "ab4",
        name: "Ab Wheel (Rolo)",
        muscle: "Abdômen",
        equipment: "Acessório",
        difficulty: "Avançado",
        description: "Exercício potente para força total do core.",
        tips: ["Não arqueie a lombar", "Vá até o seu limite de controle", "Retorne usando o abdômen"]
    },

    // --- COMPOSTOS / OUTROS ---
    {
        id: "ex1",
        name: "Burpee",
        muscle: "Compostos",
        equipment: "Livre",
        difficulty: "Intermediário",
        description: "Exercício cardio de corpo inteiro.",
        tips: ["Movimento fluido", "Salte com as mãos para cima", "Mantenha o ritmo"]
    },
    {
        id: "ex2",
        name: "Kettlebell Swing",
        muscle: "Compostos",
        equipment: "Kettlebell",
        difficulty: "Intermediário",
        description: "Potência de quadril e condicionamento físico.",
        tips: ["Explosão no quadril", "Braços são apenas cordas", "Coluna reta"]
    }
];
