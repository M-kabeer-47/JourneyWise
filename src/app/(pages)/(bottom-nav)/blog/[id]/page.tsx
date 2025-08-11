"use client";
import axios from "axios";

import parse from "html-react-parser";
import { redirect } from "next/navigation";
import generateSkeleton from "@/utils/functions/generateBlogSkeletons";
import "@blocknote/shadcn/style.css";
import { useParams } from "next/navigation";
import ShareButton from "@/components/ui/ShareButton";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [user, setUser] = useState(null);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-blog/${id}`
      );
      setBlog(response.data.blog);
      setUser(response.data.user)
    } catch (error) {
      redirect("/not-found");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <>
      {isFetching ? (
        <>{parse(generateSkeleton())}</>
      ) : (
        <>
        <header className="">
          <img
            src={blog?.coverUrl || "https://via.placeholder.com/1200x600"}
            alt="Blog Cover"
            className="w-full h-[200px] sm:h-[300px] object-cover sm:mb-8"
          />
        </header>
        <article className="max-w-full px-[30px] sm:px-[100px] ">
          <h1
            className={`text-4xl md:text-6xl font-[800] mb-6 font-raleway text-black text-left`}
          >
            {blog?.title}
          </h1>

          <div className="flex items-center space-x-4 mb-8 mt-4 pb-4 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="https://xsgames.co/randomusers/assets/avatars/male/46.jpg"
                  alt="Author avatar"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {user?.name}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span>
                  {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <ShareButton />
          </div>
          {parse(blog?.content)}

          <div></div>

          <div></div>
        </article>
        </>
      )}
    </>
  );
}
