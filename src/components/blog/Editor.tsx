"use client";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import "@blocknote/shadcn/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "../ui/Toast";
import ConfirmModal from "../ui/ConfirmModal";
import { BlogNav } from "./BlogNavbar";
import { BlogCover } from "./BlogCover";

interface EditorProps {
  type: "create" | "update";
  initialTitle?: string;
  initialContent?: any;
  initialCoverUrl?: string;
  publishBlog?: (data: any) => Promise<void>;
  saveAsDraftBlog?: (data: any) => Promise<void>;
  updateBlog?: (data: any) => Promise<void>;
  isPublishing: boolean;
  onSuccess?: () => void;
}

export default function Editor({
  type,
  initialTitle = "",
  initialContent,
  initialCoverUrl = "",
  publishBlog,
  saveAsDraftBlog,
  updateBlog,
  isPublishing,
  onSuccess,
}: EditorProps) {
  // Common states
  const [coverUrl, setCoverUrl] = useState<string | null>(
    type === "update" ? initialCoverUrl : null
  );
  const [title, setTitle] = useState<string>(
    type === "update" ? initialTitle : ""
  );
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isSavedDraftClicked, setIsSavedDraftClicked] = useState(false);
  const [changesCount, setChangesCount] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const prevCoverUrlRef = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  async function uploadFile(file: File) {
    try {
      const response = await uploadToCloudinary(file);
      return response;
    } catch (error) {
      console.error("File upload failed:", error);
      throw new Error("File upload failed");
    }
  }

  // Editor initialization
  const editor = useCreateBlockNote({
    uploadFile,
    initialContent: (() => {
      return undefined;
    })(),
  });

  // Revoke old object URLs to avoid memory leaks

  const getDocJson = () => {
    try {
      return JSON.stringify(editor.document);
    } catch {
      return null;
    }
  };

  const handleEditorChange = () => {
    if (type === "update") {
      if (changesCount === 0) {
        setChangesCount((prev) => prev + 1);
      }
      if (changesCount > 0) {
        setHasChanges(true);
      }
      return;
    }

    // Auto-save for create type
    const json = getDocJson();
    if (!json) return;
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      let blogData = json;
      localStorage.setItem("blog-draft", JSON.stringify(blogData));
    }, 5000);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (type === "create") {
      localStorage.setItem("blog-title", e.target.value);
    } else {
      if (e.target.value !== initialTitle) {
        setHasChanges(true);
      }
    }
  };

  const onCoverPicked = (file: File) => {
    setCoverImage(file);
    const url = URL.createObjectURL(file);
    setCoverUrl(url);

    if (type === "create") {
      localStorage.setItem("blog-cover", url);
    } else {
      setHasChanges(true);
    }
  };

  const removeCover = () => {
    if (prevCoverUrlRef.current) {
      URL.revokeObjectURL(prevCoverUrlRef.current);
      prevCoverUrlRef.current = null;
    }
    setCoverUrl(null);

    if (type === "update") {
      setHasChanges(true);
    }
  };

  const handlePublish = async () => {
    try {
      let finalCoverUrl = coverUrl;

      if (coverImage) {
        finalCoverUrl = await uploadToCloudinary(coverImage);
      }

      const html = await editor.blocksToFullHTML(editor.document);

      const blogData = {
        title,
        content: html,
        coverUrl: finalCoverUrl,
        isPublished: true,
      };

      if (type === "create" && publishBlog) {
        await publishBlog(blogData);
        localStorage.removeItem("blog-draft");
        localStorage.removeItem("blog-title");
        localStorage.removeItem("blog-cover");
      } else if (type === "update" && updateBlog) {
        await updateBlog(blogData);
        setHasChanges(false);
      }

      setIsConfirmModalOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to publish/update blog:", error);
    }
  };

  const handleSaveDraft = async () => {
    if (!saveAsDraftBlog) return;

    setIsSavedDraftClicked(true);
    try {
      let finalCoverUrl = coverUrl;

      if (coverImage) {
        finalCoverUrl = await uploadToCloudinary(coverImage);
      }

      const html = await editor.blocksToFullHTML(editor.document);
      const blocks = getDocJson();

      await saveAsDraftBlog({
        title,
        content: html,
        blocks,
        coverUrl: finalCoverUrl,
        isPublished: false,
      });
    } catch (error) {
      console.error("Failed to save draft:", error);
    } finally {
      setIsSavedDraftClicked(false);
    }
  };

  useEffect(() => {
    if (type === "create") {
      const savedTitle = localStorage.getItem("blog-title");
      const savedCover = localStorage.getItem("blog-cover");
      const savedDraft = localStorage.getItem("blog-draft");
      if (savedDraft) {
        alert("Found saved draft");
        editor.replaceBlocks(editor.document, JSON.parse(savedDraft));
      } else {
        editor.replaceBlocks(editor.document, []);
      }
      if (savedTitle) setTitle(savedTitle);
      if (savedCover) setCoverUrl(savedCover);
    }

    if (type === "update") {
      const convertHTMLToBlocks = async () => {
        let blocks = await editor.tryParseHTMLToBlocks(initialContent);
        editor.replaceBlocks(editor.document, blocks);
      };
      convertHTMLToBlocks();
    }
    return () => {
      if (coverUrl) URL.revokeObjectURL(coverUrl);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20">
      <BlogNav
        type={type}
        isPublishing={isPublishing}
        isSavedDraftClicked={isSavedDraftClicked}
        onSaveDraft={handleSaveDraft}
        onPublish={() => setIsConfirmModalOpen(true)}
        hasChanges={hasChanges}
      />
      <BlogCover
        coverUrl={coverUrl}
        onCoverPicked={onCoverPicked}
        onRemoveCover={removeCover}
      />

      <div className="py-8">
        <div className="relative group mb-4 px-4 sm:px-24">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder={type === "create" ? "Title" : "Blog title"}
            className="w-full text-4xl sm:text-6xl font-bold placeholder:text-gray-400 bg-transparent border-0 outline-none focus:ring-0"
          />
        </div>

        <div className="px-12">
          {initialContent !== undefined && (
            <BlockNoteView
              editor={editor}
              theme="light"
              onChange={handleEditorChange}
            />
          )}
        </div>
      </div>

      <Toast />

      <ConfirmModal
        title={type === "create" ? "Publish Blog" : "Update Blog"}
        description={
          type === "create"
            ? "Are you sure you want to publish this blog?"
            : "Are you sure you want to update this blog?"
        }
        isOpen={isConfirmModalOpen}
        onConfirm={handlePublish}
        onClose={() => setIsConfirmModalOpen(false)}
        loading={isPublishing}
        loadingText={type === "create" ? "Publishing..." : "Updating..."}
      />
    </div>
  );
}
