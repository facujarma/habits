'use server';

import { createClient } from '@/utils/supabase/server';


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

export async function getUserInformation() {
    const supabase = await createClient();
    const authUser = await getCurrentUser()

    const userUUID = authUser.id

    const { data: userData, error } = await supabase.from('user_data').select('*').eq('userID', userUUID).maybeSingle();
    if (error) throw new Error('No se pudo obtener la información del usuario');
    return userData;
}