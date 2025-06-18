import React from 'react'
import Button from '../Button'
import { motion } from 'motion/react'
function DangerZone() {
    return (
        <div>
            <h2 className='text-2xl text-[#C93C3C] '>
                DANGER ZONE
            </h2>
            <div>
                <Button text={"Logout"} />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClick}
                    className="w-full h-14 bg-[#C93C3C] rounded-2xl border border-[#C93C3C]/50 flex items-center justify-center gap-2">
                    {
                        icon &&
                        <span className="w-6 h-6 block text-[#C5C5C5]">
                            {icon}
                        </span>
                    }
                    <span className="text-[#C5C5C5] text-xl">
                        {text}
                    </span>
                </motion.button>            </div>
        </div>
    )
}

export default DangerZone