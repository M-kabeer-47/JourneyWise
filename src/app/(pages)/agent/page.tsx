"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowUp, 
  ArrowDown, 
  Users, 
  Calendar, 
  TrendingUp, 
  Compass, 
  MessageCircle, 
  ChevronRight, 
  Star,
  MapPin,
  Clock,
  Filter,
  User,
  Eye,
  Search
} from 'lucide-react';

import DashboardHeader from '@/components/agent/DashboardHeader';


export default function AgentDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Stats cards data
  const stats = [
    {
      id: 1,
      title: 'Active Bookings',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: <Calendar className="stroke-white" />,
      href: '/agent/bookings'
    },
    {
      id: 2,
      title: 'Monthly Revenue',
      value: '$12,450',
      change: '+18%',
      trend: 'up',
      icon: <TrendingUp className="stroke-white" />,
      href: '/agent/analytics'
    },
    {
      id: 3,
      title: 'Total Clients',
      value: '54',
      change: '+8%',
      trend: 'up',
      icon: <Users className="stroke-white" />,
      href: '/agent/clients'
    },
    {
      id: 4,
      title: 'Experiences',
      value: '16',
      change: '+5',
      trend: 'up',
      icon: <Compass className="stroke-white" />,
      href: '/agent/experiences'
    }
  ];

  // Recent bookings data
  const recentBookings = [
    {
      id: "1",
      clientName: "Emily Johnson",
      clientAvatar: "/images/avatars/avatar1.jpg",
      destination: "Santorini, Greece",
      startDate: "2023-07-15",
      endDate: "2023-07-22",
      status: "confirmed",
      image: "/images/destinations/santorini.jpg",
      price: "$2,450",
      guests: 2
    },
    {
      id: "2",
      clientName: "Daniel Smith",
      clientAvatar: "/images/avatars/avatar2.jpg",
      destination: "Tokyo, Japan",
      startDate: "2023-08-10",
      endDate: "2023-08-20",
      status: "pending",
      image: "/images/destinations/tokyo.jpg",
      price: "$3,200",
      guests: 1
    },
    {
      id: "3",
      clientName: "Sophia Williams",
      clientAvatar: "/images/avatars/avatar3.jpg",
      destination: "Bali, Indonesia",
      startDate: "2023-09-05",
      endDate: "2023-09-15",
      status: "confirmed",
      image: "/images/destinations/bali.jpg",
      price: "$2,750",
      guests: 3
    }
  ];

  // Recent messages data
  const recentMessages = [
    {
      id: "1",
      sender: "Lisa Rodriguez",
      avatar: "/images/avatars/avatar4.jpg",
      message: "Hi, I'm interested in the Peru hiking tour next month. Do you have availability for a group of 4?",
      time: "10:45 AM",
      unread: true
    },
    {
      id: "2",
      sender: "Michael Chang",
      avatar: "/images/avatars/avatar5.jpg",
      message: "Thanks for arranging our trip to Japan! Everything was perfect. We're already thinking about our next destination.",
      time: "Yesterday",
      unread: false
    },
    {
      id: "3",
      sender: "Sarah Johnson",
      avatar: "/images/avatars/avatar6.jpg",
      message: "Could you send me more details about the Italy wine tour? Particularly interested in the Tuscany region.",
      time: "2 days ago",
      unread: true
    }
  ];

  // Top experiences data
  const topExperiences = [
    {
      id: "1",
      title: "Venetian Canal Tour",
      image: "/images/experiences/venice.jpg",
      location: "Venice, Italy",
      bookings: 48,
      rating: 4.8,
      price: "$79",
      duration: "3 hours",
      status: "active"
    },
    {
      id: "2",
      title: "Traditional Kyoto Tea Ceremony",
      image: "/images/experiences/kyoto.jpg",
      location: "Kyoto, Japan",
      bookings: 36,
      rating: 4.9,
      price: "$65",
      duration: "2 hours",
      status: "active"
    },
    {
      id: "3",
      title: "Kruger National Park Safari Adventure",
      image: "/images/experiences/safari.jpg",
      location: "Kruger Park, South Africa",
      bookings: 29,
      rating: 4.7,
      price: "$149",
      duration: "Full day",
      status: "active"
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const statusColors = {
    confirmed: 'bg-emerald-500',
    pending: 'bg-amber-500',
    cancelled: 'bg-red-500'
  };

  const statusBgColors = {
    confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    pending: 'bg-amber-50 text-amber-800 border-amber-100',
    cancelled: 'bg-red-50 text-red-800 border-red-100'
  };

  const statusText = {
    confirmed: 'Confirmed',
    pending: 'Pending',
    cancelled: 'Cancelled'
  };

  return (
    <div className="min-h-screen bg-light-gray flex font-sans">
      {/* Sidebar */}
      

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Header */}
        

        {/* Main content with proper padding for fixed header */}
        <main className="flex-1 pt-16 pb-8">
          {/* Hero section */}
          <section className="bg-gradient-to-r from-midnight-blue to-ocean-blue text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl font-raleway font-bold tracking-tight">
                  Welcome back, Alex
                </h1>
                <p className="mt-3 text-blue-100 font-sans">
                  Here's your agency performance at a glance. You have 3 new booking requests today.
                </p>
              </div>

              {/* Stats Overview Cards */}
              <motion.div 
                className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {stats.map((stat) => (
                  <motion.div 
                    key={stat.id}
                    variants={itemVariants}
                    className="group relative bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <Link href={stat.href} className="block h-full">
                      <div className="absolute top-0 left-0 w-2 h-full bg-ocean-blue"></div>
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                          <div className="flex h-10 w-10 rounded-full bg-gradient-to-br from-ocean-blue to-midnight-blue items-center justify-center shadow-md">
                            {React.cloneElement(stat.icon, { size: 20 })}
                          </div>
                        </div>
                        <div className="mt-5 flex items-baseline gap-2">
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <div className={`ml-1 flex items-baseline text-sm font-medium ${
                            stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {stat.trend === 'up' ? (
                              <ArrowUp size={14} className="mr-0.5 flex-shrink-0" />
                            ) : (
                              <ArrowDown size={14} className="mr-0.5 flex-shrink-0" />
                            )}
                            <span>{stat.change}</span>
                          </div>
                        </div>
                        <div className="mt-5 inline-flex items-center justify-center w-full">
                          <span className="text-ocean-blue text-sm font-medium group-hover:underline">
                            View details
                            <ArrowUpRight size={14} className="inline ml-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column (2/3 width) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Recent bookings */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-raleway font-semibold text-gray-800">Recent Bookings</h2>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100">
                        <Filter size={16} />
                        <span className="text-sm font-medium">Filter</span>
                      </button>
                      <Link 
                        href="/agent/bookings" 
                        className="flex items-center gap-1 text-ocean-blue hover:text-ocean-blue/80"
                      >
                        <span className="text-sm font-medium">View all</span>
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      {isLoading ? (
                        <div className="p-8 flex flex-col items-center justify-center">
                          <div className="w-16 h-16 border-4 border-t-ocean-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                          <p className="mt-4 text-sm text-gray-500">Loading bookings...</p>
                        </div>
                      ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                              <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {recentBookings.map((booking) => (
                              <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                                      <img 
                                        src={booking.clientAvatar} 
                                        alt={booking.clientName}
                                        className="h-full w-full object-cover" 
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-sm font-medium text-gray-900">{booking.clientName}</p>
                                      <p className="text-xs text-gray-500">{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-md bg-gray-200 mr-3 overflow-hidden">
                                      <img 
                                        src={booking.image} 
                                        alt={booking.destination}
                                        className="h-full w-full object-cover" 
                                      />
                                    </div>
                                    <p className="text-sm text-gray-900">{booking.destination}</p>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Calendar size={14} className="mr-1 text-gray-400" />
                                    <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                                    statusBgColors[booking.status as keyof typeof statusBgColors]
                                  }`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${statusColors[booking.status as keyof typeof statusColors]} mr-1.5`}></span>
                                    {statusText[booking.status as keyof typeof statusText]}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                                  {booking.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button className="text-ocean-blue hover:text-ocean-blue/80">
                                    Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Top experiences */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-raleway font-semibold text-gray-800">Popular Experiences</h2>
                    <Link 
                      href="/agent/experiences" 
                      className="flex items-center gap-1 text-ocean-blue hover:text-ocean-blue/80"
                    >
                      <span className="text-sm font-medium">Manage all</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {isLoading ? (
                      Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-80 animate-pulse">
                          <div className="h-1/2 bg-gray-200"></div>
                          <div className="p-4 space-y-3">
                            <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="flex justify-between">
                              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      topExperiences.map((exp) => (
                        <div key={exp.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                          <div className="relative h-48">
                            <img 
                              src={exp.image} 
                              alt={exp.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                            {exp.status === 'active' && (
                              <div className="absolute top-3 right-3">
                                <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                                  Active
                                </span>
                              </div>
                            )}
                            <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                              <h3 className="font-medium text-lg font-raleway line-clamp-1">{exp.title}</h3>
                              <div className="flex items-center mt-1.5">
                                <MapPin size={14} className="mr-1" />
                                <span className="text-xs">{exp.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-white">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <Clock size={14} className="text-gray-500 mr-1.5" />
                                <span className="text-sm text-gray-600">{exp.duration}</span>
                              </div>
                              <div className="flex items-center text-amber-500">
                                <Star size={14} className="fill-current" />
                                <span className="ml-1 text-sm font-medium">{exp.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Users size={14} className="text-gray-500 mr-1.5" />
                                <span className="text-sm text-gray-600">{exp.bookings} booked</span>
                              </div>
                              <p className="text-lg font-bold text-ocean-blue">{exp.price}</p>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <button className="flex items-center justify-center py-1.5 px-3 bg-ocean-blue text-white rounded-lg text-sm font-medium hover:bg-ocean-blue/90 transition-colors">
                                <Eye size={14} className="mr-1.5" /> Preview
                              </button>
                              <button className="flex items-center justify-center py-1.5 px-3 border border-ocean-blue text-ocean-blue rounded-lg text-sm font-medium hover:bg-ocean-blue/5 transition-colors">
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right column (1/3 width) */}
              <div>
                {/* Recent messages */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="font-raleway font-semibold text-gray-800">Recent Messages</h2>
                    <Link href="/agent/messages" className="text-sm font-medium text-ocean-blue hover:text-ocean-blue/80 flex items-center">
                      View all
                      <ChevronRight size={16} className="ml-0.5" />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {isLoading ? (
                      Array(3).fill(0).map((_, i) => (
                        <div key={i} className="p-4 animate-pulse">
                          <div className="flex items-start">
                            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                            <div className="ml-3 flex-1">
                              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      recentMessages.map((message) => (
                        <div key={message.id} className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${message.unread ? 'bg-blue-50/30' : ''}`}>
                          <div className="flex items-start">
                            <div className="relative">
                              <div className="h-10 w-10 rounded-full overflow-hidden">
                                <img 
                                  src={message.avatar} 
                                  alt={message.sender}
                                  className="h-full w-full object-cover" 
                                />
                              </div>
                              {message.unread && (
                                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-ocean-blue border-2 border-white"></span>
                              )}
                            </div>
                            
                            <div className="ml-3 flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className={`text-sm ${message.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-800'}`}>{message.sender}</h4>
                                <span className="text-xs text-gray-500">{message.time}</span>
                              </div>
                              <p className={`text-xs mt-1 line-clamp-2 ${message.unread ? 'text-gray-800' : 'text-gray-500'}`}>
                                {message.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="px-6 py-4 border-t border-gray-100">
                    <Link href="/agent/messages" className="flex items-center justify-center w-full py-2 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                      <MessageCircle size={16} className="mr-2" />
                      Open Inbox
                    </Link>
                  </div>
                </motion.div>

                {/* Upcoming schedule */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-raleway font-semibold text-gray-800">Upcoming Departures</h2>
                  </div>
                  
                  {isLoading ? (
                    <div className="p-4 space-y-4">
                      {Array(2).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse flex">
                          <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
                          <div className="ml-4 flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-2 space-y-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-ocean-blue/5 to-ocean-blue/10 border border-ocean-blue/20">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-midnight-blue to-ocean-blue flex flex-col items-center justify-center text-white shadow-md">
                              <span className="text-xs font-medium">JUL</span>
                              <span className="text-xl font-bold">15</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-900">Emily Johnson</h3>
                            <p className="text-xs text-gray-600 mt-0.5">Santorini, Greece</p>
                            <div className="flex items-center mt-1.5">
                              <Clock size={12} className="text-ocean-blue mr-1" />
                              <span className="text-xs text-ocean-blue font-medium">10:30 AM Departure</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/5 to-amber-500/10 border border-amber-500/20">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 flex flex-col items-center justify-center text-white shadow-md">
                              <span className="text-xs font-medium">AUG</span>
                              <span className="text-xl font-bold">10</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-900">Daniel Smith</h3>
                            <p className="text-xs text-gray-600 mt-0.5">Tokyo, Japan</p>
                            <div className="flex items-center mt-1.5">
                              <Clock size={12} className="text-amber-600 mr-1" />
                              <span className="text-xs text-amber-600 font-medium">09:15 PM Departure</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Link href="/agent/calendar" className="block mt-2">
                        <div className="p-2 text-center text-sm text-ocean-blue hover:bg-ocean-blue/5 rounded-lg transition-colors">
                          View Full Calendar
                        </div>
                      </Link>
                    </div>
                  )}
                </motion.div>

                {/* Performance Summary */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6"
                >
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-raleway font-semibold text-gray-800">Performance</h2>
                  </div>
                  
                  {isLoading ? (
                    <div className="p-6 animate-pulse space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-16 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                        <span className="text-xs text-green-600 font-medium">+18% from last month</span>
                      </div>
                      
                      <div className="relative h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-ocean-blue to-midnight-blue rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <h4 className="text-xs font-medium text-gray-500 mb-1">Bookings</h4>
                          <p className="text-xl font-bold text-midnight-blue">24</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <h4 className="text-xs font-medium text-gray-500 mb-1">Reviews</h4>
                          <p className="text-xl font-bold text-midnight-blue">4.9</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <h4 className="text-xs font-medium text-gray-500 mb-1">Profit</h4>
                          <p className="text-xl font-bold text-midnight-blue">67%</p>
                        </div>
                      </div>

                      <Link href="/agent/analytics" className="block mt-6">
                        <div className="p-2.5 text-center text-sm bg-gradient-to-r from-midnight-blue to-ocean-blue text-white rounded-lg hover:opacity-90 transition-opacity">
                          Full Analytics
                        </div>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}