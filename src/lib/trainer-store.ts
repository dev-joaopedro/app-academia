import { create } from "zustand";
import {
    addStudentAction,
    updateStudentAction,
    deleteStudentAction,
    getStudentsAction,
    saveWorkoutModelAction,
    unassignWorkoutFromStudentAction
} from "@/app/actions/trainer";

export interface Student {
    id: string; // Mudado para string (UUID do Postgres)
    name: string;
    lastWorkout: string;
    status: "Ativo" | "Inativo";
    plan: string;
    email: string;
    phone: string;
    age: number;
    weight: string;
    goal: string;
    workouts: string[];
}

export interface WorkoutModel {
    id: string;
    name: string;
    exercises: any[];
}

interface TrainerStore {
    students: Student[];
    workoutModels: WorkoutModel[];
    loading: boolean;

    // Ações
    fetchStudents: () => Promise<void>;
    addStudent: (student: any) => Promise<boolean>;
    updateStudent: (id: string, data: any) => Promise<boolean>;
    deleteStudent: (id: string) => Promise<boolean>;

    // Modelos
    saveWorkoutModel: (trainerId: string, name: string, exercises: any[]) => Promise<boolean>;

    // Auxiliares (Estado Local)
    removeWorkoutFromStudent: (studentId: string, workoutIndex: number) => void;
    updateStudentWorkoutName: (studentId: string, workoutIndex: number, newName: string) => void;
}

export const useTrainerStore = create<TrainerStore>((set, get) => ({
    students: [],
    workoutModels: [],
    loading: false,

    fetchStudents: async () => {
        set({ loading: true });
        const data = await getStudentsAction();
        // Mapeia os dados do banco para o formato da interface
        const mapped: Student[] = (data as any[]).map(s => ({
            id: s.id,
            name: s.name,
            email: s.email,
            age: s.age || 0,
            weight: s.weight || "—",
            goal: s.goal || "—",
            status: "Ativo" as const,
            plan: "Personalizado",
            lastWorkout: "—",
            phone: s.phone || "—",
            workouts: s.workouts || []
        }));
        set({ students: mapped, loading: false });
    },

    addStudent: async (student) => {
        const res = await addStudentAction(student);
        if (res.success) {
            await get().fetchStudents();
            return true;
        }
        return false;
    },

    updateStudent: async (id, data) => {
        const res = await updateStudentAction(id, data);
        if (res.success) {
            await get().fetchStudents();
            return true;
        }
        return false;
    },

    deleteStudent: async (id) => {
        const res = await deleteStudentAction(id);
        if (res.success) {
            await get().fetchStudents();
            return true;
        }
        return false;
    },

    saveWorkoutModel: async (trainerId, name, exercises) => {
        const res = await saveWorkoutModelAction(trainerId, name, exercises);
        return res.success;
    },

    removeWorkoutFromStudent: async (studentId, workoutIndex) => {
        const student = get().students.find(s => s.id === studentId);
        if (student && student.workouts[workoutIndex]) {
            const workoutName = student.workouts[workoutIndex];

            // Optimistic update
            set((state) => ({
                students: state.students.map(s =>
                    s.id === studentId
                        ? { ...s, workouts: s.workouts.filter((_, i) => i !== workoutIndex) }
                        : s
                )
            }));

            // Persist to DB
            await unassignWorkoutFromStudentAction(studentId, workoutName);
        }
    },

    updateStudentWorkoutName: (studentId, workoutIndex, newName) => set((state) => ({
        students: state.students.map(s =>
            s.id === studentId
                ? { ...s, workouts: s.workouts.map((w, i) => i === workoutIndex ? newName : w) }
                : s
        )
    })),
}));
