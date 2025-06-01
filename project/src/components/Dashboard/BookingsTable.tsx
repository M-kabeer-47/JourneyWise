import React, { useState } from 'react';
import { Booking } from '../../../../src/lib/data';
import { ChevronDown, ChevronUp, Filter, Search } from 'lucide-react';

interface BookingsTableProps {
  bookings: Booking[];
  title?: string;
  isFullPage?: boolean;
}

const BookingsTable: React.FC<BookingsTableProps> = ({ 
  bookings, 
  title = "Bookings",
  isFullPage = false
}) => {
  const [sortField, setSortField] = useState<string>('bookingDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  // Handle sort clicking
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Get status badge styling
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-[#71FB5533] text-[#20C000]';
      case 'pending':
        return 'bg-accent/20 text-amber-700';
      case 'approved':
        return 'bg-ocean-blue/20 text-ocean-blue';
      case 'cancelled':
        return 'bg-red-50 text-red-700';
      case 'completed':
        return 'bg-midnight-blue/20 text-midnight-blue';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  // Filter bookings based on search term
  const filteredBookings = searchTerm 
    ? bookings.filter(booking => 
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.experienceTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : bookings;

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortField === 'bookingDate') {
      const dateA = new Date(a.bookingDate).getTime();
      const dateB = new Date(b.bookingDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortField === 'price') {
      return sortDirection === 'asc' 
        ? a.tier.price - b.tier.price 
        : b.tier.price - a.tier.price;
    } else {
      // Generic string comparison for other fields
      const valueA = a[sortField as keyof typeof a] || '';
      const valueB = b[sortField as keyof typeof b] || '';
      return sortDirection === 'asc'
        ? valueA.toString().localeCompare(valueB.toString())
        : valueB.toString().localeCompare(valueA.toString());
    }
  });

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${isFullPage ? 'h-full' : ''}`}>
      {/* Header with title, search and filter options */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className={`${isFullPage ? 'text-2xl' : 'text-xl'} font-semibold text-midnight-blue`}>
            {title}
          </h2>
          
          {isFullPage && (
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-ocean-blue"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Filter size={16} />
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className='bg-ocean-blue text-white'>
              <th className={`${isFullPage ? 'px-8 py-5' : 'px-6 py-4'} text-left text-xs font-semibold uppercase tracking-wider cursor-pointer`}
                  onClick={() => handleSort('customerName')}>
                <div className="flex items-center">
                  Customer
                  {sortField === 'customerName' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className={`${isFullPage ? 'px-8 py-5' : 'px-6 py-4'} text-left text-xs font-semibold uppercase tracking-wider cursor-pointer`}
                  onClick={() => handleSort('experienceTitle')}>
                <div className="flex items-center">
                  Experience
                  {sortField === 'experienceTitle' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className={`${isFullPage ? 'px-8 py-5' : 'px-6 py-4'} text-left text-xs font-semibold uppercase tracking-wider cursor-pointer`}
                  onClick={() => handleSort('bookingDate')}>
                <div className="flex items-center">
                  Booking Date
                  {sortField === 'bookingDate' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className={`${isFullPage ? 'px-8 py-5' : 'px-6 py-4'} text-left text-xs font-semibold uppercase tracking-wider cursor-pointer`}
                  onClick={() => handleSort('price')}>
                <div className="flex items-center">
                  Price
                  {sortField === 'price' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className={`${isFullPage ? 'px-8 py-5' : 'px-6 py-4'} text-left text-xs font-semibold uppercase tracking-wider`}>
                Status
              </th>
              {isFullPage && (
                <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                <td className={`${isFullPage ? 'px-8 py-6' : 'px-6 py-4'} whitespace-nowrap`}>
                  <div className="flex items-center">
                    <div className={`${isFullPage ? 'w-10 h-10' : 'w-8 h-8'} rounded-full bg-ocean-blue/10 flex items-center justify-center text-ocean-blue font-medium mr-3`}>
                      {booking.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className={`${isFullPage ? 'text-base' : 'text-sm'} font-medium text-gray-900`}>
                        {booking.customerName}
                      </div>
                      <div className={`${isFullPage ? '' : 'text-sm'} text-gray-500`}>
                        {booking.customerEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`${isFullPage ? 'px-8 py-6' : 'px-6 py-4'} whitespace-nowrap`}>
                  <span className={`${isFullPage ? 'text-base' : 'text-sm'} font-medium text-gray-900`}>
                    {booking.experienceTitle}
                  </span>
                  {isFullPage && booking.tier.name && (
                    <div className="text-sm text-gray-500 mt-1">
                      {booking.tier.name} Tier
                    </div>
                  )}
                </td>
                <td className={`${isFullPage ? 'px-8 py-6' : 'px-6 py-4'} whitespace-nowrap`}>
                  <span className={`${isFullPage ? 'text-base' : 'text-sm'} text-gray-500`}>
                    {new Date(booking.bookingDate).toLocaleDateString(undefined, { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: isFullPage ? '2-digit' : undefined,
                      minute: isFullPage ? '2-digit' : undefined
                    })}
                  </span>
                </td>
                <td className={`${isFullPage ? 'px-8 py-6' : 'px-6 py-4'} whitespace-nowrap`}>
                  <span className={`${isFullPage ? 'text-base' : 'text-sm'} font-medium text-gray-900`}>
                    ${booking.tier.price}
                  </span>
                </td>
                <td className={`${isFullPage ? 'px-8 py-6' : 'px-6 py-4'} whitespace-nowrap`}>
                  <span className={`inline-flex justify-center items-center px-3 py-1.5 rounded-[10px] text-xs font-medium ${isFullPage ? 'w-24 text-sm' : 'w-[80px]'} ${getStatusClass(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                {isFullPage && (
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1.5 text-sm font-medium text-ocean-blue bg-ocean-blue/10 rounded-lg hover:bg-ocean-blue/20 transition-colors">
                        View
                      </button>
                      <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        Edit
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination for full page version */}
      {isFullPage && (
        <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {Math.min(1, sortedBookings.length)} to {Math.min(10, sortedBookings.length)} of {sortedBookings.length} bookings
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-ocean-blue rounded-lg hover:bg-ocean-blue/90 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsTable;