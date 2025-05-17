'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { selectHabitsForToday } from "@root/utils/habits";

const HabitsContext = createContext();

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define loadHabits como función que actualiza el estado
  async function loadHabits() {
    setLoading(true);
    try {
      const todayHabits = await selectHabitsForToday();
      setHabits(todayHabits);
    } catch (error) {
      console.error("Error cargando hábitos:", error);
    } finally {
      setLoading(false);
    }
  }

  // Carga inicial al montar el provider
  useEffect(() => {
    loadHabits();
  }, []);

  return (
    <HabitsContext.Provider value={{ habits, loading, loadHabits }}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  return useContext(HabitsContext);
}
