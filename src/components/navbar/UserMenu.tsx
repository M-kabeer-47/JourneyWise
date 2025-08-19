import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, Map, FileText, Bookmark, Calendar, ChevronDown } from 'lucide-react';

interface UserMenuProps {
  user: {
    name: string;
    image?: string;
    email: string;
  };
  onSignOut: () => void;
}

export default function UserMenu({ user, onSignOut }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onHoverStart={() => setIsOpen(true)}
        onHoverEnd={() => setTimeout(() => setIsOpen(false), 150)}
        className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all group"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20">
          {user.image ? (
            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/20 flex items-center justify-center text-white text-sm font-medium">
              {getUserInitials(user.name)}
            </div>
          )}
        </div>
        <span className="text-white text-sm font-medium hidden md:block">{user.name}</span>
        <ChevronDown 
          className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onHoverStart={() => setIsOpen(true)}
            onHoverEnd={() => setIsOpen(false)}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-br from-midnight-blue to-ocean-blue text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/20 flex items-center justify-center text-white text-lg font-bold">
                      {getUserInitials(user.name)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-blue-100">{user.email}</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {[
                { icon: User, label: 'Profile', href: '/u/me' },
                { icon: Map, label: 'My Trips', href: '/u/me?tab=trips' },
                { icon: FileText, label: 'My Blogs', href: '/u/me?tab=blogs' },
                { icon: Bookmark, label: 'Saved Items', href: '/u/me?tab=saved' },
                { icon: Calendar, label: 'Bookings', href: '/u/me?tab=bookings' },
                { icon: Settings, label: 'Settings', href: '/settings' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-midnight-blue transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5 text-ocean-blue" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                );
              })}
              
              <div className="border-t border-gray-100 my-2" />
              
              <button
                onClick={() => {
                  onSignOut();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}