import { Skeleton } from '@heroui/skeleton';
import { getUsernamesThatCompletedHabit } from '@root/utils/rooms';
import React, { useEffect, useState } from 'react'

function RoomHabitMadeBy({ habitID }) {

    const [loading, serLoading] = useState(true);
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {

        const loadUsernames = async () => {
            const usernames = await getUsernamesThatCompletedHabit(habitID);
            setUsernames(usernames);
            serLoading(false);
        };
        loadUsernames();

    }, []);

    if (loading) return (
        <div className='w-full flex items-center gap-6'>
            <span className='w-10'></span>
            <Skeleton className='w-full rounded-xl'>
                <div className='w-full bg-[#242424] rounded-xl p-1'>
                    <span className='text-[#C5C5C5] text-sm'>{
                        usernames.length == 0 ? 'Be the first to complete this habit' :
                            usernames.join(', ')
                    } </span>
                </div>
            </Skeleton>
        </div>
    )

    return (
        <div className='w-full flex items-center gap-6'>
            <span className='w-10'></span>
            <div className='w-full bg-[#242424] rounded-xl p-1'>
                <span className='text-[#C5C5C5] text-sm'>{
                    usernames.length == 0 ? 'Be the first to complete this habit' :
                        "Completed by: " +
                        usernames.join(', ')
                } </span>
            </div>
        </div>
    )
}

export default RoomHabitMadeBy