"use client";
import { useState, useEffect } from "react";
export default function useDebounceSearch({
  searchTerm,
}: {
  searchTerm: string;
}) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  return {debouncedSearchTerm}
}
