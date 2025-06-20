'use client'

import HabitContainer from "@habits/HabitContainer"
import HabitContainerSkeleton from "@components/Skeletons/HabitContainerSkeleton"
import { useHabits } from "@/context/habitContext";


function HabitsList() {
  const { habits, loading } = useHabits();

  return (
    <div className="flex flex-col gap-8 pt-6">
      {
        loading ? (
          <>
            <HabitContainerSkeleton key={1} />
            <HabitContainerSkeleton key={2} />
          </>

        ) : (

          habits.length === 0 ? (
            <p className="text-[#C5C5C5] text-base text-center ">
              You don&apos;t have any habits yet.
              <a href="/habits/createHabit" className="text-[#C5C5C5] underline ml-1">Create a new one</a> to start tracking your habits.
            </p>
          ) :

            habits.map((habit) => (
              <HabitContainer
                key={habit.id}
                color={habit.color}
                habitID={habit.id}
                habitName={habit.name}
                personToBe={habit.personToBe}
                habitIcon={habit.icon}
              />
            ))
        )
      }
    </div>
  );
}

export default HabitsList;
