"use client";
import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className="md:col-span-5 relative flex items-center">
      <input
        type="search"
        placeholder="Search experiences..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-ocean-blue"
      />
      <Search className="absolute right-2  h-6 w-6 text-gray-400 " />
    </div>
  );
};

export default SearchBar;
