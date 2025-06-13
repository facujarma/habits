import React, { useEffect, useState } from 'react'
import { IconCheck } from '@tabler/icons-react'
import { motion } from 'motion/react'
import { hexToRgba } from '@lib/color';
import NegativeContainerMenu from './NegativeContainerMenu';
import { getNegativeStatus, markNegativeAsComplete, markNegativeAsIncomplete } from '@lib/negativeHabit';
import { addToast } from '@heroui/toast';
import { Spinner } from '@heroui/spinner';
import { useNegativeHabits } from '@root/context/negativeHabitContext';
import { getUTCRangeForToday } from '@root/utils/TimesToBack';

function NegativeHabitContainer({ negative }) {

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const { updateNegativeHabit } = useNegativeHabits();
    useEffect(() => {
        const getStatus = async () => {

            try {
                const today = getUTCRangeForToday();
                const sta = await getNegativeStatus(negative.id, today);
                setStatus(sta);
            }
            catch (e) {
                addToast({
                    title: "Error",
                    description: "An error occurred while getting the status.",
                    color: "danger",
                    timeout: 2000
                })
                console.log(e)
            }
            setLoading(false);

        }
        getStatus();
    }, [negative.id, getUTCRangeForToday]);

    const handleClick = async () => {
        setLoading(true);

        if (status) {
            try {
                const today = getUTCRangeForToday();

                await markNegativeAsIncomplete(negative.id, today);
                await updateNegativeHabit(negative.id, { status: false });
                setStatus(false);

            }
            catch (error) {
                addToast({
                    title: "Error",
                    description: "An error occurred while setting the status.",
                    color: "danger",
                    timeout: 2000
                })
                console.log(error)

            }
        }
        else {
            try {
                const today = getUTCRangeForToday();

                await markNegativeAsComplete(negative.id, today);
                await updateNegativeHabit(negative.id, { status: true });
                setStatus(true);
            }
            catch (error) {
                addToast({
                    title: "Error",
                    description: "An error occurred while setting the status.",
                    color: "danger",
                    timeout: 2000
                })
                console.log(error)
            }

        }
        setLoading(false);
    }
    const backgroundColor = hexToRgba(negative.color, 0.37)

    return (
        <div className="w-full flex h-36 items-center gap-6 ">
            <button className="w-10 aspect-square bg-[#242424] border border-[#616161] rounded-full text-white flex items-center justify-center">
                {
                    loading ? (
                        <Spinner color="primary" />
                    ) :
                        <div className="w-10 aspect-square bg-[#242424] border border-[#616161] rounded-full text-white flex items-center justify-center">
                            {
                                status && (
                                    <IconCheck size={32} />
                                )
                            }
                        </div>
                }
            </button>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center  h-full w-full border  rounded-xl cursor-pointer ${!status && "bg-[#242424] border-[#616161]"}`}
                style={status && { backgroundColor, borderColor: negative.color }}

            >
                <button className="w-full flex flex-col p-3 items-start"
                    onClick={handleClick}
                >
                    <h3 className="text-start text-2xl font-bold text-[#C5C5C5]">
                        {negative.bad_habit}
                    </h3>
                    <p className="text-base text-[#C5C5C5]"> Instead you have to: </p>
                    <div className='w-full px-2 py-1 bg-[#242424] border border-[#616161] rounded-full mt-3'>
                        <p className="text-base text-[#C5C5C5] text-left w-full"> {negative.good_habit} </p>
                    </div>

                </button>
                <NegativeContainerMenu negativeID={negative.id} />
            </motion.div>

        </div >
    )
}

export default NegativeHabitContainer