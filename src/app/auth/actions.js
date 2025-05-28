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
    redirect('/error')
  }
  revalidatePath('/habits', 'layout')
  redirect('/habits')
}

export async function signup(email, password) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: email,
    password: password,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/habits', 'layout')
  redirect('/auth/emailsented')
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