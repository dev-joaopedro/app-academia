"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FlameIcon, MailIcon, LockIcon, UserIcon, ArrowRightIcon, DumbbellIcon, AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/auth";

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState<"trainer" | "student">("student");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Campos de Aluno
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [goal, setGoal] = useState("");
    // Campos de Professor
    const [cref, setCref] = useState("");
    const [specialty, setSpecialty] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("Por favor, informe seu nome completo.");
            return;
        }

        if (!email) {
            setError("Por favor, informe seu e-mail.");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            const res = await registerUser({
                email,
                fullName: name,
                role: role as "trainer" | "student",
                age: age ? parseInt(age) : undefined,
                weight,
                goal,
                cref,
                specialty
            });

            if (res.success) {
                setSuccess("Conta criada com sucesso! Redirecionando para login...");
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            } else {
                setError(res.error || "Algo deu errado durante o cadastro.");
            }
        } catch (err: any) {
            setError("Erro técnico: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen px-6 py-10 bg-background">
            {/* Header */}
            <div className="flex flex-col items-center gap-4 mb-8">
                <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20">
                    <FlameIcon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Crie sua conta</h1>
                    <p className="text-sm text-muted-foreground">Escolha como quer começar sua jornada.</p>
                </div>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 mb-8">
                <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={cn(
                        "flex flex-col items-center justify-center gap-3 p-4 rounded-[2rem] border-2 transition-all active:scale-95",
                        role === "student"
                            ? "border-primary bg-primary/5 text-primary shadow-inner shadow-primary/10"
                            : "border-border/50 text-muted-foreground"
                    )}
                >
                    <div className={cn("p-3 rounded-xl", role === "student" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                        <UserIcon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-sm">Sou Aluno</span>
                </button>

                <button
                    type="button"
                    onClick={() => setRole("trainer")}
                    className={cn(
                        "flex flex-col items-center justify-center gap-3 p-4 rounded-[2rem] border-2 transition-all active:scale-95",
                        role === "trainer"
                            ? "border-primary bg-primary/5 text-primary shadow-inner shadow-primary/10"
                            : "border-border/50 text-muted-foreground"
                    )}
                >
                    <div className={cn("p-3 rounded-xl", role === "trainer" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                        <DumbbellIcon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-sm">Sou Personal</span>
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">
                {error && (
                    <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 text-destructive rounded-2xl px-4 py-3 text-sm">
                        <AlertCircleIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 rounded-2xl px-4 py-3 text-sm">
                        <CheckCircleIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{success}</span>
                    </div>
                )}

                <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-14 pl-12 rounded-2xl border-2 focus-visible:ring-primary/20"
                        required
                    />
                </div>

                <div className="relative">
                    <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                        type="email"
                        placeholder="Seu melhor e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pl-12 rounded-2xl border-2 focus-visible:ring-primary/20"
                        required
                    />
                </div>

                <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                        type="password"
                        placeholder="Crie uma senha forte (mín. 6 caracteres)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 pl-12 rounded-2xl border-2 focus-visible:ring-primary/20"
                        required
                    />
                </div>

                {/* Campos Dinâmicos: Aluno */}
                {role === "student" && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-muted-foreground ml-2">Idade</span>
                            <Input
                                type="number"
                                placeholder="Ex: 25"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="h-12 rounded-2xl border-2"
                            />
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-muted-foreground ml-2">Peso (kg)</span>
                            <Input
                                type="text"
                                placeholder="Ex: 80"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="h-12 rounded-2xl border-2"
                            />
                        </div>
                        <div className="col-span-2 space-y-1">
                            <span className="text-[10px] font-black uppercase text-muted-foreground ml-2">Qual seu objetivo?</span>
                            <Input
                                placeholder="Ex: Hipertrofia, Emagrecimento..."
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                className="h-12 rounded-2xl border-2"
                            />
                        </div>
                    </div>
                )}

                {/* Campos Dinâmicos: Professor */}
                {role === "trainer" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-muted-foreground ml-2">Número do CREF</span>
                            <Input
                                placeholder="000000-G/UF"
                                value={cref}
                                onChange={(e) => setCref(e.target.value)}
                                className="h-12 rounded-2xl border-2"
                            />
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-muted-foreground ml-2">Sua Especialidade</span>
                            <Input
                                placeholder="Ex: Musculação, Crossfit, Reabilitação..."
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                className="h-12 rounded-2xl border-2"
                            />
                        </div>
                    </div>
                )}

                <div className="pt-2">
                    <p className="text-[11px] text-muted-foreground text-center px-4 leading-relaxed mb-4">
                        Ao criar sua conta, você concorda com nossos <span className="text-foreground font-bold">Termos de Uso</span> e <span className="text-foreground font-bold">Política de Privacidade</span>.
                    </p>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20 group"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                Criando conta...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                Começar Treino
                                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        )}
                    </Button>
                </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                    Já tem uma conta?{" "}
                    <Link href="/auth/login" className="text-primary font-bold hover:underline">
                        Entrar agora
                    </Link>
                </p>
            </div>
        </div>
    );
}
