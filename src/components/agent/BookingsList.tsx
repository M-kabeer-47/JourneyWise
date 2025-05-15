import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingCard from './BookingCard';
import { Calendar, List, ChevronRight, ChevronLeft } from 'lucide-react';

// Dummy data for bookings
const bookingsData = [
  {
    id: '1',
    clientName: 'Emily Johnson',
    destination: 'Santorini, Greece',
    startDate: '2023-07-15',
    endDate: '2023-07-22',
    status: 'confirmed',
    price: '$2,450',
    image: '/images/destinations/santorini.jpg'
  },
  {
    id: '2',
    clientName: 'Daniel Smith',
    destination: 'Tokyo, Japan',
    startDate: '2023-08-10',
    endDate: '2023-08-20',
    status: 'pending',
    price: '$3,200',
    image: '/images/destinations/tokyo.jpg'
  },
  {
    id: '3',
    clientName: 'Michael Brown',
    destination: 'Barcelona, Spain',
    startDate: '2023-07-28',
    endDate: '2023-08-04',
    status: 'confirmed',
    price: '$1,890',
    image: '/images/destinations/barcelona.jpg'
  },
  {
    id: '4',
    clientName: 'Sophia Williams',
    destination: 'Bali, Indonesia',
    startDate: '2023-09-05',
    endDate: '2023-09-15',
    status: 'confirmed',
    price: '$2,750',
    image: '/images/destinations/bali.jpg'
  },
  {
    id: '5',
    clientName: 'Oliver Wilson',
    destination: 'New York, USA',
    startDate: '2023-08-22',
    endDate: '2023-08-29',
    status: 'pending',
    price: '$2,100',
    image: '/images/destinations/newyork.jpg'
  }
];

interface BookingsListProps {
  title?: string;
  viewAll?: boolean;
}

const BookingsList = ({ title = "Upcoming Bookings", viewAll = true }: BookingsListProps) => {
  const [activeView, setActiveView] = useState<'list' | 'grid'>('grid');
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  
  const totalItems = bookingsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const displayedBookings = bookingsData.slice(
    (page - 1) * itemsPerPage, 
    page * itemsPerPage
  );
  
  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        
        <div className="flex items-center">
          <div className="mr-4 bg-white rounded-lg border border-gray-200 p-1 flex">
            <button
              onClick={() => setActiveView('grid')}
              className={`p-1 rounded ${
                activeView === 'grid' 
                  ? 'bg-ocean-blue text-white' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Calendar size={18} />
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`p-1 rounded ${
                activeView === 'list' 
                  ? 'bg-ocean-blue text-white' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <List size={18} />
            </button>
          </div>
          
          {viewAll && (
            <a 
              href="#" 
              className="text-ocean-blue hover:text-ocean-blue/80 text-sm font-medium flex items-center"
            >
              View all
              <ChevronRight size={16} className="ml-1" />
            </a>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`grid ${activeView === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}
        >
          {displayedBookings.map(booking => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              viewType={activeView} 
            />
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="p-1 rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          
          <span className="px-4 text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="p-1 rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingsList;