import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/Toast";
import { useQuery } from "@tanstack/react-query";
export default function useSavePost(){
    const query = useQueryClient();
    const savePost = useMutation(
    {
        mutationFn: async({postID,userID,type}:{postID:string,userID:string,type:"experience"|"trip"|"blog"})=>{
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/save-post`,{
                    postID,
                    userID,
                    type
                })       
                toast.success("Post saved successfully");
                query.invalidateQueries({queryKey: ["saved-posts"]})
                return response.data;
            } catch (error) {
                console.log(error);
                toast.error("Failed to save post");
                return error;
            }
        }
    }
    )
    
    const unsavePost = useMutation(
    {
        mutationFn: async({savedPostID}:{savedPostID:string})=>{
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unsave-post/${savedPostID}`)
                toast.success("Post unsaved successfully");
                return response.data;
            } catch (error) {
                console.log(error);
                toast.error("Failed to unsave post");
                return error;
            }
        }
    }
    )
    return {savePost,unsavePost}
}
