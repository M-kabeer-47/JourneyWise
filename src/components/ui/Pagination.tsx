"use client";
import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) => {
  // Helper function to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Current page and surrounding pages
    const range = 2; // Show 2 pages before and after current page
    let start = Math.max(2, currentPage - range);
    let end = Math.min(totalPages - 1, currentPage + range);
    
    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push('ellipsis-start');
    }
    
    // Add pages in range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push('ellipsis-end');
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  // If there's only 1 page or less, don't render pagination
  if (totalPages <= 1) return null;
  
  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {/* Previous button */}
      <button 
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center h-9 w-9 rounded-md transition-colors ${
          currentPage === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>
      
      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) => {
          // Render ellipsis
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <div key={`${page}-${index}`} className="flex items-center justify-center h-9 w-9">
                <MoreHorizontal size={16} className="text-gray-400" />
              </div>
            );
          }
          
          // Render page number
          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`flex items-center justify-center h-9 w-9 rounded-[50%]  text-sm font-medium transition-colors ${
                currentPage === page
                  ? ' bg-midnight-blue text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>
      
      {/* Next button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center h-9 w-9 rounded-md transition-colors ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;