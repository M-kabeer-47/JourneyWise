"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

interface BlogViewerProps {
  content: string;
}

export default function BlogViewer({ content }: BlogViewerProps) {
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Create editor for viewing (same as your Editor component)

  const editor = useCreateBlockNote();

  // Convert HTML content to BlockNote blocks
  useEffect(() => {
    if (content && editor) {
      const loadContent = async () => {
        try {
          // Convert HTML to BlockNote blocks
          const blocks = await editor.tryParseHTMLToBlocks(content);
          editor.replaceBlocks(editor.document, blocks);
          setIsEditorReady(true);
        } catch (error) {
          console.error("Failed to parse blog content:", error);
          setIsEditorReady(true); // Still show editor, even if parsing failed
        }
      };
      loadContent();
    }
  }, [content, editor]);

  return (
    <div className="relative">
      {isEditorReady ? (
        <BlockNoteView
          editor={editor}
          editable={false} // KEY: Makes it read-only
          theme="light"
        />
      ) : (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5 mb-4"></div>
        </div>
      )}
    </div>
  );
}
