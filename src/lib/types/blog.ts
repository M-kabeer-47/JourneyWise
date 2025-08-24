export type Blog = {
    blog: {
      id: string;
      title: string;
      content: string;
      coverUrl?: string;
      isPublished: boolean;
      authorID: string;
      createdAt: string;
      updatedAt: string;
      commentsCount: number;
    };
    author: {
      name: string;
      image?: string;
    };

}