import { useState, useEffect } from 'react';
import { syncService } from '../services/sync.service';

interface SyncStatus {
  isOnline: boolean;
  syncInProgress: boolean;
  pendingSync: number;
  conflicts: number;
  lastSync: Date | null;
}

export const useSync = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: false,
    syncInProgress: false,
    pendingSync: 0,
    conflicts: 0,
    lastSync: null
  });

  const updateSyncStatus = async () => {
    try {
      const status = await syncService.getSyncStatus();
      setSyncStatus(status);
    } catch (error) {
      console.error('Failed to get sync status:', error);
    }
  };

  useEffect(() => {
    // Update status immediately
    updateSyncStatus();

    // Set up periodic status updates
    const interval = setInterval(updateSyncStatus, 5000); // Update every 5 seconds

    // Listen for online/offline events
    const handleOnline = () => updateSyncStatus();
    const handleOffline = () => updateSyncStatus();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const forceSync = async () => {
    try {
      await syncService.forcSync();
      await updateSyncStatus();
    } catch (error) {
      console.error('Force sync failed:', error);
    }
  };

  const pullFromServer = async () => {
    try {
      await syncService.pullFromServer();
      await updateSyncStatus();
    } catch (error) {
      console.error('Pull from server failed:', error);
    }
  };

  return {
    syncStatus,
    forceSync,
    pullFromServer,
    updateSyncStatus
  };
};