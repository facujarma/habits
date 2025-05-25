'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
export async function getAllQuotes() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("quotes").select("*");
    if (error) {
        console.error("Error al obtener citas:", error);
        throw new Error("No se pudieron obtener las citas");
    }
    console.log(data);
    return data;
}

export async function addQuoteToFavorites(quoteID) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("No hay usuario autenticado:", userError);
        throw new Error("Usuario no autenticado");
    }

    const { error } = await supabase.from("favorites_quotes").insert({ userID: user.id, quoteID: quoteID });
    if (error) {
        console.error("Error al agregar cita a favoritos:", error);
        throw new Error("No se pudo agregar la cita a favoritos");
    }
}

export async function getFavoritesQuotes() {
    const supabase = await createClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
        console.error("No hay usuario autenticado:", userError);
        throw new Error("Usuario no autenticado");
    }
    const { data, error } = await supabase.from("favorites_quotes").select("quoteID").eq("userID", user.id);
    if (error) {
        console.error("Error al obtener citas favoritas:", error);
        throw new Error("No se pudieron obtener las citas favoritas");
    }
    console.log(data);
    return data;
}