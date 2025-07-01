'use client'

import BooksList from '@root/components/books/BooksList'
import Recommendations from '@root/components/books/Recommendations'
import Button from '@root/components/Button'
import { BooksProvider } from '@root/context/booksContext'
import Header from '@sections/Header'
import { IconPlus } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function Page() {
    const { t } = useTranslation('common')

    return (
        <div>
            <Header
                title={t('books_title')}
                text={t('books_description')}
            />
            <Button
                text={t('add_book')}
                icon={<IconPlus />}
                handleClick={() => { redirect('/books/createBook') }}
            />
            <BooksProvider>
                <BooksList />
                <Recommendations />
            </BooksProvider>
        </div>
    )
}

export default Page
