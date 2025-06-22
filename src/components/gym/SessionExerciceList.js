import React from 'react'
import SessionExerciceCard from './SessionExerciceCard'

function SessionExerciceList({ exercices, sessionID }) {
    return (
        <div className='flex flex-col gap-4 my-6'>
            {
                exercices.map((exercice) => (
                    <SessionExerciceCard key={exercice.id} exercice={exercice} />
                ))
            }
        </div>
    )
}

export default SessionExerciceList