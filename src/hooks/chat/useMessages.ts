import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChatMessage } from "@/lib/constants/mock-chat-data";
import axios from "axios";
import { Socket } from "socket.io-client";
import { AttachmentFile } from "@/components/chat/AttachmentPreview";
import { useAppSelector } from "../redux";
import { toast } from "@/components/ui/Toast";
import { useRef } from "react";

interface SendMessageParams {
  message: string;
  recipientID: string;
  replyToId?: string;
}

interface FetchMessagesParams {
  recipientID: string;
  userID: string | null;
}

// Fetch messages between sender and recipient
async function fetchMessages({
  recipientID,
  userID,
}: FetchMessagesParams): Promise<ChatMessage[]> {
  if (!userID) {
    toast.error("Please login to fetch messages.");
    return [];
  }
  const response = await axios.get("/api/fetch-messages", {
    params: { recipientID },
    headers: {
      "x-user-id": userID,
    },
  });
  return response.data;
}

export function useMessages({
  senderID,
  recipientID,
  socket,
}: {
  senderID: string;
  recipientID: string;
  socket: Socket | null;
}) {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);
  const userID = user.user && user.user.id;
  const retryCount = useRef<number>(0);
  // Fetch messages query
  const messagesQuery = useQuery({
    queryKey: ["messages", senderID, recipientID],
    queryFn: () => fetchMessages({ recipientID, userID: userID }),
    enabled: !!senderID && !!recipientID,
  });

  function updateMessageStatus(
    messageID: string,
    status: "sending" | "sent" | "delivered" | "seen"
  ) {
    queryClient.setQueryData<ChatMessage[]>(
      ["messages", senderID, recipientID],
      (old) => {
        if (!old) return [];
        return old.map((msg) =>
          msg.id === messageID ? { ...msg, status } : msg
        );
      }
    );
  }

  // Send message via socket
  const sendMessage = ({
    message,
    recipientID,
    replyToId,
    attachmentsArray,
    messageID,
  }: {
    message: string;
    recipientID: string;
    replyToId?: string;
    attachmentsArray?: AttachmentFile[] | null;
    messageID?: string;
  }) => {
    if (!socket || !recipientID) return;

    // Optimistically add message to UI
    const optimisticMessage: ChatMessage = {
      id: messageID ? messageID : crypto.randomUUID(),
      senderID,
      recipientID,
      message,
      attachments: attachmentsArray || null,
      createdAt: new Date(),
      status: "sending",
      replyTo: replyToId,
    };

    queryClient.setQueryData<ChatMessage[]>(
      ["messages", senderID, recipientID],
      (old) => {
        if (!old) return [optimisticMessage];

        // Check if message already exists
        const messageExists = old.some(
          (msg) => msg.id === optimisticMessage.id
        );

        // If exists, return old array unchanged. Otherwise, add the new message
        return messageExists ? old : [...old, optimisticMessage];
      }
    );

    // Emit socket event
    socket.emit(
      "sendMessage",
      {
        message: message,
        recipientID: recipientID,
        id: optimisticMessage.id,
        attachments: attachmentsArray,
        replyToId,
      },
      (response: { status: string }) => {
        if (response.status === "ok") {
          updateMessageStatus(optimisticMessage.id, "sent");
        } else if (response.status === "error") {
          if (retryCount.current > 3) {
            toast.error("Failed to send message after multiple attempts.");
            return;
          }
          setTimeout(() => {
            sendMessage({
              messageID: optimisticMessage.id,
              message: optimisticMessage.message,
              recipientID,
              replyToId,
              attachmentsArray,
            });
          }, 3000);
          retryCount.current += 1;
        }
      }
    );

    // Update status to sent after a delay (you can update this based on socket acknowledgment)
  };

  const updateMessagesStatus = (data: {
    messages: ChatMessage[];
    recipientID: string;
  }) => {
    const { messages, recipientID } = data;
    console.log("Messages to update: ", messages);
    queryClient.setQueryData<ChatMessage[]>(
      ["messages", senderID, recipientID],
      (old) => {
        if (!old) return messages;
        const updatedMessages = old.map((msg) => {
          const updatedMsg = messages.find((m) => m.id === msg.id);
          console.log("Updated Message: ", updatedMsg);
          return updatedMsg ? { ...msg, status: updatedMsg.status } : msg;
        });
        return updatedMessages;
      }
    );
  };
  // Add message from socket
  const addSocketMessage = (message: ChatMessage) => {
    queryClient.setQueryData<ChatMessage[]>(
      ["messages", senderID, recipientID],
      (old) => {
        // Check if message already exists
        if (old?.some((msg) => msg.id === message.id)) {
          return old;
        }
        return [...(old || []), message];
      }
    );
  };

  return {
    messages: messagesQuery.data || [],
    isLoading: messagesQuery.isLoading,
    isError: messagesQuery.isError,
    error: messagesQuery.error,
    sendMessage,
    addSocketMessage,
    updateMessagesStatus,
  };
}
