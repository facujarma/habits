'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { selectHabitsForToday } from "@root/utils/habits";
import { getNegativeHabits } from "@root/utils/negativeHabit";

const NegativeHabitsContext = createContext();

export function NegativeHabitsProvider({ children }) {
    const [negativesHabits, setNegativesHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadNegativeHabits() {
        setLoading(true);
        try {
            const negatives = await getNegativeHabits();
            setNegativesHabits(negatives);
        } catch (error) {
            console.error("Error cargando hábitos negativos:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadNegativeHabits();
    }, []);

    return (
        <NegativeHabitsContext.Provider value={{ negativesHabits, loading, loadNegativeHabits }}>
            {children}
        </NegativeHabitsContext.Provider>
    );
}

export function useNegativeHabits() {
    return useContext(NegativeHabitsContext);
}
