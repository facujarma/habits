'use client'

import { Skeleton } from '@heroui/skeleton';
import { getUsernamesThatCompletedHabit } from '@lib/rooms';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function RoomHabitMadeBy({ habitID }) {
    const { t } = useTranslation('common')

    const [loading, setLoading] = useState(true);
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        const loadUsernames = async () => {
            const usernames = await getUsernamesThatCompletedHabit(habitID);
            setUsernames(usernames);
            setLoading(false);
        };
        loadUsernames();
    }, [habitID]);

    if (loading) return (
        <div className='w-full flex items-center gap-6'>
            <span className='w-10'></span>
            <Skeleton className='w-full rounded-xl'>
                <div className='w-full bg-[#242424] rounded-xl p-1'>
                    <span className='text-[#C5C5C5] text-sm'>
                        {usernames.length === 0
                            ? t('roomHabitMadeBy_loading_firstToComplete')
                            : usernames.join(', ')}
                    </span>
                </div>
            </Skeleton>
        </div>
    )

    return (
        <div className='w-full flex items-center gap-6'>
            <span className='w-10'></span>
            <div className='w-full bg-[#242424] rounded-xl p-1'>
                <span className='text-[#C5C5C5] text-sm'>
                    {usernames.length === 0
                        ? t('roomHabitMadeBy_loading_firstToComplete')
                        : t('roomHabitMadeBy_completedBy') + usernames.join(', ')}
                </span>
            </div>
        </div>
    )
}

export default RoomHabitMadeBy
