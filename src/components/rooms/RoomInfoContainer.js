'use client'
import React from 'react'
import RoomHabitContainer from './RoomHabitContainer'
import { IconInfoCircle, IconMessage } from '@tabler/icons-react'
import EditRoomInfoModal from './EditRoomInfoModal'
import { useDisclosure } from "@heroui/react";
import { motion } from "motion/react"
import { redirect } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function RoomInfoContainer({ roomInfo, habits, isAdmin }) {
    const { t } = useTranslation('common')
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className='w-full my-4' key={roomInfo.id}>
            <div className='w-full flex justify-between items-center'>
                <div className='flex flex-col'>
                    <h2 className='text-3xl text-white font-bold'>{roomInfo.name}</h2>
                    <p className='text-base text-[#C5C5C5]'>{roomInfo.description}</p>
                </div>
                <div className='flex gap-2'>
                    <button
                        aria-label={t('roomInfoContainer_button_chat_aria_label')}
                        onClick={() => {
                            redirect("/rooms/chat/" + roomInfo.id)
                        }}
                        className='w-10 h-10 bg-[#616161] rounded-full flex items-center justify-center'
                    >
                        <IconMessage className='w-8 h-8 text-white' />
                    </button>
                    <button
                        aria-label={t('roomInfoContainer_button_info_aria_label')}
                        onClick={onOpen}
                        className='w-10 h-10 bg-[#616161] rounded-full flex items-center justify-center'
                    >
                        <IconInfoCircle className='w-8 h-8 text-white' />
                    </button>
                </div>
                <EditRoomInfoModal
                    isAdmin={isAdmin}
                    roomLink={roomInfo.code}
                    roomID={roomInfo.id}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onOpenChange}
                    defName={roomInfo.name}
                    defDescription={roomInfo.description}
                    habitID={roomInfo.id}
                />
            </div>
            <ul className='flex flex-col gap-4 mt-4'>
                {habits.map((habit) => (
                    <RoomHabitContainer key={habit.id} habit={habit} />
                ))}
            </ul>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { redirect(`/rooms/addHabit/${roomInfo.id}`) }}
                className="mt-6 w-full h-10 bg-[#242424] rounded-xl border border-[#616161] flex items-center justify-center gap-2"
            >
                <span className="text-[#C5C5C5] text-lg">
                    {t('roomInfoContainer_addHabit_button_text')}
                </span>
            </motion.button>
        </div>
    )
}

export default RoomInfoContainer
