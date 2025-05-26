'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getAllQuotes, getFavoritesQuotes } from '@root/utils/quotes';

const QuotesContext = createContext();

export function QuotesProvider({ children }) {
    const [actualQuote, setActualQuote] = useState(0);
    const [actualQuoteRotation, setActualQuoteRotation] = useState(0);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allQuotes, setAllQuotes] = useState([]);
    const [favoriteQuotes, setFavoriteQuotes] = useState([]);
    const [isFav, setIsFav] = useState(false);

    const isActualQouteFavorite = () => {
        if (!quotes.length || !favoriteQuotes.length) return false;
        const currentID = quotes[actualQuote]?.id;
        setIsFav(favoriteQuotes.some(f => f.id === currentID + 1))
    };

    useEffect(() => {
        const fetchQuotes = async () => {
            setLoading(true);
            const cached = sessionStorage.getItem('allQuotes');
            if (cached) {
                const parsed = JSON.parse(cached);
                setAllQuotes(parsed);
                setQuotes(parsed);
                setLoading(false);
            } else {
                const fresh = await getAllQuotes();
                setAllQuotes(fresh);
                setQuotes(fresh);
                sessionStorage.setItem('allQuotes', JSON.stringify(fresh));
                setLoading(false);
            }

        };

        fetchQuotes();
    }, []);

    useEffect(() => {
        if (quotes.length > 0) {
            loadFavorites();
        }
        isActualQouteFavorite();

    }, [quotes]);


    const loadFavoritesFromDB = async () => {
        const favorites = await getFavoritesQuotes(); // [{ quoteID: 1 }, ...]
        const favoriteIDs = new Set(favorites.map(f => f.quoteID));
        const filtered = quotes.filter(q => favoriteIDs.has(q.id));
        setFavoriteQuotes(filtered);
        sessionStorage.setItem('favoriteQuotes', JSON.stringify(filtered));
    };

    const loadFavorites = async () => {
        const cached = sessionStorage.getItem('favoriteQuotes');

        if (cached) {
            const parsed = JSON.parse(cached);
            setFavoriteQuotes(parsed.filter(Boolean));
            return;
        }

        await loadFavoritesFromDB();
    };

    const setFilters = (filters) => {
        let filtered = allQuotes;
        if (filters.author !== 'All') {
            filtered = filtered.filter(q => q.author === filters.author);
        }
        if (filters.feeling !== 'All') {
            filtered = filtered.filter(q => q.feeling === filters.feeling);
        }
        if (filters.philosophy !== 'All') {
            filtered = filtered.filter(q => q.philosophy === filters.philosophy);
        }
        setQuotes([...filtered]);
        setActualQuote(0);
    };

    const goToNextQuote = () => {
        setActualQuote(prev => (prev + 1 >= quotes.length ? 0 : prev + 1));
        isActualQouteFavorite();
    };

    const addLocalyToFavorites = (quote) => {
        const newFavorites = [...favoriteQuotes, quote];
        setFavoriteQuotes(newFavorites);
        setIsFav(true);
        sessionStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
    };

    const maxIndex = quotes.length;

    return (
        <QuotesContext.Provider
            value={{
                favoriteQuotes,
                setFavoriteQuotes,
                isFav,
                setFilters,
                allQuotes,
                maxIndex,
                actualQuote,
                setActualQuote,
                actualQuoteRotation,
                setActualQuoteRotation,
                quotes,
                setQuotes,
                loading,
                setLoading,
                addLocalyToFavorites,
                goToNextQuote,
            }}
        >
            {children}
        </QuotesContext.Provider>
    );
}

export function useQuotes() {
    return useContext(QuotesContext);
}
