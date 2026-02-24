"use client";

import { FlameIcon, ClipboardListIcon, BookOpenIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Nav do Trainer
const TRAINER_NAV = [
    { href: "/trainer/dashboard", icon: UserIcon, label: "Alunos" },
    { href: "/trainer/workouts/new", icon: ClipboardListIcon, label: "Treinos" },
    { href: "/trainer/exercises", icon: BookOpenIcon, label: "Biblioteca" },
    { href: "/trainer/profile", icon: FlameIcon, label: "Perfil" },
];

// Nav do Student
const STUDENT_NAV = [
    { href: "/", icon: FlameIcon, label: "Home" },
    { href: "/student/dashboard", icon: ClipboardListIcon, label: "Treino" },
    { href: "/student/progress", icon: BookOpenIcon, label: "Evolução" },
    { href: "/student/profile", icon: UserIcon, label: "Perfil" },
];

export function MobileNav() {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith("/auth");

    if (isAuthPage) return null;

    const isTrainer = pathname.startsWith("/trainer");
    const navItems = isTrainer ? TRAINER_NAV : STUDENT_NAV;

    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-background/80 backdrop-blur-xl border-t border-border/50 px-8 flex items-center justify-between z-50">
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center gap-1 transition-all active:scale-90",
                            isActive ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        <item.icon className={cn("w-6 h-6", isActive && "drop-shadow-[0_0_8px_rgba(217,249,157,0.5)]")} />
                        <span className="text-[10px] font-bold tracking-wider uppercase">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
