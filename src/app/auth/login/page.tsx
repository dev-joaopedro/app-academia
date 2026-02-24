"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FlameIcon, ChromeIcon, AppleIcon, MailIcon, LockIcon, ArrowRightIcon, AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProfileByEmail } from "@/app/actions/auth";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Preencha o e-mail e a senha para continuar.");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            const profile = await getProfileByEmail(email);

            if (profile) {
                // Em produção real, validaríamos a senha aqui
                if (profile.role === "trainer") {
                    router.push("/trainer/dashboard");
                } else {
                    router.push("/student/dashboard");
                }
            } else {
                setError("Usuário não encontrado. Verifique seu e-mail.");
            }
        } catch (err) {
            setError("Erro ao conectar com o banco de dados.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen px-6 py-12 bg-background">
            {/* Header */}
            <div className="flex flex-col items-center gap-4 mb-12">
                <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20">
                    <FlameIcon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Bem-vindo de volta</h1>
                    <p className="text-muted-foreground">O seu próximo nível começa aqui.</p>
                </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <Button
                    type="button"
                    variant="outline"
                    className="h-14 rounded-2xl border-2 flex gap-2"
                    onClick={() => setError("Login social será habilitado em breve.")}
                >
                    <ChromeIcon className="w-5 h-5" />
                    Google
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="h-14 rounded-2xl border-2 flex gap-2"
                    onClick={() => setError("Login social será habilitado em breve.")}
                >
                    <AppleIcon className="w-5 h-5" />
                    Apple
                </Button>
            </div>

            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-4 text-muted-foreground font-medium">Ou entre com e-mail</span>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                    <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 text-destructive rounded-2xl px-4 py-3 text-sm">
                        <AlertCircleIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="space-y-2">
                    <div className="relative">
                        <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                        <Input
                            type="email"
                            placeholder="Seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-14 pl-12 rounded-2xl border-2 focus-visible:ring-primary/20"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="relative">
                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                        <Input
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-14 pl-12 rounded-2xl border-2 focus-visible:ring-primary/20"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-1">
                    <button
                        type="button"
                        className="text-sm font-semibold text-primary hover:underline"
                        onClick={() => setError("Recuperação de senha será habilitada em breve.")}
                    >
                        Esqueceu a senha?
                    </button>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20 group"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Entrando...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            Entrar
                            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                    )}
                </Button>
            </form>

            {/* Footer */}
            <div className="mt-auto pt-8 text-center text-sm">
                <p className="text-muted-foreground">
                    Ainda não tem conta?{" "}
                    <Link href="/auth/register" className="text-primary font-bold hover:underline">
                        Crie uma agora
                    </Link>
                </p>
            </div>
        </div>
    );
}
