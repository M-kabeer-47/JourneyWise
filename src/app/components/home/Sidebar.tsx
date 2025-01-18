'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Compass, Calendar, Users, BookOpen, HelpCircle, UserPlus, X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Explore Gigs', href: '/explore', icon: Compass },
  { name: 'Itinerary Builder', href: '/itinerary', icon: Calendar },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Help', href: '/help', icon: HelpCircle },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-midnight-blue shadow-lg z-50"
          >
            <div className="p-4 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Menu</h2>
                <button onClick={onClose} className="text-white hover:text-accent transition-colors">
                  <X size={24} />
                </button>
              </div>
              <nav>
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center text-white hover:text-accent transition-colors"
                        onClick={onClose}
                      >
                        <link.icon className="mr-3" size={20} />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="pt-6 border-t border-gray-700">
                <Link
                  href="/become-agent"
                  className="flex items-center justify-center w-full bg-accent text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors"
                  onClick={onClose}
                >
                  <UserPlus className="mr-2" size={20} />
                  Become an Agent
                </Link>
              </div>
              <div className="pt-4">
                <button className="w-full bg-ocean-blue text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

