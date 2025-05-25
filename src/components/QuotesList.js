'use client'

import React, { useEffect, useState } from 'react'
import QuoteCard from './QuoteCard'
import { IconHeart } from '@tabler/icons-react'
import { addQuoteToFavorites } from '@root/utils/quotes'
import { useQuotes } from '@root/context/quotesContext'
import { addToast } from '@heroui/toast'

function QuotesList() {

    const { actualQuote, quotes, loading } = useQuotes();

    const current = quotes[actualQuote];
    const next = quotes[actualQuote + 1];

    if (loading) {
        return (
            <div className='z-10 w-full flex justify-center mt-20'>
                <QuoteCard />
            </div>
        )
    }

    const addToFavorites = async () => {
        try {
            const actualQuoteID = quotes[actualQuote].id;
            await addQuoteToFavorites(actualQuoteID);
        }
        catch (error) {
            console.error("Error al agregar cita a favoritos:", error);
            addToast({
                title: "Error",
                description: "An error occurred while adding the quote to favorites.",
                color: "danger",
                timeout: 2000
            })
        }

    }

    return (
        <div className='z-10 w-full flex justify-center mt-20'>
            {current && (
                <QuoteCard
                    key={current.id}
                    author={current.author}
                    quote={current.text}
                    index={actualQuote}
                />
            )}

            {next && (
                <QuoteCard
                    key={next.id}
                    author={next.author}
                    quote={next.text}
                    index={actualQuote + 1}
                />
            )}
            {
                quotes.length > 0 &&
                <div className='mt-[90vw] flex gap-6 items-center'>
                    <button className="w-28 h-9 bg-slate-500/40 rounded-full border border-slate-500">
                        Share
                    </button >
                    <button
                        onClick={addToFavorites}
                        className="aspect-square h-9 bg-slate-500/40 rounded-full border border-slate-500 flex justify-center items-center">
                        <IconHeart />
                    </button >
                </div>
            }
        </div >
    )
}

export default QuotesList