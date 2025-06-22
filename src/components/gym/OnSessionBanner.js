import { useGym } from '@root/context/gymContext'
import { IconArrowRight } from '@tabler/icons-react'
import React from 'react'

function OnSessionBanner() {

    const { session } = useGym()

    if (!session) return

    return (
        <a
            href={`/gym/onSession/${session.workoutID}`}
            className='flex items-center justify-between w-full p-3 my-4 bg-[#1E1E1E] rounded-2xl '>
            <h2 className='text-2xl'>
                You are currently working on a session.
            </h2>
            <IconArrowRight size={32} className='text-white' />
        </a>
    )
}

export default OnSessionBanner