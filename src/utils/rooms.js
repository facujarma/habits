'use server';

import { createClient } from '@/utils/supabase/server';

function getLocalDateString() {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
}

async function getCurrentUser() {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();
    if (error || !user) {
        console.error('No hay usuario autenticado:', error);
        throw new Error('Usuario no autenticado');
    }
    return user;
}

const weekdayMap = {
    Su: 0, M: 1, Tu: 2, W: 3, Th: 4, F: 5, Sa: 6,
};


export async function addHabitToRoom(habit, roomID) {
    const supabase = await createClient();

    // 2) Separar weekdays del resto
    const { weekdays, ...habitData } = habit;
    // 3) Insertar en tabla "habit" solo los campos válidos
    const { data: insertedHabit, error: insertError } = await supabase
        .from('room_habits')
        .insert([{ roomID: roomID, ...habitData }])
        .select()
        .single();
    if (insertError) {
        console.error('Error al insertar hábito:', insertError);
        throw new Error('No se pudo crear el hábito');
    }

    // 4) Insertar días activos en "habit_schedules"
    const activeDays = Object.entries(weekdays)
        .filter(([, isActive]) => isActive)
        .map(([dayInitial]) => weekdayMap[dayInitial]);

    if (activeDays.length > 0) {
        const scheduleInserts = activeDays.map((weekday) => ({
            room_habitID: insertedHabit.id,
            weekday,
        }));
        const { error: scheduleError } = await supabase
            .from('room_habit_schedules')
            .insert(scheduleInserts);
        if (scheduleError) {
            console.error('Error al insertar schedules:', scheduleError);
            throw new Error('No se pudieron asignar los días al hábito');
        }
    }

    return insertedHabit;
}

function generateRoomCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

export async function createNewRoom(roomInfo, habitInfo) {
    const supabase = await createClient();
    const user = await getCurrentUser();


    // 1) Generar código único
    let roomCode = generateRoomCode();
    let tries = 0;
    while (tries < 5) {
        const { data: existingRoom } = await supabase
            .from('rooms')
            .select('id')
            .eq('code', roomCode)
            .maybeSingle();
        if (!existingRoom) break;
        roomCode = generateRoomCode();
        tries++;
    }
    if (tries >= 5) throw new Error('No se pudo generar un código único.');

    // 2) Insertar la sala usando la columna correcta `created_by`
    const { data: insertedRoom, error: insertError } = await supabase
        .from('rooms')   // tabla correcta
        .insert([{
            name: roomInfo.name,
            description: roomInfo.description,
            code: roomCode,
            created_by: user.id  // <-- columna que tu política RLS exige
        }])
        .select()
        .single();

    if (insertError) {
        console.error('Error al crear la sala:', insertError);
        throw new Error('No se pudo crear la sala');
    }

    // 3) Insertar el hábito
    const insertedHabit = await addHabitToRoom(habitInfo, insertedRoom.id);

    // 4) Agregar al creador en room_members
    const { error: memberError } = await supabase
        .from('room_members')
        .insert([{
            roomID: insertedRoom.id,
            userID: user.id
        }]);
    if (memberError) {
        console.error('Error al insertar miembro inicial:', memberError);
    }

    return insertedRoom;
}

async function isUserMember(roomID) {
    const supabase = await createClient();

    const user = await getCurrentUser();

    const { data, error } = supabase.from('room_members').select('id').eq('roomID', roomID).eq('userID', user.id).maybeSingle();

    if (error) {
        console.error('Error al verificar miembro:', error);
        throw new Error('No se pudo verificar miembro');
    }

    if (!data) {
        return false;
    }
    return true;
}

export async function getHabitsFromRoom(roomID) {
    const supabase = await createClient();

    if (isUserMember(roomID)) {

        const { data, error } = await supabase.from('room_habits').select('*').eq('roomID', roomID);
        if (error) throw new Error('No se pudieron obtener los hábitos de la sala');
        return data;
    }
    else {
        throw new Error('No eres miembro de la sala');
    }
}

export async function getAllRoomsMember() {
    const supabase = await createClient();

    const user = await getCurrentUser();

    const { data, error } = await supabase.from('room_members').select('roomID').eq('userID', user.id);

    if (error) {
        console.error('Error al obtener las salas:', error);
        throw new Error('No se pudieron obtener las salas');
    }

    return data;
}

export async function getAllInfoRoomsWhereUserIsMember() {
    const supabase = await createClient();

    const rooms = await getAllRoomsMember();

    const roomsInfo = [];

    for (const room of rooms) {
        const { data, error } = await supabase.from('rooms').select('*').eq('id', room.roomID).maybeSingle();
        if (error) throw new Error('No se pudieron obtener las salas');

        const habits = await getHabitsFromRoom(room.roomID);

        roomsInfo.push({
            room: data,
            habits: habits
        });
    }
    return roomsInfo;
}


export async function markRoomHabitAsComplete(habitID) {
    const supabase = await createClient();

    const user = await getCurrentUser();
    if (!user) throw new Error("Usuario no autenticado");

    const today = getLocalDateString();

    const { error } = await supabase.from("room_habit_progress").upsert(
        [{ habitID, record_date: today, status: true }],
        { onConflict: "habitID,record_date" }
    );

    if (error) {
        console.error("Error al marcar como completado:", error);
        throw new Error("No se pudo marcar como completado");
    }
    return true;
}

export async function markRoomHabitAsIncomplete(habitID) {
    const supabase = await createClient();

    const user = await getCurrentUser();
    if (!user) throw new Error("Usuario no autenticado");

    const today = getLocalDateString();

    const { error } = await supabase.from("room_habit_progress").upsert(
        [{ habitID, record_date: today, status: false }],
        { onConflict: "habitID,record_date" }
    );

    if (error) throw new Error("No se pudo marcar como incompleto");
    return true;
}

export async function gethabitRoomStatus(habitID) {
    const supabase = await createClient();
    const today = getLocalDateString();

    const { data, error } = await supabase
        .from("room_habit_progress")
        .select("status")
        .eq("habitID", habitID)
        .eq("record_date", today)
        .maybeSingle();

    if (error) throw new Error("No se pudo obtener el estado del hábito");
    return data?.status ?? null;

}