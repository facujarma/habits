import Editor from '@components/books/MarkdownEditorForReflection'
import BookInfo from '@root/components/books/BookInfo'
import { BooksProvider } from '@root/context/booksContext'
import React from 'react'

async function page({ params }) {

    const { id } = await params
    return (
        <div>
            <BooksProvider>
                <BookInfo bookID={id} />
                <Editor bookID={id} />
            </BooksProvider>
        </div>
    )
}

export default page