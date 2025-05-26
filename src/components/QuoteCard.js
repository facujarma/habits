'use client'

import { useQuotes } from '@root/context/quotesContext'
import React, { useState, useRef } from 'react'

function QuoteCard({ quote, author, index }) {

    const { goToNextQuote, actualQuoteRotation, setActualQuoteRotation, actualQuote } = useQuotes()


    const isNextQuote = index == actualQuote + 1

    const isFocus = actualQuote == index
    const [isPressed, setIsPressed] = useState(false)
    const cardRef = useRef(null)

    // Calcula rotación en base a la posición X relativa del mouse dentro de la tarjeta
    const handleMouseMove = (e) => {
        if (!isPressed || !cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const relativeX = e.clientX - rect.left // posición dentro de la tarjeta en px
        const width = rect.width

        // Normalizar posición X en rango [-1, 1]
        const normX = (relativeX / width) * 2 - 1

        // Multiplicar por max grados (ej: 45 grados)
        const maxRotation = 45

        // Ángulo de rotación según posición X, invertido si querés
        const angle = normX * maxRotation

        setActualQuoteRotation(angle)
    }

    const handleMouseDown = () => {
        setIsPressed(true)
    }

    const handleMouseUp = () => {
        if (actualQuoteRotation > 25 || actualQuoteRotation < -25) {
            goToNextQuote()
        }
        setIsPressed(false)
        setActualQuoteRotation(0)
    }

    const getOpacityForNextQuote = (angle) => {
        const opacity = Math.abs(angle) / 60
        return opacity
    }

    const getOpacityForCurrentQuote = (angle) => {
        const opacity = 1 - Math.abs(angle) / 90
        return opacity
    }

    return (
        <div
            ref={cardRef}
            className='w-full max-w-[25em] absolute flex flex-col justify-between items-center bg-[#666F9A]/40 border border-[#666F9A]  aspect-square rounded-2xl p-4 duration-200'
            style={{
                cursor: isFocus ? 'auto' : 'none',
                transformOrigin: 'center bottom',
                transform: isFocus ? `rotateZ(${actualQuoteRotation}deg)` : 'none',
                transition: isPressed
                    ? 'none'
                    : 'transform 0.4s ease, opacity 0.4s ease, border-color 0.4s ease',
                userSelect: 'none',
                opacity: isFocus ? getOpacityForCurrentQuote(actualQuoteRotation) : (
                    isNextQuote ? getOpacityForNextQuote(actualQuoteRotation) : 0
                ),
                zIndex: isFocus ? 1 : 0,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={(e) => {
                setIsPressed(true)
                handleMouseMove(e.touches[0])
            }}
            onTouchMove={(e) => {
                handleMouseMove(e.touches[0])
            }}
            onTouchEnd={handleMouseUp}
            onTouchCancel={handleMouseUp}
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

export default QuoteCard
