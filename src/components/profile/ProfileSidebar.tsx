import React from 'react';
import { motion } from 'framer-motion';
import { Map, FileText, Bookmark, Calendar, BarChart3, User } from 'lucide-react';

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'trips', label: 'My Trips', icon: Map },
  { id: 'blogs', label: 'Blogs', icon: FileText },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
];

export default function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-midnight-blue to-ocean-blue rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-midnight-blue">Profile</h3>
            <p className="text-sm text-gray-500">Manage your account</p>
          </div>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all relative ${
                  isActive 
                    ? 'bg-gradient-to-r from-midnight-blue/10 to-ocean-blue/10 text-midnight-blue' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-midnight-blue'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-midnight-blue to-ocean-blue rounded-r"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'text-ocean-blue' : ''}`} />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}