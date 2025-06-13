'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
export async function addNegativeHabit(negativeHabit) {
    const supabase = await createClient();

    // 1. Obtener el usuario
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('No hay usuario autenticado:', userError);
        throw new Error('Usuario no autenticado');
    }

    // 2. Insertar el hábito
    const { data: insertedHabit, error: insertError } = await supabase
        .from('negative_habit')
        .insert([
            {
                userID: user.id,
                bad_habit: negativeHabit.badHabit,
                good_habit: negativeHabit.goodHabit,
                color: negativeHabit.color
            },
        ])
        .select()
        .single();

    if (insertError) {
        console.error('Error al insertar hábito:', insertError);
        throw new Error('No se pudo crear el hábito');
    }
}

export async function getNegativeHabits() {

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('No hay usuario autenticado:', userError);
        throw new Error('Usuario no autenticado');
    }

    const { data: habits, error } = await supabase.from('negative_habit').select('*').eq('userID', user.id);
    if (error) {
        console.error('Error al obtener hábitos negativos:', error);
        throw new Error('No se pudieron obtener los hábitos');
    }
    return habits;
}
export async function getNegativeStatus(negativeID, todayRange) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("negative_records")
        .select("status")
        .eq("negativeID", negativeID)
        .gte("created_at", todayRange.start)
        .lte("created_at", todayRange.end)
        .maybeSingle();

    if (error) throw new Error("No se pudo obtener el estado del hábito negativo");

    if (!data) {
        await markNegativeAsComplete(negativeID, todayRange);
        return true;
    }
    return data?.status ?? null;

}

export async function markNegativeAsComplete(negativeID, todayRange) {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Usuario no autenticado");

    const { start, end } = todayRange;

    const { data: existing, error: fetchError } = await supabase
        .from("negative_records")
        .select("*")
        .eq("negativeID", negativeID)
        .gte("created_at", start)
        .lte("created_at", end)
        .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
        throw new Error("Error al verificar estado del hábito negativo");
    }

    if (existing) {
        const { error: updateError } = await supabase
            .from("negative_records")
            .update({ status: true })
            .eq("id", existing.id);

        if (updateError) throw new Error("No se pudo actualizar el estado negativo");
    } else {
        const now = new Date().toISOString();
        const { error: insertError } = await supabase
            .from("negative_records")
            .insert({ negativeID, record_date: now, status: true });
        console.log(insertError);
        if (insertError) throw new Error("No se pudo crear el registro negativo");
    }

    return true;
}

export async function markNegativeAsIncomplete(negativeID, todayRange) {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Usuario no autenticado");

    const { start, end } = todayRange;

    const { data: existing, error: fetchError } = await supabase
        .from("negative_records")
        .select("*")
        .eq("negativeID", negativeID)
        .gte("created_at", start)
        .lte("created_at", end)
        .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
        throw new Error("Error al verificar estado del hábito negativo");
    }

    if (existing) {
        const { error: updateError } = await supabase
            .from("negative_records")
            .update({ status: false })
            .eq("id", existing.id);

        if (updateError) throw new Error("No se pudo actualizar el estado negativo");
    } else {
        const now = new Date().toISOString();
        const { error: insertError } = await supabase
            .from("negative_records")
            .insert({ negativeID, record_date: now, status: false });

        if (insertError) throw new Error("No se pudo crear el registro negativo");
    }

    return true;
}

export async function deleteNegativeHabit(negativeID) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("No hay usuario autenticado:", userError);
        throw new Error("Usuario no autenticado");
    }

    const { error } = await supabase.from("negative_habit").delete().eq("id", negativeID);

    if (error) {
        console.error("Error al eliminar hábito:", error);
        throw new Error("No se pudo eliminar el hábito");
    }

}

export async function getNegativeAllData(negativeID) {

    const supabase = await createClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
        console.error("No hay usuario autenticado:", userError);
        throw new Error("Usuario no autenticado");
    }

    const { data: habit, error: habitError } = await supabase
        .from("negative_habit")
        .select("*")
        .eq("userID", user.id)
        .eq("id", negativeID)
        .maybeSingle();

    if (habitError) {
        console.error("Error al obtener el hábito:", habitError);
        throw new Error("No se pudo obtener el hábito");
    }
    if (!habit) {
        console.error("No se pudo obtener el hábito");
        throw new Error("No se pudo obtener el hábito");
    };

    const { data: records, error: recError } = await supabase
        .from("negative_records")
        .select("record_date")
        .eq("negativeID", negativeID);
    if (recError) {
        console.error("Error al obtener records:", recError);
        throw new Error("No se pudieron obtener los registros");
    }

    const completedDates = records.map((r) => {
        if (typeof r.record_date === "string") return r.record_date;
        return new Date(r.record_date).toISOString().split("T")[0];
    });

    const totalCompletions = completedDates.length;
    return {
        ...habit,
        completedDates,
        totalCompletions,
    };
}


export async function editNegative(negativeID, data) {
    const supabase = await createClient();
    const { error } = await supabase.from("negative_habit").update(data).eq("id", negativeID);
    if (error) {
        console.error("Error al editar el hábito:", error);
        throw new Error("No se pudo editar el hábito", error);
    }
}
