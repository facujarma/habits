'use client';

import { addToast } from '@heroui/toast';
import { getBooks, uploadBookStars, uploadBookState } from '@root/utils/books';
import React, { createContext, useContext, useEffect, useState } from 'react';

const BooksContext = createContext();

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const updateBooks = (updatedBook) => {
        setBooks(prev => {
            const newBooks = prev.map(book => book.id === updatedBook.id ? { ...book, ...updatedBook } : book);
            sessionStorage.setItem('books', JSON.stringify(newBooks));
            return newBooks;
        });
    };

    const loadBooks = async (force = false) => {
        const storedBooks = sessionStorage.getItem('books');

        if (!force && storedBooks) {
            const parsed = JSON.parse(storedBooks);
            setBooks(parsed);
            setLoading(false);
            return;
        }

        try {
            const fetchedBooks = await getBooks();
            setBooks(fetchedBooks);
            sessionStorage.setItem('books', JSON.stringify(fetchedBooks));
        } catch (e) {
            console.error(e);
            addToast({
                title: 'Error',
                message: 'An error occurred while getting the books.',
                color: 'danger'
            });
        } finally {
            setLoading(false);
        }
    };

    const changeStars = async (id, stars) => {
        try {
            await uploadBookStars(id, stars);
            updateBooks({ id, stars });
        } catch (e) {
            console.error(e);
            addToast({
                title: 'Error',
                message: 'An error occurred while updating the stars.',
                color: 'danger'
            });
        }
    };

    const changeState = async (id, finished) => {
        try {
            await uploadBookState(id, finished);
            updateBooks({ id, finished });
        } catch (e) {
            console.error(e);
            addToast({
                title: 'Error',
                message: 'An error occurred while updating the state.',
                color: 'danger'
            });
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    return (
        <BooksContext.Provider value={{ books, loading, loadBooks, changeStars, changeState }}>
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
