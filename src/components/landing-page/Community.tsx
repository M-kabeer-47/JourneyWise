"use client";
import React from "react";
import { motion } from "framer-motion";
import { PenTool } from "lucide-react";
import { useFetchBlogs } from "@/hooks/blog/useFetchBlogs";
import {BlogCard} from "@/components/blog/BlogCard";
import {BlogCardSkeleton} from "@/components/skeletons/BlogCardSkeleton";

export default function CommunityContent() {
  const { data: blogsData, isLoading } = useFetchBlogs({ limit: 3});
  const blogs = blogsData?.blogs || [];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-ocean-blue/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4 font-raleway">
            Travel Stories & Insights
          </h2>
          <p className="text-xl text-charcoal max-w-3xl mx-auto font-geist">
            Discover authentic travel experiences and insights shared by our
            community of travelers and local experts
          </p>
        </motion.div>

        {/* Start Writing Button - Positioned at top right */}
        <div className="flex justify-end mb-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button className="bg-midnight-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-midnight-blue/90 transition-colors flex items-center gap-2">
              <PenTool size={18} />
              Start Writing
            </button>
          </motion.div>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(4)].map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogs.map((blogData, index) => (
              <motion.div
                key={blogData.blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <BlogCard blog={blogData}  />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-6">
              No blog posts available at the moment.
            </p>
            <button className="bg-midnight-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-midnight-blue/90 transition-colors flex items-center gap-2 mx-auto">
              <PenTool size={18} />
              Be the first to write
            </button>
          </div>
        )}

        {/* View All Blogs CTA */}
        {blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-midnight-blue text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-midnight-blue/90 transition-colors">
              View All Stories
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
