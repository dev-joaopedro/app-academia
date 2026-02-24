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
import { getStudentWorkoutsAction } from "@/app/actions/workouts";

export default function StudentDashboard() {
    const router = useRouter();
    const { startWorkout, isActive } = useWorkoutStore();
    const [user, setUser] = useState<any>(null);
    const [workouts, setWorkouts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const [profile, assignedWorkouts] = await Promise.all([
                getCurrentUserAction(),
                getStudentWorkoutsAction()
            ]);
            setUser(profile);
            setWorkouts(assignedWorkouts);
            setLoading(false);
        }
        loadData();
    }, []);

    const handleStart = (workout: any) => {
        const formattedExercises = workout.exercises.map((ex: any, idx: number) => ({
            id: ex.id || idx,
            name: ex.name,
            target: `${ex.sets}x${ex.reps}`,
            sets: Array.from({ length: ex.sets }, () => ({
                weight: "",
                reps: ex.reps,
                completed: false
            }))
        }));

        startWorkout(workout.name, formattedExercises);
        router.push("/student/workout/active");
    };

    const currentWorkout = workouts[0]; // Pegamos o primeiro como destaque por enquanto

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
                {loading ? (
                    <Card className="h-64 animate-pulse bg-muted/20 rounded-[2.5rem]" />
                ) : currentWorkout ? (
                    <Card className="relative overflow-hidden border-2 border-primary/20 bg-primary/5 rounded-[2.5rem] p-8 space-y-6">
                        <div className="relative z-10 flex flex-col gap-4">
                            <Badge className="w-fit bg-primary text-primary-foreground font-black px-4 py-1 rounded-full uppercase text-[10px] tracking-widest">
                                Sugestão Atual
                            </Badge>
                            <div className="space-y-1">
                                <h2 className="text-3xl font-black tracking-tight leading-none uppercase">
                                    {isActive ? "Sessão Ativa" : currentWorkout.name}
                                </h2>
                                <p className="text-muted-foreground font-bold">{currentWorkout.description || "Treino atribuído pelo seu professor"}</p>
                            </div>

                            <div className="flex items-center gap-6 mt-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground font-black uppercase">Exercícios</span>
                                    <span className="text-xl font-bold">{currentWorkout.exercises.length}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground font-black uppercase">Professor</span>
                                    <span className="text-xl font-bold">{currentWorkout.trainer_name.split(' ')[0]}</span>
                                </div>
                            </div>

                            <Button
                                onClick={isActive ? () => router.push("/student/workout/active") : () => handleStart(currentWorkout)}
                                className="h-16 rounded-2xl text-lg font-black shadow-lg shadow-primary/20 mt-4 group"
                            >
                                {isActive ? "VOLTAR AO TREINO" : "INICIAR TREINO"}
                                <PlayIcon className="ml-2 w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                            </Button>
                        </div>
                        <FlameIcon className="absolute -right-8 -bottom-8 w-48 h-48 text-primary/10 -rotate-12" />
                    </Card>
                ) : (
                    <Card className="p-12 text-center rounded-[2.5rem] bg-muted/10 border-dashed border-2 border-border/50">
                        <p className="text-muted-foreground font-medium">Nenhum treino atribuído ainda. <br />Aguarde o seu professor.</p>
                    </Card>
                )}
            </section>

            {/* Quick Stats Grid - Mantemos a estrutura mas removemos os dados fixos "mágicos" */}
            <div className="grid grid-cols-2 gap-4">
                <StatCard
                    icon={<TrendingUpIcon className="w-5 h-5" />}
                    label="Volume"
                    value="--"
                    trend="Em breve"
                />
                <StatCard
                    icon={<TrophyIcon className="w-5 h-5" />}
                    label="Sequência"
                    value="--"
                    trend="Em breve"
                />
            </div>

            {workouts.length > 1 && (
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold tracking-tight text-white">Outros Treinos</h3>
                    </div>

                    <div className="space-y-3">
                        {workouts.slice(1).map((w) => (
                            <div key={w.id} className="flex items-center justify-between p-4 bg-muted/20 border border-border/50 rounded-2xl">
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm tracking-tight">{w.name}</h4>
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{w.trainer_name}</span>
                                </div>
                                <Button size="sm" onClick={() => handleStart(w)} className="rounded-xl h-8 px-4 font-bold">Iniciar</Button>
                            </div>
                        ))}
                    </div>
                </section>
            )}
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
