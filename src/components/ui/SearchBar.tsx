"use client";
import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "./Input";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
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
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className=""
 
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
