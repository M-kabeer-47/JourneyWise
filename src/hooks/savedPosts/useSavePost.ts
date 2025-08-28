import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {toast} from "@/components/ui/Toast";

interface SavePostParams {
    postID: string;
    userID: string;
    type: "experience" | "trip" | "blog";
    queryKey?: string;
}

interface UnsavePostParams {
    savedPostID: string;
    queryKey?: string;
}

// Data structure handlers
const dataStructureHandlers = {
    // Handle regular pages (trips, experiences, blogs)
    regular: {
        save: (data: any, postID: string) => {
            if (data.trips) {
                return {
                    ...data,
                    trips: data.trips.map((item: any) =>
                        item.id === postID ? { ...item, isSaved: true } : item
                    )
                };
            }
            if (data.experiences) {
                return {
                    ...data,
                    experiences: data.experiences.map((item: any) =>
                        item.id === postID ? { ...item, isSaved: true } : item
                    )
                };
            }
            if (data.blogs) {
                return {
                    ...data,
                    blogs: data.blogs.map((item: any) =>
                        item.blog.id === postID ? { 
                            ...item, 
                            blog: { ...item.blog, isSaved: true } 
                        } : item
                    )
                };
            }
            return data;
        },
        unsave: (data: any, postID: string) => {
            if (data.trips) {
                return {
                    ...data,
                    trips: data.trips.map((item: any) =>
                        item.id === postID ? { ...item, isSaved: false } : item
                    )
                };
            }
            if (data.experiences) {
                return {
                    ...data,
                    experiences: data.experiences.map((item: any) =>
                        item.id === postID ? { ...item, isSaved: false } : item
                    )
                };
            }
            if (data.blogs) {
                return {
                    ...data,
                    blogs: data.blogs.map((item: any) =>
                        item.blog.id === postID ? { 
                            ...item, 
                            blog: { ...item.blog, isSaved: false } 
                        } : item
                    )
                };
            }
            return data;
        }
    },
    // Handle saved posts page
    savedPosts: {
        save: (data: any, postID: string) => {
            // For saved posts, we don't add items, just update existing ones
            if (data.savedPosts) {
                return {
                    ...data,
                    savedPosts: data.savedPosts.map((item: any) => {
                        // Check if this saved post contains the item we're looking for
                        const hasTrip = item.trip && item.trip.id === postID;
                        const hasExperience = item.experience && item.experience.id === postID;
                        const hasBlog = item.blog && item.blog.blog.id === postID;
                        
                        if (hasTrip) {
                            return { ...item, trip: { ...item.trip, isSaved: true } };
                        }
                        if (hasExperience) {
                            return { ...item, experience: { ...item.experience, isSaved: true } };
                        }
                        if (hasBlog) {
                            return { 
                                ...item, 
                                blog: { 
                                    ...item.blog, 
                                    blog: { ...item.blog.blog, isSaved: true } 
                                } 
                            };
                        }
                        return item;
                    })
                };
            }
            return data;
        },
        unsave: (data: any, postID: string) => {
            // For saved posts, remove the item from the array
            if (data.savedPosts) {
                return {
                    ...data,
                    savedPosts: data.savedPosts.filter((item: any) => {
                        // Remove if this saved post matches the postID
                        const isTrip = item.trip && item.trip.id === postID;
                        const isExperience = item.experience && item.experience.id === postID;
                        const isBlog = item.blog && item.blog.blog.id === postID;
                        
                        return !(isTrip || isExperience || isBlog);
                    })
                };
            }
            return data;
        }
    }
};

const updateQueryData = (queryKey: string, postID: string, action: 'save' | 'unsave', queryClient: any) => {
    let updatedCount = 0;
    
    queryClient.setQueriesData(
        { queryKey: [queryKey] },
        (old: any) => {
            if (!old) return old;
            
            updatedCount++;
            
            // Determine which handler to use based on data structure
            const isSavedPostsStructure = old.savedPosts !== undefined;
            console.log("isSavedPostsStructure",isSavedPostsStructure);
            const handler = isSavedPostsStructure ? dataStructureHandlers.savedPosts : dataStructureHandlers.regular;
            
            return handler[action](old, postID);
        }
    );
    
    return updatedCount;
};

export default function useSavePost(){

   


    const queryClient = useQueryClient();
    const savePost = useMutation(
    {
        mutationFn: async({postID,userID,type, queryKey}: SavePostParams)=>{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/save-post`,{
                postID,
                userID,
                type
            })       
            return { ...response.data, type: response.data.postType, queryKey, postID }; // Return postType and queryKey for onSuccess
        },
        onSuccess: async (variables) => {
            const { postID, queryKey } = variables;
            
            if (queryKey) {
                await queryClient.cancelQueries({ queryKey: [queryKey] });
                
                const updatedCount = updateQueryData(queryKey, postID, 'save', queryClient);
                
                // Fallback: If no queries were updated, try invalidating
                if (updatedCount === 0) {
                    queryClient.invalidateQueries({ queryKey: [queryKey] });
                }
                
                toast.success("Post saved successfully");
            }
        },   
    }
    )
    
    const unsavePost = useMutation(
    {
        mutationFn: async({savedPostID, queryKey}: UnsavePostParams)=>{
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unsave-post/${savedPostID}`)
            return { ...response.data, queryKey, savedPostID };
        },
        onSuccess: async (variables) => {
            const { savedPostID, queryKey } = variables;
            
            if (queryKey) {
                await queryClient.cancelQueries({ queryKey: [queryKey] });
                
                const updatedCount = updateQueryData(queryKey, savedPostID, 'unsave', queryClient);
                
                // Fallback: If no queries were updated, try invalidating
                if (updatedCount === 0) {
                    queryClient.invalidateQueries({ queryKey: [queryKey] });
                }
                
                toast.success("Post unsaved successfully");
            }
        },   
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
