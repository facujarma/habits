'use client'

import { IconCheck, IconTrophyFilled, IconX } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { getChallengeStatus, markChallengeAsDone, markChallengeAsNotDone } from '@root/utils/challenges'
import { Spinner } from '@heroui/react'
import { addToast } from '@heroui/toast'
import { changeUserChallengeStats } from '@root/utils/achievementsManager'

function ChallengeCard({ challenge }) {

    const [isCompleted, setIsCompleted] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadChallengeStatus = () => {
            try {

                getChallengeStatus(challenge.id).then((status) => {
                    setIsCompleted(status)
                });
            }
            catch (e) {
                addToast({ title: "Error", description: "There was an error getting the challenge status", color: "danger", timeout: 2000 });
                console.log(e)
            }
            finally {
                setIsLoading(false)
            }
        }
        loadChallengeStatus()
    }, [challenge.id])

    const handleClick = async () => {
        setIsLoading(true)

        if (isCompleted) {
            try {

                await markChallengeAsNotDone(challenge.id)
                setIsCompleted(false)
            }
            catch {
                addToast({ title: "Error", description: "There was an error changing the challenge status", color: "danger", timeout: 2000 });
            }
        }
        else {
            try {

                await markChallengeAsDone(challenge.id)
                setIsCompleted(true)
            }
            catch {
                addToast({ title: "Error", description: "There was an error changing the challenge status", color: "danger", timeout: 2000 });
            }
        }

        const newAchievements = await changeUserChallengeStats(isCompleted ? 0 : 1);
        if (newAchievements.length > 0) {
            {
                newAchievements.forEach((a) => {
                    addToast({
                        title: "Congratulations!",
                        description: `You unlocked ${a.name}`,
                        color: "success",
                        timeout: 2000
                    })
                })
            }
        }
        setIsLoading(false);
    }

    return (
        <li>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleClick()}
                className='relative bg-[#242424] border border-[#616161] rounded-2xl p-4 text-left'>
                <div className='flex items-center gap-4'>
                    <IconTrophyFilled className='text-[#C7B63B]' size={32} />
                    <h4 className='font-bold text-white text-xl w-3/4'>
                        {challenge.text}
                    </h4>
                </div>
                <div className='absolute bottom-2 right-2'>
                    {
                        isLoading ?
                            <Spinner /> :
                            isCompleted ?
                                <IconCheck className='text-green-500' />
                                :
                                <IconX className='text-red-500' />
                    }
                </div>
            </motion.button>
        </li>
    )
}

export default ChallengeCard