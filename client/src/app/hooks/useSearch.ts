"use client";

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export interface SearchResult {
  [x: string]: string | undefined | number;
  id: string;
  type: 'item' | 'customer' | 'vendor' | 'order';
  title: string;
  subtitle?: string;
  url: string;
  category?: string;
  relevanceScore: number;
}

export interface SearchResponse {
  results: SearchResult[];
  totalFound: number;
  query: string;
}

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const performSearch = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        setError(null);
        return;
      }

      setIsSearching(true);
      setError(null);
      
      try {
        const response = await api.get('/search', { 
          params: { q: searchQuery, limit: 8 } 
        });
        setSearchResults(response.data.results || []);
      } catch (error: any) {
        console.error('Search error:', error);
        setError(error.message || 'Search failed');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const searchTimeout = setTimeout(performSearch, 300);

    return () => {
      clearTimeout(searchTimeout);
      controller.abort();
    };
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    error,
    clearSearch: () => setSearchQuery(''),
  };
}