'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { getAllQuotes, getFavoritesQuotes } from "@root/utils/quotes";

const QuotesContext = createContext();

export function QuotesProvider({ children }) {

    const [actualQuote, setActualQuote] = useState(0)
    const [actualQuoteRotation, setActualQuoteRotation] = useState(0)
    const [quotes, setQuotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [allQuotes, setAllQuotes] = useState([])
    const [favoriteQuotes, setFavoriteQuotes] = useState([])
    const loadFavorites = async () => {
        setLoading(true);
        const favorites = await getFavoritesQuotes(); // e.g., [{ quoteID: 1 }, { quoteID: 3 }]
        const favoriteIDs = favorites.map(fav => fav.quoteID); // [1, 3]
        console.log(favoriteIDs, quotes);
        setFavoriteQuotes(quotes.filter(quote => favoriteIDs.includes(quote.id)));
        console.log(favoriteQuotes);
        setLoading(false);
    };


    useEffect(() => {
        const fetchQuotes = async () => {
            const quotes = await getAllQuotes();
            setAllQuotes(quotes);
            setQuotes(quotes);
            setLoading(false);
        };
        fetchQuotes();
    }, []);

    useEffect(() => {
        if (quotes.length > 0) {
            loadFavorites();
        }
    }, [quotes]);


    const setFilters = (filters) => {
        let filteredQuotes = allQuotes
        if (filters.author !== 'All') filteredQuotes = filteredQuotes.filter(quote => quote.author === filters.author)
        if (filters.feeling !== 'All') filteredQuotes = filteredQuotes.filter(quote => quote.feeling === filters.feeling)
        if (filters.philosophy !== 'All') filteredQuotes = filteredQuotes.filter(quote => quote.philosophy === filters.philosophy)
        setQuotes([...filteredQuotes])
        setActualQuote(0)

    }


    const goToNextQuote = () => {
        setActualQuote(prev => {
            if (prev + 1 >= quotes.length) {
                return 0;
            }
            return prev + 1;
        });
    }


    const maxIndex = quotes.length

    return (
        <QuotesContext.Provider value={{ favoriteQuotes, setFavoriteQuotes, setFilters, allQuotes, maxIndex, actualQuote, setActualQuote, actualQuoteRotation, setActualQuoteRotation, quotes, setQuotes, loading, setLoading, goToNextQuote }}>
            {children}
        </QuotesContext.Provider>
    );
}

export function useQuotes() {
    return useContext(QuotesContext);
}
