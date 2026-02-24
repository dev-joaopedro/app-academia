"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    PlusIcon,
    Trash2Icon,
    GripVerticalIcon,
    ChevronLeftIcon,
    SaveIcon,
    SearchIcon,
    XIcon,
    CheckCircleIcon,
    UsersIcon,
    ArrowRightIcon
} from "lucide-react";
import Link from "next/link";
import { Exercise } from "@/lib/exercises-db";
import { getExercisesAction } from "@/app/actions/exercises";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTrainerStore } from "@/lib/trainer-store";
import { getCurrentUserAction } from "@/app/actions/auth";

export default function WorkoutBuilder() {
    const { students, saveWorkoutModel } = useTrainerStore();
    const [workoutName, setWorkoutName] = useState("");
    const [exercises, setExercises] = useState<any[]>([]);
    const [showPicker, setShowPicker] = useState(false);
    const [showStudentPicker, setShowStudentPicker] = useState(false);
    const [pickerSearch, setPickerSearch] = useState("");
    const [exercisesList, setExercisesList] = useState<Exercise[]>([]);
    const [loadingExercises, setLoadingExercises] = useState(true);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            const [exList, profile] = await Promise.all([
                getExercisesAction(),
                getCurrentUserAction()
            ]);
            setExercisesList(exList as Exercise[]);
            setLoadingExercises(false);
        }
        load();
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const filteredPicker = exercisesList.filter(ex =>
        ex.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
        ex.muscle.toLowerCase().includes(pickerSearch.toLowerCase())
    );

    const addExercise = (ex: Exercise) => {
        setExercises([...exercises, {
            localId: Date.now(), // ID único apenas para o React (key)
            id: ex.id,           // UUID REAL para o banco de dados
            name: ex.name,
            sets: 3,
            reps: "12",
            rest: "60"
        }]);
        setShowPicker(false);
        setPickerSearch("");
    };

    const removeExercise = (idx: number) => {
        setExercises(exercises.filter((_, i) => i !== idx));
    };

    const handleSaveOnly = async () => {
        if (!workoutName.trim()) {
            showToast("Dê um nome ao treino!");
            return;
        }
        if (exercises.length === 0) {
            showToast("Adicione pelo menos um exercício!");
            return;
        }

        const profile = await getCurrentUserAction();
        if (!profile || profile.role !== 'trainer') {
            showToast("Erro: Apenas professores podem salvar treinos.");
            return;
        }

        const res = await saveWorkoutModel(profile.id, workoutName, exercises);

        if (res) {
            showToast(`Modelo "${workoutName}" salvo com sucesso!`);
            setTimeout(() => {
                window.location.href = "/trainer/workouts";
            }, 1500);
        } else {
            showToast("Erro ao salvar no banco de dados.");
        }
    };

    const handleOpenAssignModal = () => {
        if (!workoutName.trim() || exercises.length === 0) {
            handleSaveOnly(); // Dispara as validações
            return;
        }
        setShowStudentPicker(true);
    };

    const assignToStudent = async (studentId: string, studentName: string) => {
        const profile = await getCurrentUserAction();
        if (!profile) {
            showToast("Sessão expirada. Faça login novamente.");
            return;
        }

        const success = await saveWorkoutModel(profile.id, workoutName, exercises);

        if (success) {
            showToast(`Treino "${workoutName}" atribuído a ${studentName}!`);
            setShowStudentPicker(false);
            setTimeout(() => {
                window.location.href = "/trainer/dashboard";
            }, 1500);
        } else {
            showToast("Erro ao atribuir treino.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen pb-24">
            {/* Header Contexto */}
            <div className="px-6 py-6 space-y-4">
                <Link href="/trainer/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                    <ChevronLeftIcon className="w-4 h-4" />
                    Voltar
                </Link>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black tracking-tight uppercase">Novo Treino</h2>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-background text-foreground font-bold rounded-xl px-4 border-2"
                            onClick={handleOpenAssignModal}
                        >
                            <UsersIcon className="w-4 h-4 mr-2" />
                            Atribuir
                        </Button>
                        <Button
                            size="sm"
                            className="bg-primary text-primary-foreground font-bold rounded-xl px-4"
                            onClick={handleSaveOnly}
                        >
                            <SaveIcon className="w-4 h-4 mr-2" />
                            Salvar
                        </Button>
                    </div>
                </div>
                <Input
                    placeholder="Ex: Treino A - Peitorais"
                    value={workoutName}
                    onChange={e => setWorkoutName(e.target.value)}
                    className="h-12 text-lg font-bold border-2 rounded-xl focus:border-primary/50"
                />
            </div>

            {/* Exercises List */}
            <div className="px-6 flex-1 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-black text-muted-foreground uppercase text-[10px] tracking-widest">Exercícios do Treino</h3>
                    <span className="text-[10px] text-primary font-black uppercase">{exercises.length} Selecionados</span>
                </div>

                <div className="space-y-3">
                    {exercises.length === 0 && (
                        <div className="text-center py-10 border-2 border-dashed border-border/50 rounded-[2rem]">
                            <p className="text-sm text-muted-foreground font-bold">Nenhum exercício adicionado.</p>
                        </div>
                    )}
                    {exercises.map((ex, index) => (
                        <Card key={ex.localId} className="p-4 rounded-3xl border-border/50 bg-card/40 backdrop-blur-sm relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-4">
                                <GripVerticalIcon className="w-5 h-5 text-muted-foreground/30 cursor-grab" />
                                <div className="flex-1">
                                    <h4 className="font-black text-base">{index + 1}. {ex.name}</h4>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive/50 hover:text-destructive h-8 w-8 rounded-full"
                                    onClick={() => removeExercise(index)}
                                >
                                    <Trash2Icon className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-1 text-center">
                                    <span className="text-[10px] font-black uppercase text-muted-foreground">Séries</span>
                                    <Input type="number" defaultValue={ex.sets} className="h-10 text-center rounded-xl bg-background border-border" />
                                </div>
                                <div className="space-y-1 text-center">
                                    <span className="text-[10px] font-black uppercase text-muted-foreground">Reps</span>
                                    <Input defaultValue={ex.reps} className="h-10 text-center rounded-xl bg-background border-border" />
                                </div>
                                <div className="space-y-1 text-center">
                                    <span className="text-[10px] font-black uppercase text-muted-foreground">Descanso</span>
                                    <div className="relative">
                                        <Input defaultValue={ex.rest} className="h-10 text-center rounded-xl bg-background border-border" />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">s</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Button
                    variant="outline"
                    className="w-full h-16 border-dashed border-2 rounded-3xl text-muted-foreground flex gap-2 font-bold hover:border-primary/50 hover:text-primary transition-all"
                    onClick={() => setShowPicker(true)}
                >
                    <PlusIcon className="w-5 h-5 text-primary" />
                    Adicionar Exercício da Biblioteca
                </Button>
            </div>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-foreground text-background px-5 py-3 rounded-2xl text-sm font-bold shadow-xl z-[150] whitespace-nowrap">
                    {toast}
                </div>
            )}

            {/* Picker Modal: Exercícios */}
            {showPicker && (
                <div className="fixed inset-0 pt-16 bg-black/60 backdrop-blur-sm z-[110] flex items-end justify-center" onClick={() => setShowPicker(false)}>
                    <div className="w-full max-w-md bg-background rounded-t-[2.5rem] p-6 pb-12 space-y-5 max-h-[calc(100vh-4rem)] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase">Escolher Exercício</h2>
                            <button onClick={() => setShowPicker(false)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar na biblioteca..."
                                value={pickerSearch}
                                onChange={(e) => setPickerSearch(e.target.value)}
                                className="h-12 pl-10 rounded-xl border-2"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            {filteredPicker.map(ex => (
                                <button
                                    key={ex.id}
                                    onClick={() => addExercise(ex)}
                                    className="w-full text-left p-3 rounded-2xl border-2 border-border/40 hover:border-primary/30 flex items-center justify-between group active:scale-[0.98] transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <CheckCircleIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm tracking-tight">{ex.name}</p>
                                            <p className="text-[10px] font-black uppercase text-muted-foreground">{ex.muscle}</p>
                                        </div>
                                    </div>
                                    <PlusIcon className="w-4 h-4 text-muted-foreground/30" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Escolher Aluno para Atribuir */}
            {showStudentPicker && (
                <div className="fixed inset-0 pt-16 bg-black/60 backdrop-blur-sm z-[120] flex items-end justify-center" onClick={() => setShowStudentPicker(false)}>
                    <div className="w-full max-w-md bg-background rounded-t-[2.5rem] p-6 pb-12 space-y-5" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase">Atribuir a Quem?</h2>
                            <button onClick={() => setShowStudentPicker(false)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {students.map(student => (
                                <button
                                    key={student.id}
                                    onClick={() => assignToStudent(student.id, student.name)}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-border/40 hover:border-primary/40 transition-all font-bold group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
