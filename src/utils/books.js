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

export async function uploadBookStars(bookID, stars) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { error } = await supabase.from('books').update({ stars }).eq('id', bookID).eq('userID', user.id);
    if (error) throw new Error('No se pudo actualizar el libro');
    return true;
}

export async function uploadBookState(bookID, state) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { error } = await supabase.from('books').update({ finished: state }).eq('id', bookID).eq('userID', user.id);
    console.log(error);
    if (error) throw new Error('No se pudo actualizar el libro');
    return true;
}

export async function saveReflection(bookID, reflection) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { error } = await supabase.from('books').update({ reflection }).eq('id', bookID).eq('userID', user.id);
    console.log(error);
    if (error) throw new Error('No se pudo actualizar el libro');
    return true;
}

export async function getReflection(bookID) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { data: reflection, error } = await supabase.from('books').select('reflection').eq('id', bookID).eq('userID', user.id).maybeSingle();
    if (error) throw new Error('No se pudo obtener la reflexión');
    return reflection;
}

export async function deleteBook(bookID) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { error } = await supabase.from('books').delete().eq('id', bookID).eq('userID', user.id);
    if (error) throw new Error('No se pudo eliminar el libro');
    return true;
}

export async function editBook(bookID, title, description, pages, type) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { error } = await supabase.from('books').update({ title, description, pages, type }).eq('id', bookID).eq('userID', user.id);
    if (error) throw new Error('No se pudo editar el libro');
    return true;
}