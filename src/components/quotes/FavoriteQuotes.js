'use client'

import { useQuotes } from '@root/context/quotesContext'
import React from 'react'
import SimpleQuoteCard from './SimpleQuoteCard'

function FavoriteQuotes() {

    const { favoriteQuotes } = useQuotes()


    return (
        <div className='z-10 flex gap-4 w-full overflow-x-auto'>
            {
                favoriteQuotes.map(quote => <SimpleQuoteCard key={quote.id} quote={quote.text} author={quote.author} />)
            }
        </div>
    )
}

export default FavoriteQuotes