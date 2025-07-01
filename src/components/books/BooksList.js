import React from 'react'
import BookCard from './BookCard'
import { useBooks } from '@root/context/booksContext';
import { Skeleton } from '@heroui/skeleton';
import { useTranslation } from 'react-i18next'

function BooksList() {
    const { t } = useTranslation('common')
    const { loading, books } = useBooks();

    return (
        <div className="flex flex-col gap-4 mt-4">
            <h2 className='text-2xl text-[#C5C5C5]'>{t('books_reading')}</h2>
            {
                loading ? (
                    <Skeleton className="z-20 w-full h-40 rounded-2xl flex items-center justify-between" />
                ) : books.length === 0 ? (
                    <p className='text-center text-[#C5C5C5]'>{t('books_none')}</p>
                ) : (
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
                )
            }

            <p className='text-2xl text-[#C5C5C5]'>{t('books_finished')}</p>
            {
                loading ? (
                    <Skeleton className="z-20 w-full h-40 rounded-2xl flex items-center justify-between" />
                ) : books.length === 0 ? (
                    <h2 className='text-[#C5C5C5]  text-center '>{t('books_none')}</h2>
                ) : (
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
                )
            }
        </div>
    )
}

export default BooksList
