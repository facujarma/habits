import NegativeAllInfo from "@root/components/NegativeAllInfo"
import AdviceEditHabitPage from "@root/sections/AdviceEditHabitPage"
export default async function Page({ params }) {
    const { id } = await params

    const advices = [
        {
            id: 1,
            title: "Surround with Role Models.",
            description: "Spend time with people who already live the way you want to live to reinforce positive change."
        },
        {
            id: 2,
            title: "Remove Triggers",
            description: "Eliminate or hide the cues in your environment that prompt your unwanted behavior."
        },
        {
            id: 3,
            title: "Change Environment.",
            description: "Rearrange your surroundings to make the bad habit harder and good habits easier."
        },
        {
            id: 4,
            title: "Partner Up.",
            description: "Team up with someone else so you can hold each other accountable and celebrate progress together."
        },
    ]

    return (
        <div className="w-full h-full">
            <NegativeAllInfo negativeID={id} />
            <AdviceEditHabitPage advices={advices} />
        </div>
    )
}