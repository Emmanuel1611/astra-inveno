"use client";

import { dbManager, OfflineAction } from './indexedDB';

interface SyncOptions {
  retryAttempts?: number;
  retryDelay?: number;
}

export class SyncManager {
  private isOnline: boolean = true;
  private syncInProgress: boolean = false;
  private retryQueue: OfflineAction[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.isOnline = navigator.onLine;
      this.setupEventListeners();
    }
  }

  private setupEventListeners() {
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));
  }

  private handleOnline() {
    console.log('Network back online - starting sync...');
    this.isOnline = true;
    this.syncOfflineData();
  }

  private handleOffline() {
    console.log('Network went offline');
    this.isOnline = false;
  }

  async syncOfflineData(options: SyncOptions = {}) {
    if (!this.isOnline || this.syncInProgress) {
      console.log('Sync skipped - offline or already in progress');
      return;
    }

    this.syncInProgress = true;
    
    try {
      const actions = await dbManager.getUnsyncedActions();
      console.log(`Found ${actions.length} actions to sync`);

      for (const action of actions) {
        await this.syncAction(action, options);
      }

      // Clear retry queue on successful sync
      this.retryQueue = [];
      
      console.log('Sync completed successfully');
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  private async syncAction(action: OfflineAction, options: SyncOptions) {
    const { retryAttempts = 3, retryDelay = 1000 } = options;
    
    for (let attempt = 0; attempt <= retryAttempts; attempt++) {
      try {
        await this.performSync(action);
        await dbManager.markActionSynced(action.id);
        console.log(`Synced action ${action.id}`);
        return;
      } catch (error) {
        console.error(`Sync attempt ${attempt + 1} failed for action ${action.id}:`, error);
        
        if (attempt < retryAttempts) {
          await this.delay(retryDelay * (attempt + 1)); // Exponential backoff
        } else {
          // Add to retry queue for later
          this.retryQueue.push(action);
          console.error(`Failed to sync action ${action.id} after ${retryAttempts + 1} attempts`);
        }
      }
    }
  }

  private async performSync(action: OfflineAction): Promise<void> {
    const { type, table, data } = action;
    const endpoint = this.getAPIEndpoint(table);
    
    let response: Response;

    switch (type) {
      case 'create':
        response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        break;
        
      case 'update':
        response = await fetch(`${endpoint}/${data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        break;
        
      case 'delete':
        response = await fetch(`${endpoint}/${data.id}`, {
          method: 'DELETE',
        });
        break;
        
      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  private getAPIEndpoint(table: string): string {
    // Adjust these endpoints based on your actual API structure
    const endpoints = {
      products: '/api/products',
      purchaseOrders: '/api/purchase-orders',
    };
    
    return endpoints[table as keyof typeof endpoints] || `/api/${table}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Manual sync trigger
  async forcSync(): Promise<void> {
    if (this.isOnline) {
      await this.syncOfflineData();
    } else {
      throw new Error('Cannot sync while offline');
    }
  }

  // Check if there are pending actions
  async hasPendingActions(): Promise<boolean> {
    const actions = await dbManager.getUnsyncedActions();
    return actions.length > 0;
  }

  // Get sync status
  getSyncStatus(): { isOnline: boolean; syncInProgress: boolean; retryQueueLength: number } {
    return {
      isOnline: this.isOnline,
      syncInProgress: this.syncInProgress,
      retryQueueLength: this.retryQueue.length,
    };
  }
}

// Singleton instance
export const syncManager = new SyncManager();

// Hook for React components
export const useSyncManager = () => {
  const forcSync = () => syncManager.forcSync();
  const getSyncStatus = () => syncManager.getSyncStatus();
  const hasPendingActions = () => syncManager.hasPendingActions();

  return {
    forcSync,
    getSyncStatus,
    hasPendingActions,
  };
};
