import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchSavedPosts({userID,type,sortColumn,sortOrder}: {userID: string,type: "all" | "blog" | "trip" | "experience",sortColumn: string,sortOrder: "asc" | "desc"}) {
    let {data,isFetching,isError} = useQuery({
        queryKey: ["saved-posts", userID,type,sortColumn,sortOrder],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-saved-posts`,{
                params: {
                    userID,
                    type,
                    sortColumn,
                    sortOrder
                }
            });
            return response.data;   
        },
        refetchOnWindowFocus: false,
        enabled: !!userID 
        
    });
    return {savedPosts: data,isFetchingSavedPosts: isFetching,isSavedPostsError: isError}
}
