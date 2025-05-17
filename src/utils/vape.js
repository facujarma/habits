'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

let defaultClient = null;
async function getSupabase() {
  if (!defaultClient) defaultClient = await createClient();
  return defaultClient;
}

async function getCurrentUser() {
  const supabase = await getSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    console.error('No hay usuario autenticado:', error);
    throw new Error('Usuario no autenticado');
  }
  return user;
}

export async function userIsInProgram() {
  const supabase = await getSupabase();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from('stop_vaping_program')
    .select('is_active')
    .eq('userID', user.id)
    .maybeSingle();

  if (error) {
    console.error('Error al verificar programa:', error);
    throw new Error('No se pudo verificar estado del programa');
  }

  return data?.is_active ?? false;
}

export async function startVapeProgram() {
  const supabase = await getSupabase();
  const user = await getCurrentUser();

  const { error } = await supabase
    .from('stop_vaping_program')
    .upsert(
      { userID: user.id, is_active: true },
      { onConflict: 'userID' } // clave única para evitar duplicados
    );

  if (error) {
    console.error('Error al iniciar programa:', error);
    throw new Error('No se pudo iniciar el programa');
  }
}


export async function addAPuff() {
  const supabase = await getSupabase();
  const user = await getCurrentUser();

  const isActive = await userIsInProgram();
  if (!isActive) {
    return redirect('/vape/start');
  }

  const today = new Date().toISOString().split('T')[0];
  const { data: existing, error: fetchError } = await supabase
    .from('vape_counter')
    .select('counter')
    .eq('userID', user.id)
    .eq('date', today)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error al obtener contador actual:', fetchError);
    throw new Error('No se pudo obtener el contador');
  }

  const newCount = (existing?.counter || 0) + 1;
  const { error: upsertError } = await supabase
    .from('vape_counter')
    .upsert(
      [{ userID: user.id, date: today, counter: newCount }],
      { onConflict: 'userID,date' }
    );

  if (upsertError) {
    console.error('Error al guardar puff:', upsertError);
    throw new Error('No se pudo guardar el puff');
  }

  return newCount;
}

export async function getVapeCounterForToday() {
  const supabase = await getSupabase();
  const user = await getCurrentUser();

  const isActive = await userIsInProgram();
  if (!isActive) {
    return redirect('/vape/start');
  }

  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('vape_counter')
    .select('counter')
    .eq('userID', user.id)
    .eq('date', today)
    .maybeSingle();

  if (error) {
    console.error('Error al obtener el contador de vapes:', error);
    throw new Error('No se pudo obtener el contador de vapes');
  }

  return data?.counter ?? 0;
}
