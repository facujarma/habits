'use client'

import { useGym } from '@root/context/gymContext'
import { IconArrowDown, IconArrowUp, IconJumpRope } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

function WorkoutCard({ workout }) {
    const { exercices } = useGym()
    const [exerciceNames, setExerciceNames] = useState([])
    const [showList, setShowList] = useState(false)
    const contentRef = useRef(null)

    useEffect(() => {
        const names = exercices
            .filter(exercice => workout.exercicesIDs.includes(exercice.id))
            .map(exercice => exercice.name)
        setExerciceNames(names)
    }, [exercices, workout.exercicesIDs])

    return (
        <div className='relative w-full p-3 bg-[#666F9A]/40 border border-[#666F9A] rounded-2xl transition-all'>
            <div className='absolute top-3 right-3'>
                <IconJumpRope className='text-[#666F9A]' size={36} />
            </div>

            <h2 className='text-2xl'>
                {workout.name}
            </h2>

            <div className='mt-2'>
                <button
                    onClick={() => setShowList(prev => !prev)}
                    className='text-left text-white hover:underline flex items-center gap-2'
                >
                    {showList ? <IconArrowUp size={20} /> : <IconArrowDown size={20} />}
                    {workout.exercicesIDs.length} exercices
                </button>

                <div
                    className={`transition-max-height duration-500 overflow-hidden`}
                    style={{
                        maxHeight: showList ? contentRef.current?.scrollHeight + 10 + 'px' : '0px',
                    }}
                >
                    <ul
                        ref={contentRef}
                        className='mt-2 list-disc list-inside text-sm text-white/70'
                    >
                        {exerciceNames.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <button className='w-full mt-4 h-8 bg-[#666F9A]/20 rounded-2xl' onClick={() => { redirect("/gym/editWorkout/" + workout.id) }}>
                Edit
            </button>
            <button className='w-full mt-2 h-8 bg-[#666F9A]/50 rounded-2xl' onClick={() => { redirect("/gym/onSession/" + workout.id) }}>
                Use now
            </button>
        </div>
    )
}

export default WorkoutCard
