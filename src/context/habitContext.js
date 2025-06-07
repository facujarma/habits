'use client'

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { selectHabitsForToday } from "@lib/habits";

// Función utilitaria fuera del componente para no recrearla en cada render
function getLocalDateString() {
  const localDate = new Date();
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  return localDate.toISOString().split("T")[0];
}

const HabitsContext = createContext({
  habits: [],
  loading: true,
  loadHabits: () => { },
  updateHabit: () => { },
});

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoizamos la función para que no se recree en cada render
  const loadHabits = useCallback(async (force = false) => {
    setLoading(true);

    try {
      const cachedRaw = sessionStorage.getItem("cachedHabits");
      const parsed = cachedRaw ? JSON.parse(cachedRaw) : null;
      const today = getLocalDateString();

      if (!force && parsed?.date === today) {
        setHabits(parsed.habits);
        console.log("Habits loaded from cache");
      } else {
        const todayHabits = await selectHabitsForToday();
        setHabits(todayHabits);
        sessionStorage.setItem(
          "cachedHabits",
          JSON.stringify({ date: today, habits: todayHabits })
        );
        console.log("Habits loaded from database");
      }
    } catch (error) {
      console.error("Error cargando hábitos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // También memoizamos updateHabit
  const updateHabit = useCallback((id, updatedFields) => {
    setHabits(prev =>
      prev.map(habit => (habit.id === id ? { ...habit, ...updatedFields } : habit))
    );

    try {
      const cachedRaw = sessionStorage.getItem("cachedHabits");
      const parsed = cachedRaw ? JSON.parse(cachedRaw) : null;
      const today = getLocalDateString();

      if (parsed?.date === today) {
        const updatedHabits = parsed.habits.map(habit =>
          habit.id === id ? { ...habit, ...updatedFields } : habit
        );
        sessionStorage.setItem(
          "cachedHabits",
          JSON.stringify({ date: today, habits: updatedHabits })
        );
      }
    } catch (error) {
      console.error("Error actualizando hábito:", error);
    }
  }, []);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  // Memoizamos el value para no forzar renders innecesarios en consumidores
  const contextValue = useMemo(
    () => ({ habits, loading, loadHabits, updateHabit }),
    [habits, loading, loadHabits, updateHabit]
  );

  return (
    <HabitsContext.Provider value={contextValue}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits debe usarse dentro de HabitsProvider");
  }
  return context;
}
