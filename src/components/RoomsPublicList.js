import { addToast } from '@heroui/toast';
import { getBasicInfoFromPublicRooms } from '@root/utils/rooms';
import React, { useEffect, useState } from 'react'

function RoomsPublicList() {

    const [publicRooms, setPublicRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublicHabits = async () => {
            try {
                const publicRooms = await getBasicInfoFromPublicRooms(10);
                setPublicRooms(publicRooms);
                setLoading(false);
            } catch (error) {
                console.error(error);
                addToast({
                    title: "Error",
                    description: "An error occurred while getting the public rooms.",
                    color: "danger",
                    timeout: 2000
                })
            }
        }

        fetchPublicHabits()

    }, [])
    return (
        <div>
            <h2 className='font-bold text-[#C5C5C5] text-3xl mt-10'> Public rooms </h2>

            {
                publicRooms &&
                    publicRooms.length === 0 ?
                    <span className='text-[#C5C5C5]'> No public rooms found </span> :
                    publicRooms.map((room) => (
                        <div key={room.name} className='w-full flex justify-between items-center my-4 border border-[#616161] bg-[#242424]/40 rounded-2xl p-4'>
                            <div className='flex flex-col'>
                                <h2 className='text-3xl text-white font-bold'>{room.name}</h2>
                                <p className='text-base text-[#C5C5C5]'>{room.description}</p>
                                <span>Habits: {room.habitsCount}</span>
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default RoomsPublicList