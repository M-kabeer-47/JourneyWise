"use client";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import confirmModal from "@/components/ui/ConfirmModal";
import {
  Camera,
  Save,
  MoreVertical,
  ImageOff,
  MoreHorizontal,
} from "lucide-react";

export default function App() {
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const lastSavedRef = useRef<string | null>(null);

  // Cover image preview (Notion-like)
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const prevCoverUrlRef = useRef<string | null>(null);

  // NEW: simple blog title
  const [title, setTitle] = useState<string>("");

  const pickCover = () => coverInputRef.current?.click();
  const onCoverPicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file); // local preview
    setCoverUrl(url);
    setHasUnsaved(true);
    // reset input so picking same file again still triggers onChange
    e.target.value = "";
  };

  // Revoke old object URLs to avoid memory leaks
  useEffect(() => {
    if (prevCoverUrlRef.current && prevCoverUrlRef.current !== coverUrl) {
      URL.revokeObjectURL(prevCoverUrlRef.current);
    }
    prevCoverUrlRef.current = coverUrl;
    return () => {
      if (prevCoverUrlRef.current) URL.revokeObjectURL(prevCoverUrlRef.current);
    };
  }, [coverUrl]);

  async function uploadFile(file: File) {
    try {
      const response = await uploadToCloudinary(file);
      return response;
    } catch (error) {
      console.error("File upload failed:", error);
      throw new Error("File upload failed");
    }
  }

  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    uploadFile,
  });

  // Serialize editor content safely
  const getDocJson = useMemo(
    () => () => {
      try {
        // BlockNote editor.document is JSON-serializable
        return JSON.stringify(editor.document);
      } catch {
        return null;
      }
    },
    [editor]
  );

  // Mark as dirty on any change
  const handleEditorChange = () => {
    const json = getDocJson();
    if (!json) return;
    if (json !== lastSavedRef.current) {
      setHasUnsaved(true);
    }
    try {
      localStorage.setItem("blog-draft", json);
    } catch {}
  };

  const removeCover = () => {
    if (prevCoverUrlRef.current) {
      URL.revokeObjectURL(prevCoverUrlRef.current);
      prevCoverUrlRef.current = null;
    }
    setCoverUrl(null);
    setHasUnsaved(true);
  };

  // Your save function (replace with API call as needed)
  const saveBlog = async () => {
    const json = getDocJson();
    if (!json) return;
    // Save draft locally; replace with API call later
    localStorage.setItem(
      "blog-last-saved",
      JSON.stringify({ title, content: JSON.parse(json), coverUrl })
    );
    lastSavedRef.current = json;
    setHasUnsaved(false);
  };

  // Guard: tab/window close => show native prompt, autosave draft synchronously
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasUnsaved) return;
      const json = getDocJson();
      if (json) {
        try {
          localStorage.setItem("blog-draft", json);
        } catch {}
      }
      e.preventDefault();
      e.returnValue = ""; // triggers native confirm dialog
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [hasUnsaved, getDocJson]);

  // Guard: in-app navigation (clicking links) => show custom confirmModal
  useEffect(() => {
    const handleLinkClick = async (e: MouseEvent) => {
      if (!hasUnsaved) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      const isSameOrigin = url.origin === window.location.origin;
      const isSamePage = url.href === window.location.href;
      const newTab = anchor.target === "_blank";
      if (!isSameOrigin || isSamePage || newTab) return;

      e.preventDefault();

      const confirmed = confirmModal({
        title: "Unsaved Changes",
        description:
          "You have unsaved changes. Do you want to save before navigating away?",
        confirmText: "Save and Navigate",
        cancelText: "Stay on Page",
        onConfirm: async () => {
          await saveBlog();
        },
        onClose: () => {
          setHasUnsaved(false);
        },
        isOpen: true,
        loading: false,
        loadingText: "Saving...",
      } as any);

      if (confirmed) {
        try {
          await saveBlog();
        } catch (err) {
          console.error("Save failed:", err);
          return;
        }
        window.location.href = url.href;
      }
    };

    window.addEventListener("click", handleLinkClick, true);
    return () => window.removeEventListener("click", handleLinkClick, true);
  }, [hasUnsaved]);

  // UI: navbar + cover + editor container with heading
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar (left-aligned, no centering) */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-gray-200">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="text-xl font-bold font-['Raleway'] text-midnight-blue">
            JourneyWise
          </div>
          <button
            type="button"
            onClick={saveBlog}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-ocean-blue text-white hover:bg-ocean-blue/90 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="text-sm">Save</span>
          </button>
        </div>
      </nav>

      {/* Notion-like cover (hidden by default) */}
      {coverUrl && (
        <div className="w-full h-48 sm:h-56 md:h-64 relative bg-light-gray">
          <img
            src={coverUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {/* Kebab menu (3 dots) with hover dropdown */}
          <div className="absolute top-3 right-3 z-10 group">
            <button
              type="button"
              className="p-2  text-white  transition shadow-sm"
              aria-label="Cover actions"
            >
              <MoreHorizontal className="w-6 h-6" />
            </button>

            <div className="hidden group-hover:block absolute right-0 mt-2 w-44 rounded-md border border-gray-200 bg-white shadow-lg">
              <button
                type="button"
                onClick={saveBlog}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-charcoal hover:bg-gray-50"
              >
                <Save className="w-4 h-4 text-ocean-blue" />
                Save
              </button>
              <button
                type="button"
                onClick={removeCover}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-charcoal hover:bg-gray-50"
              >
                <ImageOff className="w-4 h-4 text-coral-red" />
                Remove image
              </button>
              <button
                type="button"
                onClick={pickCover}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-charcoal hover:bg-gray-50"
              >
                <Camera className="w-4 h-4 text-midnight-blue" />
                Change cover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content (no centered container; just x/y padding) */}
      <div className="py-8">
        <div className="relative group mb-4 px-4 sm:px-24 ">
          {!coverUrl && (
            <button
              type="button"
              onClick={pickCover}
              className="absolute -top-6 left-[100px] opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 text-sm   rounded-sm bg-white py-2 px-2 hover:bg-neutral-100"
            >
              📸 Add cover
            </button>
          )}

          {/* Simple heading input styled to match the blog section */}
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setHasUnsaved(true);
            }}
            placeholder="Title"
            className="w-full text-4xl sm:text-6xl font-bold placeholder:text-gray-400 bg-transparent border-0 outline-none focus:ring-0"
          />
        </div>

        {/* Editor */}
        <div className="px-12">
          <BlockNoteView
            editor={editor}
            theme="light"
            onChange={handleEditorChange}
          />
        </div>
      </div>

      {/* Hidden file input for cover image picking */}
      <input
        type="file"
        accept="image/*"
        ref={coverInputRef}
        onChange={onCoverPicked}
        className="hidden"
      />
    </div>
  );
}
