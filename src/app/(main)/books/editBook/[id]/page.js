import EditBook from "@root/components/books/EditBook"
import { BooksProvider } from "@root/context/booksContext"
import Header from "@root/sections/Header"

async function page({ params }) {
    const { id } = params
    return (
        <div>
            <Header title="Edit a book" text="Here you can edit a book from your collection." goBack="/books" />
            <BooksProvider>
                <EditBook bookID={id} />
            </BooksProvider>
        </div>
    )
}

export default page