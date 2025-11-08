import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSearchParams } from "next/navigation";

export function useConnect({userID}: {userID?: string}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const searchParams = useSearchParams();

  let recipientID = searchParams.get("recipientID");

  useEffect(() => {
    const socket: Socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`, {
      withCredentials: true,
      auth: {
        userID: userID,
      },
    });

    setSocket(socket);
   

    return () => {
      socket.disconnect();
    };
  }, [userID]);

  return { socket, recipientID };
}
