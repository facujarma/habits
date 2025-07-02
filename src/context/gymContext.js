'use client';

import { addToast } from '@heroui/toast';
import {
    getUserExercices,
    getWorkoutsFullData,
    isOnSession,
} from '@root/utils/gym';
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from 'react';

const GymContext = createContext();

export function GymProvider({ children }) {
    const [exercices, setExercices] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWithCache = async (key, fetcher, setState, force = false) => {
        try {
            const cached = sessionStorage.getItem(key);
            const parsed = cached ? JSON.parse(cached) : null;

            if (!force && parsed) {
                setState(parsed);
                console.log(`${key} loaded from cache`);
            } else {
                const fresh = await fetcher();
                setState(fresh);
                sessionStorage.setItem(key, JSON.stringify(fresh));
                console.log(`${key} loaded from database`);
            }
        } catch (e) {
            addToast({
                title: 'Error',
                message: `An error occurred while loading ${key}.`,
                color: 'danger',
            });
            console.error(`Error loading ${key}:`, e);
        }
    };

    const loadExercices = useCallback(async (force = false) => {
        await fetchWithCache('exercices', getUserExercices, setExercices, force);
    }, []);

    const loadWorkouts = useCallback(async (force = false) => {
        await fetchWithCache('workouts', getWorkoutsFullData, setWorkouts, force);
    }, []);

    const isASessionActive = useCallback(async () => {
        try {
            const currentSession = await isOnSession();
            setSession(currentSession);
        } catch (e) {
            addToast({
                title: 'Error',
                message: 'An error occurred while checking the session.',
                color: 'danger',
            });
            console.error('Error loading session:', e);
        }
    }, []);

    useEffect(() => {
        Promise.all([
            loadExercices(),
            loadWorkouts(),
            isASessionActive()
        ]).finally(() => setLoading(false));
    }, [loadExercices, loadWorkouts, isASessionActive]);

    const contextValue = useMemo(() => ({
        exercices,
        workouts,
        session,
        loading,
        loadExercices,
        loadWorkouts,
        setSession,
        isASessionActive,
    }), [
        exercices,
        workouts,
        session,
        loading,
        loadExercices,
        loadWorkouts,
        setSession,
        isASessionActive
    ]);

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
