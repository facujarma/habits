'use client'

import HabitContainer from "@habits/HabitContainer"
import HabitContainerSkeleton from "@components/Skeletons/HabitContainerSkeleton"
import { useHabits } from "@/context/habitContext"
import { useTranslation } from 'react-i18next'

function HabitsList() {
  const { t } = useTranslation('common')
  const { habits, loading } = useHabits()

  return (
    <div className="flex flex-col gap-8 pt-6">
      {loading ? (
        <>
          <HabitContainerSkeleton key={1} />
          <HabitContainerSkeleton key={2} />
        </>
      ) : habits.length === 0 ? (
        <p className="text-[#C5C5C5] text-base text-center ">
          {t('habitsList_noHabitsMessage')}
          <a href="/habits/createHabit" className="text-[#C5C5C5] underline ml-1">
            {t('habitsList_createLinkText')}
          </a>{" "}
          {t('habitsList_createLinkDescription')}
        </p>
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
      )}
    </div>
  )
}

export default HabitsList
