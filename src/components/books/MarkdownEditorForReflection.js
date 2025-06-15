
"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import "./styles.css";
import { addToast, Button, Skeleton } from "@heroui/react";
import { getReflection, saveReflection } from "@root/utils/books";
import { useEffect, useState } from "react";

// Instala:
// npm install @blocknote/xl-pdf-exporter @react-pdf/renderer

export default function Editor({ bookID }) {
  const [reflection, setReflection] = useState([]);
  const [loading, setLoading] = useState(true);
  const editor = useCreateBlockNote();
  const defaultTheme = {
    colors: { editor: { text: "#fff" } },
  };

  useEffect(() => {
    const loadReflection = async () => {
      try {
        const { reflection: content } = await getReflection(bookID);
        if (content) {
          const json = JSON.parse(content);
          setReflection(json);
          editor.replaceBlocks(editor.document, json);
        }
      } catch (err) {
        console.error(err);
        addToast({ title: "Error", description: "Error loading journal entry.", color: "danger", timeout: 2000 });
      } finally {
        setLoading(false);
      }
    };

    loadReflection();
  }, [])

  const handleSave = async () => {
    try {
      await saveReflection(bookID, JSON.stringify(reflection));
      addToast({ title: "Saved", description: "Journal entry saved successfully.", color: "success", timeout: 2000 });
    } catch (err) {
      console.error(err);
      addToast({ title: "Error", description: "Error saving journal entry.", color: "danger", timeout: 2000 });
    }
  };

  const handleDownload = async () => {
    try {
      // Obtenemos los bloques directamente del editor, sin selección ni IDs duplicados
      const blocks = editor.document;
      if (!blocks || !blocks.length) throw new Error("No content to export");

      // Importamos dinámicamente
      const { PDFExporter, pdfDefaultSchemaMappings } = await import("@blocknote/xl-pdf-exporter");
      const { pdf } = await import("@react-pdf/renderer");

      // Creamos exportador con el schema
      const exporter = new PDFExporter(editor.schema, pdfDefaultSchemaMappings);

      // Generamos documento React-PDF
      const pdfDoc = await exporter.toReactPDFDocument(blocks);

      // Convertimos a blob y descargamos
      const blob = await pdf(pdfDoc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "reflection.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting PDF:", err);
      addToast({ title: "Error", description: "Could not export to PDF.", color: "danger" });
    }
  };

  return (
    <div className="z-20 flex flex-col">
      {
        loading ?
          <Skeleton className="text-muted-foreground w-full h-[80vh] rounded-lg "></Skeleton>
          : <BlockNoteView
            editor={editor}
            theme={defaultTheme}
            onChange={() => setReflection(editor.document)}
          />
      }
      <Button color="primary" className="mt-4" onClick={handleSave}>
        Save Book Reflection
      </Button>
      <Button className="mt-4" onClick={handleDownload}>
        Download as PDF
      </Button>
    </div>
  );
}

