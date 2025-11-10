import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { ChatMessage } from "@/lib/constants/mock-chat-data";
import axios from "axios";
import { Socket } from "socket.io-client";
import { AttachmentFile } from "@/components/chat/AttachmentPreview";
import { useAppSelector } from "../redux";
import { toast } from "@/components/ui/Toast";
import { useRef } from "react";


interface FetchMessagesParams {
  recipientID: string;
  senderID: string | null;
  pageParam: number;
}

// Fetch messages between sender and recipient
async function fetchMessages({
  recipientID,
  senderID,
  pageParam,
}: FetchMessagesParams): Promise<ChatMessage[]> {
  if (!senderID) {
    toast.error("Please login to fetch messages.");
    return [];
  }
  const response = await axios.get("/api/fetch-messages", {
    params: { recipientID, page: pageParam, limit: 20 },
    headers: {
      "x-user-id": senderID,
    },
  });
  return response.data.messages;
}

export function useMessages({
  recipientID,
  socket,
}: {
  recipientID: string | null;
  socket: Socket | null;
}) {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);
  const senderID = user.user && user.user.id;
  const retryCount = useRef<number>(0);
  
  // Fetch messages with infinite query
  const messagesQuery = useInfiniteQuery({
    queryKey: ["messages", senderID, recipientID],
    queryFn: ({ pageParam }: any) => 
      fetchMessages({ recipientID: recipientID!, senderID, pageParam }),
    getNextPageParam: (lastPage: ChatMessage[], allPages: ChatMessage[][]) => {
      // If last page has messages, return next page number
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    enabled: !!senderID && !!recipientID,
    staleTime: 5 * 60 * 1000,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });

  // Flatten all pages into single array and reverse to show oldest first
  const messages: ChatMessage[] = messagesQuery.data?.pages.flat().reverse() || [];

  function updateMessageStatus(
    messageID: string,
    status: "sending" | "sent" | "delivered" | "seen"
  ) {
    queryClient.setQueryData(
      ["messages", senderID, recipientID],
      (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: ChatMessage[]) =>
            page.map((msg: ChatMessage) =>
              msg.id === messageID ? { ...msg, status } : msg
            )
          ),
        };
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
      senderID: senderID!,
      recipientID,
      message,
      attachments: attachmentsArray || null,
      createdAt: new Date(),
      status: "sending",
      replyTo: replyToId,
    };

    queryClient.setQueryData(
      ["messages", senderID, recipientID],
      (old: any) => {
        if (!old) {
          return {
            pages: [[optimisticMessage]],
            pageParams: [1],
          };
        }

        const firstPage = old.pages[0] || [];
        
        // Check if message already exists
        const messageExists = firstPage.some(
          (msg: ChatMessage) => msg.id === optimisticMessage.id
        );

        if (messageExists) return old;

        // Add to the first page (most recent messages)
        return {
          ...old,
          pages: [[optimisticMessage, ...firstPage], ...old.pages.slice(1)],
        };
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
    const { messages: updatedMessages, recipientID } = data;
    console.log("Messages to update: ", updatedMessages);
    queryClient.setQueryData(
      ["messages", senderID, recipientID],
      (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: ChatMessage[]) =>
            page.map((msg: ChatMessage) => {
              const updatedMsg = updatedMessages.find((m) => m.id === msg.id);
              console.log("Updated Message: ", updatedMsg);
              return updatedMsg ? { ...msg, status: updatedMsg.status } : msg;
            })
          ),
        };
      }
    );
  };
  
  // Add message from socket
  const addSocketMessage = (message: ChatMessage) => {
    // Determine correct query key based on current user perspective
    const currentUserID = senderID;
    if (!currentUserID) return;
    
    let queryKey: [string, string, string];
    
    if (message.senderID === currentUserID) {
      // Current user sent the message
      queryKey = ["messages", currentUserID, message.recipientID];
    } else {
      // Current user received the message
      queryKey = ["messages", currentUserID, message.senderID];
    }
    
    queryClient.setQueryData(queryKey, (old: any) => {
      if (!old) {
        return {
          pages: [[message]],
          pageParams: [1],
        };
      }

      const firstPage = old.pages[0] || [];
      
      // Check if message already exists
      if (firstPage.some((msg: ChatMessage) => msg.id === message.id)) {
        return old;
      }

      // Add to the first page (most recent messages)
      return {
        ...old,
        pages: [[message, ...firstPage], ...old.pages.slice(1)],
      };
    });
  };

  return {
    messages,
    isLoading: messagesQuery.isLoading,
    isFetchingNextPage: messagesQuery.isFetchingNextPage,
    hasNextPage: messagesQuery.hasNextPage,
    fetchNextPage: messagesQuery.fetchNextPage,
    isError: messagesQuery.isError,
    error: messagesQuery.error,
    sendMessage,
    addSocketMessage,
    updateMessagesStatus,
  };
}
