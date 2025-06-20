'use client'

import React from 'react'
import Button from '../Button'
import { motion } from 'motion/react'
import { IconTrash } from '@tabler/icons-react'
import { logOut } from '@root/utils/user'
function DangerZone() {

    const logout = async () => {
        await logOut()
        window.location.href = "/auth/login"
    }

    return (
        <div className='mt-6 pb-4'>
            <h2 className='text-2xl text-[#C93C3C] '>
                DANGER ZONE
            </h2>
            <div className='my-6 flex flex-col gap-6 '>
                <Button text={"Logout"} handleClick={logout} />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}

                    className="w-full h-14 bg-[#C93C3C]/50 rounded-2xl border border-[#C93C3C] flex items-center justify-center gap-2">

                    <span className="w-6 h-6 block text-[#C5C5C5]">
                        <IconTrash />
                    </span>

                    <span className="text-[#C5C5C5] text-xl">
                        Delete Account
                    </span>
                </motion.button>
            </div>
        </div>
    )
}

export default DangerZone