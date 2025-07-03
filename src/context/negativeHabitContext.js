'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getNegativeHabits } from '@lib/negativeHabit'


// ① Valor por defecto para que nunca sea undefined
const defaultContext = {
    negativesHabits: [],
    loading: false,
    loadNegativeHabits: async () => { },
    updateNegativeHabit: () => { },
}

// ② Creación del contexto con valor por defecto
const NegativeHabitsContext = createContext(defaultContext)

// ③ Provider
export function NegativeHabitsProvider({ children }) {
    const [negativesHabits, setNegativesHabits] = useState([])
    const [loading, setLoading] = useState(true)

    // Función para cargar y cachear
    async function loadNegativeHabits(force = false) {
        setLoading(true)
        try {
            const cached = sessionStorage.getItem('cachedNegativeHabits')
            const parsed = cached ? JSON.parse(cached) : null
            const today = new Date().toISOString().split('T')[0]

            if (!force && parsed?.date === today) {
                setNegativesHabits(parsed.habits)
                console.log('Negative habits loaded from cache')
            } else {
                const negatives = await getNegativeHabits()
                setNegativesHabits(negatives)
                sessionStorage.setItem(
                    'cachedNegativeHabits',
                    JSON.stringify({ date: today, habits: negatives })
                )
                console.log('Negative habits loaded from database')
            }
        } catch (error) {
            console.error('Error cargando hábitos negativos:', error)
            // Aquí puedes mostrar un toast de error si lo deseas
        } finally {
            setLoading(false)
        }
    }

    // Función para actualizar un hábito y la caché
    function updateNegativeHabit(id, updatedFields) {
        // Actualización en estado local
        setNegativesHabits(prev =>
            prev.map(h => (h.id === id ? { ...h, ...updatedFields } : h))
        )

        // Actualización en caché
        try {
            const cached = sessionStorage.getItem('cachedNegativeHabits')
            const parsed = cached ? JSON.parse(cached) : null
            const today = new Date().toISOString().split('T')[0]

            if (parsed?.date === today) {
                const updatedHabits = parsed.habits.map((h) =>
                    h.id === id ? { ...h, ...updatedFields } : h
                )
                sessionStorage.setItem(
                    'cachedNegativeHabits',
                    JSON.stringify({ date: today, habits: updatedHabits })
                )
            }
        } catch (error) {
            console.error('Error actualizando hábito negativo en caché:', error)
        }
    }

    // Carga inicial
    useEffect(() => {
        loadNegativeHabits()
    }, [])

    return (
        <NegativeHabitsContext.Provider
            value={{ negativesHabits, loading, loadNegativeHabits, updateNegativeHabit }}
        >
            {children}
        </NegativeHabitsContext.Provider>
    )
}

// Hook de consumo
export function useNegativeHabits() {
    return useContext(NegativeHabitsContext)
}
