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
import { Toast, toast } from "../ui/Toast";
import ConfirmModal from "../ui/ConfirmModal";
import ThumbnailModal from "./ThumbnailModal";
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
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [thumbnailUrl, setThumbnailUrl] = useState<File | string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isSavedDraftClicked, setIsSavedDraftClicked] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const prevCoverUrlRef = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const uploadFile = async (file: File) => {
    try {
      const response = await uploadToCloudinary(file);
      return response;
    } catch (error) {
      console.error("File upload failed:", error);
      throw new Error("File upload failed");
    }
  };

  // Editor initialization
  const editor = useCreateBlockNote({ uploadFile: uploadFile });

  const getDocJson = () => {
    try {
      return JSON.stringify(editor.document);
    } catch {
      return null;
    }
  };

  const extractDescriptionFromBlocks = () => {
    try {
      const blocks = editor.document;
      // Find the first paragraph block
      const firstParagraphBlock = blocks.find(
        (block) => block.type === "paragraph"
      );

      if (!firstParagraphBlock || firstParagraphBlock.content.length === 0) {
        toast.error("Please add at least one paragraph");
        return null;
      }

      // Extract text content from the paragraph block
      let textContent = "";
      firstParagraphBlock.content.forEach((content) => {
        //@ts-ignore
        textContent += content.text;
      });
      alert("Text Content: " + JSON.stringify(textContent));
      console.log("Text" + JSON.stringify(firstParagraphBlock.content));

      // Limit description to 200 characters
      return textContent.length > 200
        ? textContent.substring(0, 200) + "..."
        : textContent;
    } catch (error) {
      console.error("Error extracting description:", error);
      toast.error("Please add at least one paragraph");
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
      // Convert file to base64 for persistent storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        localStorage.setItem("blog-cover", base64);
        localStorage.setItem("blog-cover-name", file.name);
        localStorage.setItem("blog-cover-type", file.type);
      };
      reader.readAsDataURL(file);
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
    setCoverImage(null);
    localStorage.removeItem("blog-cover");
    localStorage.removeItem("blog-cover-name");
    localStorage.removeItem("blog-cover-type");
    if (type === "update") {
      setHasChanges(true);
    }
  };

  const handleNavPublishButton = () => {
    if (title === "") {
      toast.error("Please add a title");
      return;
    }
    const descriptionExtracted = extractDescriptionFromBlocks();

    if (!descriptionExtracted) {
      return; // Function already shows toast error
    }
    setDescription(descriptionExtracted);

    setIsThumbnailModalOpen(true);
  };

  const handleThumbnailModalConfirm = async (data: {
    category?: string;
    thumbnailUrl: File | string | null;
  }) => {
    setSelectedCategory(data.category || "");

    setThumbnailUrl(data.thumbnailUrl);
    setIsThumbnailModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handlePublish = async () => {
    try {
      let finalCoverUrl = coverUrl;
      if (coverImage !== null) {
        finalCoverUrl = await uploadToCloudinary(coverImage);
      }

      let finalThumbnailUrl = "";
      if (thumbnailUrl !== null) {
        finalThumbnailUrl = await uploadToCloudinary(thumbnailUrl);
      }

      const html = await editor.blocksToFullHTML(editor.document);
      const blogData = {
        title,
        content: html,
        description: description,
        coverUrl: coverImage === null ? null : finalCoverUrl,
        thumbnailUrl: finalThumbnailUrl,
        category: selectedCategory || null,
        isPublished: true,
      };
      if (type === "create" && publishBlog) {
        await publishBlog(blogData);
        localStorage.removeItem("blog-draft");
        localStorage.removeItem("blog-title");
        localStorage.removeItem("blog-cover");
        localStorage.removeItem("blog-cover-name");
        localStorage.removeItem("blog-cover-type");
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
      // Extract description from first paragraph
      const descriptionExtracted = extractDescriptionFromBlocks();
      if (!descriptionExtracted) {
        setIsSavedDraftClicked(false);
        return;
      }

      let finalCoverUrl = coverUrl;
      if (coverImage) {
        finalCoverUrl = await uploadToCloudinary(coverImage);
      }
      const html = await editor.blocksToFullHTML(editor.document);
      const blocks = getDocJson();
      await saveAsDraftBlog({
        title,
        content: html,
        description: descriptionExtracted,
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
      const savedCoverName = localStorage.getItem("blog-cover-name");
      const savedCoverType = localStorage.getItem("blog-cover-type");
      const savedDraft = localStorage.getItem("blog-draft");

      if (savedDraft) {
        alert("Found saved draft");
        editor.replaceBlocks(editor.document, JSON.parse(savedDraft));
      }

      if (savedTitle && savedTitle.trim()) setTitle(savedTitle);

      if (savedCover && savedCoverName && savedCoverType) {
        // Convert base64 back to File object
        fetch(savedCover)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], savedCoverName, {
              type: savedCoverType,
            });
            setCoverImage(file);
            setCoverUrl(savedCover); // Use base64 directly as URL
          })
          .catch(console.error);
      }
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
        onPublish={handleNavPublishButton}
        hasChanges={hasChanges}
      />
      <BlogCover
        coverUrl={coverUrl}
        onCoverPicked={onCoverPicked}
        onRemoveCover={removeCover}
      />
      <div className="lg:max-w-[1400px] mx-auto ">
        <div className="relative group top-[20px]">
          <TextareaAutosize
            value={title}
            onChange={handleTitleChange}
            placeholder={type === "create" ? "Title" : "Blog title"}
            className="w-full text-4xl sm:text-6xl font-bold placeholder:text-gray-400 bg-transparent border-0 outline-none focus:ring-0 mb-[70px]"
          />
        </div>
        <div className="relative top-[-30px]">
          <BlockNoteView
            editor={editor}
            theme="light"
            onChange={handleEditorChange}
            onScroll={handleScroll}
            onPaste={handlePaste}
            editable={isThumbnailModalOpen ? false : true}
          />
        </div>
      </div>
      <Toast />
      <ThumbnailModal
        title={type === "create" ? "Publish Blog" : "Update Blog"}
        description={
          type === "create"
            ? "Choose a thumbnail and category for your travel story before publishing."
            : "Update your blog thumbnail and category."
        }
        isOpen={isThumbnailModalOpen}
        onConfirm={handleThumbnailModalConfirm}
        onClose={() => setIsThumbnailModalOpen(false)}
        loading={isPublishing}
        loadingText={type === "create" ? "Publishing..." : "Updating..."}
        initialCategory={initialCategory || ""}
      />
      <ConfirmModal
        title={type === "create" ? "Confirm Publication" : "Confirm Update"}
        description={
          type === "create"
            ? "Are you ready to publish your blog post?"
            : "Are you ready to update your blog post?"
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
