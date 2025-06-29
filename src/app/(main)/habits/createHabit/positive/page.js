'use client'
import React, { useState } from 'react'
import CreateNewHabitFirstStep from "@/components/CreateNewHabitFirstStep"
import CreateNewhabitSecondStep from "@/components/CreateNewhabitSecondStep"
import CreateNewHabitThirdStep from "@/components/CreateNewHabitThirdStep"
import SeparatorLine from "@/components/SeparatorLine"
import Header from "@/sections/Header"
import Button from "@/components/Button"
import { IconCirclePlus } from "@tabler/icons-react"
import { addHabit } from "@lib/habits"
import { addToast } from "@heroui/react"
import CreateNewHabitFourthStep from "@components/CreateNewHabitFourthStep"
import CreateNewHabitFifthStep from "@components/CreateNewHabitFifthStep"
import { useTranslation } from 'react-i18next'
import { useHabits } from '@root/context/habitContext'

function Page() {
  const { t } = useTranslation('common')
  const { loadHabits } = useHabits()

  const [habitDescriptiveInfo, setHabitDescriptiveInfo] = useState({
    name: '',
    when: '',
    personToBe: ''
  })
  const [habitDays, setHabitDays] = useState({
    M: false,
    Tu: false,
    W: false,
    Th: false,
    F: false,
    Sa: false,
    Su: false
  })
  const [habitTimes, setHabitTimes] = useState([])

  const [habitColor, setHabitColor] = useState(new Set(["#668C9A"]))
  const [habitIcon, setHabitIcon] = useState("")

  const handleCreateHabit = async (e) => {
    e.preventDefault()
    const promise = addHabit({
      name: habitDescriptiveInfo.name,
      when: habitDescriptiveInfo.when,
      personToBe: habitDescriptiveInfo.personToBe,
      weekdays: habitDays,
      times: habitTimes,
      color: Array.from(habitColor)[0],
      icon: habitIcon
    })

    addToast({
      title: t('createPositive_toast_creating_title'),
      description: t('createPositive_toast_creating_description'),
      promise,
      timeout: 2000
    })

    try {
      await promise
      await loadHabits(true)
      addToast({
        title: t('createPositive_toast_created_title'),
        description: t('createPositive_toast_created_description'),
        color: "success",
        timeout: 2000
      })
    } catch (e) {
      addToast({
        title: t('createPositive_toast_error_title'),
        description: t('createPositive_toast_error_description'),
        color: "danger",
        timeout: 2000
      })
    }
  }

  return (
    <div className="w-full h-full mb-10">
      <Header
        title={t('createPositive_title')}
        text={t('createPositive_text')}
      />
      <CreateNewHabitFirstStep
        colorSet={habitColor}
        habitDescriptiveInfo={habitDescriptiveInfo}
        setHabitDescriptiveInfo={setHabitDescriptiveInfo}
      />
      <SeparatorLine />
      <CreateNewhabitSecondStep setHabitDays={setHabitDays} habitDays={habitDays} />
      <SeparatorLine />
      <CreateNewHabitThirdStep setHabitTimes={setHabitTimes} habitTimes={habitTimes} />
      <SeparatorLine />
      <CreateNewHabitFourthStep color={habitColor} setColor={setHabitColor} />
      <CreateNewHabitFifthStep onSelect={setHabitIcon} />
      <Button
        icon={<IconCirclePlus />}
        text={t('createPositive_button_create')}
        handleClick={handleCreateHabit}
      />
    </div>
  )
}

export default Page
