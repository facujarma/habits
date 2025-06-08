"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import "./styles.css";
import { addToast, Button } from "@heroui/react";
import { saveJournalEntry } from "@root/utils/journal";
import { useEffect } from "react";
import { useTodayEntry } from "@root/context/todayEntryContext";

export default function Editor() {
  const {
    loaded,
    entry,
    setEntry,
    setEditorRef
  } = useTodayEntry();

  const defaultTheme = {
    colors: {
      editor: {
        text: "#fff",
      }
    }
  };

  const editor = useCreateBlockNote();

  // Registrar editor en el contexto
  useEffect(() => {
    if (editor) {
      setEditorRef(editor);
    }
  }, [editor]);

  useEffect(() => {
    if (loaded && entry && editor) {
      editor.replaceBlocks(editor.document, entry);
    }
  }, [loaded]);

  const handleSave = async () => {
    try {
      const json = JSON.stringify(editor.document);
      await saveJournalEntry(json);

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
            onChange={() => {
              setEntry(editor.document); // 👉 sincroniza al editar
            }}
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
        <div className="text-muted-foreground">Cargando...</div>
      )}
    </div>
  );
}
