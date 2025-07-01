'use client'

import CreateBook from "@root/components/books/CreateBook"
import { BooksProvider } from "@root/context/booksContext"
import Header from "@root/sections/Header"
import { useTranslation } from "react-i18next"

function Page() {
    const { t } = useTranslation('common')

    return (
        <div>
            <Header
                title={t('add_book_title')}
                text={t('add_book_description')}
                goBack="/books"
            />
            <BooksProvider>
                <CreateBook />
            </BooksProvider>
        </div>
    )
}

export default Page
