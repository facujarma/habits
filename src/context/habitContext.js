'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { selectHabitsForToday } from "@root/utils/habits";

const HabitsContext = createContext();

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  function getLocalDateString() {
    const localDate = new Date();
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    return localDate.toISOString().split("T")[0];
  }


  async function loadHabits(force = false) {
    setLoading(true);

    try {
      const cached = sessionStorage.getItem("cachedHabits")
      const parsed = cached ? JSON.parse(cached) : null
      const today = getLocalDateString()

      if (!force && parsed?.date === today) {
        setHabits(parsed.habits)
        console.log("Habits loaded from cache")
      } else {
        const todayHabits = await selectHabitsForToday()
        setHabits(todayHabits)
        sessionStorage.setItem("cachedHabits", JSON.stringify({
          date: today,
          habits: todayHabits,
        }))
        console.log("Habits loaded from database")
      }
    } catch (error) {
      console.error("Error cargando hábitos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateHabit(id, updatedFields) {
    try {
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === id ? { ...habit, ...updatedFields } : habit
        )
      )
      const cached = sessionStorage.getItem("cachedHabits")
      const parsed = cached ? JSON.parse(cached) : null
      const today = getLocalDateString()

      if (parsed?.date === today) {
        const updatedHabits = parsed.habits.map((habit) =>
          habit.id === id ? { ...habit, ...updatedFields } : habit
        )

        sessionStorage.setItem(
          "cachedHabits",
          JSON.stringify({ date: today, habits: updatedHabits })
        )
      }

    } catch (error) {
      console.error("Error actualizando hábito:", error)
    }
  }


  useEffect(() => {
    loadHabits();
  }, []);

  return (
    <HabitsContext.Provider value={{ habits, loading, loadHabits, updateHabit }}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  return useContext(HabitsContext);
}
