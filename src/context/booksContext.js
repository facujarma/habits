'use client';

import { addToast } from '@heroui/toast';
import { getBooks } from '@root/utils/books';
import React, { createContext, useContext, useState, useEffect } from 'react';

const BooksContext = createContext();

export function BooksProvider({ children }) {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    const loadBooks = (force = true) => {
        const books = JSON.parse(sessionStorage.getItem('books'))

        if (force || !books) {
            try {
                getBooks().then(books => {
                    setBooks(books)
                    setLoading(false)
                    sessionStorage.setItem('books', JSON.stringify(books))
                })
            }
            catch (e) {
                addToast({
                    title: 'Error',
                    message: 'An error occurred while getting the information.',
                    color: 'danger'
                })
                console.log(e)
            }
        } else {
            setBooks(books)
            setLoading(false)
        }

    }

    useEffect(() => {
        loadBooks()
    }, [])


    const contextValue = {
        books,
        loading,
        loadBooks
    };

    return (
        <BooksContext.Provider value={contextValue}>
            {children}
        </BooksContext.Provider>
    );
}
export function useBooks() {
    const context = useContext(BooksContext);
    if (!context) {
        throw new Error("useBooks debe usarse dentro de BooksProvider");
    }
    return context;
}
