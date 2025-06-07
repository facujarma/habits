"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import "./styles.css";
import { addToast, Button } from "@heroui/react";
import { getTodayEntry, saveJournalEntry } from "@root/utils/journal";
import { useEffect, useState } from "react";

export default function Editor() {
  const [loaded, setLoaded] = useState(false);

  // Siempre crea el editor, incluso con contenido vacío

  const defaultTheme = {
    colors: {
      editor: {
        text: "#fff",
      }
    }
  }

  const editor = useCreateBlockNote();

  useEffect(() => {
    const loadEntry = async () => {
      try {
        const content = await getTodayEntry();
        if (content) {
          const json = JSON.parse(content);
          editor.replaceBlocks(editor.document, json);
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
  }, [editor]);

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
          <BlockNoteView editor={editor} theme={defaultTheme}/>
          <Button
            color="primary"
            className="w-fit mt-4 justify-self-end"
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
