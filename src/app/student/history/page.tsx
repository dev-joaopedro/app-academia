import { getStudentHistoryAction } from "@/app/actions/student";
import { getCurrentUserAction } from "@/app/actions/auth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeftIcon, CalendarDaysIcon, TimerIcon, FlameIcon } from "lucide-react";
import Link from "next/link";
export default async function HistoryPage() {
    const user = await getCurrentUserAction();
    let history: any[] = [];
    if (user) {
        history = await getStudentHistoryAction(user.id);
    }

    // Função para calcular volume e séries
    const formatHistoryItem = (item: any) => {
        const details = item.details || [];
        let totalVolume = 0;
        let totalSets = 0;

        details.forEach((ex: any) => {
            if (ex.sets) {
                ex.sets.forEach((set: any) => {
                    if (set.completed) {
                        totalSets++;
                        const weight = parseFloat(set.weight) || 0;
                        const repsStr = ex.sets[0]?.reps || "10";
                        const reps = parseInt(repsStr.split('-')[0]) || 10;
                        totalVolume += weight * reps;
                    }
                });
            }
        });

        // Formatar data: "24 Fev"
        const date = new Date(item.completed_at);
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const month = monthNames[date.getMonth()];
        const formattedDate = `${day} ${month}`;

        // Formatar tempo
        const durationMins = Math.floor((item.duration_seconds || 0) / 60);

        return {
            id: item.id,
            date: formattedDate,
            name: item.workout_name,
            volume: totalVolume > 0 ? `${totalVolume} kg` : "—",
            duration: `${durationMins} min`,
            sets: totalSets,
        };
    };

    const formattedHistory = history.map(formatHistoryItem);

    return (
        <div className="flex flex-col gap-6 px-6 py-6 pb-24">
            <div className="flex items-center gap-4">
                <Link href="/student/dashboard" className="w-10 h-10 rounded-full bg-muted border border-border/50 flex items-center justify-center">
                    <ChevronLeftIcon className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-black tracking-tighter uppercase">Histórico</h1>
            </div>

            <div className="flex flex-col gap-4">
                {formattedHistory.length === 0 ? (
                    <div className="text-center text-muted-foreground mt-10">
                        Nenhum treino finalizado ainda.
                    </div>
                ) : (
                    formattedHistory.map((item: any) => (
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
                    ))
                )}
            </div>
        </div>
    );
}
