import React from 'react'

function AccountCard() {
    return (
        <div className='mt-6 w-full h-40 bg-[#242424] flex rounded-2xl relative'>
            <div className='w-full h-[2px] bg-[#484848] absolute top-1/2 -translate-y-1/2 '>

            </div>
            <div className='w-1/3 flex items-center justify-center z-20'>
                <div className='w-3/4 aspect-square bg-[#668C9A] rounded-full'>

                </div>
            </div>
            <div className='w-2/3 flex flex-col justify-center h-full gap-6'>
                <h2 className='text-2xl text-white'>
                    Facundo Jarma
                </h2>
                <div className='w-full flex flex-col gap-1'>
                    <span className='text-[#C5C5C5]'>Email</span>
                    <span>
                        facundojarma@gmail.com
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AccountCard