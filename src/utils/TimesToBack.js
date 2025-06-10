export function getUTCRangeForToday() {
    const now = new Date();

    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));

    return {
        start: start.toISOString(),
        end: end.toISOString(),
    };
}

export function getUTCRangeForDate(date) {
    const start = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    const end = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59));

    return {
        start: start.toISOString(),
        end: end.toISOString(),
    };
}


export function getUTCDateString() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // Mes: 01-12
    const day = now.getUTCDate().toString().padStart(2, '0'); // Día: 01-31
    return `${year}-${month}-${day}`;
}
