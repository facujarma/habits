'use client';

import React, { useMemo, useCallback, useState } from 'react';
import { Calendar } from '@heroui/react';
import {
    DateValue,
    parseDate,
    isSameDay,
    today,
    getLocalTimeZone,
} from '@internationalized/date';

function HabitCalendar({ dates }) {
    // Convertimos las fechas string (ej. '2025-05-14') a DateValue
    const fechasMarcadas = useMemo(() => {
        return dates.map(dateStr => parseDate(dateStr));
    }, [dates]);


    // Función que determina si una fecha está marcada como completada
    const esFechaMarcada = useCallback(
        (date) => {
            return fechasMarcadas.some(marcada => isSameDay(marcada, date));
        },
        [fechasMarcadas]
    );

    return (
        <Calendar
            isReadOnly
            aria-label="Calendario de hábitos"
            isDateUnavailable={date => !esFechaMarcada(date)} // solo se "habilitan" fechas marcadas
        />

    );
}

export default HabitCalendar;
