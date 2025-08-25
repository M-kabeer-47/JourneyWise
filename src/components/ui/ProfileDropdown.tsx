"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, LogOut, Settings, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownOption {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface ProfileDropdownProps {
  userName: string;
  userRole?: string;
  profileImage?: string;
  onSignOut?: () => void;
  className?: string;
  showRole?: boolean;
  variant?: 'default' | 'navbar';
  options?: DropdownOption[];
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userName,
  userRole,
  profileImage,
  onSignOut,
  className = "",
  showRole = true,
  variant = 'default',
  options = []
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center max-w-xs rounded-full focus:outline-none"
      >
        <div className={`flex items-center gap-2 px-2 py-1.5 rounded-full ${
          variant === 'navbar' 
            ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20' 
            : 'hover:bg-gray-100'
        }`}>
          <div className={`h-8 w-8 rounded-full overflow-hidden ${
            variant === 'navbar' ? 'border-2 border-white/20' : 'border border-gray-200'
          } ${!profileImage && 'bg-gray-200 flex items-center justify-center' }`}>
            {profileImage ? (
            <Image 
              src={profileImage} 
              alt="User Profile" 
              width={32} 
              height={32} 
            />
            ) : (
              <User size={20} className="text-gray-500" />
            )}
          </div>
          <div className="hidden md:block text-left">
            <div className={`text-sm font-medium ${
              variant === 'navbar' ? 'text-white' : 'text-gray-800'
            }`}>{userName}</div>
            {showRole && userRole && (
              <div className={`text-xs ${
                variant === 'navbar' ? 'text-blue-100' : 'text-gray-500'
              }`}>{userRole}</div>
            )}
          </div>
          <ChevronDown size={16} className={`${
            variant === 'navbar' ? 'text-white/70' : 'text-gray-500'
          }`} />
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
              {options.map((option, index) => (
                <Link
                  key={index}
                  href={option.href}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {option.icon && <span className="mr-3 text-gray-500">{option.icon}</span>}
                  {option.label}
                </Link>
              ))}
              {options.length > 0 && onSignOut && <div className="border-t border-gray-100"></div>}
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-3 text-red-500" />
                  Sign out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
