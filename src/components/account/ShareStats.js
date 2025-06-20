'use client'

import React, { useEffect, useState } from 'react'
import AccountCard from './AccountCard'
import Button from '../Button'
import { getNumberOfHabits } from '@root/utils/user';
import { addToast } from '@heroui/toast';
function ShareStats() {

    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHabits = async () => {
            try {
                const n = await getNumberOfHabits();
                setHabits(n);
                setLoading(false);
            } catch (error) {
                console.log(error);
                addToast({
                    title: "Error",
                    description: "An error occurred while getting the habits.",
                    color: "danger",
                    timeout: 2000
                })
            }
        };
        loadHabits();
    }, []);

    return (
        <>
            <AccountCard />
            <p className='text-[#C5C5C5] text-sm text-center mt-4'>
                {loading ? 'loading...' : habits} habits built and strengthened with Habits.
            </p>
            <div className='w-full my-6'>
                <Button text="Share" />
            </div>
        </>
    )
}

export default ShareStats