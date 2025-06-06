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
