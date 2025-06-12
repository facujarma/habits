'use client'

import { Skeleton } from '@heroui/skeleton';
import { addToast } from '@heroui/toast';
import { useRooms } from '@root/context/roomsContext';
import { getMembersInfoFromRoom } from '@root/utils/rooms';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MemberContainer from './MemberContainer';

function MembersList({ roomID }) {

    const [members, setMembers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roomInfo, setRoomInfo] = useState({});
    const { rooms } = useRooms();
    useEffect(() => {

        const getMembersInfo = async () => {
            try {
                const data = await getMembersInfoFromRoom(roomID)
                if (data == null) {
                    redirect("/habits")
                }
                rooms.forEach(room => {
                    if (room.room.id == roomID) {
                        setRoomInfo(room.room);
                    }
                })
                const members = data.filter(member => member.role == "MEMBER");
                const admins = data.filter(member => member.role == "ADMIN");

                setMembers(members);
                setAdmins(admins);
                setLoading(false);
            }
            catch {
                addToast({
                    title: "Error",
                    description: "An error occurred while getting members info.",
                    color: "danger",
                    timeout: 2000
                })
            }
        }
        getMembersInfo();

    }, [])


    if (loading) return (
        <div className='flex flex-col gap-4'>
            <Skeleton className="z-20 w-full h-20 rounded-2xl flex items-center justify-between" />
            <Skeleton className="z-20 w-full h-20 rounded-2xl flex items-center justify-between" />
            <Skeleton className="z-20 w-full h-20 rounded-2xl flex items-center justify-between" />
        </div>
    )

    return (
        <div>
            <h2 className='text-2xl text-white font-bold mb-6'>{roomInfo.name}'s members </h2>
            <h3 className='text-xl text-[#C5C5C5] font-bold'>Admins:</h3>
            {
                admins.map((admin, index) => (
                    <div className='w-full flex justify-between items-center my-4 border border-[#616161] bg-[#242424]/40 rounded-2xl p-4' key={index}>
                        <div className='flex flex-col'>
                            <h2 className='text-xl text-white font-bold'>{admin.username}</h2>
                            <p className='text-sm text-[#C5C5C5]'>{admin.role}</p>
                        </div>
                    </div>
                ))
            }
            <h3 className='text-xl text-[#C5C5C5] font-bold'>Members:</h3>

            {
                members.map((member) => (
                    <MemberContainer member={member} key={member.username} />
                ))
            }
        </div>
    )
}

export default MembersList