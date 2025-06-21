'use client';

import { addToast } from '@heroui/toast';
import { getUserExercices } from '@root/utils/gym';
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
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        loadExercices();
    }, [loadExercices]);

    const contextValue = useMemo(
        () => ({ exercices, loading, loadExercices }),
        [exercices, loading, loadExercices]
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
