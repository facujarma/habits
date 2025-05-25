'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { getAllQuotes } from "@root/utils/quotes";

const QuotesContext = createContext();

export function QuotesProvider({ children }) {

    const [actualQuote, setActualQuote] = useState(0)
    const [actualQuoteRotation, setActualQuoteRotation] = useState(0)
    const [quotes, setQuotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [allQuotes, setAllQuotes] = useState([])
    useEffect(() => {
        const fetchQuotes = async () => {
            const quotes = await getAllQuotes()
            setAllQuotes(quotes)
            setQuotes(quotes)
            setLoading(false)
        }
        fetchQuotes()
    }, [])

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
        <QuotesContext.Provider value={{ setFilters, allQuotes, maxIndex, actualQuote, setActualQuote, actualQuoteRotation, setActualQuoteRotation, quotes, setQuotes, loading, setLoading, goToNextQuote }}>
            {children}
        </QuotesContext.Provider>
    );
}

export function useQuotes() {
    return useContext(QuotesContext);
}
