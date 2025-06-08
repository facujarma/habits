'use client'

import React from 'react'
import QuoteCard from './QuoteCard'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { addQuoteToFavorites } from '@lib/quotes'
import { useQuotes } from '@root/context/quotesContext'
import { addToast } from '@heroui/toast'
import { redirect } from 'next/navigation'

function QuotesList() {

    const { actualQuote, quotes, loading, isFav, addLocallyToFavorites } = useQuotes();

    const current = quotes[actualQuote];
    const next = quotes[actualQuote + 1];

    const addToFavorites = async () => {
        try {
            const actualQuoteID = quotes[actualQuote].id;
            await addQuoteToFavorites(actualQuoteID);
            await addLocallyToFavorites(quotes[actualQuote])

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

    const [isCopied, setIsCopied] = React.useState(false);

    if (loading) {
        return (
            <div className='z-10 w-full flex justify-center mt-20'>
                <QuoteCard />
            </div>
        )
    }

    return (
        <div className='z-10 w-full flex justify-center mt-20'>
            {
                quotes.length == 0 ? (
                    <h1 className='text-2xl text-[#C5C5C5]'>No quotes found</h1>
                )
                    :
                    current && (
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
                <div className='mt-[27em] flex flex-col gap-6 items-center'>
                    <div className='flex gap-6 items-center'>
                        <button
                            onClick={() => navigator.clipboard.writeText(quotes[actualQuote].text).then(() => {
                                setIsCopied(true);
                                setTimeout(() => {
                                    setIsCopied(false);
                                }, 2000);
                            })}
                            className={`w-28 h-9 rounded-full border border-slate-500 duration-300 ${isCopied ? 'bg-green-300/40' : 'bg-slate-500/40'}`}>
                            Copy
                        </button >
                        {
                            isFav ?
                                <button
                                    onClick={addToFavorites}
                                    className="aspect-square h-9 bg-slate-500/40 rounded-full border border-slate-500 flex justify-center items-center">
                                    <IconHeartFilled />
                                </button >
                                :
                                <button
                                    onClick={addToFavorites}
                                    className="aspect-square h-9 bg-slate-500/40 rounded-full border border-slate-500 flex justify-center items-center">
                                    <IconHeart />
                                </button >
                        }
                    </div>
                    <button
                        onClick={() => redirect(`/journaling?start=Reflect about this quote: ${quotes[actualQuote].text}`)}
                        className={`w-fit px-6 h-9 rounded-full border border-slate-500 duration-300 ${isCopied ? 'bg-green-300/40' : 'bg-slate-500/40'}`}>
                        Reflect about this
                    </button >
                </div>
            }
        </div >
    )
}

export default QuotesList