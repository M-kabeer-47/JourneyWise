
import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Bell, Menu, X, Search, ChevronDown, LogOut, 
  Settings, User, MessageSquare 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';


const DashboardHeader = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const notifications = [
    {
      id: 1,
      title: 'New booking request',
      description: 'Sarah Johnson requested a trip to Paris',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      title: 'Booking confirmed',
      description: "Michael Chang's booking has been confirmed",
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      title: 'Message from client',
      description: 'Elena Rodriguez sent you a message',
      time: '3 hours ago',
      read: true
    }
  ];

  const totalUnread = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="flex-shrink-0 flex items-center">
             
              <div className="ml-4 lg:hidden">
                <Logo className="text-midnight-blue text-xl" />
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ocean-blue/20 focus:border-ocean-blue sm:text-sm"
                  placeholder="Search bookings, clients..."
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Right side navigation items */}
          <div className="flex items-center lg:gap-2">
            {/* Notifications dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  if (profileOpen) setProfileOpen(false);
                }}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none relative"
              >
                <Bell size={20} />
                {totalUnread > 0 && (
                  <span className="absolute top-1 right-1 inline-block w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {totalUnread}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                  >
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-medium text-gray-800">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="px-4 py-3 text-sm text-gray-500 text-center">No notifications yet</p>
                        ) : (
                          notifications.map((notification) => (
                            <a
                              key={notification.id}
                              href="#"
                              className={`block px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0 mr-3">
                                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${!notification.read ? 'bg-ocean-blue text-white' : 'bg-gray-200'}`}>
                                    <Bell size={14} />
                                  </div>
                                </div>
                                <div className="w-0 flex-1">
                                  <p className={`text-sm font-medium ${!notification.read ? 'text-midnight-blue' : 'text-gray-700'}`}>
                                    {notification.title}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                    {notification.description}
                                  </p>
                                  <p className="mt-1 text-xs text-gray-400">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </a>
                          ))
                        )}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <a 
                          href="#" 
                          className="block text-sm text-center font-medium text-ocean-blue hover:text-ocean-blue/80"
                        >
                          View all notifications
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  if (notificationsOpen) setNotificationsOpen(false);
                }}
                className="flex items-center max-w-xs rounded-full focus:outline-none"
              >
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-gray-100">
                  <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                    <Image 
                      src="/images/profile-placeholder.png" 
                      alt="User Profile" 
                      width={32} 
                      height={32} 
                    />
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-800">Alex Morgan</div>
                    <div className="text-xs text-gray-500">Travel Agent</div>
                  </div>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                  >
                    <div className="py-1">
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User size={16} className="mr-3 text-gray-500" />
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <MessageSquare size={16} className="mr-3 text-gray-500" />
                        Messages
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings size={16} className="mr-3 text-gray-500" />
                        Settings
                      </a>
                      <div className="border-t border-gray-100"></div>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-3 text-red-500" />
                        Sign out
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;