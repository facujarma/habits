'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

const weekdayMap = {
    D: 0, // Domingo
    L: 1, // Lunes
    M: 2, // Martes
    X: 3, // Miércoles
    J: 4, // Jueves
    V: 5, // Viernes
    S: 6, // Sábado
};

export async function addHabit(habit) {
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
        .from('habit')
        .insert([
            {
                userID: user.id,
                name: habit.name,
                when: habit.when,
                personToBe: habit.personToBe,
                times: habit.times,
            },
        ])
        .select()
        .single();

    if (insertError) {
        console.error('Error al insertar hábito:', insertError);
        throw new Error('No se pudo crear el hábito');
    }

    // 3. Convertir weekdays {L, M, ...} a array de números [1, 2, ...]
    const activeDays = Object.entries(habit.weekdays)
        .filter(([, isActive]) => isActive)
        .map(([dayInitial]) => weekdayMap[dayInitial]);

    // 4. Insertar en habit_schedules
    if (activeDays.length > 0) {
        const scheduleInserts = activeDays.map((weekday) => ({
            habitID: insertedHabit.id,
            weekday,
        }));

        const { error: scheduleError } = await supabase
            .from('habit_schedules')
            .insert(scheduleInserts);

        if (scheduleError) {
            console.error('Error al insertar días del hábito:', scheduleError);
            throw new Error('No se pudieron asignar los días al hábito');
        }
    }
    console.log(insertedHabit);
    revalidatePath('/home');

    return insertedHabit;
}


export async function selectHabits() {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('No hay usuario autenticado:', userError);
        throw new Error('Usuario no autenticado');
    }

    const { data: habits, error } = await supabase.from('habit').select('*').eq('userID', user.id);
    if (error) {
        console.error('Error al obtener hábitos:', error);
        throw new Error('No se pudieron obtener los hábitos');
    }
    console.log(habits);
    return habits;
}

export async function getHabitStatus(habitID) {
    const supabase = await createClient();

    const today = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD

    const { data, error } = await supabase
        .from("habit_records")
        .select("status")
        .eq("habitID", habitID)
        .eq("record_date", today)
        .maybeSingle();

    if (error) {
        console.error("Error al obtener estado del hábito:", error);
        throw new Error("No se pudo obtener el estado del hábito");
    }

    return data?.status ?? null;
}


export async function markHabitAsComplete(habitID) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("No hay usuario autenticado:", userError);
        throw new Error("Usuario no autenticado");
    }

    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase.from("habit_records").upsert(
        [
            {
                habitID,
                record_date: today,
                status: true,
            },
        ],
        {
            onConflict: "habitID,record_date", // para que actualice si ya existe
        }
    );

    if (error) {
        console.error("Error al marcar hábito como completado:", error);
        throw new Error("No se pudo marcar como completado");
    }

    return true;
}

export async function markHabitAsIncomplete(habitID) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("No hay usuario autenticado:", userError);
        throw new Error("Usuario no autenticado");
    }

    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase.from("habit_records").upsert(
        [
            {
                habitID,
                record_date: today,
                status: false,
            },
        ],
        {
            onConflict: "habitID,record_date",
        }
    );

    if (error) {
        console.error("Error al marcar hábito como incompleto:", error);
        throw new Error("No se pudo marcar como incompleto");
    }

    return true;
}

export async function selectHabitsForToday() {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("No hay usuario autenticado:", userError);
        throw new Error("Usuario no autenticado");
    }

    const jsDay = new Date().getDay();

    const { data: habits, error } = await supabase
        .from("habit")
        .select("*, habit_schedules!inner(weekday)")
        .eq("userID", user.id)
        .eq("habit_schedules.weekday", jsDay);

    if (error) {
        console.error("Error al obtener hábitos de hoy:", error);
        throw new Error("No se pudieron obtener los hábitos de hoy");
    }

    return habits;
}

export async function deleteHabit(habitID) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("No hay usuario autenticado:", userError);
        throw new Error("Usuario no autenticado");
    }

    const { error } = await supabase.from("habit").delete().eq("id", habitID);

    if (error) {
        console.error("Error al eliminar hábito:", error);
        throw new Error("No se pudo eliminar el hábito");
    }

}
const WEEKDAY_MAP = {
    1: "L", 2: "M", 3: "X", 4: "J", 5: "V", 6: "S", 7: "D"
};
const WEEKDAY_INITIALS = { L: 0, M: 0, X: 0, J: 0, V: 0, S: 0, D: 0 };

export async function getHabitFullData(habitID) {
  const supabase = await createClient();

  // 1. Autenticación
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("No hay usuario autenticado:", userError);
    throw new Error("Usuario no autenticado");
  }

  // 2. Obtener el hábito
  const { data: habit, error: habitError } = await supabase
    .from("habit")
    .select("*")
    .eq("userID", user.id)
    .eq("id", habitID)
    .maybeSingle();
  if (habitError) {
    console.error("Error al obtener el hábito:", habitError);
    throw new Error("No se pudo obtener el hábito");
  }
  if (!habit) return null;

  // 3. Obtener sus días programados
  const { data: schedules, error: schedError } = await supabase
    .from("habit_schedules")
    .select("weekday")
    .eq("habitID", habitID);
  if (schedError) {
    console.error("Error al obtener schedules:", schedError);
    throw new Error("No se pudieron obtener los schedules");
  }

  // 4. Obtener sus completaciones
  const { data: records, error: recError } = await supabase
    .from("habit_records")
    .select("record_date")
    .eq("habitID", habitID);
  if (recError) {
    console.error("Error al obtener records:", recError);
    throw new Error("No se pudieron obtener los registros");
  }

  // 5. Construir estructura de días programados
  const scheduledWeekdays = schedules.map((s) => s.weekday);
  const scheduledDays = { ...WEEKDAY_INITIALS };
  scheduledWeekdays.forEach((wd) => {
    const key = WEEKDAY_MAP[wd];
    if (key) scheduledDays[key] = true;
  });

  // 6. Construir lista de fechas completadas (formato YYYY-MM-DD)
  const completedDates = records.map((r) => {
    // si record_date ya es string "YYYY-MM-DD", lo devolvemos directamente
    if (typeof r.record_date === "string") return r.record_date;
    // si no, parseamos a Date
    return new Date(r.record_date).toISOString().split("T")[0];
  });
  const totalCompletions = completedDates.length;

  // 7. Devolver el objeto con toda la info
  return {
    ...habit,
    scheduledWeekdays,
    scheduledDays,
    completedDates,
    totalCompletions,
  };
}