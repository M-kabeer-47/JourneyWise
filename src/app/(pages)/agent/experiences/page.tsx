"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Plus
} from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import SearchBar from '@/components/ui/SearchBar';
import SortBy from '@/components/ui/SortBy';
import ExperienceGrid from '@/components/experiences/ExperienceGrid';
import { Experience } from '@/lib/types/Experience';
import { generateMockExperiences } from '@/utils/mockDataGenerators';

export default function AgentExperiences() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  }>({ key: 'createdAt', direction: 'descending' });
  
  // Items per page
  const ITEMS_PER_PAGE = 9;

  // Sort options
  const sortOptions = [
    { key: 'none', label: 'None' },
    { key: 'createdAt', label: 'Date Created' },
    { key: 'isAvailable', label: 'Availability' }
  ];

  useEffect(() => {
    // Simulate data loading
    const fetchExperiences = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockExperiences = generateMockExperiences(30);
        setExperiences(mockExperiences);
      } catch (error) {
        console.error('Failed to fetch experiences:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExperiences();
  }, []);

  // Apply search to experiences
  const filteredExperiences = useMemo(() => {
    if (!searchTerm) return experiences;
    
    return experiences.filter(exp => {
      return exp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.location.country.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [experiences, searchTerm]);
  
  // Apply sorting
  const sortedExperiences = useMemo(() => {
    if (sortConfig.key === 'none') return filteredExperiences;
    
    let sortable = [...filteredExperiences];
    
    if (sortConfig.key === 'isAvailable') {
      sortable.sort((a, b) => {
        if (sortConfig.direction === 'ascending') {
          return a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? 1 : -1;
        } else {
          return a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1;
        }
      });
    } else {
      sortable.sort((a, b) => {
        if (a[sortConfig.key as keyof Experience] < b[sortConfig.key as keyof Experience]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof Experience] > b[sortConfig.key as keyof Experience]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortable;
  }, [filteredExperiences, sortConfig]);

  // Get paginated experiences
  const paginatedExperiences = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedExperiences.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedExperiences, currentPage]);
  
  // Calculate total pages
  const totalPages = Math.ceil(sortedExperiences.length / ITEMS_PER_PAGE);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle sort change
  const handleSortChange = (key: string, direction: 'ascending' | 'descending') => {
    setSortConfig({ key, direction });
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-light-gray flex flex-col font-sans">
      {/* Header */}
      

      {/* Main content */}
      <main className="flex-1 pt-16 pb-10">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-midnight-blue to-ocean-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-raleway font-bold tracking-tight">
                  Your Experiences
                </h1>
                <p className="mt-2 text-blue-100">
                  Manage, edit, and track all your travel experiences
                </p>
              </div>
              <Link href="/agent/experiences/create" className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-white text-midnight-blue font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <Plus size={18} className="mr-2" />
                Create Experience
              </Link>
            </div>
            
            {/* Stats Overview */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm font-medium text-blue-100">Total</p>
                <p className="mt-1 text-2xl font-bold">{experiences.length}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm font-medium text-blue-100">Available</p>
                <p className="mt-1 text-2xl font-bold">
                  {experiences.filter(exp => exp.isAvailable).length}
                </p>
              </div>
             
            </div>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and sort section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search component */}
              <SearchBar 
                searchTerm={searchTerm}
                setSearchTerm={(value) => {
                  setSearchTerm(value);
                  setCurrentPage(1);
                }}
                placeholder="Search experiences by title, description or location..."
              />
              
              {/* Sort component */}
              <SortBy 
                options={sortOptions}
                activeSort={sortConfig}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
          
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{
                sortedExperiences.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1
              }-{
                Math.min(currentPage * ITEMS_PER_PAGE, sortedExperiences.length)
              }</span> of <span className="font-medium text-gray-900">{sortedExperiences.length}</span> experiences
            </p>
          </div>
          
          {/* Experience grid */}
          <ExperienceGrid 
            experiences={paginatedExperiences}
            isLoading={isLoading}
            emptyMessage="No experiences match your search criteria"
            onClearFilters={searchTerm ? clearSearch : undefined}
          />
          
          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}