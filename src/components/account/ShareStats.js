'use client'

import React from 'react'
import AccountCard from './AccountCard'
import Button from '../Button'
function ShareStats() {
    return (
        <>
            <AccountCard />
            <p className='text-[#C5C5C5] text-sm text-center mt-4'>
                12 habits built and strengthened with Habits.
            </p>
            <div className='w-full my-6'>
                <Button text="Share" />
            </div>
        </>
    )
}

export default ShareStats