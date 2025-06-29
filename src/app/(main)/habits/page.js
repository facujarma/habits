'use client'

import DayInfo from "@/components/DayInfo"
import HabitsList from "@habits/HabitsList"
import MainActions from "@components/MainActions"
import { HabitsProvider } from "@/context/habitContext"
import { NegativeHabitsProvider } from "@/context/negativeHabitContext"
import StopVapingBanner from "@sections/StopVapingBanner"
import NegativeHabitsList from "@negativeHabits/NegativeHabitsList"
import { Tabs, Tab } from "@heroui/react"
import RoomsHabitsList from "@sections/RoomsHabitsList"
import { RoomsProvider } from "@root/context/roomsContext"
import RoomsPublicList from "@rooms/RoomsPublicList"
import SeparatorLine from "@components/SeparatorLine"
import ChallengesList from "@root/components/challenges/ChallengesList"
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <div id="a">
      <DayInfo />
      <MainActions />
      <StopVapingBanner />

      <h2 className="text-[#C5C5C5] text-2xl mt-4">{t('home_sectionTitle_habits')}</h2>
      <HabitsProvider>
        <NegativeHabitsProvider>
          <div className="flex w-full flex-col mt-4">
            <Tabs
              aria-label="Options"
              size="lg"
              defaultValue="personal"
              placement="center"
              classNames={{
                tabList: "w-full overflow-hidden",
                base: "w-full"
              }}
            >
              <Tab key="personal" title={t('home_tabs_personal')}>
                <HabitsList />
                <NegativeHabitsList />
              </Tab>
              <Tab key="rooms" title={t('home_tabs_rooms')}>
                <RoomsProvider>
                  <RoomsHabitsList />
                  <SeparatorLine />
                  <RoomsPublicList />
                </RoomsProvider>
              </Tab>
              <Tab key="challenges" title={t('home_tabs_challenges')}>
                <ChallengesList />
              </Tab>
            </Tabs>
          </div>
        </NegativeHabitsProvider>
      </HabitsProvider>
    </div>
  )
}
