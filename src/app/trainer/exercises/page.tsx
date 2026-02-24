"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, DumbbellIcon, ChevronRightIcon, XIcon, CheckCircleIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Exercise } from "@/lib/exercises-db";
import { getExercisesAction } from "@/app/actions/exercises";
import { useEffect } from "react";

const CATEGORIES = ["Todos", "Peitoral", "Costas", "Pernas", "Braços", "Ombros", "Abdômen", "Compostos"];

export default function ExerciseLibrary() {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [search, setSearch] = useState("");
    const [selectedDetail, setSelectedDetail] = useState<Exercise | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const data = await getExercisesAction();
            setExercises(data as Exercise[]);
            setLoading(false);
        }
        load();
    }, []);

    const filtered = useMemo(() => {
        return exercises.filter(ex => {
            const matchCat = activeCategory === "Todos" || ex.muscle === activeCategory || ex.category === activeCategory;
            const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
                ex.muscle.toLowerCase().includes(search.toLowerCase());
            return matchCat && matchSearch;
        });
    }, [activeCategory, search, exercises]);

    const toggleSelect = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleCreateModel = () => {
        alert(`Criando modelo com ${selectedIds.length} exercícios!`);
        // Aqui redirecionaria para o builder com esses exercícios pré-selecionados
    };

    return (
        <div className="flex flex-col gap-5 px-6 py-6 pb-32">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black tracking-tight">Biblioteca</h1>
                    <p className="text-sm text-muted-foreground">{exercises.length} exercícios disponíveis</p>
                </div>
                {selectedIds.length > 0 && (
                    <Button
                        size="sm"
                        onClick={handleCreateModel}
                        className="bg-primary text-primary-foreground font-black rounded-xl px-4 animate-in zoom-in duration-300"
                    >
                        Criar Modelo ({selectedIds.length})
                    </Button>
                )}
            </div>

            {/* Busca */}
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar exercício ou músculo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-12 pl-10 rounded-xl border-2 bg-muted/30 border-transparent focus:border-primary/30"
                />
                {search && (
                    <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                        <XIcon className="w-4 h-4 text-muted-foreground" />
                    </button>
                )}
            </div>

            {/* Categorias */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all flex-shrink-0",
                            activeCategory === cat
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Lista */}
            <div className="flex flex-col gap-3">
                {loading ? (
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-24 w-full bg-muted/20 animate-pulse rounded-2xl border border-border/20" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <p className="text-center text-muted-foreground py-10 text-sm">Nenhum exercício encontrado.</p>
                ) : filtered.map((ex) => (
                    <div key={ex.id} className="relative group">
                        <button
                            onClick={() => setSelectedDetail(ex)}
                            className="w-full"
                        >
                            <Card className={cn(
                                "flex flex-row items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-[0.98] group/card",
                                selectedIds.includes(ex.id)
                                    ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                                    : "border-border/40 hover:border-primary/30"
                            )}>
                                {/* Icone à esquerda */}
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors flex-shrink-0",
                                    selectedIds.includes(ex.id) ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                                )}>
                                    <DumbbellIcon className="w-6 h-6" />
                                </div>

                                {/* Texto alinhado à esquerda */}
                                <div className="flex flex-col gap-1 items-start flex-1 overflow-hidden">
                                    <h4 className="font-bold text-base leading-tight text-left">{ex.name}</h4>
                                    <div className="flex gap-2 flex-wrap items-center">
                                        <Badge variant="outline" className="text-[10px] font-bold px-1.5 h-4 uppercase border-primary/20 bg-primary/10 text-primary">{ex.muscle}</Badge>
                                        <Badge variant="outline" className="text-[10px] font-bold px-1.5 h-4 uppercase bg-muted border-transparent text-muted-foreground">{ex.difficulty}</Badge>
                                    </div>
                                </div>

                                {/* Botão de seleção à direita */}
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSelect(ex.id, e);
                                    }}
                                    className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 cursor-pointer",
                                        selectedIds.includes(ex.id)
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    )}
                                >
                                    {selectedIds.includes(ex.id) ? <CheckCircleIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
                                </div>
                            </Card>
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal Detalhes */}
            {selectedDetail && (
                <div className="fixed inset-0 pt-16 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center" onClick={() => setSelectedDetail(null)}>
                    <div className="w-full max-w-md bg-background rounded-t-[2.5rem] p-6 pb-12 space-y-5 max-h-[calc(100vh-4rem)] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <DumbbellIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tight">{selectedDetail.name}</h2>
                                    <div className="flex gap-1.5 mt-1">
                                        <Badge variant="outline" className="text-[10px] font-bold border-primary/20 text-primary">{selectedDetail.muscle}</Badge>
                                        <Badge variant="outline" className="text-[10px] font-bold text-muted-foreground">{selectedDetail.difficulty}</Badge>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setSelectedDetail(null)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">{selectedDetail.description}</p>

                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary">💡 Dicas de execução</p>
                            {selectedDetail.tips.map((tip, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{tip}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-bold" onClick={() => setSelectedDetail(null)}>
                                Fechar
                            </Button>
                            <Button
                                className="flex-1 h-12 rounded-2xl font-bold"
                                onClick={(e) => {
                                    toggleSelect(selectedDetail.id, e as any);
                                    setSelectedDetail(null);
                                }}
                            >
                                {selectedIds.includes(selectedDetail.id) ? "Remover" : "Adicionar"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
