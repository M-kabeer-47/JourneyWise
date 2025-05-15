"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  SlidersHorizontal, 
  Search, 
  X,
  Tag,
  Filter, 
  Calendar,
  Clock,
  DollarSign,
} from 'lucide-react';

// Components
import ExperienceCard from '@/components/home/experiences/ExperienceCard';
import ExperienceSkeleton from '@/components/skeletons/ExperienceSkeleton';
import Pagination from '@/components/ui/Pagination';
import SearchBar from '@/components/ui/SearchBar';
import SortBy from '@/components/ui/SortBy';
import Container from '@/components/ui/Container';
import { Experience } from '@/lib/types/Experience';

export default function ExperiencesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Parse URL parameters
  const currentPage = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '9');
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const searchQuery = searchParams.get('search') || '';
  const isAvailable = searchParams.get('isAvailable');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minDuration = searchParams.get('minDuration');
  const maxDuration = searchParams.get('maxDuration');
  const tags = searchParams.get('tags');
  
  // Filter form state
  const [filters, setFilters] = useState({
    isAvailable: isAvailable === 'true',
    minPrice: minPrice ? parseInt(minPrice) : 0,
    maxPrice: maxPrice ? parseInt(maxPrice) : 10000,
    minDuration: minDuration ? parseInt(minDuration) : 1,
    maxDuration: maxDuration ? parseInt(maxDuration) : 30,
    tags: tags ? tags.split(',') : [],
    search: searchQuery
  });

  // Temporary filter state for the form
  const [tempFilters, setTempFilters] = useState({...filters});
  
  // Fetch data from API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setIsLoading(true);
        
        // Build query parameters
        const offset = (currentPage - 1) * limit;
        let queryParams = new URLSearchParams();
        
        queryParams.append('limit', limit.toString());
        queryParams.append('offset', offset.toString());
        queryParams.append('sortBy', sortBy);
        queryParams.append('sortOrder', sortOrder);
        
        if (searchQuery) queryParams.append('search', searchQuery);
        if (isAvailable !== null) queryParams.append('isAvailable', isAvailable);
        if (minPrice) queryParams.append('minPrice', minPrice);
        if (maxPrice) queryParams.append('maxPrice', maxPrice);
        if (minDuration) queryParams.append('minDuration', minDuration);
        if (maxDuration) queryParams.append('maxDuration', maxDuration);
        if (tags) queryParams.append('tags', tags);
        
        const response = await fetch(`/api/experiences?${queryParams.toString()}`);
        const data = await response.json();
        
        if (response.ok) {
          setExperiences(data.experiences);
          setTotalCount(data.pagination.total);
        } else {
          console.error('Error fetching experiences:', data.message);
        }
      } catch (error) {
        console.error('Failed to fetch experiences:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExperiences();
  }, [currentPage, limit, sortBy, sortOrder, searchQuery, isAvailable, minPrice, maxPrice, minDuration, maxDuration, tags]);
  
  // Sorting options
  const sortOptions = [
    { key: 'createdAt', label: 'Date Added' },
    { key: 'averageRating', label: 'Rating' },
    { key: 'minPrice', label: 'Price: Low to High' },
    { key: 'maxPrice', label: 'Price: High to Low' },
    { key: 'duration', label: 'Duration' },
  ];

  // Tag options for filter
  const tagOptions = [
    'Adventure', 'Cultural', 'Food', 'Nature', 'Relaxation', 
    'Beach', 'Mountain', 'City', 'Historical', 'Wildlife',
    'Photography', 'Hiking', 'Family-friendly'
  ];
  
  // Handle search submission
  const handleSearch = (value: string) => {
    updateQueryParams({ search: value, page: '1' });
  };
  
  // Handle sort change
  const handleSortChange = (key: string, direction: 'ascending' | 'descending') => {
    updateQueryParams({ 
      sortBy: key, 
      sortOrder: direction === 'ascending' ? 'asc' : 'desc' 
    });
  };
  
  // Handle filter form submission
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update filters state
    setFilters({...tempFilters});
    
    // Update URL params
    updateQueryParams({
      isAvailable: tempFilters.isAvailable ? 'true' : 'false',
      minPrice: tempFilters.minPrice.toString(),
      maxPrice: tempFilters.maxPrice.toString(),
      minDuration: tempFilters.minDuration.toString(),
      maxDuration: tempFilters.maxDuration.toString(),
      tags: tempFilters.tags.join(','),
      page: '1'
    });
    
    // Close filter panel
    setFilterOpen(false);
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    updateQueryParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Helper to update query parameters
  const updateQueryParams = (params: Record<string, string>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    // Update or add new parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });
    
    // Build the new URL
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`/experiences${query}`);
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    const defaultFilters = {
      isAvailable: false,
      minPrice: 0,
      maxPrice: 10000,
      minDuration: 1,
      maxDuration: 30,
      tags: [],
      search: ''
    };
    
    setFilters(defaultFilters);
    setTempFilters(defaultFilters);
    
    // Clear URL parameters except for page, limit, sort
    const current = new URLSearchParams();
    current.set('page', '1');
    current.set('limit', limit.toString());
    current.set('sortBy', sortBy);
    current.set('sortOrder', sortOrder);
    
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`/experiences${query}`);
  };
  
  // Toggle a tag in filter
  const toggleTag = (tag: string) => {
    setTempFilters(prev => {
      if (prev.tags.includes(tag)) {
        return { ...prev, tags: prev.tags.filter(t => t !== tag) };
      } else {
        return { ...prev, tags: [...prev.tags, tag] };
      }
    });
  };
  
  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <div className="min-h-screen bg-light-gray font-sans pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-midnight-blue to-ocean-blue text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
        </div>
        
        <Container className="relative z-10 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-raleway font-bold mb-4">
              Discover Amazing Experiences
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Find and book unique activities led by local experts
            </p>
            
            {/* Search input */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search for experiences, locations, or activities..."
                value={filters.search || ''}
                onChange={(e) => {
                  setTempFilters(prev => ({ ...prev, search: e.target.value }));
                  handleSearch(e.target.value);
                }}
                className="block w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 shadow-lg"
              />
            </div>
          </div>
        </Container>
      </div>
      
      {/* Main Content */}
      <Container className="pt-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Panel - Mobile Toggle */}
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm mb-4"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
          
          {/* Filters Sidebar - Only visible on lg screens by default */}
          <aside 
            className={`lg:w-72 flex-shrink-0 ${filterOpen ? 'fixed inset-0 z-40 bg-white p-6 overflow-y-auto lg:static lg:p-0 lg:bg-transparent lg:overflow-visible' : 'hidden lg:block'}`}
          >
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                  {filterOpen && (
                    <button 
                      onClick={() => setFilterOpen(false)}
                      className="lg:hidden p-1 rounded-full hover:bg-gray-100"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
                
                <form onSubmit={handleFilterSubmit}>
                  {/* Availability Filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Availability</h3>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="available"
                        checked={tempFilters.isAvailable}
                        onChange={() => setTempFilters(prev => ({ ...prev, isAvailable: !prev.isAvailable }))}
                        className="h-4 w-4 text-ocean-blue rounded focus:ring-ocean-blue"
                      />
                      <label htmlFor="available" className="ml-2 text-gray-700">
                        Show only available experiences
                      </label>
                    </div>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Price Range</h3>
                      <span className="text-sm text-gray-500">
                        ${tempFilters.minPrice} - ${tempFilters.maxPrice}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="minPrice" className="sr-only">Min Price</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign size={14} className="text-gray-400" />
                          </div>
                          <input
                            type="number"
                            id="minPrice"
                            value={tempFilters.minPrice}
                            onChange={(e) => setTempFilters(prev => ({ 
                              ...prev, 
                              minPrice: parseInt(e.target.value) || 0 
                            }))}
                            className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-sm"
                            min="0"
                            max={tempFilters.maxPrice}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="maxPrice" className="sr-only">Max Price</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign size={14} className="text-gray-400" />
                          </div>
                          <input
                            type="number"
                            id="maxPrice"
                            value={tempFilters.maxPrice}
                            onChange={(e) => setTempFilters(prev => ({ 
                              ...prev, 
                              maxPrice: parseInt(e.target.value) || prev.minPrice 
                            }))}
                            className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-sm"
                            min={tempFilters.minPrice}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Duration Filter */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Duration (days)</h3>
                      <span className="text-sm text-gray-500">
                        {tempFilters.minDuration} - {tempFilters.maxDuration}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="minDuration" className="sr-only">Min Duration</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock size={14} className="text-gray-400" />
                          </div>
                          <input
                            type="number"
                            id="minDuration"
                            value={tempFilters.minDuration}
                            onChange={(e) => setTempFilters(prev => ({ 
                              ...prev, 
                              minDuration: parseInt(e.target.value) || 1
                            }))}
                            className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-sm"
                            min="1"
                            max={tempFilters.maxDuration}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="maxDuration" className="sr-only">Max Duration</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock size={14} className="text-gray-400" />
                          </div>
                          <input
                            type="number"
                            id="maxDuration"
                            value={tempFilters.maxDuration}
                            onChange={(e) => setTempFilters(prev => ({ 
                              ...prev, 
                              maxDuration: parseInt(e.target.value) || prev.minDuration 
                            }))}
                            className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-sm"
                            min={tempFilters.minDuration}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tags Filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tagOptions.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                            tempFilters.tags.includes(tag)
                              ? 'bg-ocean-blue text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-8">
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md text-sm font-medium flex-1"
                    >
                      Clear All
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-ocean-blue text-white hover:bg-midnight-blue rounded-md text-sm font-medium flex-1"
                    >
                      Apply Filters
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </aside>
          
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Control Bar - Sort and View Options */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="text-sm text-gray-500">
                Showing {totalCount > 0 ? (currentPage - 1) * limit + 1 : 0}-{Math.min(currentPage * limit, totalCount)} of {totalCount} experiences
              </div>
              
              <SortBy 
                options={sortOptions}
                activeSort={{
                  key: sortBy,
                  direction: sortOrder === 'asc' ? 'ascending' : 'descending'
                }}
                onSortChange={handleSortChange}
              />
            </div>
            
            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <ExperienceSkeleton key={i} />
                ))}
              </div>
            ) : experiences.length === 0 ? (
              <div className="bg-white rounded-xl p-10 text-center border border-gray-200">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No experiences found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-ocean-blue text-white text-sm font-medium rounded-md hover:bg-midnight-blue transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {experiences.map(experience => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ExperienceCard experience={experience} />
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}