'use client'
import CreateNewHabitFirstStep from "@/components/CreateNewHabitFirstStep"
import CreateNewhabitSecondStep from "@/components/CreateNewhabitSecondStep"
import CreateNewHabitThirdStep from "@/components/CreateNewHabitThirdStep"
import SeparatorLine from "@/components/SeparatorLine"
import Header from "@/sections/Header"
import Button from "@/components/Button"
import { IconCirclePlus } from "@tabler/icons-react"
import { useState } from "react"
import { addHabit } from "@root/utils/habits"
import { addToast } from "@heroui/react";
import CreateNewHabitFourthStep from "@root/components/CreateNewHabitFourthStep"

function page() {

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

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    const promise = addHabit({
      name: habitDescriptiveInfo.name,
      when: habitDescriptiveInfo.when,
      personToBe: habitDescriptiveInfo.personToBe,
      weekdays: habitDays,
      times: habitTimes,
      color: Array.from(habitColor)[0]
    });

    addToast({
      title: "Create a new Habit",
      description: "Please wait while the habit is being created.",
      promise,
      timeout: 2000
    });

    try {
      await promise;
      addToast({
        title: "Habit created",
        description: "The habit has been created successfully.",
        color: "success",
        timeout: 2000
      })
    } catch (e) {
      addToast({
        title: "Error",
        description: "There was an error creating the habit.",
        color: "danger",
        timeout: 2000
      })

    }
  };

  return (
    <div className="w-full h-full mb-10">
      <Header title={"Create a new Habit"} text={"The best way to start a habit is by completing the following phrase:"} />
      <CreateNewHabitFirstStep colorSet={habitColor} habitDescriptiveInfo={habitDescriptiveInfo} setHabitDescriptiveInfo={setHabitDescriptiveInfo} />
      <SeparatorLine />
      <CreateNewhabitSecondStep setHabitDays={setHabitDays} habitDays={habitDays} />
      <SeparatorLine />
      <CreateNewHabitThirdStep setHabitTimes={setHabitTimes} habitTimes={habitTimes} />
      <SeparatorLine />
      <CreateNewHabitFourthStep color={habitColor} setColor={setHabitColor} />
      <Button icon={<IconCirclePlus />} text={"Create"} handleClick={handleCreateHabit} />
    </div>
  )
}

export default page