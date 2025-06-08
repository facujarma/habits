'use client';

import { addToast } from '@heroui/toast';
import { getTodayEntry } from '@root/utils/journal';
import React, { createContext, useContext, useState, useEffect } from 'react';

const TodayEntryContext = createContext();

export function TodayEntryProvider({ children }) {
    const [entry, setEntry] = useState([]);
    const [entryID, setEntryID] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [editorRef, setEditorRef] = useState(null); 

    useEffect(() => {
        const loadEntry = async () => {
            try {
                const {content, id} = await getTodayEntry();
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
        };

        loadEntry();
    }, []);

    const questionTemplate = (question) => {
        return {
            id: crypto.randomUUID(),
            type: "heading",
            props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "left",
                level: 1
            },
            content: [{ type: "text", text: question, styles: {} }],
            children: []
        };
    };

    const addQuestionToEntry = (question) => {
        const newQuestion = questionTemplate(question);
        const newEntry = [...entry, newQuestion];
        setEntry(newEntry);
        console.log("Entry updated successfully");

        if (editorRef) {
            editorRef.replaceBlocks(editorRef.document, newEntry);
        }
    };

    const contextValue = {
        entry,
        loaded,
        entryID,
        setEntry,
        addQuestionToEntry,
        setEditorRef 
    };

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
