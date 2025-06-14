
import CreateBook from "@root/components/books/CreateBook"
import { BooksProvider } from "@root/context/booksContext"
import Header from "@root/sections/Header"

function page() {

    return (
        <div>
            <Header title="Add book" text="Here you can add a new book to your collection." />
            <BooksProvider>
                <CreateBook />
            </BooksProvider>

        </div>
    )
}

export default page