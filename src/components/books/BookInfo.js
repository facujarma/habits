'use client'

import { useBooks } from '@root/context/booksContext'
import Header from '@root/sections/Header'
import React, { useEffect, useState } from 'react'

function BookInfo({ bookID }) {

    const { books, loading } = useBooks()
    const [bookName, setBookName] = useState("")
    const [bookDescription, setBookDescription] = useState("")

    useEffect(() => {
        const book = books.find(book => book.id === bookID)
        if (book) {
            setBookName(book.title)
            setBookDescription(book.description)
        }
    }, [books, bookID])

    return (
        <div>
            {loading ? <h2 className="text-2xl text-white">Loading...</h2> :
                <Header title={bookName} text={bookDescription} goBack='/books' />
            }
        </div>
    )
}

export default BookInfo