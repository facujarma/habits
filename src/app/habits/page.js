import DayInfo from "@/components/DayInfo";
import HabitsList from "@components/HabitsList";
import MainActions from "@components/MainActions";
import { HabitsProvider } from "@/context/habitContext";
import StopVapingBanner from "@root/sections/StopVapingBanner";

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
    </div>
  );
}
