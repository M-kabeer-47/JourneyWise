"use client";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import "@blocknote/shadcn/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Toast } from "../ui/Toast";
import ConfirmModal from "../ui/ConfirmModal";
import { BlogNav } from "./BlogNavbar";
import { BlogCover } from "./BlogCover";
import { useQueryClient } from "@tanstack/react-query";
import TextareaAutosize from "react-textarea-autosize";

interface EditorProps {
  type: "create" | "update";
  initialTitle?: string;
  initialContent?: any;
  initialCoverUrl?: string;
  initialCategory?: string | null;
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
  initialCategory = null,
  publishBlog,
  saveAsDraftBlog,
  updateBlog,
  isPublishing,
  onSuccess,
}: EditorProps) {
  // Common states
  const queryClient = useQueryClient();
  const [coverUrl, setCoverUrl] = useState<string | null>(
    type === "update" ? initialCoverUrl : null
  );
  const [title, setTitle] = useState<string>(
    type === "update" ? initialTitle : ""
  );
  const [changesCount, setChangesCount] = useState(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isSavedDraftClicked, setIsSavedDraftClicked] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const prevCoverUrlRef = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const uploadFile = useCallback(async (file: File) => {
    try {
      const response = await uploadToCloudinary(file);
      return response;
    } catch (error) {
      console.error("File upload failed:", error);
      throw new Error("File upload failed");
    }
  }, []);

  const editorOptions = useMemo(
    () => ({
      uploadFile,
    }),
    [uploadFile]
  );

  // Editor initialization
  const editor = useCreateBlockNote(editorOptions);

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
      if (changesCount === 1 || changesCount === 2) {
        setHasChanges(true);
        setChangesCount((prev) => prev + 1);
      }
      return;
    }

    // Auto-save for create type
    const json = getDocJson();
    if (!json) return;
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      let blogData = json;
      localStorage.setItem("blog-draft", blogData);
    }, 3000);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    if (type === "create") {
      localStorage.setItem("blog-title", e.target.value.trim());
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
    localStorage.removeItem("blog-cover");
    if (type === "update") {
      setHasChanges(true);
    }
  };

  const handlePublish = async (category?: string) => {
    try {
      let finalCoverUrl = coverUrl;
      if (coverImage !== null) {
        finalCoverUrl = await uploadToCloudinary(coverImage);
      }
      const html = await editor.blocksToFullHTML(editor.document);
      const blogData = {
        title,
        content: html,
        coverUrl: coverImage === null ? null : finalCoverUrl,
        category: category || null,
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
      queryClient.invalidateQueries({ queryKey: ["blog"] });
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
        category: null, // Drafts don't require category
        isPublished: false,
      });
    } catch (error) {
      console.error("Failed to save draft:", error);
    } finally {
      setIsSavedDraftClicked(false);
    }
  };

  // FIX: Memoize event handlers with useCallback
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (type === "create") {
      const savedTitle = localStorage.getItem("blog-title");
      const savedCover = localStorage.getItem("blog-cover");
      const savedDraft = localStorage.getItem("blog-draft");
      if (savedDraft) {
        alert("Found saved draft");
        editor.replaceBlocks(editor.document, JSON.parse(savedDraft));
      }
      if (savedTitle && savedTitle.trim()) setTitle(savedTitle);
      if (savedCover) setCoverUrl(savedCover);
    }
    if (type === "update" && initialContent) {
      const convertHTMLToBlocks = async () => {
        let blocks = await editor.tryParseHTMLToBlocks(initialContent);
        editor.replaceBlocks(editor.document, blocks);
      };
      convertHTMLToBlocks();
    }
  }, []);

  return (
    <div className="min-h-screen bg-white pb-[200px]">
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
      <div className="lg:max-w-[1400px] mx-auto px-[30px] ">
        <div className="relative group top-[20px]">
          <TextareaAutosize
            value={title}
            onChange={handleTitleChange}
            placeholder={type === "create" ? "Title" : "Blog title"}
            className="w-full text-4xl sm:text-6xl font-bold placeholder:text-gray-400 bg-transparent border-0 outline-none focus:ring-0 mb-[70px]"
          />
        </div>
        <div className="relative top-[-20px]">
          <BlockNoteView
            editor={editor}
            theme="light"
            onChange={handleEditorChange}
            onScroll={handleScroll}
            onPaste={handlePaste}
          />
        </div>
      </div>
      <Toast />
      <ConfirmModal
        title={type === "create" ? "Publish Blog" : "Update Blog"}
        description={
          type === "create"
            ? "Select a category and publish your travel story to share with the community."
            : "Update your blog post and optionally change its category."
        }
        isOpen={isConfirmModalOpen}
        onConfirm={handlePublish}
        onClose={() => setIsConfirmModalOpen(false)}
        loading={isPublishing}
        loadingText={type === "create" ? "Publishing..." : "Updating..."}
        requireCategory={true}
        initialCategory={initialCategory || ""}
      />
    </div>
  );
}
