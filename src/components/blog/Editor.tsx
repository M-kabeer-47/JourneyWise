"use client";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import "@blocknote/shadcn/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import React, { useEffect, useRef, useState } from "react";
import { Camera, Save, ImageOff, Upload } from "lucide-react";

import { Toast } from "../ui/Toast";
import usePublishBlog from "@/hooks/blog/usePublishBlog";
import useSaveBlog from "@/hooks/blog/useSaveBlog";
import ConfirmModal from "../ui/ConfirmModal";

export default function App() {
  const [coverUrl, setCoverUrl] = useState<string | null>(localStorage.getItem("blog-cover") || null);
  const [title, setTitle] = useState<string>(localStorage.getItem("blog-title") || "");
  const [blogID, setBlogID] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const prevCoverUrlRef = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { publishBlog: postBlog, isPending: isPublishing } = usePublishBlog({
    setBlogID,
  });

  const pickCover = () => coverInputRef.current?.click();
  const onCoverPicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file); // local preview
    setCoverUrl(url);
    localStorage.setItem("blog-cover", url);


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
    initialContent: (() => {
      const draft = localStorage.getItem("blog-draft");
      if (!draft) return undefined;
      try {
        const parsed = JSON.parse(draft);
        return parsed?.content ? JSON.parse(parsed.content) : undefined;
      } catch {
        return undefined;
      }
    })(),
  });

  // Serialize editor content safely
  const getDocJson = () => {
    try {
      // BlockNote editor.document is JSON-serializable
      return JSON.stringify(editor.document);
    } catch {
      return null;
    }
  };

  // Mark as dirty on any change
  const handleEditorChange = () => {
    const json = getDocJson();
    if (!json) return;
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      let blogData = {
        title,
        content: json,
        coverUrl,
      };
      localStorage.setItem("blog-draft", JSON.stringify(blogData));
    }, 5000);
  };

  const removeCover = () => {
    if (prevCoverUrlRef.current) {
      URL.revokeObjectURL(prevCoverUrlRef.current);
      prevCoverUrlRef.current = null;
    }
    setCoverUrl(null);
  };

  // Your save function (replace with API call as needed)
  const publishBlog = async () => {
    const html = await editor.blocksToFullHTML(editor.document);
    await postBlog({
      title,
      html,
      coverUrl,
      isPublished: true,
    });
  };

  const saveBlog = async () => {
    if (!blogID) return;
    const html = await editor.blocksToFullHTML(editor.document);
    await postBlog({
      title,
      html,
      coverUrl,
      isPublished: false,
    });
  };

  // Guard: tab/window close => show native prompt, autosave draft synchronously
  // useEffect(() => {
  //   const onBeforeUnload = (e: BeforeUnloadEvent) => {
  //     if (!hasSaved) return;
  //     const json = getDocJson();
  //     if (json) {
  //       try {
  //         localStorage.setItem("blog-draft", json);
  //       } catch {}
  //     }
  //     e.preventDefault();
  //     e.returnValue = ""; // triggers native confirm dialog
  //   };

  //   window.addEventListener("beforeunload", onBeforeUnload);
  //   return () => window.removeEventListener("beforeunload", onBeforeUnload);
  // }, [hasSaved, getDocJson]);

  // Guard: in-app navigation (clicking links) => show custom confirmModal
  // useEffect(() => {
  //   const handleLinkClick = async (e: MouseEvent) => {
  //     if (!hasSaved) return;
  //     if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  //     const target = e.target as HTMLElement | null;
  //     const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
  //     if (!anchor) return;

  //     const url = new URL(anchor.href, window.location.href);
  //     const isSameOrigin = url.origin === window.location.origin;
  //     const isSamePage = url.href === window.location.href;
  //     const newTab = anchor.target === "_blank";
  //     if (!isSameOrigin || isSamePage || newTab) return;

  //     e.preventDefault();
  //   };

  //   window.addEventListener("click", handleLinkClick, true);
  //   return () => window.removeEventListener("click", handleLinkClick, true);
  // }, [hasSaved]);

  // UI: navbar + cover + editor container with heading
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Navbar (left-aligned, no centering) */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-gray-200 sm:px-14">
        <div className="px-8 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-raleway text-midnight-blue">
            JourneyWise
          </h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={saveBlog}
              disabled={isPublishing}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-2 border-ocean-blue bg-white text-white hover:bg-ocean-blue/90 transition-colors group"
            >
              <Save className="w-4 h-4 text-ocean-blue group-hover:text-white" />
              <span className="text-sm text-ocean-blue group-hover:text-white">
                {isPublishing ? "Saving..." : "Save as draft"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsConfirmModalOpen(true)}
              disabled={isPublishing}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-ocean-blue text-white hover:bg-ocean-blue/90 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm">
                {isPublishing ? "Publishing..." : "Publish"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Notion-like cover (hidden by default) */}
      {coverUrl && (
        <div className="w-full h-48 sm:h-56 md:h-64 relative bg-light-gray group">
          <img
            src={coverUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {/* Kebab menu (3 dots) with hover dropdown */}

          <div className="absolute bottom-5 right-[20px] z-10  hidden group-hover:flex absolute gap-6 right-0 mt-2">
            <button
              type="button"
              onClick={removeCover}
              className="w-full flex w-[150px]  gap-2 px-3 py-2 text-sm text-charcoal rounded-sm  items-center justify-center bg-white   "
            >
              <ImageOff className="w-4 h-4 text-coral-red" />
              Remove image
            </button>
            <button
              type="button"
              onClick={pickCover}
              className="w-full flex w-[150px]  gap-2 px-3 py-2 text-sm text-charcoal rounded-sm flex items-center justify-center bg-white"
            >
              <Camera className="w-4 h-4 text-midnight-blue" />
              Change cover
            </button>
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
              localStorage.setItem("blog-title", e.target.value);
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
      <Toast />
      <ConfirmModal
        title="Publish Blog"
        description="Are you sure you want to publish this blog post?"
        isOpen={isConfirmModalOpen}
        onConfirm={publishBlog}
        onClose={() => setIsConfirmModalOpen(false)}
        loading={isPublishing}
        loadingText="Publishing..."
      />
    </div>
  );
}
