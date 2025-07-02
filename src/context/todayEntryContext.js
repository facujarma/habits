'use client';

import { addToast } from '@heroui/toast';
import { getTodayEntry } from '@root/utils/journal';
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from 'react';

const TodayEntryContext = createContext();

export function TodayEntryProvider({ children }) {
    const [entry, setEntry] = useState([]);
    const [entryID, setEntryID] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [editorRef, setEditorRef] = useState(null);

    const loadEntry = useCallback(async () => {
        try {
            const data = await getTodayEntry();
            if (!data) return;

            const { id, content } = data;
            if (content) {
                const json = JSON.parse(content);
                setEntry(json);
                setEntryID(id);
            }
        } catch (err) {
            console.error(err);
            addToast({
                title: "Error",
                description: "Error loading journal entry.",
                color: "danger",
                timeout: 2000,
            });
        } finally {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        loadEntry();
    }, [loadEntry]);

    const questionTemplate = (question) => ({
        id: crypto.randomUUID(),
        type: "heading",
        props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
            level: 1,
        },
        content: [{ type: "text", text: question, styles: {} }],
        children: [],
    });

    const addQuestionToEntry = useCallback((question) => {
        const newQuestion = questionTemplate(question);
        const updatedEntry = [...entry, newQuestion];
        setEntry(updatedEntry);

        if (editorRef?.replaceBlocks) {
            editorRef.replaceBlocks(editorRef.document, updatedEntry);
        }
    }, [entry, editorRef]);

    const contextValue = useMemo(() => ({
        entry,
        entryID,
        loaded,
        setEntry,
        addQuestionToEntry,
        setEditorRef,
    }), [entry, entryID, loaded, addQuestionToEntry]);

    return (
        <TodayEntryContext.Provider value={contextValue}>
            {children}
        </TodayEntryContext.Provider>
    );
}

export function useTodayEntry() {
    const context = useContext(TodayEntryContext);
    if (!context) {
        throw new Error("useTodayEntry debe usarse dentro de TodayEntryProvider");
    }
    return context;
}
