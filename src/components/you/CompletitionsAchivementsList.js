import React from 'react'
import { IconAxisX, IconCheck, IconX } from '@tabler/icons-react';

function CompletitionsAchivementsList({ achievements = [], achivements = [], loading = false }) {

    return (
        <ul className='flex gap-4 overflow-x-auto'>
            {
                achievements.map((a, i) => {

                    const isCompleted = achivements.some((achivement) => achivement === a.name);

                    return <li key={i} className='relative p-3 min-w-42 overflow-auto  bg-[#242424] rounded-2xl border border-[#616161]'>
                        <h3 className='font-bold text-white text-base'>{a.name}</h3>
                        <p className='text-sm'>{a.description}</p>
                        {
                            loading ? (
                                <p className='text-sm text-[#C5C5C5]'>Loading...</p>
                            )
                                :
                                (
                                    <span className={`w-6 flex items-center justify-center aspect-square rounded-full absolute bottom-4 right-4 z-20 
                                                ${isCompleted ? 'bg-green-600' : 'bg-[#242424] border border-[#616161]'}`}

                                    >
                                        {
                                            isCompleted ?
                                                <IconCheck />
                                                :
                                                <IconX />
                                        }
                                    </span>
                                )
                        }
                    </li>
                })
            }
        </ul>
    )
}

export default CompletitionsAchivementsList