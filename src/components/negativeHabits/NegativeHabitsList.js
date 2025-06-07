'use client'

import HabitContainerSkeleton from "@components/Skeletons/HabitContainerSkeleton"
import { useNegativeHabits } from "@/context/negativeHabitContext";
import NegativeHabitContainer from "./NegativeHabitContainer";

function NegativeHabitsList() {
    const { negativesHabits, loading } = useNegativeHabits();

    return (
        <div className="flex flex-col gap-8 pt-6">
            {
                loading ? (
                    <>
                        <HabitContainerSkeleton key={1} />
                        <HabitContainerSkeleton key={2} />
                    </>

                ) : (
                    negativesHabits.map((negative) => (
                        <NegativeHabitContainer key={negative.id} negative={negative}  />
                    ))
                )
            }
        </div>
    )
}

export default NegativeHabitsList