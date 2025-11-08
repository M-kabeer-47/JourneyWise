// Mock data for chat functionality

import { AttachmentFile } from "@/components/chat/AttachmentPreview";




export interface User {
  id: string;
  name: string;
  role: "traveler" | "agent" | "admin";
  initials: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  preview?: string;
  type: "image" | "file";
  size: number;
  file?: File;
  isUploading?: boolean;
  uploadProgress?: number;
}

export interface ChatMessage {
  id: string;
  senderID: string;
  recipientID: string;
  message: string;
  createdAt: Date;
  status: "sending" | "sent" | "delivered" | "seen";
  replyTo?: string;
  attachments?: AttachmentFile[] | null;
  edited?: boolean;
  isUploading?: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  typingStatus?: boolean;
}

// Mock users
