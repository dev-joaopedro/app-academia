import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExerciseLog {
    id: number;
    name: string;
    sets: { weight: string; reps: string; completed: boolean }[];
}

interface WorkoutStore {
    isActive: boolean;
    startTime: number | null;
    currentWorkoutName: string | null;
    exercises: ExerciseLog[];
    restTimer: number;
    isResting: boolean;

    startWorkout: (name: string, exercises: any[]) => void;
    pauseWorkout: () => void;
    finishWorkout: () => void;
    updateSet: (exerciseId: number, setIndex: number, data: any) => void;
    setResting: (status: boolean) => void;
    tickRest: () => void;
    resetRest: (seconds: number) => void;
}

export const useWorkoutStore = create<WorkoutStore>()(
    persist(
        (set) => ({
            isActive: false,
            startTime: null,
            currentWorkoutName: null,
            exercises: [],
            restTimer: 0,
            isResting: false,

            startWorkout: (name, exercises) => set({
                isActive: true,
                startTime: Date.now(),
                currentWorkoutName: name,
                exercises: exercises.map(ex => {
                    const parts = (ex.target || "3x12").split('x');
                    const numSets = parseInt(parts[0]) || 3;
                    const numReps = parts[1] || "12";
                    return {
                        ...ex,
                        sets: Array.from({ length: numSets }, () => ({
                            weight: "",
                            reps: numReps,
                            completed: false
                        }))
                    };
                })
            }),

            pauseWorkout: () => set({ isActive: false }),

            finishWorkout: () => set({
                isActive: false,
                startTime: null,
                currentWorkoutName: null,
                exercises: [],
                isResting: false,
                restTimer: 0
            }),

            updateSet: (exId, sIdx, data) => set((state) => ({
                exercises: state.exercises.map(ex =>
                    ex.id === exId
                        ? { ...ex, sets: ex.sets.map((s, i) => i === sIdx ? { ...s, ...data } : s) }
                        : ex
                )
            })),

            setResting: (status) => set({ isResting: status }),

            tickRest: () => set((state) => ({
                restTimer: state.restTimer > 0 ? state.restTimer - 1 : 0,
                isResting: state.restTimer > 1
            })),

            resetRest: (seconds) => set({ restTimer: seconds, isResting: true })
        }),
        {
            name: "workout-storage",
        }
    )
);
