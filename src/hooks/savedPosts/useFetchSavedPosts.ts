import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchSavedPosts({userID,type,sortColumn,sortOrder,page}: {userID: string,type: "all" | "blog" | "trip" | "experience",sortColumn: string,sortOrder: "asc" | "desc", page: number}) {
    let {data,isFetching,isError} = useQuery({
        queryKey: ["saved-posts", userID,type,sortColumn,sortOrder,page],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-saved-posts`,{
                params: {
                    userID,
                    type,
                    sortColumn,
                    sortOrder,
                    page,
                    limit: 6
                }
            });
            console.log("Response "+JSON.stringify(response.data));
            return response.data;   
        },
        refetchOnWindowFocus: false,
        enabled: !!userID 
        
    });
    return {savedPosts: data?.savedPosts,isFetchingSavedPosts: isFetching,isSavedPostsError: isError, pagination: data?.pagination}
}
