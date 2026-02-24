"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    FlameIcon,
    PlayIcon,
    TrophyIcon,
    TrendingUpIcon,
    CheckCircle2Icon
} from "lucide-react";
import Link from "next/link";
import { useWorkoutStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUserAction, logoutAction } from "@/app/actions/auth";

export default function StudentDashboard() {
    const router = useRouter();
    const { startWorkout, isActive } = useWorkoutStore();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function loadUser() {
            const profile = await getCurrentUserAction();
            setUser(profile);
        }
        loadUser();
    }, []);

    const handleStart = () => {
        startWorkout("Treino A - Peitorais", [
            { id: 1, name: "Supino Reto com Barra", target: "4x12" },
            { id: 2, name: "Supino Inclinado", target: "3x15" },
            { id: 3, name: "Crucifixo", target: "3x12" },
        ]);
        router.push("/student/workout/active");
    };

    return (
        <div className="flex flex-col gap-6 px-6 py-6 pb-24">
            {/* Welcome Section */}
            <section className="space-y-1">
                <h1 className="text-3xl font-black tracking-tighter">
                    Olá, {user?.full_name?.split(' ')[0] || "..."}! ⚡
                </h1>
                <p className="text-muted-foreground font-medium">Você já treinou 3 dias esta semana.</p>
            </section>

            {/* Main Action: Today's Workout */}
            <section>
                <Card className="relative overflow-hidden border-2 border-primary/20 bg-primary/5 rounded-[2.5rem] p-8 space-y-6">
                    <div className="relative z-10 flex flex-col gap-4">
                        <Badge className="w-fit bg-primary text-primary-foreground font-black px-4 py-1 rounded-full uppercase text-[10px] tracking-widest">
                            Foco de Hoje
                        </Badge>
                        <div className="space-y-1">
                            <h2 className="text-3xl font-black tracking-tight leading-none uppercase">Treino {isActive ? "em Andamento" : "A"}</h2>
                            <p className="text-muted-foreground font-bold">Peitorais & Tríceps (Hipertrofia)</p>
                        </div>

                        <div className="flex items-center gap-6 mt-4">
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground font-black uppercase">Exercícios</span>
                                <span className="text-xl font-bold">8</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground font-black uppercase">Tempo Est.</span>
                                <span className="text-xl font-bold">55 min</span>
                            </div>
                        </div>

                        <Button onClick={isActive ? () => router.push("/student/workout/active") : handleStart} className="h-16 rounded-2xl text-lg font-black shadow-lg shadow-primary/20 mt-4 group">
                            {isActive ? "VOLTAR AO TREINO" : "INICIAR TREINO"}
                            <PlayIcon className="ml-2 w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                        </Button>
                    </div>

                    {/* Background Decorative Icon */}
                    <FlameIcon className="absolute -right-8 -bottom-8 w-48 h-48 text-primary/10 -rotate-12" />
                </Card>
            </section>

            {/* AI Smart Progression Preview */}
            <section>
                <Card className="p-6 rounded-[2rem] border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden group">
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/30 animate-pulse">
                            <FlameIcon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary leading-none mb-1">AI Copilot</h3>
                            <p className="text-sm font-bold leading-tight">Sugestão de Carga: Aumente 2kg no Supino hoje. Você está estagnado há 2 semanas.</p>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <StatCard
                    icon={<TrendingUpIcon className="w-5 h-5" />}
                    label="Volume Semanal"
                    value="45k kg"
                    trend="+12%"
                />
                <StatCard
                    icon={<TrophyIcon className="w-5 h-5" />}
                    label="Série de Dias"
                    value="5 dias"
                    trend="Novo Record!"
                />
            </div>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold tracking-tight text-white">Histórico Recente</h3>
                    <Link href="/student/history" className="text-xs font-bold text-primary uppercase tracking-widest">Ver Todos</Link>
                </div>

                <div className="space-y-3">
                    <HistoryItem date="22 Fev" name="Treino C - Pernas" status="Concluído" />
                    <HistoryItem date="20 Fev" name="Treino B - Costas" status="Concluído" />
                </div>
            </section>
        </div>
    );
}

function StatCard({ icon, label, value, trend }: any) {
    return (
        <Card className="p-5 rounded-3xl border-border/50 bg-card/40 flex flex-col gap-3">
            <div className="bg-muted w-10 h-10 rounded-xl flex items-center justify-center text-primary">
                {icon}
            </div>
            <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase text-muted-foreground">{label}</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">{value}</span>
                </div>
                <span className="text-[10px] font-bold text-primary">{trend}</span>
            </div>
        </Card>
    )
}

function HistoryItem({ date, name, status }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-muted/20 border border-border/50 rounded-2xl">
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-background border border-border/50 rounded-xl">
                    <span className="text-[10px] font-black text-muted-foreground uppercase">{date.split(' ')[1]}</span>
                    <span className="text-sm font-black leading-none">{date.split(' ')[0]}</span>
                </div>
                <div>
                    <h4 className="font-bold text-sm tracking-tight">{name}</h4>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{status}</span>
                </div>
            </div>
            <CheckCircle2Icon className="w-5 h-5 text-primary" />
        </div>
    )
}
