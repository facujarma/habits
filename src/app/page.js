import React from 'react'

function page() {
    return (
        <div className='max-w-7xl my-12'>
            <header className='flex '>
                <div className='w-1/2 flex flex-col gap-6'>
                    <h1 className='text-6xl font-bold'>Habits.</h1>
                    <p className='text-2xl'>
                        The ultimate app to track your habits because we focus on much more than only simple habits.
                    </p>
                    <p className='text-2xl'>
                        The app designed to help you improve every aspect of your life. Completely free.
                    </p>
                    <button className='mt-12 w-1/2 h-14 rounded-2xl font-bold text-xl bg-[#D9D9D9] text-black flex items-center justify-center'>
                        Go to home
                    </button>
                </div>
                <div>
                    <div className='bg-[#878787] rounded-2xl'>
                        <ul>
                            <li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default page