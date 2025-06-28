'use client'

import React from 'react'
import QuoteCard from './QuoteCard'
import { useQuotes } from '@root/context/quotesContext'
import QuoteCarousel from './QuoteCarrousel'
import QuoteActions from './QuoteActions'

function QuotesList() {

    const { actualQuote, quotes, loading, isFav, addLocallyToFavorites, listMode } = useQuotes();

    const current = quotes[actualQuote];
    const next = quotes[actualQuote + 1];

    const lan = localStorage.getItem('language');

    if (loading) {
        return (
            <div className='z-10 w-full flex justify-center mt-20'>
                <QuoteCard />
            </div>
        )
    }

    return (
        <div className={`z-10 w-full mt-20 overflow-x-hidden ${listMode == "Swipe" ? " flex justify-center " : "flex flex-col"}`}>
            {
                quotes.length == 0 ? (
                    <h1 className='text-2xl text-[#C5C5C5]'>No quotes found</h1>
                )
                    :
                    listMode == "Swipe" ?
                        current && (
                            <QuoteCard
                                key={current.id}
                                author={current.author}
                                quote={lan == 'es' ? current.text_es : current.text}
                                index={actualQuote}
                            />
                        )
                        :
                        <QuoteCarousel quotes={quotes} />
            }
            {listMode == "Swipe" && next && (
                <QuoteCard
                    key={next.id}
                    author={next.author}
                    quote={lan == 'es' ? next.text_es : next.text}
                    index={actualQuote + 1}
                />
            )}
            {
                quotes.length > 0 &&
                <QuoteActions />
            }
        </div >
    )
}

export default QuotesList