export function getUTCRangeForToday() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    return {
        start: start.toISOString(), // UTC equivalente de 00:00 hora local
        end: end.toISOString(),     // UTC equivalente de 23:59 hora local
    };
}

export function getUTCRangeForDate(date) {
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    return {
        start: start.toISOString(),
        end: end.toISOString(),
    };
}

export function getUTCofNow() {
    const now = new Date();
    return now.toISOString();
}

export function getUTCDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
}
