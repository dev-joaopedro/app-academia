"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    PlusIcon,
    ChevronLeftIcon,
    SearchIcon,
    DumbbellIcon,
    Trash2Icon,
    PlayIcon,
    UsersIcon,
    ArrowRightIcon
} from "lucide-react";
import Link from "next/link";
import { useTrainerStore } from "@/lib/trainer-store";

export default function WorkoutModels() {
    const { workoutModels, deleteWorkoutModel, students, addWorkoutToStudent } = useTrainerStore();
    const [search, setSearch] = useState("");
    const [assigningWorkout, setAssigningWorkout] = useState<string | null>(null);

    const filtered = workoutModels.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAssign = (studentId: number, studentName: string) => {
        if (!assigningWorkout) return;
        const model = workoutModels.find(m => m.id === assigningWorkout);
        if (model) {
            addWorkoutToStudent(studentId, model.name);
            alert(`Treino "${model.name}" atribuído a ${studentName}!`);
        }
        setAssigningWorkout(null);
    };

    return (
        <div className="flex flex-col min-h-screen pb-24">
            {/* Header */}
            <div className="px-6 py-6 space-y-4">
                <Link href="/trainer/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                    <ChevronLeftIcon className="w-4 h-4" />
                    Dashboard
                </Link>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black tracking-tight uppercase">Meus Modelos</h2>
                    <Link href="/trainer/workouts/new">
                        <Button size="sm" className="bg-primary text-primary-foreground font-bold rounded-xl px-4">
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Novo
                        </Button>
                    </Link>
                </div>
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar nos modelos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-12 pl-10 rounded-xl border-2"
                    />
                </div>
            </div>

            {/* Models List */}
            <div className="px-6 space-y-3">
                {filtered.map(model => (
                    <Card key={model.id} className="p-4 rounded-3xl border-border/50 bg-card/40 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <DumbbellIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base">{model.name}</h4>
                                    <p className="text-[10px] font-black uppercase text-muted-foreground">{model.exercises.length} Exercícios</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive/50 hover:text-destructive rounded-full"
                                    onClick={() => {
                                        if (confirm("Excluir este modelo?")) deleteWorkoutModel(model.id);
                                    }}
                                >
                                    <Trash2Icon className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="flex-1 h-10 rounded-xl font-bold text-xs"
                                onClick={() => setAssigningWorkout(model.id)}
                            >
                                <UsersIcon className="w-4 h-4 mr-2" />
                                Atribuir a Aluno
                            </Button>
                            <Button
                                className="flex-1 h-10 rounded-xl font-bold text-xs"
                                onClick={() => alert("Visualizar detalhes do modelo")}
                            >
                                <PlayIcon className="w-4 h-4 mr-2" />
                                Ver Treino
                            </Button>
                        </div>
                    </Card>
                ))}

                {filtered.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-border/50 rounded-[2.5rem]">
                        <p className="text-sm text-muted-foreground font-bold italic">Nenhum modelo salvo.</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black mt-2">Crie um novo treino para salvá-lo como modelo.</p>
                    </div>
                )}
            </div>

            {/* Modal: Escolher Aluno para Atribuir */}
            {assigningWorkout && (
                <div className="fixed inset-0 pt-16 bg-black/60 backdrop-blur-sm z-[120] flex items-end justify-center" onClick={() => setAssigningWorkout(null)}>
                    <div className="w-full max-w-md bg-background rounded-t-[2.5rem] p-6 pb-12 space-y-5" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase">Atribuir a Quem?</h2>
                            <button onClick={() => setAssigningWorkout(null)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground">
                                <PlusIcon className="w-4 h-4 rotate-45" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2">
                            {students.map(student => (
                                <button
                                    key={student.id}
                                    onClick={() => handleAssign(student.id, student.name)}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-border/40 hover:border-primary/40 transition-all font-bold group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-foreground">
                                            <UsersIcon className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <p>{student.name}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black">{student.workouts.length} Treinos Ativos</p>
                                        </div>
                                    </div>
                                    <ArrowRightIcon className="w-4 h-4 text-muted-foreground" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
