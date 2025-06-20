'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { getAllQuotes, getFavoritesQuotes } from '@lib/quotes';

const QuotesContext = createContext({
  allQuotes: [],
  quotes: [],
  favoriteQuotes: [],
  actualQuote: 0,
  actualQuoteRotation: 0,
  isFav: false,
  maxIndex: 0,
  loading: true,
  setFilters: () => { },
  goToNextQuote: () => { },
  addLocallyToFavorites: () => { },
  setActualQuote: () => { },
  setActualQuoteRotation: () => { },
});

export function QuotesProvider({ children }) {
  const [allQuotes, setAllQuotes] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);
  const [actualQuote, setActualQuote] = useState(0);
  const [actualQuoteRotation, setActualQuoteRotation] = useState(0);
  const [isFav, setIsFav] = useState(false);

  const [listMode, setListMode] = useState("Swipe")

  const [loading, setLoading] = useState(true);

  // Carga inicial de todas las citas
  const loadAllQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const cached = sessionStorage.getItem('allQuotes');
      if (cached) {
        const parsed = JSON.parse(cached);
        setAllQuotes(parsed);
        setQuotes(parsed);
      } else {
        const fresh = await getAllQuotes();
        setAllQuotes(fresh);
        setQuotes(fresh);
        sessionStorage.setItem('allQuotes', JSON.stringify(fresh));
      }
    } catch (error) {
      console.error('Error cargando todas las citas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga de favoritas (previamente guardadas en sessionStorage o desde DB)
  const loadFavoritesFromDB = useCallback(async () => {
    try {
      const favorites = await getFavoritesQuotes(); // [{ quoteID: 1 }, ...]
      const favoriteIDs = new Set(favorites.map(f => f.quoteID));
      const filtered = quotes.filter(q => favoriteIDs.has(q.id));
      setFavoriteQuotes(filtered);
      sessionStorage.setItem('favoriteQuotes', JSON.stringify(filtered));
    } catch (error) {
      console.error('Error cargando citas favoritas de la base de datos:', error);
    }
  }, [quotes]);

  const loadFavorites = useCallback(async () => {
    const cached = sessionStorage.getItem('favoriteQuotes');
    if (cached) {
      const parsed = JSON.parse(cached).filter(Boolean);
      setFavoriteQuotes(parsed);
    } else {
      await loadFavoritesFromDB();
    }
  }, [loadFavoritesFromDB]);

  // Computar si la cita actual es favorita cada vez que cambian actualQuote o favoriteQuotes
  useEffect(() => {
    if (!quotes.length || !favoriteQuotes.length) {
      setIsFav(false);
      return;
    }
    const currentID = quotes[actualQuote]?.id;
    setIsFav(favoriteQuotes.some(f => f.id === currentID));
  }, [actualQuote, favoriteQuotes, quotes]);

  // Carga inicial y de favoritas después de tener todas las citas
  useEffect(() => {
    loadAllQuotes();
  }, [loadAllQuotes]);

  useEffect(() => {
    if (quotes.length > 0) {
      loadFavorites();
    }
  }, [quotes, loadFavorites]);

  // Función para aplicar filtros sobre todas las citas y reiniciar índice
  const setFilters = useCallback(
    filters => {
      let filtered = allQuotes;
      if (filters.author && filters.author !== 'All') {
        filtered = filtered.filter(q => q.author === filters.author);
      }
      if (filters.feeling && filters.feeling !== 'All') {
        filtered = filtered.filter(q => q.feeling === filters.feeling);
      }
      if (filters.philosophy && filters.philosophy !== 'All') {
        filtered = filtered.filter(q => q.philosophy === filters.philosophy);
      }
      setQuotes(filtered);
      setActualQuote(0);
    },
    [allQuotes]
  );

  // Pasar a la siguiente cita y rotar datos si es necesario
  const goToNextQuote = useCallback(() => {
    setActualQuote(prev => (prev + 1 >= quotes.length ? 0 : prev + 1));
    setActualQuoteRotation(prev => prev + 1);
  }, [quotes.length]);

  // Actualizar cita manualmente (en sesión, sin llamar a DB)
  const setActualQuoteFromIndex = useCallback((index) => {
    setActualQuote(index);

  }, []);

  // Agregar manualmente a favoritas (en sesión, sin llamar a DB)
  const addLocallyToFavorites = useCallback(
    quote => {
      const newFavorites = [...favoriteQuotes, quote];
      setFavoriteQuotes(newFavorites);
      sessionStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
    },
    [favoriteQuotes]
  );

  // Valor máximo de índice para recorrido
  const maxIndex = useMemo(() => quotes.length, [quotes]);


  // Objeto de contexto memoizado para evitar renders innecesarios
  const contextValue = useMemo(
    () => ({
      allQuotes,
      quotes,
      favoriteQuotes,
      actualQuote,
      actualQuoteRotation,
      isFav,
      maxIndex,
      loading,
      setFilters,
      goToNextQuote,
      addLocallyToFavorites,
      setActualQuote,
      setActualQuoteRotation,
      listMode,
      setListMode,
      setActualQuoteFromIndex
    }),
    [
      allQuotes,
      quotes,
      favoriteQuotes,
      actualQuote,
      actualQuoteRotation,
      isFav,
      maxIndex,
      loading,
      setFilters,
      goToNextQuote,
      addLocallyToFavorites,
      listMode,
      setListMode,
      setActualQuoteFromIndex
    ]
  );

  return (
    <QuotesContext.Provider value={contextValue}>
      {children}
    </QuotesContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuotesContext);
  if (!context) {
    throw new Error('useQuotes debe usarse dentro de QuotesProvider');
  }
  return context;
}
