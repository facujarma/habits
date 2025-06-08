'use client'

import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

// Tooltip personalizado con fondo oscuro y texto blanco
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1A1A1A] text-white p-2 rounded-md shadow-md">
                <p className="font-semibold">{label}</p>
                <p className="text-sm">{payload[0].value}</p>
            </div>
        )
    }

    return null
}

const data = [
    { name: 'Habits', value: 8 },
    { name: 'Puffs', value: 3 },
    { name: 'Journaling', value: 5 },
    { name: 'Quotes', value: 2 },
    { name: 'Habits', value: 8 },
    { name: 'Puffs', value: 3 },
    { name: 'Journaling', value: 5 },
    { name: 'Quotes', value: 2 },
    { name: 'Habits', value: 8 },
    { name: 'Puffs', value: 3 },
    { name: 'Journaling', value: 5 },
    { name: 'Quotes', value: 2 },
]

function GeneralProgress() {
    return (
        <div className="w-full rounded-2xl mt-6">
            <h2 className="text-2xl text-[#C5C5C5] mb-4">Your progress</h2>
            <ResponsiveContainer
                width="100%"
                height={300}
                className="bg-[#242424] rounded-2xl px-2 py-4"
            >
                <BarChart data={data} className="-ml-6" width={"100%"}>
                    <XAxis dataKey="name" stroke="#888888" />
                    <YAxis stroke="#fff" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="value"
                        background={{ fill: '#212121' }}
                        radius={[10, 10, 0, 0]}
                        shape={(props) => {
                            const { x, y, width, height, index } = props
                            return (
                                <rect
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    fill="#999"
                                    rx={5}
                                    ry={5}
                                    style={{ cursor: 'pointer' }}
                                />
                            )
                        }}
                    />                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GeneralProgress
