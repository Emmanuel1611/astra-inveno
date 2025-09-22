import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

// Types
export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string | null;
  lastLoginAt: string;
  organization: {
    id: string;
    name: string;
    logo: string | null;
    slug: string;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  pagination: {
    total: number;
    unread: number;
    limit: number;
    offset: number;
  };
}

export interface SyncStatus {
  isOnline: boolean;
  lastSync: string | null;
  pendingSync: number;
  syncInProgress: boolean;
}

export interface SearchResult {
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

// User hook
export function useUser() {
  const { data, isLoading, error } = useQuery<{ user: UserData }, Error>(
    'user-data',
    async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    }
  );

  return {
    userData: data?.user,
    isLoading,
    error,
  };
}

// Notifications hook
export function useNotifications() {
  const queryClient = useQueryClient();
  const limit = 10;
  
  const { data, isLoading, error } = useQuery<NotificationsResponse, Error>(
    'notifications',
    async () => {
      const response = await api.get('/notifications', { 
        params: { limit } 
      });
      return response.data;
    },
    {
      staleTime: 30 * 1000, // 30 seconds
      refetchInterval: 30 * 1000, // Poll every 30 seconds
    }
  );

  const markAsRead = useMutation(
    async (id: string) => {
      const response = await api.patch(`/notifications/${id}/read`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
      },
    }
  );

  const markAllAsRead = useMutation(
    async () => {
      const response = await api.patch('/notifications/read-all');
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
      },
    }
  );

  return {
    notifications: data?.notifications || [],
    pagination: data?.pagination,
    isLoading,
    error,
    markAsRead: (id: string) => markAsRead.mutate(id),
    markAllAsRead: () => markAllAsRead.mutate(),
  };
}

// Sync hook
export function useSync() {
  const { data, isLoading, error } = useQuery<SyncStatus, Error>(
    'sync-status',
    async () => {
      const response = await api.get('/sync/status');
      return response.data;
    },
    {
      staleTime: 2000, // 2 seconds
      refetchInterval: 5000, // Poll every 5 seconds
    }
  );

  return {
    syncStatus: data?.isOnline ? 
      (data.pendingSync > 0 ? 'pending' : 'synced') : 
      'error',
    syncInProgress: data?.syncInProgress || false,
    pendingSync: data?.pendingSync || 0,
    lastSync: data?.lastSync,
    isLoading,
    error,
  };
}

// Search hook
export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await api.get<SearchResponse>('/search', { 
          params: { q: searchQuery, limit: 8 } 
        });
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // Debounce search requests

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    clearSearch: () => setSearchQuery(''),
  };
}
