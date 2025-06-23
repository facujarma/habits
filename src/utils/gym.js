'use server';

import { createClient } from '@/utils/supabase/server';
import { user } from '@heroui/theme';

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

export async function getUserExercices() {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { data: exercices, error } = await supabase.from('gym_exercices').select('*').eq('userID', user.id);
    if (error) throw new Error('No se pudieron obtener los ejercicios');
    return exercices;
}

export async function createExercice(exercice) {
    const supabase = await createClient();
    const user = await getCurrentUser();
    const { data, error } = await supabase.from('gym_exercices').insert([{ ...exercice, userID: user.id }]);

    console.log(error)
    if (error) throw new Error('No se pudo crear el ejercicios');
    return data;
}

export async function createWorkout(workout) {
    const supabase = await createClient();
    const user = await getCurrentUser();
    const { data, error } = await supabase.from('gym_workouts').insert([{ ...workout, userID: user.id }]);

    console.log(error)
    if (error) throw new Error('No se pudo crear la sesioon');
    return data;
}

export async function addExerciceToWorkout(exerciceID, workoutID) {
    const supabase = await createClient();
    const user = await getCurrentUser();
    const { data, error } = await supabase.from('gym_exercices_workouts').insert([{ exerciceID, workoutID, userID: user.id }]);
    if (error) throw new Error('No se pudo agregar el ejercicios a la sesion');
    return data;
}

export async function createWorkoutWithExercices(workoutName, exercicesIDs) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    // 1. Crear el workout
    const { data: workoutData, error: workoutError } = await supabase
        .from('gym_workouts')
        .insert([{ name: workoutName, userID: user.id }])
        .select()
        .single(); // obtenemos el ID recién creado

    if (workoutError) {
        console.error(workoutError);
        throw new Error('No se pudo crear la sesión');
    }

    const workoutID = workoutData.id;

    // 2. Filtrar ejercicios válidos
    const validExercices = exercicesIDs.filter(e => !!e);

    if (validExercices.length === 0) {
        throw new Error('No hay ejercicios válidos para asociar a la sesión.');
    }

    // 3. Crear los vínculos con cada ejercicio
    const insertData = validExercices.map(e => ({
        exerciceID: e,
        workoutID,
        userID: user.id
    }));

    const { error: linkError } = await supabase
        .from('gym_exercices_workouts')
        .insert(insertData);

    if (linkError) {
        console.error(linkError);
        throw new Error('No se pudieron vincular los ejercicios a la sesión');
    }

    return workoutID;
}

export async function getWorkoutsFullData() {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { data: workouts, error: workoutsError } = await supabase
        .from('gym_workouts')
        .select('*')
        .eq('userID', user.id);

    if (workoutsError) throw new Error('No se pudieron obtener las sesiones');

    let workoutsWithExercices = [];

    for (const workout of workouts) {
        const { data: exercices, error: exercicesError } = await supabase
            .from('gym_exercices_workouts')
            .select('exerciceID')
            .eq('workoutID', workout.id);

        if (exercicesError) throw new Error('No se pudieron obtener los ejercicios de la sesión');

        const exercicesIds = exercices.map(exercice => exercice.exerciceID);
        workoutsWithExercices.push({ ...workout, exercicesIDs: exercicesIds });
    }

    return workoutsWithExercices;
}


export async function isOnSession() {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { data: session, error } = await supabase.from('gym_sessions').select('*').eq('userID', user.id).is('ended_at', null).maybeSingle();
    console.log(session, error)
    if (error) throw new Error('No se pudo obtener la sesión');
    return session;
}

export async function startSession(workoutID) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const actualSession = await isOnSession();
    if (actualSession) {
        console.log(actualSession.workoutID, workoutID)
        if (actualSession.workoutID == workoutID) return
        else {
            throw new Error('Ya tienes una sesión iniciada');
        }
    }

    const { error } = await supabase.from('gym_sessions').insert([{ userID: user.id, workoutID }]);
    if (error) throw new Error('No se pudo iniciar la sesión');
}

export async function endSession(workoutID) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { error } = await supabase.from('gym_sessions').update({ ended_at: new Date() }).eq('userID', user.id).is('ended_at', null).eq('workoutID', workoutID);
    console.log(error)
    if (error) throw new Error('No se pudo finalizar la sesión');
}


export async function saveSeriesProgress(sessionID, exerciceID, seriesData) {
    const supabase = await createClient()
    const user = await getCurrentUser()

    const rows = seriesData.map((serie, index) => ({
        sessionID,
        exerciceID,
        set_number: index + 1,
        weight: Number(serie.weight),
        reps: Number(serie.reps),
        rir: Number(serie.rir)
    }))

    const { error } = await supabase
        .from('gym_session_exercice_progress')
        .upsert(rows, { onConflict: ['sessionID', 'exerciceID', 'set_number'] }) // clave única compuesta

    if (error) throw new Error('Error al guardar el progreso')
}

export async function getSessionExerciceProgress(sessionID, exerciceID) {
    const supabase = await createClient()
    const user = await getCurrentUser()

    const { data, error } = await supabase.from('gym_session_exercice_progress')
        .select('*')
        .eq('sessionID', sessionID)
        .eq('exerciceID', exerciceID)
        .order('set_number', { ascending: true })
    if (error) throw new Error('No se pudo obtener el progreso')
    return data
}