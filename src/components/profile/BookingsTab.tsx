import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Clock } from 'lucide-react';

interface BookingsTabProps {
  bookings: any[];
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
};

export default function BookingsTab({ bookings }: BookingsTabProps) {
  if (bookings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-midnight-blue to-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-2">No bookings yet</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Book your first experience and start your adventure.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-midnight-blue">My Bookings</h2>
        <p className="text-gray-600">Track your booked experiences and adventures</p>
      </div>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3">
                <div className="aspect-video lg:aspect-square h-full">
                  <img 
                    src={booking.experience.imageUrl}
                    alt={booking.experience.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-midnight-blue mb-1">
                      {booking.experience.title}
                    </h3>
                    <p className="text-gray-600">by {booking.agent.agencyName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-ocean-blue" />
                    <span className="text-sm">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-ocean-blue" />
                    <span className="text-sm">
                      {Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4 text-ocean-blue" />
                    <span className="text-sm font-semibold">${booking.totalPrice}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className={`w-3 h-3 rounded-full ${
                      booking.payment.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <span className="text-sm capitalize">{booking.payment.status}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      <strong>Package:</strong> {booking.tier.name}
                    </p>
                    {booking.notes && (
                      <p className="text-sm text-gray-500 mt-1">"{booking.notes}"</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-ocean-blue border border-ocean-blue rounded-lg hover:bg-ocean-blue/10 transition-all">
                      View Details
                    </button>
                    {booking.status === 'confirmed' && (
                      <button className="px-4 py-2 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white rounded-lg hover:shadow-lg transition-all">
                        Manage Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}