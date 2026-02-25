"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    CheckIcon,
    ChevronLeftIcon,
    PlayIcon,
    PauseIcon,
    RotateCcwIcon,
    InfoIcon,
    XIcon,
    ClockIcon,
    TimerIcon
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useWorkoutStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { finishWorkoutAction } from "@/app/actions/student";
import { getCurrentUserAction } from "@/app/actions/auth";

// Instruções por exercício
const EXERCISE_INSTRUCTIONS: Record<string, { description: string; tips: string[] }> = {
    default: {
        description: "Execute o movimento de forma controlada, mantendo a postura correta durante toda a amplitude.",
        tips: [
            "Respire fundo antes de cada repetição",
            "Mantenha o core ativado durante o exercício",
            "Não sacrifique a técnica pelo peso",
        ],
    },
    "Supino Reto com Barra": {
        description: "Deitado no banco, segure a barra com pegada ligeiramente maior que a largura dos ombros. Desça a barra até o peito de forma controlada e empurre de volta à posição inicial.",
        tips: [
            "Mantenha os pés firmes no chão",
            "Não deixe os cotovelos fecharem demais (90°)",
            "Contraia o peitoral no ponto de maior contração",
            "Inspire na descida, expire na subida",
        ],
    },
    "Supino Inclinado": {
        description: "Com o banco em 30-45°, desça a barra em direção à parte superior do peitoral. Foco no peitoral clavicular.",
        tips: [
            "Inclinação de 30° ativa mais o peitoral superior",
            "Mantenha os escapulares retraídos",
            "Não deixe o queixo avançar",
        ],
    },
    "Crucifixo": {
        description: "Com halteres, braços levemente flexionados, abra os braços lateralmente até sentir o alongamento do peitoral, depois feche voltando à posição inicial.",
        tips: [
            "Imagine abraçar uma árvore",
            "Mantenha a flexão dos cotovelos constante",
            "Desça até sentir o alongamento, não além",
            "Use um peso que permita controle total",
        ],
    },
};

function getInstructions(exerciseName: string) {
    return EXERCISE_INSTRUCTIONS[exerciseName] ?? {
        ...EXERCISE_INSTRUCTIONS.default,
        description: `Execute ${exerciseName} com controle e amplitude completa do movimento.`,
    };
}

