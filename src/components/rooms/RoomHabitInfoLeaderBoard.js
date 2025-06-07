import { Skeleton } from '@heroui/skeleton';
import { getLeaderBoardInfoOfHabit } from '@lib/rooms';
import { getUserInformation } from '@lib/user';
import { IconFlame, IconMedal } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'

function RoomHabitInfoLeaderBoard({ habitID, roomID }) {

    const [loading, setLoading] = useState(true);
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [username, setUsername] = useState(null);

    const getCurrentStreak = (dates) => {
        let currentStreak = 0;

        for (let i = 0; i < dates.length - 1; i++) {
            const current = new Date(dates[i]);
            const next = new Date(dates[i + 1]);
            if (current.getDate() + 1 === next.getDate()) {
                currentStreak += 1;
            } else {
                break;
            }
        }
        return currentStreak;
    }


    useEffect(() => {
        const loadLeaderBoard = async () => {
            const leaderBoard = await getLeaderBoardInfoOfHabit(habitID, roomID);
            const leaderBoardAgrupado = leaderBoard.reduce((acc, { userID, record_date, status }) => {
                if (!status) return acc; // solo incluir si status es true
                if (!acc[userID]) {
                    acc[userID] = [];
                }
                if (!record_date) return acc;
                acc[userID].push(record_date);
                return acc;
            }, {});

            const finalLeaderBoard = Object.entries(leaderBoardAgrupado).map(([userID, record_dates]) => ({
                name: userID,
                points: record_dates.length,
                streak: getCurrentStreak(record_dates),
            }));

            const sortedUsers = finalLeaderBoard.toSorted((a, b) => b.points - a.points);
            setLeaderBoard(sortedUsers);
        }
        const loadUsername = async () => {
            const userData = await getUserInformation()
            setUsername(userData.username);
        }
        loadUsername();
        loadLeaderBoard();
        setLoading(false);
    }, [])



    return (
        <div className='w-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl mt-10'>

            <h2 className='text-2xl text-[#C5C5C5] text-center my-2 '>
                Completion Leaderboard
            </h2>
            {
                loading ? (
                    <Skeleton>
                        <div className='w-full h-full flex items-center justify-center'>
                        </div>
                    </Skeleton>
                ) :
                    <ul className='flex flex-col w-full aspect-square'>
                        {
                            leaderBoard.map((user, index) => {

                                const isFirst = index === 0;
                                const isMe = user.name === username;
                                return (
                                    <li key={user.name}
                                        className={`
                                        w-full flex items-center justify-between px-4 py-2 border-b border-[#616161]
                                        ${isMe && 'bg-[#626262]'
                                            }
                                        `}>

                                        <div className="flex gap-2 items-center h-full">
                                            <span className="text-[#C5C5C5]">
                                                {
                                                    isFirst ? <IconMedal size={18} color='#C7B63B' /> :
                                                        <span className='mr-2'>{index + 1}</span>
                                                }
                                            </span>
                                            <span>{user.name}</span>
                                        </div>
                                        <div className="flex gap-2 items-center h-full">
                                            <span className='border-r-2 border-[#616161] px-2'>
                                                {user.points}
                                            </span>

                                            <span className='flex gap-1 items-center className="text-[#C5C5C5]"'>{user.streak} <IconFlame size={18} color='#C7B63B' /> </span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        <li className='opacity-50 w-full flex items-center justify-between px-4 py-2 border-b border-[#616161]'>
                            <span className="w-full text-center"> No more members </span>
                        </li>

                    </ul>}
        </div>
    )
}

export default RoomHabitInfoLeaderBoard