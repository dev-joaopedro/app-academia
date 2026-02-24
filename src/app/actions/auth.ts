"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function registerUser(formData: {
    email: string;
    fullName: string;
    role: "admin" | "trainer" | "student";
    // Aluno
    age?: number;
    weight?: string;
    goal?: string;
    // Professor
    cref?: string;
    specialty?: string;
    password?: string;
}) {
    try {
        const { email, fullName, role, age, weight, goal, cref, specialty, password } = formData;

        // Migração Automática: Garantir que a coluna de senha existe
        try {
            await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS password_hash TEXT`;
        } catch (e) {
            console.log("Coluna password_hash já existe ou erro na alteração");
        }

        // Insere no banco Neon (Postgres)
        await sql`
            INSERT INTO profiles (
                email, full_name, role, age, weight, goal, cref, specialty, password_hash
            ) VALUES (
                ${email}, ${fullName}, ${role}, ${age || null}, ${weight || null}, 
                ${goal || null}, ${cref || null}, ${specialty || null}, ${password || null}
            )
            ON CONFLICT (email) DO UPDATE SET
                full_name = EXCLUDED.full_name,
                role = EXCLUDED.role,
                password_hash = COALESCE(EXCLUDED.password_hash, profiles.password_hash),
                updated_at = CURRENT_TIMESTAMP
        `;

        return { success: true };
    } catch (error) {
        console.error("Erro no registro:", error);
        return { success: false, error: "Falha ao cadastrar no banco de dados." };
    }
}

export async function getProfileByEmail(email: string) {
    try {
        const [profile] = await sql`
            SELECT * FROM profiles WHERE email = ${email}
        `;
        return profile || null;
    } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        return null;
    }
}

export async function loginAction(email: string, password?: string) {
    try {
        const profile = await getProfileByEmail(email);
        if (!profile) return { success: false, error: "Usuário não encontrado." };

        // Validação de senha simples (melhorar futuramente com hash)
        if (password && profile.password_hash !== password) {
            return { success: false, error: "Senha incorreta." };
        }

        const cookieStore = await cookies();
        cookieStore.set("app-user-role", profile.role, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 dias
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        // Opcional: salvar o email para facilitar busca do perfil
        cookieStore.set("app-user-email", profile.email, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
        });

        return { success: true, role: profile.role };
    } catch (error) {
        return { success: false, error: "Erro interno no servidor." };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("app-user-role");
    cookieStore.delete("app-user-email");
    return { success: true };
}

export async function getCurrentUserAction() {
    try {
        const cookieStore = await cookies();
        const email = cookieStore.get("app-user-email")?.value;

        if (!email) return null;

        const profile = await getProfileByEmail(email);
        return profile;
    } catch (error) {
        console.error("Erro ao buscar usuário atual:", error);
        return null;
    }
}
