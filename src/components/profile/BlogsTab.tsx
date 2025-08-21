import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3 } from 'lucide-react';
import Tabs from './Tabs';

interface BlogsTabProps {
  blogs: any[];
}

export default function BlogsTab({ blogs }: BlogsTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<'published' | 'drafts'>('published');
  
  const publishedBlogs = blogs.filter(blog => blog.isPublished);
  const draftBlogs = blogs.filter(blog => !blog.isPublished);
  
  const currentBlogs = activeSubTab === 'published' ? publishedBlogs : draftBlogs;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-midnight-blue">My Blogs</h2>
          <p className="text-gray-600">Share your travel experiences and insights</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white rounded-full hover:shadow-lg transition-all">
          <Edit3 className="w-5 h-5" />
          Write Blog
        </button>
      </div>

      {/* Sub-tabs */}
      <Tabs
        options={[
          { key: 'published', label: 'Published', count: publishedBlogs.length },
          { key: 'drafts', label: 'Drafts', count: draftBlogs.length }
        ]}
        activeKey={activeSubTab}
        onChange={setActiveSubTab}
        className="max-w-[300px]"
      />

      {currentBlogs.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-midnight-blue to-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6">
            <Edit3 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-midnight-blue mb-2">
            No {activeSubTab} blogs yet
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {activeSubTab === 'published' 
              ? 'Start writing and share your travel stories with the community.'
              : 'Save your ideas as drafts and publish when ready.'
            }
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white rounded-full hover:shadow-lg transition-all">
            <Edit3 className="w-5 h-5" />
            Write Your First Blog
          </button>
        </div>
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
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    blog.isPublished 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h3 className="font-bold text-midnight-blue mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.content}</p>
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