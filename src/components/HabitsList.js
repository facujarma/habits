'use client'

import HabitContainer from "@components/HabitContainer"
import { useEffect, useState } from "react"
import { selectHabits } from "@root/utils/habits"
import { Spinner } from "@heroui/spinner";
function HabitsList() {

  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      setLoading(true);
      const habits = await selectHabits();
      setHabits(habits);
      setLoading(false);
    };
    fetchHabits();
  }, []);
  

  return (
    <div className="flex flex-col gap-8 pt-6">
      {
        loading ?
        ( <Spinner color="primary" /> )
        :
        habits.map((habit, index) => {
          return <HabitContainer key={index} habitID={habit.id} habitName={habit.name} personToBe={habit.personToBe} />
        })
      }
    </div>
  )
}

export default HabitsList