
import { addToast } from '@heroui/toast'
import { useGym } from '@root/context/gymContext'
import { endSession } from '@root/utils/gym'
import { IconJumpRope } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import React from 'react'

function SessionWorkoutCard({ workout }) {

    const { setSession } = useGym()

    const handleEndSession = () => {
        endSession(workout.id).then(
            () => {
                addToast({
                    title: "Success",
                    description: "Session ended",
                    color: "success",
                    timeout: 2000
                })
                setSession(null)
                redirect('/gym')
            }
        )
    }

    return (
        <div className='relative w-full p-3 bg-[#666F9A]/40 border border-[#666F9A] rounded-2xl transition-all'>
            <div className='absolute top-3 right-3'>
                <IconJumpRope className='text-[#666F9A]' size={36} />
            </div>

            <h2 className='text-2xl'>
                {workout.name}
            </h2>
            <span className='mt-2'>{workout.exercicesIDs.length} exercices</span>
            <button onClick={handleEndSession} className='w-full mt-2 h-8 bg-[#666F9A]/50 rounded-2xl'>
                Finish
            </button>
        </div>
    )
}

export default SessionWorkoutCard
