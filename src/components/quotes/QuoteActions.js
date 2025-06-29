'use client'

import { useQuotes } from '@root/context/quotesContext'
import { redirect } from 'next/navigation'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import React, { useState } from 'react'
import { addToast } from '@heroui/toast'
import { addQuoteToFavorites } from '@lib/quotes'
import { useTranslation } from 'react-i18next'

function QuoteActions() {
    const { t } = useTranslation('common')
    const { quotes, actualQuote, listMode, isFav, addLocallyToFavorites } = useQuotes()

    const addToFavorites = async () => {
        try {
            const actualQuoteID = quotes[actualQuote].id
            await addQuoteToFavorites(actualQuoteID)
            await addLocallyToFavorites(quotes[actualQuote])
        } catch (error) {
            console.error("Error adding quote to favorites:", error)
            addToast({
                title: t('error'),
                description: t('error_adding_favorite'),
                color: 'danger',
                timeout: 2000
            })
        }
    }

    const [isCopied, setIsCopied] = useState(false)

    return (
        <div className={`flex flex-col gap-6 items-center ${listMode === "Swipe" ? "mt-[27em]" : "mt-5"}`}>
            <div className='flex gap-6 items-center'>
                <button
                    onClick={() =>
                        navigator.clipboard.writeText(quotes[actualQuote].text).then(() => {
                            setIsCopied(true)
                            setTimeout(() => setIsCopied(false), 2000)
                        })
                    }
                    className={`w-28 h-9 rounded-full border border-slate-500 duration-300 ${isCopied ? 'bg-green-300/40' : 'bg-slate-500/40'}`}
                >
                    {t('copy')}
                </button>
                {isFav ? (
                    <button
                        onClick={addToFavorites}
                        className="aspect-square h-9 bg-slate-500/40 rounded-full border border-slate-500 flex justify-center items-center"
                    >
                        <IconHeartFilled />
                    </button>
                ) : (
                    <button
                        onClick={addToFavorites}
                        className="aspect-square h-9 bg-slate-500/40 rounded-full border border-slate-500 flex justify-center items-center"
                    >
                        <IconHeart />
                    </button>
                )}
            </div>
            <button
                onClick={() => redirect(`/journaling?start=Reflect about this quote: ${quotes[actualQuote].text}`)}
                className="w-fit px-6 h-9 rounded-full border border-slate-500 duration-300 bg-slate-500/40"
            >
                {t('reflect_about_this')}
            </button>
        </div>
    )
}

export default QuoteActions
