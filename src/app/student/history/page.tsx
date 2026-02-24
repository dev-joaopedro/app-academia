"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeftIcon, CalendarDaysIcon, TimerIcon, FlameIcon } from "lucide-react";
import Link from "next/link";

const HISTORY_MOCK = [
    { id: 1, date: "24 Fev", name: "Treino A - Peito", volume: "1,240 kg", duration: "45 min", sets: 24 },
    { id: 2, date: "22 Fev", name: "Treino C - Pernas", volume: "3,800 kg", duration: "62 min", sets: 32 },
    { id: 3, date: "21 Fev", name: "Treino B - Costas", volume: "2,100 kg", duration: "55 min", sets: 28 },
    { id: 4, date: "19 Fev", name: "Treino A - Peito", volume: "1,180 kg", duration: "42 min", sets: 23 },
];

export default function HistoryPage() {
    return (
        <div className="flex flex-col gap-6 px-6 py-6 pb-24">
            <div className="flex items-center gap-4">
                <Link href="/student/dashboard" className="w-10 h-10 rounded-full bg-muted border border-border/50 flex items-center justify-center">
                    <ChevronLeftIcon className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-black tracking-tighter uppercase">Histórico</h1>
            </div>

            <div className="flex flex-col gap-4">
                {HISTORY_MOCK.map((item) => (
                    <Card key={item.id} className="p-5 rounded-[2rem] border-border/50 bg-card/40 backdrop-blur-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/20 p-2.5 rounded-xl text-primary font-black text-xs uppercase text-center min-w-[50px]">
                                    {item.date.split(' ')[1]}<br />{item.date.split(' ')[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                                    <Badge variant="secondary" className="text-[10px] font-bold h-4 px-1.5 uppercase tracking-widest bg-muted/50 rounded-lg">Hipertrofia</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-background/50 p-3 rounded-2xl flex flex-col items-center">
                                <FlameIcon className="w-4 h-4 text-orange-500 mb-1" />
                                <span className="text-[10px] text-muted-foreground font-black uppercase">Volume</span>
                                <span className="text-sm font-bold">{item.volume}</span>
                            </div>
                            <div className="bg-background/50 p-3 rounded-2xl flex flex-col items-center">
                                <TimerIcon className="w-4 h-4 text-blue-500 mb-1" />
                                <span className="text-[10px] text-muted-foreground font-black uppercase">Tempo</span>
                                <span className="text-sm font-bold">{item.duration}</span>
                            </div>
                            <div className="bg-background/50 p-3 rounded-2xl flex flex-col items-center">
                                <CalendarDaysIcon className="w-4 h-4 text-primary mb-1" />
                                <span className="text-[10px] text-muted-foreground font-black uppercase">Séries</span>
                                <span className="text-sm font-bold">{item.sets}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
