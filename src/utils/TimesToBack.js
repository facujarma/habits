// utils/TimesToBack.ts

/**
 * Devuelve el rango UTC (en ISO string) que representa el día "local" actual.
 * Útil para buscar registros de hoy desde Supabase.
 */
export function getUTCRangeForToday() {
    const now = new Date();

    const startLocal = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
    );
    const endLocal = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
    );

    return {
        start: startLocal.toISOString(), // UTC equivalente de 00:00 local
        end: endLocal.toISOString(),     // UTC equivalente de 23:59 local
    };
}

/**
 * Devuelve el rango UTC (en ISO string) que representa el día "local" de una fecha dada.
 */
export function getUTCRangeForDate(date) {
    const startLocal = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0
    );
    const endLocal = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59
    );

    return {
        start: startLocal.toISOString(),
        end: endLocal.toISOString(),
    };
}

/**
 * Devuelve el timestamp actual en formato UTC ISO string.
 * Útil para guardarlo como created_at o record_date.
 */
export function getUTCofNow() {
    return new Date().toISOString();
}

/**
 * Devuelve la fecha local (del usuario) en formato YYYY-MM-DD.
 * Útil para comparar sin horas (e.g. cache por día).
 */
export function getUTCDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
}
