'use client'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import React, { useRef } from 'react'


function Carrousel({ children }) {
    const scrollRef = useRef(null)

    const scroll = (dir) => {
        if (!scrollRef.current) return
        const container = scrollRef.current
        const scrollAmount = container.clientWidth  // desplaza 80% del ancho

        container.scrollBy({
            left: dir === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        })
    }

    return (
        <div className="w-full relative">
            {/* Botones */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2 z-10">
                <button
                    onClick={() => scroll('left')}
                    className="bg-[#1A1A1A] p-2 rounded-full shadow hover:bg-[#333] transition"
                >
                    <IconArrowLeft size={20} />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="bg-[#1A1A1A] p-2 rounded-full shadow hover:bg-[#333] transition"
                >
                    <IconArrowRight size={20} />
                </button>
            </div>

            {/* Contenido scrollable */}
            <div
                ref={scrollRef}
                className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-2 [scroll-snap-type:'x-mandatory']"
            >
                {children}
            </div>
        </div>
    )
}

export default Carrousel
