'use client';

import { addToast } from '@heroui/toast';
import { getUserExercices, getWorkoutsFullData, isOnSession } from '@root/utils/gym';
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo
} from 'react';

const GymContext = createContext({
    exercices: [],
    loading: true,
    loadExercices: () => { },
});

export function GymProvider({ children }) {
    const [exercices, setExercices] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const loadExercices = useCallback(async (force = false) => {
        setLoading(true);
        try {
            const cachedRaw = sessionStorage.getItem('exercices');
            const parsed = cachedRaw ? JSON.parse(cachedRaw) : null;

            if (!force && parsed) {
                setExercices(parsed);
                console.log('Exercices loaded from cache');
            } else {
                const fresh = await getUserExercices();
                setExercices(fresh);
                sessionStorage.setItem('exercices', JSON.stringify(fresh));
                console.log('Exercices loaded from database');
            }
        } catch (e) {
            addToast({
                title: 'Error',
                message: 'An error occurred while getting the exercices.',
                color: 'danger',
            });
            console.error('Error loading exercices:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadWorkouts = useCallback(async (force = false) => {
        setLoading(true);
        try {
            const cachedRaw = sessionStorage.getItem('workouts');
            const parsed = cachedRaw ? JSON.parse(cachedRaw) : null;

            if (!force && parsed) {
                setWorkouts(parsed);
                console.log('Workouts loaded from cache');
            } else {
                const fresh = await getWorkoutsFullData();
                setWorkouts(fresh);
                sessionStorage.setItem('workouts', JSON.stringify(fresh));
                console.log('Workouts loaded from database');
            }
        } catch (e) {
            addToast({
                title: 'Error',
                message: 'An error occurred while getting the exercices.',
                color: 'danger',
            });
            console.error('Error loading exercices:', e);
        }
        finally {
            setLoading(false);
        }
    }, []);

    const isASessionActive = useCallback(async () => {
        setLoading(true);
        try {
            const session = await isOnSession()
            setSession(session);
        }
        catch (e) {
            addToast({
                title: 'Error',
                message: 'An error occurred while checking the session.',
                color: 'danger',
            });
            console.error('Error loading session:', e);
        }
        finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        loadExercices();
        loadWorkouts();
        isASessionActive();
    }, [loadExercices, loadWorkouts, isASessionActive]);

    const contextValue = useMemo(
        () => ({ exercices, loading, loadExercices, workouts, loadWorkouts, session, setSession }),
        [exercices, loading, loadExercices, workouts, loadWorkouts, session, setSession]
    );

    return (
        <GymContext.Provider value={contextValue}>
            {children}
        </GymContext.Provider>
    );
}

export function useGym() {
    const context = useContext(GymContext);
    if (!context) {
        throw new Error('useGym debe usarse dentro de GymProvider');
    }
    return context;
}
