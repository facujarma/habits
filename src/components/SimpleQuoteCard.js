import React from 'react'

function SimpleQuoteCard({ quote, author, index }) {

    return (
        <div
            className='w-full max-w-[25em] flex flex-col justify-between items-center bg-[#666F9A]/40 border border-[#666F9A]  aspect-square rounded-2xl p-4 duration-200'
        >
            <h2 className='text-2xl mb-4 text-center'>
                {quote}
            </h2>
            <span className='text-sm'>
                {author}
            </span>
        </div>
    )
}

export default SimpleQuoteCard
