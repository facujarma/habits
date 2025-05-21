import React from 'react'

function AdviceEditHabitPage( { advices } ) {

    return (
        <div>
            <h3 className='text-[#C5C5C5] text-xl mt-16 mb-4'>How to make an habit easier to do?</h3>
            <ul className='flex flex-col gap-4 pb-4'>
                {
                    advices.map((advice) => {
                        return (
                            <li key={advice.id} className='w-full bg-[#242424] border border-[#616161] rounded-2xl p-2'>
                                <h3 className='font-bold text-white text-base'> {advice.title} </h3>
                                <p className='text-sm'> {advice.description} </p>
                            </li>
                        )
                    })
                }
            </ul>


        </div>
    )
}

export default AdviceEditHabitPage