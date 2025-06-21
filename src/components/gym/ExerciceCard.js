import { IconBarbell } from '@tabler/icons-react'
import React from 'react'

function ExerciceCard({ exercice }) {
    return (
        <div className='relative w-full p-3 bg-[#242424] border border-[#616161] rounded-2xl flex flex-col gap-2'>
            <IconBarbell size={36} className='text-[#616161] absolute top-3 right-3' />

            <h2 className='text-2xl font-bold'>
                {exercice.name}
            </h2>
            <span>
                {exercice.sets} series - {exercice.reps} repetitions
            </span>

            <button className='w-full mt-4 h-8 bg-[#454545] rounded-2xl flex items-center justify-center gap-2'>
                Edit
            </button>

        </div>
    )
}

export default ExerciceCard