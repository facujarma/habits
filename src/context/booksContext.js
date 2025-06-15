'use client';

import { addToast } from '@heroui/toast';
import { getBooks, uploadBookStars } from '@root/utils/books';
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

    const changeStars = async (id, stars) => {
        try {
            await uploadBookStars(id, stars)
            const books = JSON.parse(sessionStorage.getItem('books'))
            const newBooks = books.map(book => {
                if (book.id === id) {
                    book.stars = stars
                }
                return book
            })
            setBooks(newBooks)
            sessionStorage.setItem('books', JSON.stringify(newBooks))
        }
        catch (e) {
            addToast({
                title: 'Error',
                message: 'An error occurred while getting the information.',
                color: 'danger'
            })
            console.log(e)
        }
    }

    useEffect(() => {
        loadBooks()
    }, [])


    const contextValue = {
        books,
        loading,
        loadBooks,
        changeStars
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
