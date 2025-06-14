import React from 'react'
import BookCard from './BookCard'
import { useBooks } from '@root/context/booksContext';

function BooksList() {

    const { loading, books } = useBooks();

    return (
        <div className="flex flex-col gap-4 mt-4">
            {
                loading ? <h2 className="text-2xl font-bold text-white">Loading...</h2> :
                    books.map(book => (
                        <BookCard
                            key={book.id}
                            starsNumber={book.stars}
                            type={book.type}
                            title={book.title}
                            description={book.description}
                            pages={book.pages}
                        />
                    ))
            }
        </div>
    )
}

export default BooksList