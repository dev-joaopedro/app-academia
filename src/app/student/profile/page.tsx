"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    UserIcon, SettingsIcon, LogOutIcon, BellIcon, ShieldIcon,
    ChevronRightIcon, XIcon, SunIcon, MoonIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/lib/theme-store";

export default function ProfilePage() {
    const router = useRouter();
    const { theme, toggleTheme } = useThemeStore();
    const [toast, setToast] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<"settings" | "notifications" | "privacy" | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleLogout = () => {
        router.push("/auth/login");
    };

    return (
        <div className="flex flex-col gap-6 px-6 py-6 pb-24 relative">
            <h1 className="text-3xl font-black tracking-tighter uppercase">Meu Perfil</h1>

            {/* Avatar Card */}
            <Card className="p-6 rounded-[2.5rem] bg-muted/20 border-border/50 flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground">
                    J
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold">João Silva</h2>
                    <p className="text-sm text-muted-foreground uppercase font-black tracking-widest">Aluno Premium</p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-2 font-bold px-6"
                    onClick={() => showToast("Edição de perfil em breve!")}
                >
                    Editar Perfil
                </Button>
            </Card>



            {/* Menu Items */}
            <div className="flex flex-col gap-2">
                <MenuButton icon={<SettingsIcon />} label="Configurações" onClick={() => setShowModal("settings")} />
                <MenuButton icon={<BellIcon />} label="Notificações" onClick={() => setShowModal("notifications")} />
                <MenuButton icon={<ShieldIcon />} label="Privacidade" onClick={() => setShowModal("privacy")} />
                <MenuButton icon={<LogOutIcon />} label="Sair" className="text-destructive" onClick={handleLogout} />
            </div>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-foreground text-background px-5 py-3 rounded-2xl text-sm font-bold shadow-xl z-50 whitespace-nowrap">
                    {toast}
                </div>
            )}

            {/* Modais */}
            {showModal && (
                <div className="fixed inset-0 pt-16 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center" onClick={() => setShowModal(null)}>
                    <div className="w-full max-w-md bg-background rounded-t-[2.5rem] p-6 pb-12 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-black uppercase tracking-tight">
                                {showModal === "settings" && "Configurações"}
                                {showModal === "notifications" && "Notificações"}
                                {showModal === "privacy" && "Privacidade"}
                            </h2>
                            <button onClick={() => setShowModal(null)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>

                        {showModal === "settings" && (
                            <div className="space-y-3">
                                <ToggleRow label="Modo Escuro" checked={theme === "dark"} onChange={toggleTheme} />
                                <ToggleRow label="Sons do app" />
                                <ToggleRow label="Vibração" defaultOn />
                                <p className="text-xs text-muted-foreground text-center pt-2">Mais configurações em breve</p>
                            </div>
                        )}
                        {showModal === "notifications" && (
                            <div className="space-y-3">
                                <ToggleRow label="Lembrete de treino" defaultOn />
                                <ToggleRow label="Novidades e updates" />
                                <ToggleRow label="Metas atingidas" defaultOn />
                            </div>
                        )}
                        {showModal === "privacy" && (
                            <div className="space-y-3">
                                <ToggleRow label="Perfil público" />
                                <ToggleRow label="Compartilhar progresso" />
                                <p className="text-xs text-muted-foreground text-center pt-2">Seus dados nunca são compartilhados sem sua autorização.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function MenuButton({ icon, label, className = "", onClick }: any) {
    return (
        <button onClick={onClick} className={`w-full flex items-center justify-between p-5 bg-card/40 border border-border/40 rounded-3xl transition-all active:scale-95 hover:bg-card/80 ${className}`}>
            <div className="flex items-center gap-4">
                <div className="text-muted-foreground">{icon}</div>
                <span className="font-bold">{label}</span>
            </div>
            <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
        </button>
    );
}

function ToggleRow({ label, defaultOn = false, checked, onChange }: { label: string; defaultOn?: boolean; checked?: boolean; onChange?: () => void }) {
    const [on, setOn] = useState(defaultOn);
    const isControlled = checked !== undefined;
    const active = isControlled ? checked : on;

    return (
        <div className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
            <span className="font-semibold text-sm">{label}</span>
            <button
                onClick={isControlled ? onChange : () => setOn(!on)}
                className={`w-12 h-6 rounded-full transition-all relative ${active ? "bg-primary" : "bg-muted"}`}
            >
                <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-all ${active ? "left-6" : "left-0.5"}`} />
            </button>
        </div>
    );
}
