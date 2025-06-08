import { addToast } from '@heroui/toast';
import { getBasicInfoFromPublicRooms } from '@lib/rooms';
import React, { useEffect, useState } from 'react'
import PublicRoomContainer from './PublicRoomContainer';

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

    if (loading) {
        return (
            <div className='flex flex-col gap-4 my-4'>
                <h2 className='text-[#C5C5C5] font-bold text-xl'>
                    Loading...
                </h2>
            </div>
        )
    }

    return (
        <div>
            <h2 className='font-bold text-[#C5C5C5] text-3xl mt-10'> Public rooms </h2>

            {
                publicRooms &&
                    publicRooms.length === 0 ?
                    <span className='text-[#C5C5C5]'> No public rooms found </span> :
                    publicRooms.map((room) => (
                        <PublicRoomContainer key={room.name} room={room} />
                    ))
            }
        </div>
    )
}

export default RoomsPublicList