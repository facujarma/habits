'use client'

import React from 'react'
import { usePuff } from '@root/context/puffContext'
function PuffTodayCounting() {

    const { loading, puffs } = usePuff();

    if (loading) {
        return (
            <div className='flex flex-col gap-2 w-full items-center mt-12'>
                <h2 className='font-bold text-[#C5C5C5] text-3xl'>Puffs de hoy:</h2>
                <span className='font-bold text-white text-6xl'>Cargando...</span>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-2 w-full items-center mt-12'>
            <h2 className='font-bold text-[#C5C5C5] text-3xl'>Puffs de hoy:</h2>
            <span className='font-bold text-white text-6xl'>{puffs || 0}</span>

            <div className='w-fit bg-[#151A31] border border-[#666F9A] rounded-full px-3 py-1'>
                <span className="text-[#BEBEBE] text-sm">514 ml nicotina</span>
            </div>

        </div>
    )
}

export default PuffTodayCounting