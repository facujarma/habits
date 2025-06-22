
import { IconJumpRope } from '@tabler/icons-react'
import React from 'react'

function SessionWorkoutCard({ workout }) {

    return (
        <div className='relative w-full p-3 bg-[#666F9A]/40 border border-[#666F9A] rounded-2xl transition-all'>
            <div className='absolute top-3 right-3'>
                <IconJumpRope className='text-[#666F9A]' size={36} />
            </div>

            <h2 className='text-2xl'>
                {workout.name}
            </h2>
            <span className='mt-2'>{workout.exercicesIDs.length} exercices</span>
            <button className='w-full mt-2 h-8 bg-[#666F9A]/50 rounded-2xl'>
                Finish
            </button>
        </div>
    )
}

export default SessionWorkoutCard
