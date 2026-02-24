"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
}) {
    try {
        const { email, fullName, role, age, weight, goal, cref, specialty } = formData;

        // Insere no banco Neon (Postgres)
        await sql`
            INSERT INTO profiles (
                email, full_name, role, age, weight, goal, cref, specialty
            ) VALUES (
                ${email}, ${fullName}, ${role}, ${age || null}, ${weight || null}, 
                ${goal || null}, ${cref || null}, ${specialty || null}
            )
            ON CONFLICT (email) DO UPDATE SET
                full_name = EXCLUDED.full_name,
                role = EXCLUDED.role,
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
