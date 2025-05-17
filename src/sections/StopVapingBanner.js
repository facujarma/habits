'use client'

import { IconArrowAutofitRight } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { userIsInProgram } from '@root/utils/vape';
import { Skeleton } from '@heroui/skeleton';
function StopVapingBanner() {

    const [isInProgram, setIsInProgram] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getIsInProgram = async () => {

            const isInProgram = await userIsInProgram();
            setIsInProgram(isInProgram);
            setLoading(false);
        }

        getIsInProgram();
    }, []);

    if (loading) {
        return (
            <Skeleton className='mx-auto mt-2 max-w-96 w-full p-2 flex flex-col items-center rounded-2xl'>
                <div className='mx-auto mt-2 max-w-96 w-full bg-[#151A31] border-2 border-[#666F9A] p-2 flex flex-col items-center rounded-2xl'>
                    <Skeleton>
                        <div className='w-full flex justify-between'>
                            <h4 className='font-bold text-white text-lg'>
                                Stop vaping program
                            </h4>
                            <IconArrowAutofitRight />
                        </div>
                    </Skeleton>
                    <p className='text-white text-sm'>
                        Did you smoke today? remember to track your puffs.
                    </p>
                </div>
            </Skeleton>
        )
    }
    if(!isInProgram){
        return null;
    }
    return (
        <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            href='/vape'
            className='mx-auto mt-2 max-w-96 w-full bg-[#151A31] border-2 border-[#666F9A] p-2 flex flex-col items-center rounded-2xl'>
            <div className='w-full flex justify-between'>
                <h4 className='font-bold text-white text-lg'>
                    Stop vaping program
                </h4>
                <IconArrowAutofitRight />
            </div>
            <p className='text-white text-sm'>
                Did you smoke today? remember to track your puffs.
            </p>
        </motion.a>
    )
}

export default StopVapingBanner