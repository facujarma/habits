'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(email, password) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: email,
    password: password,
  }
  console.log(data)
  const { error } = await supabase.auth.signInWithPassword(data)
  console.log(error)
  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return {
        error: 'Invalid login credentials',
      }
    } else {
      return {
        error: 'An error occurred while login, try again',
      }
    }
  }
  revalidatePath('/habits', 'layout')
  redirect('/habits')
}

export async function signup(email, password, username) {
  const supabase = await createClient();

  // Registrar usuario y guardar username en user_metadata
  const { data, error } = await supabase.auth.signUp({
    email,
    password,

  });

  if (error || !data.user) {
    console.log(error);
    if (error.message.includes('User already exists')) {
      return {
        error: 'User already exists',
      };
    } 
    if(error.message.includes('Email address')) {
      return {
        error: 'Email address is invalid.',
      };
    }
    if(error.message.includes('Email not confirmed')) {
      return {
        error: 'Email not confirmed.',
      };
    }
    else {
      return {
        error: 'An error occurred while registering, try again',
      };
    }
  }

  // Insertar en la tabla user_data
  const userId = data.user.id;
  const { error: insertError } = await supabase
    .from('user_data')
    .insert([{ userID: userId, username }]);

  if (insertError) {
    console.log(insertError);
  }

  revalidatePath('/habits', 'layout');
  redirect('/auth/login');
}

export async function loginWithGoogle() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/habits', 'layout')
  redirect('/habits')
}