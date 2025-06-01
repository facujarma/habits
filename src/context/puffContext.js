'use client'

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { getVapeCounterForToday } from "@root/utils/vape";

const PuffContext = createContext({
  puffCounter: 0,
  loading: false,
  loadPuffs: () => {},
  setPuffCounter: () => {},
});

export function PuffProvider({ children }) {
  const [puffCounter, setPuffCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  // Memoizamos loadPuffs para que no se recree en cada render
  const loadPuffs = useCallback(async () => {
    setLoading(true);
    try {
      const todayPuffs = await getVapeCounterForToday();
      setPuffCounter(todayPuffs);
    } catch (error) {
      console.error("Error cargando contador de puffs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial al montar el provider
  useEffect(() => {
    loadPuffs();
  }, [loadPuffs]);

  // Memoizamos el value para evitar renders innecesarios en consumidores
  const contextValue = useMemo(
    () => ({ puffCounter, loading, loadPuffs, setPuffCounter }),
    [puffCounter, loading, loadPuffs]
  );

  return (
    <PuffContext.Provider value={contextValue}>
      {children}
    </PuffContext.Provider>
  );
}

export function usePuff() {
  const context = useContext(PuffContext);
  if (!context) {
    throw new Error("usePuff debe usarse dentro de PuffProvider");
  }
  return context;
}
