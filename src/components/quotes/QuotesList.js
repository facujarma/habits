'use client'

import React, { useEffect, useState } from 'react'
import QuoteCard from './QuoteCard'
import { useQuotes } from '@root/context/quotesContext'
import QuoteCarousel from './QuoteCarrousel'
import QuoteActions from './QuoteActions'
import { useTranslation } from 'react-i18next'

function QuotesList() {
    const { t } = useTranslation('common')
    const { actualQuote, quotes, loading, listMode } = useQuotes()

    const current = quotes[actualQuote]
    const next = quotes[actualQuote + 1]

    const [lan, setLan] = useState("en")

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language")
        if (storedLanguage) {
            setLan(storedLanguage)
        }
    }, [])

    if (loading) {
        return (
            <div className='z-10 w-full flex justify-center mt-20'>
                <QuoteCard />
            </div>
        )
    }

    return (
        <div className={`z-10 w-full mt-20 overflow-x-hidden ${listMode === "Swipe" ? " flex justify-center " : "flex flex-col"}`}>
            {quotes.length === 0 ? (
                <h1 className='text-2xl text-[#C5C5C5]'>{t('no_quotes_found')}</h1>
            ) : listMode === "Swipe" ? (
                current && (
                    <QuoteCard
                        key={current.id}
                        author={current.author}
                        quote={lan === 'es' ? current.text_es : current.text}
                        index={actualQuote}
                    />
                )
            ) : (
                <QuoteCarousel quotes={quotes} />
            )}
            {listMode === "Swipe" && next && (
                <QuoteCard
                    key={next.id}
                    author={next.author}
                    quote={lan === 'es' ? next.text_es : next.text}
                    index={actualQuote + 1}
                />
            )}
            {quotes.length > 0 && <QuoteActions />}
        </div>
    )
}

export default QuotesList
