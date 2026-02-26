# AcaSaaS | Gestão de Treinos Premium 🚀

AcaSaaS é a plataforma definitiva desenvolvida para personal trainers e alunos que buscam performance de elite. Com uma interface moderna e otimizada, permite a gestão completa de periodizações, acompanhamento de cargas e evolução de resultados.

---

## ✨ Recursos Elite

### 🏋️ Para Personal Trainers
- **Gestão de Alunos:** Controle total sobre sua base de alunos em um único lugar.
- **Periodização Inteligente:** Crie treinos A/B/C complexos em segundos.
- **Biblioteca de Exercícios:** Acesso a mais de 1000 exercícios com instruções detalhadas e imagens anatômicas.

### 📱 Para Alunos
- **Dashboard Intuitivo:** Visualize seus treinos do dia com facilidade.
- **Registro de Cargas:** Anote suas evoluções de peso e repetições em tempo real.
- **Gráficos de Progressão:** Acompanhe sua evolução através de análises visuais inteligentes.

---

## 🛠️ Stack Tecnológica

O projeto utiliza as tecnologias mais modernas do ecossistema web e mobile:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Banco de Dados:** [Neon](https://neon.tech/) (PostgreSQL Serverless) e [Supabase](https://supabase.com/)
- **Mobile:** [Capacitor](https://capacitorjs.com/) (Suporte nativo para Android/iOS)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Estado:** [Zustand](https://docs.pmnd.rs/zustand/)
- **Ícones:** [Lucide React](https://lucide.dev/)

---

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- NPM ou PNPM

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/app-academia.git
   cd app-academia
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env.local` na raiz do projeto com as seguintes chaves (veja o `.env` de exemplo):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=seu_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   DATABASE_URL=sua_url_conexao_neon
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## 📱 Mobile (Android)

Para rodar a versão mobile usando Capacitor:

```bash
# Sincroniza o projeto web com o Android
npx cap sync

# Abre o projeto no Android Studio
npx cap open android
```

---

## 📂 Estrutura do Projeto

- `src/app`: Rotas e páginas da aplicação (Next.js App Router).
- `src/components`: Componentes de UI reutilizáveis (Layout e UI).
- `src/lib`: Configurações de banco de dados, stores (Zustand) e utilitários.
- `supabase`: Arquivos de configuração e migrations do Supabase.
- `android`: Código nativo para a plataforma Android via Capacitor.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---
Desenvolvido por João Pedro. 🔥
