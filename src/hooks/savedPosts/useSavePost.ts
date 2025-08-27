import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/Toast";
export default function useSavePost(){

    const getQueryKeys = (type:"experience"|"trip"|"blog")=>{
        let queryKeys = ["saved-posts"];
        switch(type){
            case "blog":
                queryKeys.push("user-blogs");
                queryKeys.push("blogs");
                break;
            case "experience":
                queryKeys.push("user-experiences");
                queryKeys.push("experiences");
                break;
            case "trip":
                queryKeys.push("user-trips");
                queryKeys.push("trips");
                break;
        }
        return queryKeys;
    };


    const queryClient = useQueryClient();
    const savePost = useMutation(
    {
        mutationFn: async({postID,userID,type}:{postID:string,userID:string,type:"experience"|"trip"|"blog"})=>{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/save-post`,{
                postID,
                userID,
                type
            })       
            return { ...response.data, type: response.data.postType }; // Return postType for onSuccess
        },
        onSuccess: (data) => {
            console.log("Data: ", data);
            const queryKeys = getQueryKeys(data.postType as "experience" | "trip" | "blog");
            // Invalidate each query key separately
            console.log(
            "Type: ", data.postType,
            "Query Keys: ", queryKeys
            );
            queryKeys.forEach(key => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });
            toast.success("Post saved successfully");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Failed to save post");
        }
    }
    )
    
    const unsavePost = useMutation(
    {
        mutationFn: async({savedPostID}:{savedPostID:string})=>{
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unsave-post/${savedPostID}`)
            return response.data;
        },
        onSuccess: (data) => {
            const queryKeys = getQueryKeys(data.postType);
            // Invalidate each query key separately
            queryKeys.forEach(key => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });
            toast.success("Post unsaved successfully");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Failed to unsave post");
        }
    }
    )
    return {
        savePost: {
            mutateAsync: savePost.mutateAsync,
            mutate: savePost.mutate,
            isLoading: savePost.isPending, // Note: isPending is the new name for isLoading in newer versions
            isError: savePost.isError,
            error: savePost.error,
            isSuccess: savePost.isSuccess,
            data: savePost.data,
            reset: savePost.reset
        },
        unsavePost: {
            mutateAsync: unsavePost.mutateAsync,
            mutate: unsavePost.mutate,
            isLoading: unsavePost.isPending,
            isError: unsavePost.isError,
            error: unsavePost.error,
            isSuccess: unsavePost.isSuccess,
            data: unsavePost.data,
            reset: unsavePost.reset
        }
    }
}
