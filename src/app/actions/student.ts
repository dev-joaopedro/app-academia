import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function finishWorkoutAction(
    studentId: string,
    workoutName: string,
    durationSeconds: number,
    exercises: any[]
) {
    try {
        // Assegurar que a tabela existe (sem schema management formal)
        await sql`
            CREATE TABLE IF NOT EXISTS completed_workouts (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
                workout_name TEXT NOT NULL,
                duration_seconds INTEGER,
                completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                details JSONB
            );
        `;

        // Inserir registro
        await sql`
            INSERT INTO completed_workouts (student_id, workout_name, duration_seconds, details)
            VALUES (${studentId}, ${workoutName}, ${durationSeconds}, ${JSON.stringify(exercises)})
        `;

        // Revalidar rotas afetadas para atualizar dashboard localmente.
        revalidatePath("/student/dashboard");
        revalidatePath("/student/history");

        return { success: true };
    } catch (error) {
        console.error("Erro ao registrar treino finalizado:", error);
        return { success: false, error: "Falha ao registrar conclusão do treino." };
    }
}

export async function getStudentHistoryAction(studentId: string) {
    try {
        const history = await sql`
            SELECT id, workout_name, duration_seconds, completed_at, details
            FROM completed_workouts
            WHERE student_id = ${studentId}
            ORDER BY completed_at DESC
        `;
        return history;
    } catch (error) {
        console.error("Erro ao buscar histórico do aluno:", error);
        return [];
    }
}
