// utils/TimesToBack.ts

/**
 * Devuelve el rango UTC (en ISO string) que representa el día "local" actual.
 * Asegura que se respete la zona horaria del usuario.
 */
export function getUTCRangeForToday() {
    const nowLocal = new Date();

    const startLocal = new Date(nowLocal.getFullYear(), nowLocal.getMonth(), nowLocal.getDate(), 0, 0, 0);
    const endLocal = new Date(nowLocal.getFullYear(), nowLocal.getMonth(), nowLocal.getDate(), 23, 59, 59, 999);

    const startUTC = new Date(startLocal.getTime() - startLocal.getTimezoneOffset() * 60000).toISOString();
    const endUTC = new Date(endLocal.getTime() - endLocal.getTimezoneOffset() * 60000).toISOString();

    return {
        start: startUTC,
        end: endUTC,
    };
}

/**
 * Devuelve el rango UTC (en ISO string) que representa el día "local" de una fecha dada.
 */
export function getUTCRangeForDate(date) {
    const startLocal = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const endLocal = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

    const startUTC = new Date(startLocal.getTime() - startLocal.getTimezoneOffset() * 60000).toISOString();
    const endUTC = new Date(endLocal.getTime() - endLocal.getTimezoneOffset() * 60000).toISOString();

    return {
        start: startUTC,
        end: endUTC,
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
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0]; // YYYY-MM-DD
}


export function formatDateToLocalYYYYMMDD(dateString) {
    const utcDate = new Date(dateString);
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
}
