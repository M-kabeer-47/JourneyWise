import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit3 } from "lucide-react";
import Tabs from "./Tabs";
import NoData from "./NoData";

interface BlogsTabProps {
  blogs: any[];
}

export default function BlogsTab({ blogs }: BlogsTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<"published" | "drafts">(
    "published"
  );

  const publishedBlogs = blogs.filter((blog) => blog.isPublished);
  const draftBlogs = blogs.filter((blog) => !blog.isPublished);

  const currentBlogs =
    activeSubTab === "published" ? publishedBlogs : draftBlogs;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-[800] font-raleway text-midnight-blue mb-2">
            My Blogs
          </h2>
          <p className="text-charcoal sm:text-sm text-xs">
            Share your travel experiences and insights
          </p>
        </div>
        <button className="relative sm:text-sm text-xs flex items-center gap-2 px-3 w-[110px] sm:w-[120px] py-2  bg-midnight-blue text-white rounded-md hover:shadow-lg transition-all">
          Write Blog
          <Edit3 className="absolute sm:w-5 sm:h-5 h-4 w-4 right-3" />
        </button>
      </div>

      {/* Sub-tabs */}
      <Tabs
        options={[
          {
            key: "published",
            label: "Published",
            count: publishedBlogs.length,
          },
          { key: "drafts", label: "Drafts", count: draftBlogs.length },
        ]}
        activeKey={activeSubTab}
        onChange={setActiveSubTab}
        className="max-w-[300px]"
      />

      {currentBlogs.length === 0 ? (
        // use here as well
        <NoData
          title={`No ${activeSubTab} blogs yet`}
          description={
            activeSubTab === "published"
              ? "Start writing and share your travel stories with the community."
              : "Save your ideas as drafts and publish when ready."
          }
          icon={<Edit3 className="sm:w-12 sm:h-12 w-10 h-10 text-midnight-blue" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentBlogs.map((blog) => (
            <motion.div
              key={blog.blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.coverUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-ocean-blue/10 text-ocean-blue rounded-full text-sm font-medium">
                    {blog.category}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      blog.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <h3 className="font-bold text-midnight-blue mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-charcoal text-sm mb-4 line-clamp-2">
                  {blog.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{blog.commentsCount} comments</span>
                  <span>{new Date(blog.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