function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function ActiveWorkout() {
    const router = useRouter();
    const {
        isActive,
        currentWorkoutName,
        exercises,
        restTimer,
        isResting,
        tickRest,
        resetRest,
        setResting,
        updateSet,
        finishWorkout,
    } = useWorkoutStore();

    const [workoutSeconds, setWorkoutSeconds] = useState(0);
    const [instructionsFor, setInstructionsFor] = useState<string | null>(null);
    const [showRestOverlay, setShowRestOverlay] = useState(false);
    const [isFinishing, setIsFinishing] = useState(false);

    // Redireciona se não há treino ativo
    useEffect(() => {
        if (!isActive && !currentWorkoutName) {
            router.push("/student/dashboard");
        }
    }, [isActive, currentWorkoutName, router]);

    // Cronômetro do descanso
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isResting && restTimer > 0) {
            interval = setInterval(() => { tickRest(); }, 1000);
        }
        // Fecha o overlay quando o tempo zera
        if (restTimer === 0 && showRestOverlay) {
            setShowRestOverlay(false);
        }
        return () => clearInterval(interval);
    }, [isResting, restTimer, tickRest, showRestOverlay]);

    // Cronômetro total do treino
    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            setWorkoutSeconds((s) => s + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isActive]);

    const completedSets = exercises.reduce(
        (acc, ex) => acc + ex.sets.filter((s) => s.completed).length,
        0
    );
    const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
    const progress = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

    const handleFinish = async () => {
        if (isFinishing) return;
        setIsFinishing(true);

        try {
            const user = await getCurrentUserAction();
            if (user && currentWorkoutName) {
                await finishWorkoutAction(user.id, currentWorkoutName, workoutSeconds, exercises);
            }
        } catch (error) {
            console.error("Failed to save workout", error);
        }

        finishWorkout();
        router.push("/student/dashboard");
    };

    if (!isActive) return null;

    const currentInstructions = instructionsFor ? getInstructions(instructionsFor) : null;

    return (
        <div className="flex flex-col min-h-screen bg-background pb-32">
            {/* Header do Treino */}
            <div className="px-6 py-6 bg-primary/10 border-b border-primary/20 space-y-4">
                <div className="flex items-center justify-between">
                    <Link
                        href="/student/dashboard"
                        className="w-10 h-10 rounded-full bg-background/50 border border-border/50 flex items-center justify-center"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </Link>
                    <div className="text-center">
                        <h1 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Sessão Ativa</h1>
                        <p className="font-bold tracking-tight">{currentWorkoutName}</p>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleFinish}
                        disabled={isFinishing}
                        className="text-destructive font-bold text-xs"
                    >
                        {isFinishing ? "SALVANDO..." : "SAIR"}
                    </Button>
                </div>

                {/* Cronômetro + Progresso */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <ClockIcon className="w-4 h-4" />
                        <span className="text-sm font-black tabular-nums">{formatTime(workoutSeconds)}</span>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">
                        {completedSets}/{totalSets} séries
                    </span>
                </div>

                <div className="space-y-1">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Lista de Exercícios */}
            <div className="flex flex-col gap-8 px-6 py-8">
                {exercises.map((ex) => (
                    <div key={ex.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black tracking-tight uppercase">{ex.name}</h2>
                                <button
                                    onClick={() => setInstructionsFor(ex.name)}
                                    className="flex items-center gap-1.5 text-primary/80 hover:text-primary transition-colors"
                                >
                                    <InfoIcon className="w-3.5 h-3.5" />
                                    <span className="text-[11px] font-black uppercase tracking-widest">Instruções</span>
                                </button>
                            </div>
                        </div>

                        <Card className="rounded-[2rem] border-2 border-border/50 overflow-hidden bg-card/30">
                            {/* Cabeçalho das colunas */}
                            <div className="px-4 pt-3 pb-1 flex items-center">
                                <span className="w-6 text-[10px] font-black text-muted-foreground uppercase">#</span>
                                <div className="flex gap-2 ml-4">
                                    <span className="w-20 text-[10px] font-black text-muted-foreground uppercase text-center">Peso (kg)</span>
                                    <span className="w-20 text-[10px] font-black text-muted-foreground uppercase text-center">Reps</span>
                                </div>
                            </div>

                            <div className="p-4 pt-2 space-y-3">
                                {ex.sets.map((set, sIdx) => (
                                    <div
                                        key={sIdx}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border transition-all",
                                            set.completed
                                                ? "bg-primary/10 border-primary/30"
                                                : "bg-muted/10 border-transparent"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-black italic text-muted-foreground w-4">
                                                {sIdx + 1}
                                            </span>
                                            <div className="flex gap-2 items-center">
                                                {/* Peso — editável */}
                                                <div className="flex flex-col items-center gap-1">
                                                    <input
                                                        type="number"
                                                        inputMode="decimal"
                                                        placeholder="0"
                                                        value={set.weight}
                                                        onChange={(e) =>
                                                            updateSet(ex.id, sIdx, { weight: e.target.value })
                                                        }
                                                        className="w-20 h-10 bg-background border border-border/50 rounded-xl text-center font-black text-base outline-none focus:border-primary transition-colors"
                                                    />
                                                </div>

                                                {/* Reps — somente leitura */}
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="w-20 h-10 bg-muted/40 border border-border/30 rounded-xl flex items-center justify-center font-black text-base text-foreground/80 select-none">
                                                        {set.reps || "—"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                const isCompleting = !set.completed;
                                                updateSet(ex.id, sIdx, { completed: isCompleting });
                                                if (isCompleting) {
                                                    resetRest(60);
                                                    setShowRestOverlay(true);
                                                } else {
                                                    setShowRestOverlay(false);
                                                }
                                            }}
                                            className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90",
                                                set.completed
                                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                                                    : "bg-muted text-muted-foreground/40"
                                            )}
                                        >
                                            <CheckIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Overlay de Descanso Automático */}
            {showRestOverlay && restTimer > 0 && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex flex-col items-center justify-center gap-6 max-w-md mx-auto">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Descansando</p>
                    <div className="relative flex items-center justify-center">
                        <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="4" className="text-primary/20" />
                            <circle
                                cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="4"
                                className="text-primary transition-all duration-1000"
                                strokeDasharray={`${2 * Math.PI * 44}`}
                                strokeDashoffset={`${2 * Math.PI * 44 * (1 - restTimer / 60)}`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute text-center">
                            <span className="text-6xl font-black tabular-nums text-primary">{restTimer}</span>
                            <p className="text-xs text-muted-foreground font-bold">segundos</p>
                        </div>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">Prepare-se para a próxima série!</p>
                    <button
                        onClick={() => { setShowRestOverlay(false); setResting(false); }}
                        className="px-8 py-3 rounded-2xl border-2 border-border/50 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                    >
                        Pular Descanso
                    </button>
                </div>
            )}

            {/* Floating Timer (Descanso) */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 flex items-center gap-3 z-50">
                <Card
                    className={cn(
                        "flex-1 h-16 backdrop-blur-2xl border-2 rounded-2xl flex items-center px-6 gap-6 shadow-2xl transition-all",
                        isResting
                            ? "bg-primary/20 border-primary"
                            : "bg-background/80 border-border/50"
                    )}
                >
                    <TimerIcon className={cn("w-4 h-4", isResting ? "text-primary" : "text-muted-foreground")} />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Descanso</span>
                        <span
                            className={cn(
                                "text-2xl font-black italic tabular-nums leading-none",
                                isResting ? "text-primary" : "text-foreground"
                            )}
                        >
                            {Math.floor(restTimer / 60)}:{(restTimer % 60).toString().padStart(2, "0")}
                        </span>
                    </div>
                    <div className="flex gap-3 flex-1 justify-end">
                        <button
                            onClick={() => setResting(!isResting)}
                            className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center"
                        >
                            {isResting ? (
                                <PauseIcon className="w-4 h-4 fill-current" />
                            ) : (
                                <PlayIcon className="w-4 h-4 fill-current ml-0.5" />
                            )}
                        </button>
                        <button
                            onClick={() => resetRest(60)}
                            className="w-9 h-9 rounded-full bg-muted text-foreground flex items-center justify-center"
                        >
                            <RotateCcwIcon className="w-4 h-4" />
                        </button>
                    </div>
                </Card>
                <Button
                    onClick={handleFinish}
                    disabled={isFinishing}
                    className="h-16 px-6 rounded-2xl bg-foreground text-background font-black uppercase text-xs tracking-widest shadow-2xl"
                >
                    {isFinishing ? "Salvando..." : "Finalizar"}
                </Button>
            </div>

            {/* Modal de Instruções */}
            {instructionsFor && currentInstructions && (
                <div
                    className="fixed inset-0 pt-16 bg-black/70 backdrop-blur-sm z-[100] flex items-end justify-center"
                    onClick={() => setInstructionsFor(null)}
                >
                    <div
                        className="w-full max-w-md bg-background rounded-t-[2.5rem] p-6 pb-12 space-y-5 max-h-[calc(100vh-4rem)] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Instruções</p>
                                <h2 className="text-xl font-black tracking-tight uppercase">{instructionsFor}</h2>
                            </div>
                            <button
                                onClick={() => setInstructionsFor(null)}
                                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
                            >
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {currentInstructions.description}
                        </p>

                        <div className="space-y-2">
                            <p className="text-xs font-black uppercase tracking-widest text-foreground">💡 Dicas</p>
                            <ul className="space-y-2">
                                {currentInstructions.tips.map((tip, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm">
                                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        <span className="text-muted-foreground">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button
                            className="w-full h-12 rounded-2xl font-bold"
                            onClick={() => setInstructionsFor(null)}
                        >
                            Entendido!
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
