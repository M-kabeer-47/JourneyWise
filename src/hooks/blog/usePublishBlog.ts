import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/Toast";
import {useAppSelector} from "@/hooks/redux";
export default function usePublishBlog() {
  const user = useAppSelector(state => state.user.user);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: {
      title: string;
      html: string;
      coverUrl: string | null;
      thumbnailUrl: string | null;
      isPublished: boolean;
      category?: string | null;
      description: string
    }) => {
      try {
        if (!user) {
          toast.error("Please login to publish blog");
          return;
        }
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/publish-blog`,
          {
            title: data.title,
            content: data.html,
            coverUrl: data.coverUrl || null,
            thumbnailUrl: data.thumbnailUrl || null,
            isPublished: data.isPublished,
            category: data.category || null,
            description: data.description,
            authorID: user.id
          }
        );
        if (data.isPublished) {
          toast.success("Blog published successfully");
        } else {
          toast.success("Blog saved as draft successfully");
        }
      } catch (error) {
        toast.error("Error publishing blog");
      } finally {
      }
    },
  });
  return {
    publishBlog: mutateAsync,
    isPending,
  };
}
