'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(email, password) {
  const supabase = await createClient()
  

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.error('[LOGIN ERROR]', error)

      switch (error.message) {
        case 'Invalid login credentials':
        case 'Email or password is incorrect':
          return { error: 'Invalid credentials. Please check your email and password.' }

        case 'Email not confirmed':
          return { error: 'Email not confirmed. Please check your inbox.' }

        default:
          return { error: 'An error occurred while logging in. Please try again.' }
      }
    }
  } catch (err) {
    console.error('[LOGIN EXCEPTION]', err)
    return { error: 'Unexpected server error. Please try again later.' }
  }

  revalidatePath('/habits', 'layout')
  redirect('/habits')

}

export async function signup(email, password, username) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error || !data?.user) {
      console.error('[SIGNUP ERROR]', error)

      switch (error.message) {
        case 'User already registered':
        case 'User already exists':
          return { error: 'User already exists. Try logging in instead.' }

        case 'Email address is invalid':
        case 'Signup requires a valid email':
          return { error: 'Invalid email address.' }

        case 'Email not confirmed':
          return { error: 'Please confirm your email address before continuing.' }

        default:
          return { error: 'An error occurred during sign-up. Please try again.' }
      }
    }

    const userId = data.user.id
    const { error: insertError } = await supabase
      .from('user_data')
      .insert([{ userID: userId, username }])

    if (insertError) {
      console.error('[INSERT USER_DATA ERROR]', insertError)
      // Optional: You can return an error or log it silently
    }

    revalidatePath('/habits', 'layout')
    redirect('/auth/login')

  } catch (err) {
    console.error('[SIGNUP EXCEPTION]', err)
    return { error: 'Unexpected server error during sign-up. Please try again.' }
  }
}

export async function loginWithGoogle() {
  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      console.error('[GOOGLE LOGIN ERROR]', error)
      redirect('/error')
    }

    revalidatePath('/habits', 'layout')
    redirect('/habits')

  } catch (err) {
    console.error('[GOOGLE LOGIN EXCEPTION]', err)
    redirect('/error')
  }
}
