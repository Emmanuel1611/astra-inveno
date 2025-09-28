"use client";

import { useState, useEffect } from 'react';

export interface SearchResult {
  id: string;
  name?: string;
  title?: string;
  type?: string;
  category?: string;
  [key: string]: string | undefined | number;
}

// Static mock search data
const mockSearchData: SearchResult[] = [
  { id: '1', name: 'Laptop', type: 'product', category: 'Electronics' },
  { id: '2', name: 'Office Chair', type: 'product', category: 'Furniture' },
  { id: '3', name: 'Mouse', type: 'product', category: 'Electronics' },
  { id: '4', name: 'Keyboard', type: 'product', category: 'Electronics' },
  { id: '5', name: 'Monitor', type: 'product', category: 'Electronics' },
  { id: '6', name: 'Desk', type: 'product', category: 'Furniture' },
  { id: '7', title: 'Sales Report', type: 'report', category: 'Reports' },
  { id: '8', title: 'Inventory Report', type: 'report', category: 'Reports' },
  { id: '9', name: 'John Doe', type: 'customer', category: 'Contacts' },
  { id: '10', name: 'ABC Supplier', type: 'vendor', category: 'Contacts' },
];

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      
      // Simulate API delay
      const timeoutId = setTimeout(() => {
        // Static search implementation - filter mock data
        const results = mockSearchData.filter(item => {
          const searchTerm = searchQuery.toLowerCase();
          return (
            (item.name && item.name.toLowerCase().includes(searchTerm)) ||
            (item.title && item.title.toLowerCase().includes(searchTerm)) ||
            (item.category && item.category.toLowerCase().includes(searchTerm))
          );
        });
        
        setSearchResults(results);
        setIsSearching(false);
      }, 300); // 300ms delay to simulate API call

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    clearSearch,
  };
};