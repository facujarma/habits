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