import DayInfo from "@/components/DayInfo";
import HabitsList from "@components/HabitsList";
import MainActions from "@components/MainActions";
import { HabitsProvider } from "@/context/habitContext";
import { NegativeHabitsProvider } from "@/context/negativeHabitContext";
import StopVapingBanner from "@root/sections/StopVapingBanner";
import NegativeHabitsList from "@root/components/NegativeHabitsList";

export default function Home() {

  return (

    <div>
      <DayInfo />
      <MainActions />
      <StopVapingBanner />
      <h2 className="mt-6 text-xl  text-[#C5C5C5]">Your Habits:</h2>
      <HabitsProvider>
        <HabitsList />
      </HabitsProvider>
      <NegativeHabitsProvider>
        <NegativeHabitsList />
      </NegativeHabitsProvider>
    </div>
  );
}
