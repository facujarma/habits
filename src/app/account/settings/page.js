import Header from '@root/sections/Header'
import React from 'react'

function page() {
    return (
        <div>
            <Header title="Settings" text="Manage your account settings." />
            <ul className='flex flex-col'>
                <li className='border-b border-[#616161] text-xl text-[#C5C5C5] pb-3'>
                    Change Email
                </li>
            </ul>
        </div>
    )
}

export default page