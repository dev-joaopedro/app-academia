"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- GESTÃO DE ALUNOS ---

export async function addStudentAction(student: {
    fullName: string;
    email: string;
    phone?: string;
    age?: number;
    weight?: string;
    goal?: string;
    status?: "Ativo" | "Inativo";
    plan?: string;
}) {
    try {
        await sql`
            INSERT INTO profiles (
                full_name, email, role, age, weight, goal, updated_at
            ) VALUES (
                ${student.fullName}, ${student.email}, 'student', ${student.age || null}, 
                ${student.weight || null}, ${student.goal || null}, CURRENT_TIMESTAMP
            )
        `;
        revalidatePath("/trainer/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Erro ao adicionar aluno:", error);
        return { success: false };
    }
}

export async function updateStudentAction(id: string, data: any) {
    try {
        // Mapeia os campos para as colunas do banco
        await sql`
            UPDATE profiles SET
                full_name = COALESCE(${data.name}, full_name),
                email = COALESCE(${data.email}, email),
                age = COALESCE(${data.age}, age),
                weight = COALESCE(${data.weight}, weight),
                goal = COALESCE(${data.goal}, goal),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ${id}
        `;
        revalidatePath("/trainer/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar aluno:", error);
        return { success: false };
    }
}

export async function deleteStudentAction(id: string) {
    try {
        await sql`DELETE FROM profiles WHERE id = ${id}`;
        revalidatePath("/trainer/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Erro ao deletar aluno:", error);
        return { success: false };
    }
}

// --- GESTÃO DE TREINOS ---

export async function saveWorkoutModelAction(trainerId: string, name: string, exercises: any[]) {
    try {
        // 1. Criar o modelo de treino
        const [model] = await sql`
            INSERT INTO workout_models (trainer_id, name)
            VALUES (${trainerId}, ${name})
            RETURNING id
        `;

        // 2. Inserir os exercícios vinculados
        for (let i = 0; i < exercises.length; i++) {
            const ex = exercises[i];
            await sql`
                INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest, order_index)
                VALUES (${model.id}, ${ex.id}, ${ex.sets}, ${ex.reps}, ${ex.rest || '60s'}, ${i})
            `;
        }

        revalidatePath("/trainer/workouts");
        return { success: true };
    } catch (error: any) {
        console.error("Erro ao salvar modelo de treino:", error);
        // Retorna mais detalhes do erro se possível (cuidado com segurança em produção)
        return {
            success: false,
            error: error.message || "Erro desconhecido ao salvar no banco."
        };
    }
}

// --- BUSCA DE DADOS ---

export async function getStudentsAction() {
    try {
        const students = await sql`
            SELECT id, email, full_name as name, age, weight, goal, created_at
            FROM profiles 
            WHERE role = 'student'
            ORDER BY created_at DESC
        `;
        return students;
    } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        return [];
    }
}

export async function getWorkoutModelsAction(trainerId: string) {
    try {
        // Se trainerId for o placeholder 0, buscar todos para demonstração
        const models = await sql`
            SELECT * FROM workout_models
            WHERE trainer_id = ${trainerId} OR ${trainerId} = '00000000-0000-0000-0000-000000000000'
            ORDER BY created_at DESC
        `;
        return models;
    } catch (error) {
        console.error("Erro ao buscar modelos de treino:", error);
        return [];
    }
}

export async function getWorkoutExercisesAction(workoutId: string) {
    try {
        const exercises = await sql`
            SELECT we.*, e.name, e.muscle, e.category, e.equipment
            FROM workout_exercises we
            JOIN exercises e ON we.exercise_id = e.id
            WHERE we.workout_id = ${workoutId}
            ORDER BY we.order_index
        `;
        return exercises;
    } catch (error) {
        console.error("Erro ao buscar exercícios do treino:", error);
        return [];
    }
}

export async function deleteWorkoutModelAction(id: string) {
    try {
        // Devido ao schema, exercícios vinculados devem ter ON DELETE CASCADE
        // Se não tiver, precisamos deletar manualmente primeiro.
        await sql`DELETE FROM workout_exercises WHERE workout_id = ${id}`;
        await sql`DELETE FROM workout_models WHERE id = ${id}`;
        revalidatePath("/trainer/workouts");
        return { success: true };
    } catch (error) {
        console.error("Erro ao deletar modelo de treino:", error);
        return { success: false };
    }
}
