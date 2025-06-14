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

export async function getBooks() {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { data: books, error } = await supabase.from('books').select('*').eq('userID', user.id);
    if (error) throw new Error('No se pudo obtener los libros');
    return books;
}

export async function addBook(title, description, pages, type) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { error } = await supabase.from('books').insert({ title, description, pages, type, userID: user.id });
    console.log(error);
    if (error) throw new Error('No se pudo agregar el libro');
    return true;
}