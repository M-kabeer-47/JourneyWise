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
    <div className="relative flex items-center w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-charcoal focus:outline-none focus:border-ocean-blue placeholder:text-sm sm:placeholder:text-base"
      />
      
      {searchTerm ? (
        <X
          className="absolute right-2 h-6 w-6 text-charcoal cursor-pointer"
          onClick={() => setSearchTerm("")}
        />
      ) : (
        <Search className="absolute right-2 h-6 w-6 text-gray-500" />
      )}
    </div>
  );
};

export default SearchBar;
