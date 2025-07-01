'use client'

import EditBook from "@root/components/books/EditBook"
import { BooksProvider } from "@root/context/booksContext"
import Header from "@root/sections/Header"
import { useTranslation } from "react-i18next"

function Page({ params }) {
    const { id } = params
    const { t } = useTranslation('common')

    return (
        <div>
            <Header
                title={t('edit_book_title')}
                text={t('edit_book_description')}
                goBack="/books"
            />
            <BooksProvider>
                <EditBook bookID={id} />
            </BooksProvider>
        </div>
    )
}

export default Page
