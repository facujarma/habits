'use client'

import { addToast } from '@heroui/toast'
import { useBooks } from '@root/context/booksContext'
import Header from '@root/sections/Header'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function BookInfo({ bookID }) {

    const { books, loading } = useBooks()
    const [bookName, setBookName] = useState("")
    const [bookDescription, setBookDescription] = useState("")

    useEffect(() => {
        if (loading || !books) return
        const book = books.find(book => book.id === bookID)
        if (book) {
            setBookName(book.title)
            setBookDescription(book.description)
        }
        else {
            addToast({ title: "Error", description: "Book not found", color: "danger", timeout: 2000 });
            redirect('/books')
        }
    }, [books, bookID, loading])

    return (
        <div>
            {loading ? <h2 className="text-2xl text-white">Loading...</h2> :
                <Header title={bookName} text={bookDescription} goBack='/books' />
            }
        </div>
    )
}

export default BookInfo