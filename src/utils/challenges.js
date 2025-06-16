'use server';

import { createClient } from '@/utils/supabase/server';
import { getUTCRangeForToday } from './TimesToBack';

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

function getDailySeed() {
    const today = new Date().toISOString().split('T')[0]; // e.g. '2025-06-16'
    return [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0); // simple numeric seed
}

export async function getDailyChallenges() {
    const supabase = await createClient();
    const seed = getDailySeed()

    const { data, error } = await supabase.rpc('get_daily_challenges', { seed })
    if (error) throw new Error('No se pudieron obtener los desafios')
    return data
}

export async function markChallengeAsDone(challengeID) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { start: todayStart, end: tomorrowStart } = getUTCRangeForToday();

    const { data: existing, error: fetchError } = await supabase
        .from('user_challenges')
        .select('id')
        .eq('userID', user.id)
        .eq('challengeID', challengeID)
        .gte('created_at', todayStart)
        .lt('created_at', tomorrowStart)
        .maybeSingle();

    if (fetchError) throw new Error('Error al buscar el desafío del día.');

    if (existing) {
        const { error: updateError } = await supabase
            .from('user_challenges')
            .update({ status: true })
            .eq('id', existing.id);

        if (updateError) throw new Error('Error al actualizar el desafío');
    } else {
        const { error: insertError } = await supabase
            .from('user_challenges')
            .insert({
                userID: user.id,
                challengeID,
                status: true,
            });

        if (insertError) throw new Error('Error al insertar nuevo desafío');
    }

    return true;
}


export async function markChallengeAsNotDone(challengeID) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { start: todayStart, end: tomorrowStart } = getUTCRangeForToday();

    const { data: existing, error: fetchError } = await supabase
        .from('user_challenges')
        .select('id')
        .eq('userID', user.id)
        .eq('challengeID', challengeID)
        .gte('created_at', todayStart)
        .lt('created_at', tomorrowStart)
        .maybeSingle();

    if (fetchError) throw new Error('Error al buscar el desafío del día.');

    if (existing) {
        const { error: updateError } = await supabase
            .from('user_challenges')
            .update({ status: false })
            .eq('id', existing.id);

        if (updateError) throw new Error('Error al actualizar el desafío');
    } else {
        const { error: insertError } = await supabase
            .from('user_challenges')
            .insert({
                userID: user.id,
                challengeID,
                status: false,
            });

        if (insertError) throw new Error('Error al insertar nuevo desafío');
    }

    return true;
}

export async function getChallengeStatus(challengeID) {
    const supabase = await createClient();
    const user = await getCurrentUser();
    const { start, end } = getUTCRangeForToday();
    const { data, error } = await supabase.from('user_challenges').select('status')
        .eq('challengeID', challengeID).eq('userID', user.id)
        .lte('created_at', end)
        .gte('created_at', start)
        .maybeSingle();

    if (error) throw new Error('No se pudo obtener el estado del desafio');

    if (!data) {
        await markChallengeAsNotDone(challengeID);
        return false;
    }

    return data?.status;
}
