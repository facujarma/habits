'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { getNegativeHabits } from "@lib/negativeHabit";

const NegativeHabitsContext = createContext();

export function NegativeHabitsProvider({ children }) {
    const [negativesHabits, setNegativesHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadNegativeHabits(force = false) {
        setLoading(true);
        try {
            const cached = sessionStorage.getItem("cachedNegativeHabits");
            const parsed = cached ? JSON.parse(cached) : null;
            const today = new Date().toISOString().split("T")[0];

            if (!force && parsed?.date === today) {
                setNegativesHabits(parsed.habits);
                console.log("Negative habits loaded from cache");
            } else {
                const negatives = await getNegativeHabits();
                setNegativesHabits(negatives);
                sessionStorage.setItem(
                    "cachedNegativeHabits",
                    JSON.stringify({ date: today, habits: negatives })
                );
                console.log("Negative habits loaded from database");
            }
        } catch (error) {
            console.error("Error cargando hábitos negativos:", error);
        } finally {
            setLoading(false);
        }
    }

    async function updateNegativeHabit(id, updatedFields) {
        try {
            setNegativesHabits((prev) =>
                prev.map((habit) =>
                    habit.id === id ? { ...habit, ...updatedFields } : habit
                )
            );

            const cached = sessionStorage.getItem("cachedNegativeHabits");
            const parsed = cached ? JSON.parse(cached) : null;
            const today = new Date().toISOString().split("T")[0];

            if (parsed?.date === today) {
                const updatedHabits = parsed.habits.map((habit) =>
                    habit.id === id ? { ...habit, ...updatedFields } : habit
                );

                sessionStorage.setItem(
                    "cachedNegativeHabits",
                    JSON.stringify({ date: today, habits: updatedHabits })
                );
            }

        } catch (error) {
            console.error("Error actualizando hábito negativo:", error);
        }
    }

    useEffect(() => {
        loadNegativeHabits();
    }, []);

    return (
        <NegativeHabitsContext.Provider
            value={{ negativesHabits, loading, loadNegativeHabits, updateNegativeHabit }}
        >
            {children}
        </NegativeHabitsContext.Provider>
    );
}

export function useNegativeHabits() {
    return useContext(NegativeHabitsContext);
}
