"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import "./styles.css";
import { addToast, Button, Skeleton } from "@heroui/react";
import { getEntryContent, saveJournalEntry } from "@root/utils/journal";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function MarkDownEditorForEntry({ entryID }) {

    const defaultTheme = {
        colors: {
            editor: {
                text: "#fff",
            }
        }
    };
    const [entry, setEntry] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const editor = useCreateBlockNote();

    useEffect(() => {
        const loadEntry = async () => {
            try {
                const content = await getEntryContent(entryID);
                if (content) {
                    const json = JSON.parse(content);
                    setEntry(json);
                    editor.replaceBlocks(editor.document, json);
                } else {
                    redirect("/journaling")
                }
            } catch (err) {
                console.error(err);
                addToast({
                    title: "Error",
                    description: "Error loading journal entry.",
                    color: "danger",
                    timeout: 2000,
                });
                redirect("/journaling")
            } finally {
                setLoaded(true);
            }
        }
        loadEntry();
    }, []);

    const handleSave = async () => {
        try {
            const json = JSON.stringify(editor.document);
            await saveJournalEntry(json, entryID);

            addToast({
                title: "Saved",
                description: "Journal entry saved successfully.",
                color: "success",
                timeout: 2000,
            });
        } catch (err) {
            console.error(err);
            addToast({
                title: "Error",
                description: "Error saving journal entry.",
                color: "danger",
                timeout: 2000,
            });
        }
    };

    return (
        <div className="z-20 flex flex-col">
            {loaded ? (
                <>
                    <BlockNoteView
                        editor={editor}
                        theme={defaultTheme}

                    />
                    <Button
                        color="primary"
                        className="mt-4"
                        onPress={handleSave}
                    >
                        Save
                    </Button>
                </>
            ) : (
                <Skeleton className="mt-12 z-20 w-full h-32 rounded-2xl">

                </Skeleton>
            )}
        </div>
    );
}
