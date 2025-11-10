import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAppSelector } from "../redux";

export interface UserPreview {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string | null;
  status?: string;
}

interface FetchUsersParams {
  search?: string;
  userID?: string;
}

async function fetchUsers({ search, userID }: FetchUsersParams = {}): Promise<
  UserPreview[]
> {
  const response = await axios.get("/api/fetch-users", {
    params: search ? { search } : undefined,
    headers: {
      "x-user-id": userID,
      // Include any necessary headers, e.g., authentication
    },
  });
  return response.data;
}

export default function useChatUsers({
  searchQuery = "",
}: {
  searchQuery?: string;
}) {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user.user);
  const userID = user?.id;
  const usersQuery = useQuery({
    queryKey: ["chatUsers", searchQuery],
    queryFn: () => fetchUsers({ search: searchQuery, userID }),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const updateUserStatus = (userIDsArray: string[]) => {
    // Update all chatUsers queries regardless of search query
    queryClient.setQueryData(
      ["chatUsers", searchQuery],
      (oldData: UserPreview[] | undefined) => {
        console.log("Old Data:", oldData);
        if (!oldData) return oldData;

        return oldData.map((user) => {
          return userIDsArray.includes(user.id) ? { ...user, status: "online" } : {
            ...user,
            status: "offline",
          };
        });
      }
    );
  };

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    error: usersQuery.error,
    updateUserStatus,
  };
}
