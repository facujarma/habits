"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import "./styles.css";
import { addToast, Button, Skeleton } from "@heroui/react";
import { saveJournalEntry } from "@root/utils/journal";
import { useEffect, useState } from "react";
import { useTodayEntry } from "@root/context/todayEntryContext";
import { useSearchParams } from "next/navigation"
import { motion } from "motion/react"
import { Tooltip } from "@heroui/react";
export default function Editor() {

  const [isSaved, setIsSaved] = useState(true);

  const searchParams = useSearchParams()
  const start = searchParams.get("start") || ""


  const {
    loaded,
    entry,
    entryID,
    setEntry,
    addQuestionToEntry,
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
      if (start) {
        addQuestionToEntry(start);
      }
    }

  }, [loaded]);

  const handleSave = async () => {
    try {
      const json = JSON.stringify(editor.document);
      await saveJournalEntry(json, entryID);
      setIsSaved(true);
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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isSaved) {
        event.preventDefault();
        event.returnValue = ""; // necesario para mostrar la advertencia
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSaved]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", bounce: 0.5 },
      }}
      className="z-20 flex flex-col relative">

      <Tooltip content={isSaved ? "Saved" : "Not saved"} showArrow={true}>
        <div className="absolute top-4 right-4 z-50 w-4 h-4 rounded-full" style={{ backgroundColor: isSaved ? "#168680" : "#783840" }}>

        </div>
      </Tooltip>

      {loaded ? (
        <>
          <BlockNoteView
            editor={editor}
            theme={defaultTheme}
            onChange={() => {
              setEntry(editor.document); // 👉 sincroniza al editar
              setIsSaved(false);
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
        <Skeleton className="z-20 w-full h-[30em] rounded-2xl flex items-center justify-betwee"
          classNames={{ base: " bg-[#666F9A]/40 border border-[#666F9A]" }} />
      )}
    </motion.div>
  );
}
