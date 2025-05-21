'use client'

import HabitContainer from "@components/HabitContainer"
import HabitContainerSkeleton from "@components/Skeletons/HabitContainerSkeleton"
import { useNegativeHabits } from "@/context/negativeHabitContext";

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
                        <div key={negative.id} style={{ backgroundColor: negative.color }}>
                            <h2>{negative.bad_habit}</h2>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default NegativeHabitsList