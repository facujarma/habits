'use client'

import { getUserInformation } from '@root/utils/user';
import React, { useEffect, useState } from 'react'

function HomeNavbar() {

    const [user, setUser] = useState(null)
    useEffect(() => {
        const getUser = async () => {
            const user = await getUserInformation();
            setUser(user);
        }
        getUser()
    }, [])

    return (
        <navbar className='flex justify-between w-screen fixed h-14 bg-[#0D0D0D] top-0 left-0 px-12 items-center'>
            <h2 className='text-2xl'>Habits.</h2>
            <ul className='flex gap-4 items-center'>
                {
                    user ? (
                        <li className='text-lg text-[#D9D9D9]'>{user.username}</li>
                    )
                        :
                        <>
                            <li>
                                <a href='/auth/login'>Log in</a>
                            </li>
                            <li>
                                <a href='/auth/signup' className='bg-[#D9D9D9] rounded-2xl py-2 px-4 text-black' >Sign up</a>
                            </li>
                        </>
                }
            </ul>
        </navbar>)
}

export default HomeNavbar