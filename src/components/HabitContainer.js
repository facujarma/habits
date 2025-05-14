'use client'

import { useState, useEffect } from "react"
import { getHabitStatus } from "@root/utils/habits"
import { markHabitAsComplete, markHabitAsIncomplete } from "@root/utils/habits"
import { addToast, Spinner } from "@heroui/react";
import { IconCheck } from "@tabler/icons-react";
import { motion } from "motion/react"
function HabitContainer({ habitID, habitName, habitIcon, personToBe }) {

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchHabits = async () => {
      setLoading(true);

      try {
        const status = await getHabitStatus(habitID);
        setStatus(status);
      } catch (error) {
        addToast({
          title: "Error",
          description: "Ha ocurrido un error al obtener el estado del hábito.",
          color: "danger",
          timeout: 2000

        })
      }
      setLoading(false);
    };
    fetchHabits();
  }, []);

  const handleClick = async () => {
    setLoading(true);

    if (status == true) {
      try {
        await markHabitAsIncomplete(habitID);
        setStatus(false);
      }
      catch (error) {
        addToast({
          title: "Error",
          description: "Ha ocurrido un error al marcar el hábito como incompleto.",
          color: "danger",
          timeout: 2000

        })
      }
    }
    else {
      setLoading(true);
      try {
        await markHabitAsComplete(habitID);
        setStatus(true);
      }
      catch (error) {
        addToast({
          title: "Error",
          description: "Ha ocurrido un error al marcar el hábito como completo.",
          color: "danger",
          timeout: 2000

        })
      }

    }

    setLoading(false);
  }

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
        onClick={handleClick}
        className={`flex items-center p-3 h-full w-full border border-[#616161] rounded-xl cursor-pointer ${status ? "bg-blue-700" : "bg-[#242424]"}`}

      >

        <div className="w-full flex flex-col">
          <h3 className="text-2xl font-bold text-[#C5C5C5]">
            {habitName}
          </h3>
          <span className="text-base text-[#C5C5C5]"> {personToBe} </span>
        </div>
      </motion.div>

    </div >
  )
}

export default HabitContainer