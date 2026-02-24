"use client";

import { Card } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from "recharts";
import { TrendingUpIcon, ActivityIcon, WeightIcon, TargetIcon } from "lucide-react";

const DATA = [
    { name: "Seg", volume: 2100 },
    { name: "Ter", volume: 0 },
    { name: "Qua", volume: 3800 },
    { name: "Qui", volume: 0 },
    { name: "Sex", volume: 2400 },
    { name: "Sab", volume: 1800 },
    { name: "Dom", volume: 0 },
];

export default function ProgressPage() {
    return (
        <div className="flex flex-col gap-6 px-6 py-6 pb-24">
            <h1 className="text-3xl font-black tracking-tighter uppercase">Evolução</h1>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
                <MetricBox icon={<TrendingUpIcon className="w-4 h-4" />} label="Carga Total" value="+8.2%" color="text-primary" />
                <MetricBox icon={<TargetIcon className="w-4 h-4" />} label="Peso Médio" value="84.5 kg" color="text-white" />
            </div>

            {/* Main Chart Card */}
            <Card className="p-6 rounded-[2.5rem] bg-card/40 border-border/50 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-black uppercase text-xs tracking-widest text-muted-foreground">Volume de Treino (kg)</h3>
                    <Badge className="bg-primary/20 text-primary border-none text-[10px] font-black tracking-widest px-3">ÚLTIMOS 7 DIAS</Badge>
                </div>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DATA}>
                            <defs>
                                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#d9f99d" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#d9f99d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#111',
                                    borderRadius: '16px',
                                    border: '1px solid #333',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="volume"
                                stroke="#d9f99d"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorVolume)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Secondary Analysis */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight">Análise por Músculo</h3>
                <div className="flex flex-col gap-3">
                    <MuscleProgress muscle="Peitoral" percentage={85} />
                    <MuscleProgress muscle="Quadríceps" percentage={62} />
                    <MuscleProgress muscle="Costas" percentage={45} />
                </div>
            </section>
        </div>
    );
}

function MetricBox({ icon, label, value, color }: any) {
    return (
        <div className="p-5 p-4 bg-muted/20 border border-border/50 rounded-3xl space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
                {icon}
                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <span className={`text-xl font-black italic tracking-tighter ${color}`}>{value}</span>
        </div>
    )
}

function MuscleProgress({ muscle, percentage }: any) {
    return (
        <Card className="p-4 rounded-2xl bg-muted/10 border-border/40 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                <span>{muscle}</span>
                <span className="text-primary">{percentage}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
            </div>
        </Card>
    )
}

import { Badge } from "@/components/ui/badge";
