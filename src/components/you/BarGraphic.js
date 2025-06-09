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

function BarGraphic({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300} className="[scroll-snap-align:start] bg-[#242424] rounded-2xl py-4">
            <BarChart
                data={data}
                margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
            >
                <XAxis dataKey="name" stroke="#888888" padding={{ left: 0, right: 0 }} />
                <YAxis
                    stroke="#fff"
                    domain={[0, 'dataMax']}
                    width={5} // ajusta el ancho reservado al eje Y
                />

                <Tooltip content={<CustomTooltip />} />
                <Bar
                    dataKey="value"
                    background={{ fill: '#212121' }}
                    radius={[10, 10, 0, 0]}
                    shape={({ x, y, width, height }) => (
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
                    )}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarGraphic