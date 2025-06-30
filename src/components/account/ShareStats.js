'use client'

import React, { useEffect, useState } from 'react'
import AccountCard from './AccountCard'
import Button from '../Button'
import { getNumberOfHabits } from '@root/utils/user'
import { addToast } from '@heroui/toast'
import { useTranslation } from 'react-i18next'

function ShareStats() {
    const { t } = useTranslation('common')

    const [habits, setHabits] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadHabits = async () => {
            try {
                const n = await getNumberOfHabits()
                setHabits(n)
            } catch (error) {
                console.log(error)
                addToast({
                    title: "Error",
                    description: "An error occurred while getting the habits.",
                    color: "danger",
                    timeout: 2000
                })
            } finally {
                setLoading(false)
            }
        }
        loadHabits()
    }, [])

    return (
        <>
            <AccountCard />
            <p className='text-[#C5C5C5] text-sm text-center my-4'>
                {loading ? t('loading') : t('habits_built', { count: habits })}
            </p>
        </>
    )
}

export default ShareStats
