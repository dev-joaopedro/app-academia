"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    UsersIcon, DumbbellIcon, PlusIcon, SearchIcon,
    TrendingUpIcon, ActivityIcon, CalendarIcon,
    ArrowRightIcon, XIcon, ChevronRightIcon,
    PhoneIcon, MailIcon, ClipboardListIcon, EditIcon,
    Trash2Icon, Edit2Icon
} from "lucide-react";
import Link from "next/link";
import { useTrainerStore, Student } from "@/lib/trainer-store";
import { useEffect } from "react";

export default function TrainerDashboard() {
    const {
        students,
        loading,
        fetchStudents,
        addStudent,
        updateStudent,
        deleteStudent,
        removeWorkoutFromStudent,
        updateStudentWorkoutName
    } = useTrainerStore();

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [showNewStudentModal, setShowNewStudentModal] = useState(false);
    const [newStudentName, setNewStudentName] = useState("");
    const [newStudentEmail, setNewStudentEmail] = useState("");
    const [toast, setToast] = useState<string | null>(null);
    const [isEditingStudent, setIsEditingStudent] = useState(false);
    const [editingWorkout, setEditingWorkout] = useState<{ idx: number; name: string } | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddStudent = async () => {
        if (!newStudentName.trim()) return;
        const success = await addStudent({
            fullName: newStudentName,
            email: newStudentEmail || `${newStudentName.toLowerCase().replace(/ /g, '.')}@email.com`,
        });

        if (success) {
            setNewStudentName("");
            setNewStudentEmail("");
            setShowNewStudentModal(false);
            showToast(`${newStudentName} adicionado com sucesso!`);
        } else {
            showToast("Erro ao adicionar aluno.");
        }
    };

    const handleDeleteStudent = async (id: string) => {
        if (confirm("Deseja realmente excluir este aluno? Todos os dados serão perdidos.")) {
            const success = await deleteStudent(id);
            if (success) {
                setSelectedStudent(null);
                showToast("Aluno excluído com sucesso.");
            } else {
                showToast("Erro ao excluir aluno.");
            }
        }
    };

    const handleDeleteWorkout = (workoutIndex: number) => {
        if (!selectedStudent) return;
        removeWorkoutFromStudent(selectedStudent.id, workoutIndex);

        // Atualiza a ficha aberta com os dados mais recentes do store
        const updatedStudent = useTrainerStore.getState().students.find(s => s.id === selectedStudent.id);
        if (updatedStudent) setSelectedStudent(updatedStudent);

        showToast("Treino excluído com sucesso!");
    };

    const handleSaveStudent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedStudent) return;

        const formData = new FormData(e.currentTarget);
        const updatedData = {
            name: formData.get("name") as string,
            age: parseInt(formData.get("age") as string) || 0,
            weight: (formData.get("weight") as string) + "kg",
            email: formData.get("email") as string,
            goal: formData.get("goal") as string,
        };

        const success = await updateStudent(selectedStudent.id, updatedData);
        if (success) {
            setSelectedStudent({ ...selectedStudent, ...updatedData });
            setIsEditingStudent(false);
            showToast("Dados atualizados com sucesso!");
        } else {
            showToast("Erro ao atualizar dados.");
        }
    };

    const handleRenameWorkout = () => {
        if (!selectedStudent || !editingWorkout) return;
        updateStudentWorkoutName(selectedStudent.id, editingWorkout.idx, editingWorkout.name);

        // Atualiza a ficha aberta
        const updatedStudent = useTrainerStore.getState().students.find(s => s.id === selectedStudent.id);
        if (updatedStudent) setSelectedStudent(updatedStudent);

        setEditingWorkout(null);
        showToast("Nome do treino atualizado!");
    };

    return (
        <div className="flex flex-col gap-6 px-6 py-6 pb-24">
            {/* Metrics */}
            <section className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-primary/5 border-primary/20 flex flex-col gap-2 rounded-2xl">
                    <div className="bg-primary/20 w-10 h-10 rounded-xl flex items-center justify-center text-primary">
                        <UsersIcon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter">{students.filter(s => s.status === "Ativo").length}</span>
                    <span className="text-xs text-muted-foreground font-bold uppercase">Alunos Ativos</span>
                </Card>
                <Card className="p-4 bg-accent/5 border-border/50 flex flex-col gap-2 rounded-2xl">
                    <div className="bg-secondary w-10 h-10 rounded-xl flex items-center justify-center text-foreground">
                        <ActivityIcon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter">8</span>
                    <span className="text-xs text-muted-foreground font-bold uppercase">Treinos Hoje</span>
                </Card>
            </section>

            {/* AI Insight */}
            <Card className="p-5 rounded-[2rem] border-2 border-primary/10 bg-muted/20">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-2.5 rounded-xl text-primary">
                        <ActivityIcon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">AI Insight</h3>
                        <p className="text-sm font-bold leading-tight">
                            {students.length > 0
                                ? `${students[0].name} baixou o volume em 20% esta semana. Risco de overtraining detectado.`
                                : "Acompanhe o progresso dos seus alunos aqui em tempo real."}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Alunos */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight">Meus Alunos</h2>
                    <Button
                        size="sm"
                        className="rounded-xl h-10 px-4 bg-primary text-primary-foreground font-bold"
                        onClick={() => setShowNewStudentModal(true)}
                    >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Novo Aluno
                    </Button>
                </div>

                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar aluno..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-12 pl-10 rounded-xl border-2 bg-muted/30 border-transparent focus:border-primary/30"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-20 w-full bg-muted/20 animate-pulse rounded-2xl border border-border/20" />
                            ))}
                        </div>
                    ) : filtered.map(student => (
                        <button
                            key={student.id}
                            onClick={() => setSelectedStudent(student)}
                            className="w-full text-left"
                        >
                            <Card className="p-4 rounded-2xl border-border/40 hover:border-primary/40 transition-all active:scale-[0.98]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                                            {student.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{student.name}</h4>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <CalendarIcon className="w-3 h-3" />
                                                <span>{student.lastWorkout}</span>
                                                <span>·</span>
                                                <span className="text-primary font-bold">{student.plan}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={student.status === "Ativo" ? "default" : "secondary"} className="rounded-lg">
                                            {student.status}
                                        </Badge>
                                        <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                </div>
                            </Card>
                        </button>
                    ))}
                    {filtered.length === 0 && (
                        <p className="text-center text-muted-foreground py-8 text-sm">Nenhum aluno encontrado.</p>
                    )}
                </div>
            </section>

            {/* Biblioteca & Modelos */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight">Biblioteca & Modelos</h2>
                <div className="grid grid-cols-1 gap-3">
                    <Link href="/trainer/workouts">
                        <Button variant="outline" className="w-full h-16 justify-between px-6 rounded-2xl border-2 group">
                            <div className="flex items-center gap-3">
                                <DumbbellIcon className="w-5 h-5 text-primary" />
                                <span className="font-bold">Modelos de Treino</span>
                            </div>
                            <ArrowRightIcon className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                    <Link href="/trainer/exercises">
                        <Button variant="outline" className="w-full h-16 justify-between px-6 rounded-2xl border-2 group">
                            <div className="flex items-center gap-3">
                                <TrendingUpIcon className="w-5 h-5 text-primary" />
                                <span className="font-bold">Biblioteca de Exercícios</span>
                            </div>
                            <ArrowRightIcon className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-foreground text-background px-5 py-3 rounded-2xl text-sm font-bold shadow-xl z-50 whitespace-nowrap">
                    {toast}
                </div>
            )}

            {/* Sheet: Detalhes do Aluno */}
            {selectedStudent && (
                <div className="fixed inset-0 pt-16 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center" onClick={() => setSelectedStudent(null)}>
                    <div
                        className="w-full max-w-md bg-background rounded-t-[2.5rem] p-6 pb-12 space-y-5 max-h-[calc(100vh-4rem)] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-lg">
                                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h2 className="text-xl font-black">{selectedStudent.name}</h2>
                                    <Badge variant={selectedStudent.status === "Ativo" ? "default" : "secondary"} className="rounded-lg text-xs">
                                        {selectedStudent.status} · {selectedStudent.plan}
                                    </Badge>
                                </div>
                            </div>
                            <button onClick={() => setSelectedStudent(null)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="grid grid-cols-3 gap-3">
                            <InfoBox label="Idade" value={selectedStudent.age ? `${selectedStudent.age} anos` : "—"} />
                            <InfoBox label="Peso" value={selectedStudent.weight} />
                            <InfoBox label="Objetivo" value={selectedStudent.goal} />
                        </div>

                        {/* Contato */}
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Contato</p>
                            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl">
                                <MailIcon className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">{selectedStudent.email}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl">
                                <PhoneIcon className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">{selectedStudent.phone}</span>
                            </div>
                        </div>

                        {/* Treinos */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Treinos Atuais</p>
                            {selectedStudent.workouts.length > 0 ? (
                                selectedStudent.workouts.map((treino, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/30 group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                <ClipboardListIcon className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-sm tracking-tight">{treino}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary"
                                                onClick={() => setEditingWorkout({ idx, name: treino })}
                                            >
                                                <Edit2Icon className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
                                                onClick={() => {
                                                    if (confirm(`Excluir ${treino}?`)) {
                                                        handleDeleteWorkout(idx);
                                                    }
                                                }}
                                            >
                                                <Trash2Icon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-muted-foreground text-center py-4 italic">Nenhum treino atribuído.</p>
                            )}
                        </div>

                        {/* Ações */}
                        <div className="flex gap-3 pt-2">
                            <Button
                                variant="outline"
                                className="flex-1 h-12 rounded-2xl font-bold border-2"
                                onClick={() => setIsEditingStudent(true)}
                            >
                                <EditIcon className="w-4 h-4 mr-2" />
                                Editar Aluno
                            </Button>
                            <Link href="/trainer/workouts/new" className="flex-1">
                                <Button className="w-full h-12 rounded-2xl font-bold">
                                    <DumbbellIcon className="w-4 h-4 mr-2" />
                                    Novo Treino
                                </Button>
                            </Link>
                        </div>
                        <Button
                            variant="link"
                            className="w-full text-destructive text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100"
                            onClick={() => handleDeleteStudent(selectedStudent.id)}
                        >
                            Excluir Aluno Completo
                        </Button>
                    </div>
                </div>
            )}

            {/* Modal: Editar Aluno */}
            {isEditingStudent && selectedStudent && (
                <div className="fixed inset-0 pt-16 bg-black/60 backdrop-blur-sm z-[110] flex items-end justify-center" onClick={() => setIsEditingStudent(false)}>
                    <div className="w-full max-w-md bg-background rounded-t-[2.5rem] p-6 pb-12 space-y-6 animate-in slide-in-from-bottom duration-300" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase tracking-tight">Editar Aluno</h2>
                            <button onClick={() => setIsEditingStudent(false)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveStudent} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest ml-1">Nome Completo</label>
                                    <Input name="name" defaultValue={selectedStudent.name} className="h-12 rounded-xl border-2 focus:border-primary/50" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest ml-1">Idade</label>
                                        <Input name="age" defaultValue={selectedStudent.age.toString()} type="number" className="h-12 rounded-xl border-2 focus:border-primary/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest ml-1">Peso (kg)</label>
                                        <Input name="weight" defaultValue={selectedStudent.weight.replace('kg', '')} type="number" className="h-12 rounded-xl border-2 focus:border-primary/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest ml-1">E-mail</label>
                                    <Input name="email" defaultValue={selectedStudent.email} type="email" className="h-12 rounded-xl border-2 focus:border-primary/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest ml-1">Objetivo</label>
                                    <Input name="goal" defaultValue={selectedStudent.goal} className="h-12 rounded-xl border-2 focus:border-primary/50" />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" className="flex-1 h-12 rounded-2xl font-bold" onClick={() => setIsEditingStudent(false)}>
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 h-12 rounded-2xl font-bold bg-primary text-primary-foreground"
                                >
                                    Salvar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Novo Aluno */}
            {showNewStudentModal && (
                <div className="fixed inset-0 pt-16 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center" onClick={() => setShowNewStudentModal(false)}>
                    <div className="w-full max-w-md bg-background rounded-t-[2.5rem] p-6 pb-12 space-y-5" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase">Novo Aluno</h2>
                            <button onClick={() => setShowNewStudentModal(false)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-[11px] font-black uppercase text-muted-foreground">Nome completo *</label>
                                <Input
                                    placeholder="Ex: João Silva"
                                    value={newStudentName}
                                    onChange={e => setNewStudentName(e.target.value)}
                                    className="h-12 rounded-xl border-2"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-black uppercase text-muted-foreground">E-mail</label>
                                <Input
                                    placeholder="joao@email.com"
                                    type="email"
                                    value={newStudentEmail}
                                    onChange={e => setNewStudentEmail(e.target.value)}
                                    className="h-12 rounded-xl border-2"
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full h-14 rounded-2xl font-bold text-base"
                            onClick={handleAddStudent}
                            disabled={!newStudentName.trim()}
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Adicionar Aluno
                        </Button>
                    </div>
                </div>
            )}

            {/* Modal: Editar Nome do Treino */}
            {editingWorkout && (
                <div className="fixed inset-0 pt-16 bg-black/60 backdrop-blur-sm z-[120] flex items-center justify-center p-6" onClick={() => setEditingWorkout(null)}>
                    <Card className="w-full max-w-sm p-6 space-y-4 rounded-3xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h3 className="font-black uppercase text-sm tracking-widest">Editar Nome do Treino</h3>
                            <button onClick={() => setEditingWorkout(null)}><XIcon className="w-4 h-4" /></button>
                        </div>
                        <Input
                            value={editingWorkout.name}
                            onChange={e => setEditingWorkout({ ...editingWorkout, name: e.target.value })}
                            className="h-12 rounded-xl border-2"
                        />
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setEditingWorkout(null)}>Cancelar</Button>
                            <Button className="flex-1 rounded-xl" onClick={handleRenameWorkout}>Salvar</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

function InfoBox({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-muted/20 rounded-2xl p-3 text-center">
            <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">{label}</p>
            <p className="font-bold text-sm leading-tight">{value}</p>
        </div>
    );
}
