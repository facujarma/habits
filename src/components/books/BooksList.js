import React from 'react'
import BookCard from './BookCard'
import { useBooks } from '@root/context/booksContext';
import { Skeleton } from '@heroui/skeleton';

function BooksList() {

    const { loading, books } = useBooks();

    return (
        <div className="flex flex-col gap-4 mt-4">

            <h2 className='text-2xl text-[#C5C5C5]'> Reading: </h2>
            {
                loading ? <Skeleton className="z-20 w-full h-40 rounded-2xl flex items-center justify-between" /> :
                    books.map(book => (
                        !book.finished &&
                        <BookCard
                            key={book.id}
                            starsNumber={book.stars}
                            type={book.type}
                            title={book.title}
                            description={book.description}
                            pages={book.pages}
                            bookID={book.id}
                            finished={book.finished}

                        />
                    ))
            }
            <h2 className='text-2xl text-[#C5C5C5]'> Finished: </h2>
            {
                loading ? <Skeleton className="z-20 w-full h-40 rounded-2xl flex items-center justify-between" /> :
                    books.map(book => (
                        book.finished &&
                        <BookCard
                            key={book.id}
                            starsNumber={book.stars}
                            type={book.type}
                            title={book.title}
                            description={book.description}
                            pages={book.pages}
                            bookID={book.id}
                            finished={book.finished}
                        />
                    ))
            }
        </div>
    )
}

export default BooksList