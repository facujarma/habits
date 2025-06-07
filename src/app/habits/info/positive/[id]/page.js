import HabitInfoTitle from "@/components/HabitInfoTitle"
import { HabitsProvider } from "@/context/habitContext"
import HabitsAllInfo from "@root/components/HabitsAllInfo"
import AdviceEditHabitPage from "@sections/AdviceEditHabitPage"
export default async function Page({ params }) {
    const { id } = await params

    const advices = [
        {
            id: 1,
            title: "Make the habit as easy as possible to start.",
            description: "Example: If your habit is working out, lay out your clothes the night before."
        },
        {
            id: 2,
            title: "Start Small (2-Minute Rule)",
            description: "Want to read? Start with 1 page. Want to meditate? Begin with 2 minutes."
        },
        {
            id: 3,
            title: "Pair It With an Existing Habit.",
            description: "Attach the new habit to one you already do."
        },
        {
            id: 4,
            title: "Make It Enjoyable.",
            description: "Use music, a fun app, or turn it into a game. Track progress and celebrate small wins."
        },
        {
            id: 5,
            title: "Remove Barriers.",
            description: "Don’t rely on memory—set reminders or alarms. Uninstall distractions during habit time."
        },
        {
            id: 6,
            title: "Plan Ahead.",
            description: "Know when, where, and how you'll do the habit. 'I’ll write for 5 minutes after lunch at my desk.' Want to meditate? Begin with 2 minutes."
        }
    ]

    return (
        <div className="w-full h-full">
            <HabitsProvider>
                <HabitsAllInfo habitID={id} />
                <AdviceEditHabitPage advices={advices} />
            </HabitsProvider>
        </div>
    )
}