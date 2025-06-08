'use client'

import React from 'react'
import { IconArrowLeft } from '@tabler/icons-react'
function Title() {
    return (
        <div className="m-4 flex items-center gap-2">
            <button onClick={() => window.history.back()}>
                <IconArrowLeft className="text-white" size={32} />
            </button>
            <h1 className="text-white text-2xl font-bold ">
                <a href="/habits">Habits.</a></h1>
        </div>
    )
}

export default Title