// context/HabitsContext.tsx

'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';
import { selectHabitsForToday } from '@lib/habits';

// Helper: fecha local a YYYY-MM-DD
function getLocalDateString() {
  const local = new Date();
  // Ajusta a UTC offset para queda la fecha local en ISO
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toISOString().split('T')[0];
}


const HabitsContext = createContext({
  habits: [],
  loading: true,
  loadHabits: async () => { },
  updateHabit: () => { }
});

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHabits = useCallback(async (force = false) => {
    setLoading(true);
    const today = getLocalDateString();
    try {
      const cached = sessionStorage.getItem('cachedHabits');
      const parsed = cached ? JSON.parse(cached) : null;

      if (!force && parsed?.date === today) {
        setHabits(parsed.habits);
      } else {
        const todayHabits = await selectHabitsForToday();
        setHabits(todayHabits);
        sessionStorage.setItem(
          'cachedHabits',
          JSON.stringify({ date: today, habits: todayHabits })
        );
      }
    } catch (e) {
      console.error('Error cargando hábitos:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateHabit = useCallback((id, fields) => {
    setHabits(h =>
      h.map(hbt => (hbt.id === id ? { ...hbt, ...fields } : hbt))
    );
    try {
      const today = getLocalDateString();
      const cached = sessionStorage.getItem('cachedHabits');
      const parsed = cached ? JSON.parse(cached) : null;
      if (parsed?.date === today) {
        const updated = parsed.habits.map(hbt =>
          hbt.id === id ? { ...hbt, ...fields } : hbt
        );
        sessionStorage.setItem(
          'cachedHabits',
          JSON.stringify({ date: today, habits: updated })
        );
      }
    } catch { }
  }, []);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  const value = useMemo(
    () => ({ habits, loading, loadHabits, updateHabit }),
    [habits, loading, loadHabits, updateHabit]
  );

  return (
    <HabitsContext.Provider value={value}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error('useHabits debe usarse dentro de HabitsProvider');
  return ctx;
}
