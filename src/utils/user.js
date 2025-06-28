'use server';

import { createClient } from '@/utils/supabase/server';


export async function getCurrentUser() {
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

export async function getUserInformation() {
    const supabase = await createClient();
    const authUser = await getCurrentUser()

    const userUUID = authUser.id

    const { data: userData, error } = await supabase.from('user_data').select('*').eq('userID', userUUID).maybeSingle();
    if (error) throw new Error('No se pudo obtener la información del usuario');
    return userData;
}

export async function getUsernameFromUUID(userID) {
    const supabase = await createClient();
    const { data: userData, error } = await supabase.from('user_data').select('username').eq('userID', userID).maybeSingle();
    if (error) throw new Error('No se pudo obtener el username del usuario');
    return userData?.username;
}

export async function getUserMail() {
    const supabase = await createClient();
    const authUser = await getCurrentUser()

    const mail = authUser.email

    return mail
}

export async function getNumberOfHabits() {
    const supabase = await createClient();
    const authUser = await getCurrentUser();
    const userUUID = authUser.id;

    // Realiza una consulta para contar los hábitos del usuario
    const { count, error } = await supabase
        .from('habit')
        .select('*', { count: 'exact', head: true }) // no trae datos, solo cuenta
        .eq('userID', userUUID);

    if (error) throw new Error('No se pudo obtener la cantidad de hábitos del usuario');

    return count;
}


export async function logOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
}