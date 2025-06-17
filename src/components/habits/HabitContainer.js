'use client'

import { useState, useEffect } from "react"
import { markHabitAsComplete, getHabitStatus, markHabitAsIncomplete } from "@lib/habits"
import { addToast, Spinner } from "@heroui/react";
import { IconCheck } from "@tabler/icons-react";
import { motion } from "motion/react"
import HabitContainerMenu from "./HabitContainerMenu";
import { hexToRgba } from "@lib/color";
import { useHabits } from "@root/context/habitContext";
import IconRenderer from "@components/IconRenderer";
import { getUTCRangeForToday } from "@root/utils/TimesToBack";
import { changeUserStats } from "@root/utils/achievementsManager";
function HabitContainer({ habitID, habitName, habitIcon, personToBe, color }) {

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const { updateHabit } = useHabits();
  useEffect(() => {
    const fetchHabits = async () => {
      setLoading(true);

      try {
        const todayRange = getUTCRangeForToday(); // CHANGE
        console.log(todayRange);
        const status = await getHabitStatus(habitID, todayRange);
        setStatus(status);
      } catch (error) {
        addToast({
          title: "Error",
          description: "An error occurred while getting the habits.",
          color: "danger",
          timeout: 2000
        })
        console.log(error)
      }
      setLoading(false);
    };
    fetchHabits();
  }, []);

  const handleClick = async () => {
    setLoading(true);

    if (status) {
      try {
        const todayRange = getUTCRangeForToday(); // CHANGE
        await markHabitAsIncomplete(habitID, todayRange);
        await updateHabit(habitID, { status: false });
        setStatus(false);
      }
      catch (error) {
        addToast({
          title: "Error",
          description: "Ha ocurrido un error al marcar el hábito como incompleto.",
          color: "danger",
          timeout: 2000
        })
        console.log(error)
      }
    }
    else {
      setLoading(true);
      try {
        const todayRange = getUTCRangeForToday();
        await markHabitAsComplete(habitID, todayRange);
        await updateHabit(habitID, { status: true });
        setStatus(true);
      }
      catch (error) {
        addToast({
          title: "Error",
          description: "Ha ocurrido un error al marcar el hábito como completo.",
          color: "danger",
          timeout: 2000
        })
        console.log(error)
      }

    }
    const newAchievements = await changeUserStats(status ? -1 : 1);
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
    setLoading(false);
  }


  const backgroundColor = hexToRgba(color, 0.37)

  return (
    <div className="w-full h-24 flex items-center gap-6 ">
      {
        loading ? (
          <Spinner color="primary" />
        ) :
          <button className="w-10 aspect-square bg-[#242424] border border-[#616161] rounded-full text-white flex items-center justify-center">
            {
              status && (
                <IconCheck size={32} />
              )
            }
          </button>
      }
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", bounce: 0.5 },
        }}
        className={`flex items-center  h-full w-full border  rounded-xl cursor-pointer ${!status && "bg-[#242424] border-[#616161]"}`}
        style={status && { backgroundColor, borderColor: color }}
      >
        <IconRenderer iconName={habitIcon} color={"white"} />
        <button className="w-full flex flex-col p-3 items-start "
          onClick={handleClick}
        >
          <h3 className="text-start text-2xl font-bold text-[#C5C5C5]">
            {habitName}
          </h3>
          <span className="text-base text-[#C5C5C5]"> {personToBe} </span>
        </button>
        <HabitContainerMenu habitID={habitID} />
      </motion.div>

    </div >
  )
}

export default HabitContainer