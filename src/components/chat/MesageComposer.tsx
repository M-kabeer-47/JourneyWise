"use client";
import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  ForwardedRef,
  useEffect,
} from "react";
import {
  Send,
  Paperclip,
  Smile,
  X,
  AtSign,
  Image as ImageIcon,
} from "lucide-react";
import { ChatMessage, User } from "@/lib/constants/mock-chat-data";
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickermessage,
  EmojiPickerFooter,
} from "@/components/chat/EmojiPicker";
import AttachmentPreview, { AttachmentFile } from "./AttachmentPreview";

interface MessageComposerProps {
  onSendMessage: ({
    message,
    recipientID,
    replyToID,
    attachmentsArray,
  }: {
    message: string;
    recipientID: string;
    replyToID?: string;
    attachmentsArray?: AttachmentFile[] | undefined;
  }) => void;
  replyingTo?: ChatMessage;
  replyingToUser?: string;
  onCancelReply: () => void;
}

export type MessageComposerHandle = {
  insertEmoji: (emoji: string) => void;
};

const MessageComposer = forwardRef(function MessageComposer(
  {
    onSendMessage,
    replyingTo,
    replyingToUser,
    onCancelReply,
  }: MessageComposerProps,
  ref: ForwardedRef<MessageComposerHandle>
) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // emoji picker state & ref
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleImageButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    imageInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: AttachmentFile[] = [];

    Array.from(files).forEach((file) => {
      newAttachments.push({
        file,
        preview: URL.createObjectURL(file),
        type: "file",
      });
    });

    setAttachments(newAttachments);
    e.currentTarget.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: AttachmentFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newAttachments.push({
          file,
          preview: URL.createObjectURL(file),
          type: "image",
        });
      }
    });

    setAttachments(newAttachments);
    e.currentTarget.value = "";
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => {
      const newAttachments = [...prev];
      URL.revokeObjectURL(newAttachments[index].preview);
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  const handleRemoveAllAttachments = () => {
    setAttachments([]);
  };

  // Cleanup previews on unmount
  // useEffect(() => {
  //   return () => {
  //     attachments.forEach((attachment) => {
  //       URL.revokeObjectURL(attachment.preview);
  //     });
  //   };
  // }, [attachments]);

  // insert emoji helper (used internally and exposed)
  const insertEmojiLocal = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setMessage((prev) => prev + emoji);
      return;
    }

    const start = textarea.selectionStart ?? textarea.value.length;
    const end = textarea.selectionEnd ?? start;
    const before = message.slice(0, start);
    const after = message.slice(end);
    const newValue = before + emoji + after;

    setMessage(newValue);

    requestAnimationFrame(() => {
      if (!textarea) return;

      const caret = start + emoji.length;
      textarea.selectionStart = textarea.selectionEnd = caret;
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
      textarea.focus();
    });
  };

  // expose insertEmoji to parent via ref
  useImperativeHandle(ref, () => ({
    insertEmoji: insertEmojiLocal,
  }));

  // close emoji picker when clicking outside
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(e.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(e.target as Node)
      ) {
        setIsEmojiOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSend = () => {
    if ((message.trim() || attachments.length > 0) && replyingToUser) {
      onSendMessage({
        message: message.trim(),
        recipientID: replyingToUser,
        replyToID: replyingTo?.id,
        attachmentsArray: attachments,
      });
      setMessage("");
      handleRemoveAllAttachments();
      if (replyingTo) {
        onCancelReply();
      }
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const handleEmojiSelect = (emojiData: any) => {
    const emoji =
      typeof emojiData === "string"
        ? emojiData
        : emojiData?.emoji ?? emojiData?.native ?? "";
    if (!emoji) return;
    insertEmojiLocal(emoji);
  };

  return (
    <div className="border-t border-gray-200 w-full relative bg-white">
      {/* Attachment Preview */}
      <AttachmentPreview
        attachments={attachments}
        onRemove={handleRemoveAttachment}
        onRemoveAll={handleRemoveAllAttachments}
      />

      {replyingTo && replyingToUser && (
        <div className="px-3 sm:px-6 py-2 sm:py-3 bg-light-gray/50 border-b border-gray-200">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-charcoal/60 mb-1 font-geist">
                Replying to{" "}
                <span className="font-medium text-midnight-blue font-raleway">
                  {replyingToUser.name}
                </span>{" "}
              </div>
              <div className="text-sm text-charcoal font-geist line-clamp-2">
                {replyingTo.message}
              </div>
            </div>
            <button
              onClick={onCancelReply}
              className="p-1.5 hover:bg-white rounded-lg transition-colors flex-shrink-0"
            >
              <X className="h-4 w-4 text-charcoal/60" />
            </button>
          </div>
        </div>
      )}

      {/* Emoji picker - shown above composer when isEmojiOpen */}
      {isEmojiOpen && (
        <div
          ref={emojiRef}
          className="absolute bottom-full mb-2 right-4 z-50 pointer-events-auto"
        >
          <div className="w-[280px] h-[420px] shadow-lg rounded-md overflow-hidden">
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              className="h-full w-full"
            >
              <EmojiPickerSearch />
              <EmojiPickermessage />
              <EmojiPickerFooter />
            </EmojiPicker>
          </div>
        </div>
      )}

      <div className="px-2 sm:px-4 py-2 sm:py-3 w-full">
        <div className="flex items-end gap-2 sm:gap-3 w-full">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-28 sm:pr-32 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-blue/30 focus:border-ocean-blue resize-none min-h-[44px] sm:min-h-[48px] max-h-[120px] text-sm overflow-y-auto font-geist text-charcoal placeholder:text-charcoal/40 bg-white shadow-sm"
              rows={1}
            />

            <div className="absolute right-1.5 sm:right-2 bottom-3 sm:bottom-3.5 flex items-center gap-0.5">
              {/* Image attachment button */}
              <button
                onClick={handleImageButtonClick}
                className="p-1.5 sm:p-2 hover:bg-ocean-blue/10 rounded-lg transition-colors flex items-center justify-center"
                title="Attach images"
              >
                <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-charcoal/60 hover:text-ocean-blue" />
              </button>
              <input
                ref={imageInputRef}
                type="file"
                className="hidden"
                accept=".mp3,.mp4,.mov,.avi,.mkv,.jpg,.jpeg,.png,.gif,.bmp,.webp"
                multiple
                onChange={handleImageChange}
              />

              {/* File attachment button */}
              <button
                onClick={handleFileButtonClick}
                className="p-1.5 sm:p-2 hover:bg-ocean-blue/10 rounded-lg transition-colors flex items-center justify-center"
                title="Attach files"
              >
                <Paperclip className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-charcoal/60 hover:text-ocean-blue" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.7z"
              />

              {/* Emoji toggle button - opens emoji picker */}
              <button
                ref={emojiButtonRef}
                onClick={(e) => {
                  setIsEmojiOpen((s) => !s);
                }}
                aria-expanded={isEmojiOpen}
                className="p-1.5 sm:p-2 hover:bg-ocean-blue/10 rounded-lg transition-colors flex items-center justify-center"
              >
                <Smile className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-charcoal/60 hover:text-ocean-blue" />
              </button>
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={!message.trim() && attachments.length === 0}
            className={`relative bottom-1.5 px-3 sm:px-4 py-2.5 sm:py-3 flex-shrink-0 h-[44px] sm:h-[48px] rounded-xl transition-all duration-200 font-medium shadow-sm ${
              message.trim() || attachments.length > 0
                ? "bg-midnight-blue text-white "
                : "bg-gray-200 text-charcoal/40 cursor-not-allowed"
            }`}
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default MessageComposer;
