"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  PenTool, 
  Users, 
  Award, 
  Eye, 
  Heart, 
  MessageCircle, 
  ArrowRight,
  MapPin,
  Clock,
  TrendingUp
} from "lucide-react";
import Image from "next/image";

const featuredArticles = [
  {
    id: 1,
    title: "Hidden Gems of Northern Italy: A Local's Guide",
    excerpt: "Discover secret spots away from the tourist crowds in Italy's stunning northern regions.",
    author: {
      name: "Marco Rossi",
      avatar: "/images/authors/marco.jpg",
      badge: "Local Expert",
      followers: 2847
    },
    image: "/images/blog/northern-italy.jpg",
    tags: ["Italy", "Hidden Gems", "Local Tips"],
    readTime: "8 min read",
    likes: 234,
    comments: 45,
    views: "2.1k"
  },
  {
    id: 2,
    title: "Budget Backpacking Through Southeast Asia",
    excerpt: "Complete guide to exploring Southeast Asia on $30 a day, including routes and money-saving tips.",
    author: {
      name: "Sarah Chen",
      avatar: "/images/authors/sarah.jpg",
      badge: "Budget Expert",
      followers: 1923
    },
    image: "/images/blog/southeast-asia.jpg",
    tags: ["Budget Travel", "Backpacking", "Southeast Asia"],
    readTime: "12 min read",
    likes: 189,
    comments: 67,
    views: "3.4k"
  },
  {
    id: 3,
    title: "Sustainable Travel: How to Reduce Your Carbon Footprint",
    excerpt: "Practical tips for eco-friendly travel that doesn't compromise on adventure.",
    author: {
      name: "Emma Green",
      avatar: "/images/authors/emma.jpg",
      badge: "Eco Travel Advocate",
      followers: 3156
    },
    image: "/images/blog/sustainable-travel.jpg",
    tags: ["Sustainable Travel", "Eco-Friendly", "Tips"],
    readTime: "6 min read",
    likes: 312,
    comments: 28,
    views: "1.8k"
  }
];

const trendingRoutes = [
  {
    id: 1,
    title: "California Coast Road Trip",
    author: "Alex M.",
    upvotes: 456,
    image: "/images/routes/california.jpg"
  },
  {
    id: 2,
    title: "European Capital Cities Tour",
    author: "Lisa K.",
    upvotes: 389,
    image: "/images/routes/europe.jpg"
  },
  {
    id: 3,
    title: "Japanese Cherry Blossom Route",
    author: "Yuki S.",
    upvotes: 567,
    image: "/images/routes/japan-cherry.jpg"
  }
];

const topContributors = [
  {
    name: "David Wilson",
    avatar: "/images/contributors/david.jpg",
    badge: "Route Specialist",
    followers: 4521,
    contributions: 67
  },
  {
    name: "Ana Rodriguez",
    avatar: "/images/contributors/ana.jpg",
    badge: "Travel Writer",
    followers: 3892,
    contributions: 89
  },
  {
    name: "James Park",
    avatar: "/images/contributors/james.jpg",
    badge: "Adventure Expert",
    followers: 5234,
    contributions: 134
  }
];

export default function CommunityContent() {
  const [activeTab, setActiveTab] = useState<'articles' | 'routes'>('articles');

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
            Community & Content
          </h2>
          <p className="text-xl text-charcoal max-w-3xl mx-auto font-geist">
            Discover travel insights from our community of writers and route creators
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-full p-1 shadow-sm border border-gray-200">
                <button
                  onClick={() => setActiveTab('articles')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    activeTab === 'articles'
                      ? 'bg-midnight-blue text-white'
                      : 'text-charcoal hover:bg-gray-50'
                  }`}
                >
                  Featured Articles
                </button>
                <button
                  onClick={() => setActiveTab('routes')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    activeTab === 'routes'
                      ? 'bg-midnight-blue text-white'
                      : 'text-charcoal hover:bg-gray-50'
                  }`}
                >
                  Trending Routes
                </button>
              </div>
            </div>

            {/* Featured Articles */}
            {activeTab === 'articles' && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {featuredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    {/* Article Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                        {article.readTime}
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-ocean-blue/10 text-ocean-blue text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-bold text-lg text-midnight-blue mb-3 font-raleway line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 font-geist">
                        {article.excerpt}
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-ocean-blue">
                            {article.author.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-charcoal">
                              {article.author.name}
                            </span>
                            <Award className="w-3 h-3 text-yellow-500" />
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{article.author.badge}</span>
                            <span>•</span>
                            <span>{article.author.followers} followers</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye size={14} />
                            {article.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart size={14} />
                            {article.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle size={14} />
                            {article.comments}
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-ocean-blue" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Trending Routes */}
            {activeTab === 'routes' && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {trendingRoutes.map((route, index) => (
                  <motion.div
                    key={route.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={route.image}
                        alt={route.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-midnight-blue mb-2">{route.title}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">by {route.author}</span>
                        <div className="flex items-center gap-1 text-ocean-blue">
                          <TrendingUp size={14} />
                          <span className="text-sm font-medium">{route.upvotes}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <button className="bg-midnight-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-midnight-blue/90 transition-colors flex items-center gap-2 mx-auto">
                <PenTool size={20} />
                Start Writing
              </button>
            </motion.div>
          </div>

          {/* Sidebar - Top Contributors */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8"
            >
              <h3 className="text-xl font-bold text-midnight-blue mb-6 font-raleway">
                Top Contributors
              </h3>

              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.name} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-ocean-blue/10 rounded-full text-sm font-medium text-ocean-blue">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-charcoal">
                          {contributor.name}
                        </span>
                        <Award className="w-3 h-3 text-yellow-500" />
                      </div>
                      <div className="text-xs text-gray-500">
                        {contributor.badge} • {contributor.contributions} posts
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Users size={12} />
                        {contributor.followers} followers
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 bg-ocean-blue/10 text-ocean-blue py-3 rounded-lg font-semibold hover:bg-ocean-blue/20 transition-colors">
                View All Contributors
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}