'use client'

import { IconMenu, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'

function ExpansibleMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            {/* Botón menú flotante */}
            <button onClick={() => setIsOpen(true)} className=" z-50">
                <IconMenu className="text-white" size={40} />
            </button>

            {/* Fondo semitransparente detrás del menú */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40"
                />
            )}

            {/* Menú lateral */}
            <div
                className={`fixed top-0 right-0 h-screen w-64 bg-[#1f1f1f] z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Botón cerrar */}
                <button onClick={() => setIsOpen(false)} className="absolute top-4 left-4">
                    <IconX className="text-white" size={28} />
                </button>

                {/* Contenido del menú */}
                <ul className="mt-16 px-6 text-white flex flex-col gap-4">
                    <li className="cursor-pointer hover:underline">
                        <a href="/habits">Home</a>
                    </li>
                    <li className="cursor-pointer hover:underline">
                        <a href="/you">Progress</a>
                    </li>
                    <li className="cursor-pointer hover:underline">
                        <a href="/account">Account</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ExpansibleMenu
