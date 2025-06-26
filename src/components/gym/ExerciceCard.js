import { IconBarbell } from '@tabler/icons-react'
import React from 'react'
import EditExerciceModal from './EditExerciceModal'
import { useDisclosure } from '@heroui/modal'
import { redirect } from 'next/navigation'

function ExerciceCard({ exercice }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <div className='relative w-full p-3 bg-[#242424] border border-[#616161] rounded-2xl flex flex-col gap-2'>
            <IconBarbell size={36} className='text-[#616161] absolute top-3 right-3' />

            <h2 className='text-2xl font-bold w-[90%]'>
                {exercice.name}
            </h2>
            <span>
                {exercice.sets} series - {exercice.reps} repetitions
            </span>

            <button
                onClick={() => redirect(`/gym/exercice/${exercice.id}`)}
                className='w-full mt-4 h-8 bg-[#454545] rounded-2xl flex items-center justify-center gap-2'>
                View info
            </button>

            <button
                onClick={onOpen}
                className='w-full h-8 bg-[#454545]/50 rounded-2xl flex items-center justify-center gap-2'>
                Edit
            </button>



            <EditExerciceModal exerciceID={exercice.id} defName={exercice.name} defSets={exercice.sets} defReps={exercice.reps} isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    )
}

export default ExerciceCard