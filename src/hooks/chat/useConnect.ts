import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import { UserPreview } from "./useChatUsers";


interface UseConnectParams {
  userID: string;
  updateUserStatus: (userIDsArray: string[], status: string) => void;
  setActiveUser: React.Dispatch<React.SetStateAction<UserPreview | null>>;
  enabled?: boolean;
}
export function useConnect({ userID, updateUserStatus, setActiveUser, enabled = true }: UseConnectParams) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const searchParams = useSearchParams();



  const handleUserOnline = (userIDsArray: string[]) => {
    console.log("handleUserOnline called with userIDs:", userIDsArray);
    updateUserStatus(userIDsArray, status);
    setActiveUser((prevUser) => {
      if (!prevUser) return null;
      return prevUser && userIDsArray.includes(prevUser.id)
        ? { ...prevUser, status: "online" }
        : { ...prevUser, status: "offline" };
    });
  };
  let recipientID = searchParams.get("recipientID");

  useEffect(() => {
    if (!enabled || !userID) {
      console.log("Socket connection disabled or no userID");
      return;
    }

    console.log("Connecting socket for user:", userID);
    const socket: Socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`, {
      withCredentials: true,
      autoConnect: false,
      auth: {
        userID: userID,
      },
    });
    socket.on("onlineUsers", (data) => handleUserOnline(data));
    socket.connect();
    setSocket(socket);


    return () => {
      console.log("Disconnecting socket");
      socket.disconnect();
    };
  }, [userID, enabled]);

  return { socket, recipientID };
}
