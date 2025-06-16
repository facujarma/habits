'use client'

import BooksList from '@root/components/books/BooksList'
import Recommendations from '@root/components/books/Recommendations'
import Button from '@root/components/Button'
import { BooksProvider } from '@root/context/booksContext'
import Header from '@sections/Header'
import { IconPlus } from '@tabler/icons-react'
import { redirect } from 'next/navigation'

function page() {
    return (
        <div>
            <Header title="Books" text={"Reading is a very important habit, which is why we believe it deserves its own section. Keep track of the books you read here."} />
            <Button text="Add book" icon={<IconPlus />} handleClick={() => { redirect('/books/createBook') }} />
            <BooksProvider>
                <BooksList />
                <Recommendations />
            </BooksProvider>
        </div>
    )
}

export default page