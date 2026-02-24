import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Student {
    id: number;
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

    // Alunos
    addStudent: (student: Omit<Student, "id">) => void;
    updateStudent: (id: number, data: Partial<Student>) => void;
    deleteStudent: (id: number) => void;

    // Treinos
    addWorkoutToStudent: (studentId: number, workoutName: string) => void;
    removeWorkoutFromStudent: (studentId: number, workoutIndex: number) => void;
    updateStudentWorkoutName: (studentId: number, workoutIndex: number, newName: string) => void;

    // Modelos
    saveWorkoutModel: (name: string, exercises: any[]) => void;
    deleteWorkoutModel: (id: string) => void;
}

const DEFAULT_STUDENTS: Student[] = [
    {
        id: 1, name: "João Silva", lastWorkout: "Hoje", status: "Ativo", plan: "Hipertrofia",
        email: "joao@email.com", phone: "(11) 99999-0001", age: 25, weight: "80kg", goal: "Ganho de Massa",
        workouts: ["Treino A - Peitorais", "Treino B - Costas", "Treino C - Pernas"],
    },
    {
        id: 2, name: "Maria Oliveira", lastWorkout: "Ontem", status: "Ativo", plan: "Emagrecimento",
        email: "maria@email.com", phone: "(11) 99999-0002", age: 32, weight: "65kg", goal: "Perda de Peso",
        workouts: ["Treino Full Body A", "Treino Full Body B"],
    },
    {
        id: 3, name: "Pedro Santos", lastWorkout: "Há 3 dias", status: "Inativo", plan: "Powerlifting",
        email: "pedro@email.com", phone: "(11) 99999-0003", age: 28, weight: "95kg", goal: "Força Máxima",
        workouts: ["Squat Day", "Deadlift Day", "Bench Day"],
    },
];

export const useTrainerStore = create<TrainerStore>()(
    persist(
        (set) => ({
            students: DEFAULT_STUDENTS,
            workoutModels: [],

            addStudent: (student) => set((state) => ({
                students: [{ ...student, id: Date.now() } as Student, ...state.students]
            })),

            updateStudent: (id, data) => set((state) => ({
                students: state.students.map(s => s.id === id ? { ...s, ...data } : s)
            })),

            deleteStudent: (id) => set((state) => ({
                students: state.students.filter(s => s.id !== id)
            })),

            addWorkoutToStudent: (studentId, workoutName) => set((state) => ({
                students: state.students.map(s =>
                    s.id === studentId
                        ? { ...s, workouts: [...s.workouts, workoutName] }
                        : s
                )
            })),

            removeWorkoutFromStudent: (studentId, workoutIndex) => set((state) => ({
                students: state.students.map(s =>
                    s.id === studentId
                        ? { ...s, workouts: s.workouts.filter((_, i) => i !== workoutIndex) }
                        : s
                )
            })),

            updateStudentWorkoutName: (studentId, workoutIndex, newName) => set((state) => ({
                students: state.students.map(s =>
                    s.id === studentId
                        ? { ...s, workouts: s.workouts.map((w, i) => i === workoutIndex ? newName : w) }
                        : s
                )
            })),

            saveWorkoutModel: (name, exercises) => set((state) => ({
                workoutModels: [{ id: Date.now().toString(), name, exercises }, ...state.workoutModels]
            })),

            deleteWorkoutModel: (id) => set((state) => ({
                workoutModels: state.workoutModels.filter(m => m.id !== id)
            }))
        }),
        {
            name: "trainer-storage",
        }
    )
);
