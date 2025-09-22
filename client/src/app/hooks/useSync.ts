"use client";

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface SyncStatus {
  isOnline: boolean;
  lastSync: string | null;
  pendingSync: number;
  syncInProgress: boolean;
}

export function useSync() {
  const { data, isLoading, error } = useQuery<SyncStatus>({
    queryKey: ['sync-status'],
    queryFn: async () => {
      const response = await api.get('/sync/status');
      return response.data;
    },
    staleTime: 2000, // 2 seconds
    refetchInterval: 5000, // Poll every 5 seconds
  });

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