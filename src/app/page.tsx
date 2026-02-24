import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserIcon, TrophyIcon, ClipboardListIcon, BarChart3Icon, FlameIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Hero Section */}
      <section className="px-6 pt-12 pb-8 flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight">
            Treine como um <span className="text-primary italic">Pro</span>,
            gere resultados <span className="text-primary italic">Reais</span>.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A plataforma definitiva para personal trainers gerenciarem treinos e alunos com performance de elite.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button asChild className="h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
            <Link href="/auth/register">Começar Agora</Link>
          </Button>
          <Button asChild variant="outline" className="h-14 rounded-2xl text-lg font-bold border-2">
            <Link href="/student/dashboard">Ver Demonstração</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-8 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Recursos Elite</h2>
        <div className="grid grid-cols-1 gap-4">
          <FeatureCard
            icon={<ClipboardListIcon className="w-6 h-6" />}
            title="Gestão de Treinos"
            description="Crie periodizações A/B/C complexas em segundos."
          />
          <FeatureCard
            icon={<BarChart3Icon className="w-6 h-6" />}
            title="Análise de Carga"
            description="Gráficos inteligentes de progressão para cada exercício."
          />
          <FeatureCard
            icon={<TrophyIcon className="w-6 h-6" />}
            title="Biblioteca 1000+"
            description="Exercícios com imagens anatômicas e instruções premium."
          />
        </div>
      </section>

      {/* User Type Preview */}
      <section className="px-6 py-8 bg-muted/30 rounded-t-[3rem] mt-4 flex-1">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Escolha seu perfil</h3>
            <p className="text-sm text-muted-foreground">Otimizado para o que você precisa.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-card p-6 rounded-[2rem] border border-border/50 flex items-center gap-4 transition-all active:scale-95">
              <div className="bg-primary/10 p-4 rounded-2xl">
                <FitnessIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Sou Personal</h4>
                <p className="text-sm text-muted-foreground">Gerencie seus alunos e treinos.</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-[2rem] border border-border/50 flex items-center gap-4 transition-all active:scale-95">
              <div className="bg-secondary p-4 rounded-2xl">
                <UserIcon className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Sou Aluno</h4>
                <p className="text-sm text-muted-foreground">Visualize treinos e registre cargas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="p-5 flex gap-4 items-start bg-card/50 border-border/40 rounded-3xl">
      <div className="bg-primary/20 p-3 rounded-2xl text-primary">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-base">{title}</h4>
        <p className="text-sm text-muted-foreground leading-snug">{description}</p>
      </div>
    </Card>
  )
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
      <div className="w-6 h-6">
        {icon}
      </div>
      <span className="text-[10px] font-medium tracking-wide uppercase">{label}</span>
    </div>
  )
}

function FitnessIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6.5 6.5 11 11" />
      <path d="m11.8 11.8 1.1-1.1" />
      <path d="m3.5 10.5 7-7" />
      <path d="m13.5 20.5 7-7" />
      <path d="m15.5 8.5 3-3" />
      <path d="m5.5 18.5 3-3" />
    </svg>
  )
}

