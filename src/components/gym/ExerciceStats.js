import React from 'react'

function ExerciceStats({ exerciceData }) {
    return (
        <div className='w-full my-6'>
            <h2 className='text-2xl text-[#C5C5C5]'>
                General stats
            </h2>
            <ul className="flex gap-4 my-4">
                <li className='text-[#C5C5C5] text-xl'>
                    Weight Record:
                </li>
                <li>
                    Repetitions Record:
                </li>
                <li>
                    1RM Record:
                </li>
                <li>
                    Volume Record:
                </li>
            </ul>
        </div>
    )
}

export default ExerciceStats