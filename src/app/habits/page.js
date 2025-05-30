'use client'

import DayInfo from "@/components/DayInfo";
import HabitsList from "@components/HabitsList";
import MainActions from "@components/MainActions";
import { HabitsProvider } from "@/context/habitContext";
import { NegativeHabitsProvider } from "@/context/negativeHabitContext";
import StopVapingBanner from "@root/sections/StopVapingBanner";
import NegativeHabitsList from "@root/components/NegativeHabitsList";
import { Tabs, Tab } from "@heroui/react";
export default function Home() {

  return (

    <div>
      <DayInfo />
      <MainActions />
      <StopVapingBanner />

      <h2 className="text-[#C5C5C5] text-2xl mt-4">Habits</h2>
      <div className="flex w-full flex-col mt-4">
        <Tabs aria-label="Options" size="lg" defaultValue="personal" placement="center">
          <Tab key="personal" title="Personal Habits">


            <HabitsProvider>
              <HabitsList />
            </HabitsProvider>
            <NegativeHabitsProvider>
              <NegativeHabitsList />
            </NegativeHabitsProvider>


          </Tab>
          <Tab key="rooms" title="Room's Habits">
            Loading
          </Tab>
        </Tabs>
      </div>

    </div>
  );
}
