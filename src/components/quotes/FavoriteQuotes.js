'use client'

import { useQuotes } from '@root/context/quotesContext'
import React from 'react'
import SimpleQuoteCard from './SimpleQuoteCard'

function FavoriteQuotes() {

    const { favoriteQuotes } = useQuotes()

    const lan = localStorage.getItem('language');
    return (
        <div className='z-10 flex gap-4 w-full overflow-x-auto'>
            {
                favoriteQuotes.map(quote => <SimpleQuoteCard key={quote.id} quote={lan == 'es' ? quote.text_es : quote.text} author={quote.author} />)
            }
        </div>
    )
}

export default FavoriteQuotes