import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, User } from 'lucide-react';

interface Booking {
  id: string;
  clientName: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: string;
  image: string;
}

interface BookingCardProps {
  booking: Booking;
  viewType: 'list' | 'grid';
}

const BookingCard = ({ booking, viewType }: BookingCardProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-amber-100 text-amber-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  if (viewType === 'list') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="flex items-center p-4">
          <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image 
              src={booking.image} 
              alt={booking.destination} 
              width={64} 
              height={64} 
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="ml-4 flex-grow">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{booking.clientName}</h4>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin size={14} className="mr-1" />
                  {booking.destination}
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
              </div>
              <div className="text-sm font-medium text-gray-900">{booking.price}</div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col h-[220px]"
    >
      <div className="relative h-24 w-full">
        <Image 
          src={booking.image} 
          alt={booking.destination} 
          layout="fill" 
          objectFit="cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <h4 className="font-medium text-gray-900 line-clamp-1">{booking.destination}</h4>
        
        <div className="mt-2 text-sm">
          <div className="flex items-center text-gray-600 mb-1">
            <User size={14} className="mr-2" />
            <span className="line-clamp-1">{booking.clientName}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-1">
            <Calendar size={14} className="mr-2" />
            <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign size={14} className="mr-2" />
            <span>{booking.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;