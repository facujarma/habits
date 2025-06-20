import { useQuotes } from '@root/context/quotesContext'
import React from 'react'

function QuoteListCard({ quote, author, index }) {

    const { setActualQuoteFromIndex } = useQuotes()

    return (
        <button
            className='snap-start shrink-0 w-full max-w-[25em] h-[25em]  flex flex-col justify-between items-center bg-[#666F9A]/40 border border-[#666F9A]  aspect-square rounded-2xl p-4 duration-200'
        >
            <h2 className='text-2xl mb-4 text-center'>
                {quote}
            </h2>
            <span className='text-sm'>
                {author}
            </span>
        </button>
    )
}

export default QuoteListCard