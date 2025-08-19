import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Calendar, MapPin, FileText, Bookmark } from 'lucide-react';
import TripCard from '@/components/trip/TripCard';
import BlogCard from '@/components/blog/BlogCard';

interface OverviewTabProps {
  recentTrips: any[];
  recentBlogs: any[];
  upcomingBooking?: any;
}

export default function OverviewTab({ recentTrips, recentBlogs, upcomingBooking }: OverviewTabProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-midnight-blue to-ocean-blue rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="relative">
          <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-blue-100 mb-6">Ready for your next adventure? Let's plan something amazing.</p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all">
              <Plus className="w-5 h-5" />
              Plan a Trip
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 rounded-full transition-all">
              <FileText className="w-5 h-5" />
              Write a Blog
            </button>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Booking */}
      {upcomingBooking && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-midnight-blue">Upcoming Booking</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {upcomingBooking.status}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden">
              <img 
                src={upcomingBooking.experience.imageUrl} 
                alt={upcomingBooking.experience.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-midnight-blue">{upcomingBooking.experience.title}</h4>
              <p className="text-gray-600 text-sm">by {upcomingBooking.agent.agencyName}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{new Date(upcomingBooking.startDate).toLocaleDateString()}</span>
                <span>${upcomingBooking.totalPrice}</span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-all">
              View Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Trips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-midnight-blue">Recent Trips</h3>
            <button className="text-ocean-blue hover:text-ocean-blue/80 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentTrips.slice(0, 2).map((trip) => (
              <div key={trip.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-midnight-blue to-ocean-blue rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-midnight-blue">{trip.startPoint} → {trip.endPoint}</h4>
                    <p className="text-gray-600 text-sm">{trip.estimatedDistance}km • ${trip.estimatedBudget}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Blogs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-midnight-blue">Recent Blogs</h3>
            <button className="text-ocean-blue hover:text-ocean-blue/80 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentBlogs.slice(0, 2).map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img src={blog.coverUrl} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-midnight-blue line-clamp-1">{blog.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded text-xs ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <span>{blog.commentsCount} comments</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}