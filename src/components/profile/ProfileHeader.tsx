import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Settings, Share2 } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    name: string;
    image?: string;
    country: string;
    createdAt: string;
  };
  stats: {
    tripsCount: number;
    blogsCount: number;
    savedCount: number;
    bookingsCount: number;
  };
}

export default function ProfileHeader({ user, stats }: ProfileHeaderProps) {
  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="relative bg-gradient-to-br from-midnight-blue via-midnight-blue to-ocean-blue">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Avatar */}
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-2xl">
              {user.image ? (
                <img 
                  src={user.image} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center text-white text-4xl font-bold">
                  {getUserInitials(user.name)}
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full" />
          </div>

          {/* Name & Location */}
          <h1 className="text-4xl font-bold text-white mb-2">{user.name}</h1>
          <div className="flex items-center justify-center gap-4 text-blue-100 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{user.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Joined {joinDate}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all">
              <Settings className="w-5 h-5" />
              Edit Profile
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 rounded-full text-white transition-all">
              <Share2 className="w-5 h-5" />
              Share Profile
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: 'Trips Planned', value: stats.tripsCount },
              { label: 'Blogs Written', value: stats.blogsCount },
              { label: 'Items Saved', value: stats.savedCount },
              { label: 'Bookings', value: stats.bookingsCount }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
              >
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}