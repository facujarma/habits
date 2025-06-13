'use client'

import { addToast } from '@heroui/toast'
import { getTopWordsFromEntries } from '@root/utils/you'
import React, { useEffect, useState } from 'react'

function JournalingWords() {
  const [words, setWords] = useState([])
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)

  const generateNonOverlappingPositions = (count, radius = 100, minDist = 40) => {
    const pos = []

    for (let i = 0; i < count; i++) {
      let attempts = 0
      let x, y
      let tooClose

      do {
        const angle = Math.random() * 2 * Math.PI
        const r = Math.random() * radius
        x = Math.cos(angle) * r
        y = Math.sin(angle) * r
        tooClose = pos.some(p => {
          const dx = p.x - x
          const dy = p.y - y
          return Math.sqrt(dx * dx + dy * dy) < minDist
        })
        attempts++
      } while (tooClose && attempts < 100)

      pos.push({ x, y })
    }

    return pos
  }

  useEffect(() => {
    const loadTopWords = async () => {
      try {
        const top = await getTopWordsFromEntries(5)
        setWords(top)

        const newPositions = generateNonOverlappingPositions(top.length)
        setPositions(newPositions)
      } catch {
        addToast({
          title: 'Error',
          description: 'An error occurred while getting the top words.',
          color: 'danger',
          timeout: 2000
        })
      } finally {
        setLoading(false)
      }
    }

    loadTopWords()
  }, [])

  return (
    <div className="sw-full flex flex-col items-center justify-center mt-12">
      <h2 className="text-2xl text-[#C5C5C5] mb-4">
        The main words you use in your journal entries
      </h2>

      <div className="relative w-72 h-72 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_#668C9A_0%,_rgba(101,_140,_154,_0.42)_100%)] rounded-full overflow-hidden">
        {!loading &&
          words.length > 0 &&
          words.map((word, index) => {
            const pos = positions[index]
            const delay = `${Math.random() * 2}s`
            const parentStyle = {
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(${pos.x}px, ${pos.y}px)`,
            }
            const childStyle = {
              transform: 'translate(-50%, -50%)',
              animation: `float 3s ease-in-out infinite`,
              animationDelay: delay,
            }

            return (
              <div key={index} style={parentStyle}>
                <span
                  style={childStyle}
                  className="text-white text-xl font-semibold pointer-events-none"
                >
                  {word.palabra}
                </span>
              </div>
            )
          })}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-6px);
          }
          100% {
            transform: translate(-50%, -50%) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default JournalingWords
