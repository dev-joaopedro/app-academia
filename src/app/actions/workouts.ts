"use server";

import { sql } from "@/lib/db";
import { cookies } from "next/headers";

export async function getStudentWorkoutsAction() {
    try {
        const cookieStore = await cookies();
        const email = cookieStore.get("app-user-email")?.value;

        if (!email) return [];

        const [user] = await sql`SELECT id FROM profiles WHERE email = ${email}`;
        if (!user) return [];

        const assignments = await sql`
            SELECT 
                wm.id,
                wm.name,
                wm.description,
                p.full_name as trainer_name
            FROM student_assignments sa
            JOIN workout_models wm ON sa.workout_id = wm.id
            JOIN profiles p ON sa.trainer_id = p.id
            WHERE sa.student_id = ${user.id}
        `;

        // Para cada treino, buscar exercícios
        const workoutsWithExercises = await Promise.all(assignments.map(async (wm: any) => {
            const exercises = await sql`
                SELECT 
                    e.name,
                    we.sets,
                    we.reps,
                    we.rest,
                    we.order_index
                FROM workout_exercises we
                JOIN exercises e ON we.exercise_id = e.id
                WHERE we.workout_id = ${wm.id}
                ORDER BY we.order_index ASC
            `;
            return { ...wm, exercises };
        }));

        return workoutsWithExercises;
    } catch (error) {
        console.error("Erro ao buscar treinos do aluno:", error);
        return [];
    }
}
