'use client'

import HabitContainer from "@components/HabitContainer"
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
              habitID={habit.id}
              habitName={habit.name}
              personToBe={habit.personToBe}
            />
          ))
        )
      }
    </div>
  );
}

export default HabitsList;
