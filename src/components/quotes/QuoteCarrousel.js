'use client'

import { useEffect, useRef, useState } from "react"
import { useQuotes } from "@root/context/quotesContext"
import QuoteListCard from "./QuoteListCard"

export default function QuoteCarousel() {
    const containerRef = useRef(null)
    const { quotes, setActualQuoteFromIndex } = useQuotes()
    const [lan, setLan] = useState("en")

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language")
        if (storedLanguage) {
            setLan(storedLanguage)
        }
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

                if (visibleEntry) {
                    const index = Number(visibleEntry.target.getAttribute("data-index"))
                    if (!isNaN(index)) {
                        setActualQuoteFromIndex(index) // sincroniza el contexto
                    }
                }
            },
            {
                root: containerRef.current,
                threshold: 0.6,
            }
        )

        const items = containerRef.current?.querySelectorAll(".snap-item")
        items?.forEach((item) => observer.observe(item))

        return () => observer.disconnect()
    }, [quotes, setActualQuoteFromIndex])

    return (
        <div
            ref={containerRef}
            className="overflow-x-auto snap-x snap-mandatory flex gap-4 px-4 scroll-smooth w-full"
        >
            {quotes.map((quote, index) => (
                <div
                    key={quote.id}
                    data-index={index}
                    className="snap-item snap-start shrink-0 w-[80vw]"
                >
                    <QuoteListCard
                        author={quote.author}
                        quote={lan == 'es' ? quote.text_es : quote.text}
                        index={index}
                    />
                </div>
            ))}
        </div>
    )
}
