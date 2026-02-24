"use server";

import { sql } from "@/lib/db";

export async function getExercisesAction() {
    try {
        const exercises = await sql`
            SELECT id, name, muscle, difficulty, category, equipment, description, tips
            FROM exercises
            ORDER BY muscle, name
        `;
        return exercises;
    } catch (error) {
        console.error("Erro ao buscar exercícios:", error);
        return [];
    }
}

export async function searchExercisesAction(query: string) {
    try {
        const exercises = await sql`
            SELECT * FROM exercises
            WHERE name ILIKE ${'%' + query + '%'}
               OR muscle ILIKE ${'%' + query + '%'}
            LIMIT 20
        `;
        return exercises;
    } catch (error) {
        console.error("Erro na busca de exercícios:", error);
        return [];
    }
}
