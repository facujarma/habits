import React from 'react'

function GraphicTypeSelector({ setGraphicType, graphicType }) {
    return (
        <ul className='flex gap-4 w-full overflow-x-auto my-4'>
            <li>
                <button
                    onClick={() => setGraphicType("maxOneRep")}
                    className={`text-nowrap p-2 rounded-full ${graphicType === "maxOneRep" ? "bg-[#666F96]/50" : "bg-[#242424] border border-[#616161]"}`}>
                    Max one rep
                </button>
            </li>
            <li>
                <button
                    onClick={() => setGraphicType("totalReps")}
                    className={`text-nowrap p-2 rounded-full ${graphicType === "totalReps" ? "bg-[#666F96]/50" : "bg-[#242424] border border-[#616161]"}`}>
                    Total reps
                </button>
            </li>
            <li>
                <button
                    onClick={() => setGraphicType("maxWeight")}
                    className={`text-nowrap p-2 rounded-full ${graphicType === "maxWeight" ? "bg-[#666F96]/50" : "bg-[#242424] border border-[#616161]"}`}>
                    Max weight
                </button>
            </li>
            <li>
                <button
                    onClick={() => setGraphicType("maxVolume")}
                    className={`text-nowrap p-2 rounded-full ${graphicType === "maxVolume" ? "bg-[#666F96]/50" : "bg-[#242424] border border-[#616161]"}`}>
                    Max volume
                </button>
            </li>
        </ul>
    )
}

export default GraphicTypeSelector