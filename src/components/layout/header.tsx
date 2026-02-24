"use client";

import { FlameIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith("/auth");

    if (isAuthPage) return null;

    return (
        <header className="sticky top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-lg border-b border-border/50 px-6 flex items-center justify-between z-40">
            <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg shadow-sm">
                    <FlameIcon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold tracking-tight text-lg">AcaSaaS</span>
            </Link>

            <Link href="/student/profile" className="w-10 h-10 rounded-full bg-muted border border-border/50 flex items-center justify-center overflow-hidden">
                <UserIcon className="w-6 h-6 text-muted-foreground" />
            </Link>
        </header>
    );
}
