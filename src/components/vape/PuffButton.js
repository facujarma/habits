'use client'

import { IconSmoking } from '@tabler/icons-react'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { addAPuff } from '@lib/vape'
import { addToast } from '@heroui/toast'
import { usePuff } from '@root/context/puffContext'
function getInterpolatedColor(rI, gI, bI, counter, max = 20, targetRGB = [128, 128, 128]) {
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
    const t = clamp(counter / max, 0, 1)

    const [rT, gT, bT] = targetRGB

    const r = Math.round(rI + (rT - rI) * t)
    const g = Math.round(gI + (gT - gI) * t)
    const b = Math.round(bI + (bT - bI) * t)

    return `rgba(${r},${g},${b},1)`
}

function getSize(counter, max = 20) {
    counter = 20 - counter;
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

    const t = clamp(counter / max, 0, 1)
    return Math.round(t * 230)
}

function PuffButton() {

    const { puffCounter, setPuffCounter } = usePuff()
    const [loading, setLoading] = useState(false)
    const glowColor = getInterpolatedColor(22, 70, 134, puffCounter, 20, [128, 128, 128])
    const backgroundColor = getInterpolatedColor(21, 26, 49, puffCounter, 20, [70, 70, 80])
    const borderColor = getInterpolatedColor(102, 111, 154, puffCounter, 20, [100, 100, 100])

    const radialStyle = {
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        width: getSize(puffCounter) + "%",
    }

    const handlePuff = async () => {
        setLoading(true)
        try {
            await addAPuff(puffCounter)
            setPuffCounter(puffCounter + 1)
        }
        catch (e) {
            console.error(e)
            addToast({
                title: "Error",
                description: "Ha ocurrido un error al agregar el puff.",
                color: "danger",
                timeout: 2000
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full lg:w-[40%] flex items-center justify-center mt-18 relative lg:mx-auto'>
            <div
                style={radialStyle}
                className="absolute aspect-square rounded-full blur-3xl opacity-70 z-0 transition-all duration-500"
            />
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
                disabled={loading}
                onClick={handlePuff}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.7 }}
                style={{
                    backgroundColor,
                    borderColor
                }}
                className='relative z-10 flex items-center justify-center w-5/6 aspect-square border-2 rounded-full'>
                <IconSmoking className="w-1/2 h-1/2 text-[#656E9A]" />
            </motion.button>
        </div>
    )
}

export default PuffButton
