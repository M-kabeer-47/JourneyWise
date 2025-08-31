import z, { nullable } from "zod";
export const blogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    isPublished: z.boolean().default(false),
    authorID: z.string().min(1, "Author ID is required"),
    category: z.string().min(1, "Category is required"),
    coverUrl: z.string().optional().nullable(),
    description: z.string().min(1, "Description is required"),
    thumbnailUrl: z.string().min(1, "Thumbnail URL is required"),
    commentsCount: z.number().default(0),
}).strict()


export const partialBlogSchema = blogSchema.partial();