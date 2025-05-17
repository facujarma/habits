'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { getVapeCounterForToday } from "@root/utils/vape";

const PuffContext = createContext();

export function PuffProvider({ children }) {
  const [puffCounter, setPuffCounter] = useState(0)
  const [loading, setLoading] = useState(false);

  async function loadPuffs() {
    setLoading(true);
    try {
      const todayPuffs = await getVapeCounterForToday();
      setPuffCounter(todayPuffs);
    } catch (error) {
      console.error("Error cargando hábitos:", error);
    } finally {
      setLoading(false);
    }
  }

  // Carga inicial al montar el provider
  useEffect(() => {
    loadPuffs();
  }, []);

  return (
    <PuffContext.Provider value={{ puffCounter, loading, loadPuffs, setPuffCounter }}>
      {children}
    </PuffContext.Provider>
  );
}

export function usePuff() {
  return useContext(PuffContext);
}
