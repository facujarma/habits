'use client'

import { redirect } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import { useHabits } from "@/context/habitContext";
function HabitInfoTitle({ title }) {

    return (
        <div className="w-full h-20 bg-[#242424] rounded-2xl border border-[#616161] flex items-center">
            <h1 className="text-2xl font-bold text-white p-3">{title}</h1>
        </div>
    )
}

export default HabitInfoTitle