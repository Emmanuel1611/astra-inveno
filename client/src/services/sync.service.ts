import { db, SyncQueue } from '../lib/indexedDB';
import { itemsAPI, warehousesAPI } from '../lib/api';
import { toast } from 'react-hot-toast';

interface SyncResult {
  success: boolean;
  processed: number;
  failed: number;
  errors: string[];
}

class SyncService {
  private isOnline = typeof navigator !== 'undefined' ? navigator.onLine : false;
  private syncInProgress = false;
  private syncInterval: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // Listen for online/offline events
      window.addEventListener('online', this.handleOnline.bind(this));
      window.addEventListener('offline', this.handleOffline.bind(this));
      
      // Start periodic sync when online
      if (this.isOnline) {
        this.startPeriodicSync();
      }
    }
  }

  private handleOnline() {
    console.log(' Application is now online');
    this.isOnline = true;
    toast.success('Back online! Syncing data...', { duration: 2000 });
    
    // Start sync process
    this.syncAll();
    this.startPeriodicSync();
  }

  private handleOffline() {
    console.log('📴 Application is now offline');
    this.isOnline = false;
    toast.error('You are now offline. Data will sync when connection is restored.', { duration: 3000 });
    
    // Stop periodic sync
    this.stopPeriodicSync();
  }

  private startPeriodicSync() {
    this.stopPeriodicSync(); // Clear existing interval
    this.syncInterval = setInterval(() => {
      if (this.isOnline && !this.syncInProgress) {
        this.syncAll();
      }
    }, 30000); // Sync every 30 seconds
  }

  private stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  async syncAll(): Promise<SyncResult> {
    if (!this.isOnline || this.syncInProgress) {
      return { success: false, processed: 0, failed: 0, errors: ['Sync already in progress or offline'] };
    }

    this.syncInProgress = true;
    console.log(' Starting sync process...');

    try {
      // Get all pending sync items
      const pendingItems = await db.syncQueue.orderBy('createdAt').toArray();
      
      if (pendingItems.length === 0) {
        console.log(' No items to sync');
        return { success: true, processed: 0, failed: 0, errors: [] };
      }

      console.log(`📦 Found ${pendingItems.length} items to sync`);
      
      let processed = 0;
      let failed = 0;
      const errors: string[] = [];

      for (const item of pendingItems) {
        try {
          const result = await this.processQueueItem(item);
          if (result.success) {
            processed++;
            // Remove from queue
            await db.syncQueue.delete(item.id!);
          } else {
            failed++;
            errors.push(result.error || 'Unknown error');
            // Update attempts count
            await db.syncQueue.update(item.id!, { 
              attempts: item.attempts + 1,
              lastError: result.error 
            });
          }
        } catch (error) {
          failed++;
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          errors.push(errorMsg);
          
          await db.syncQueue.update(item.id!, { 
            attempts: item.attempts + 1,
            lastError: errorMsg 
          });
        }

        // Small delay to prevent overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Clean up failed items with too many attempts
      await this.cleanupFailedItems();

      const result: SyncResult = { success: failed === 0, processed, failed, errors };
      
      if (result.success) {
        console.log(` Sync completed successfully. Processed ${processed} items.`);
        toast.success(`Synced ${processed} items`, { duration: 2000 });
      } else {
        console.log(` Sync completed with errors. Processed: ${processed}, Failed: ${failed}`);
        toast.error(`Sync issues: ${failed} items failed`, { duration: 3000 });
      }

      return result;
    } catch (error) {
      console.error(' Sync failed:', error);
      const errorMsg = error instanceof Error ? error.message : 'Sync failed';
      toast.error(errorMsg);
      
      return { success: false, processed: 0, failed: 1, errors: [errorMsg] };
    } finally {
      this.syncInProgress = false;
    }
  }

  private async processQueueItem(queueItem: SyncQueue): Promise<{ success: boolean; error?: string }> {
    try {
      switch (queueItem.table) {
        case 'items':
          return await this.syncItem(queueItem);
        case 'warehouses':
          return await this.syncWarehouse(queueItem);
        case 'movements':
          return await this.syncMovement(queueItem);
        default:
          return { success: false, error: `Unknown table: ${queueItem.table}` };
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMsg };
    }
  }

  private async syncItem(queueItem: SyncQueue): Promise<{ success: boolean; error?: string }> {
    try {
      switch (queueItem.action) {
        case 'create': {
          const result = await itemsAPI.create(queueItem.data);
          
          // Update local record with server ID and mark as synced
          await db.items.update(queueItem.recordId, {
            id: result.item.id,
            syncStatus: 'synced',
            lastSynced: new Date()
          });
          
          return { success: true };
        }
        
        case 'update': {
          await itemsAPI.update(queueItem.recordId, queueItem.data);
          
          // Mark as synced
          await db.items.update(queueItem.recordId, {
            syncStatus: 'synced',
            lastSynced: new Date()
          });
          
          return { success: true };
        }
        
        case 'delete': {
          await itemsAPI.delete(queueItem.recordId);
          
          // Remove from local database
          await db.items.delete(queueItem.recordId);
          
          return { success: true };
        }
        
        default:
          return { success: false, error: `Unknown action: ${queueItem.action}` };
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMsg };
    }
  }

  private async syncWarehouse(queueItem: SyncQueue): Promise<{ success: boolean; error?: string }> {
    try {
      switch (queueItem.action) {
        case 'create': {
          const result = await warehousesAPI.create(queueItem.data);
          
          await db.warehouses.update(queueItem.recordId, {
            id: result.warehouse.id,
            syncStatus: 'synced',
            lastSynced: new Date()
          });
          
          return { success: true };
        }
        
        case 'update': {
          await warehousesAPI.update(queueItem.recordId, queueItem.data);
          
          await db.warehouses.update(queueItem.recordId, {
            syncStatus: 'synced',
            lastSynced: new Date()
          });
          
          return { success: true };
        }
        
        default:
          return { success: false, error: `Unknown action: ${queueItem.action}` };
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMsg };
    }
  }

  private async syncMovement(queueItem: SyncQueue): Promise<{ success: boolean; error?: string }> {
    // Movements are typically synced through inventory adjustments API
    // This is a placeholder for movement-specific sync logic
    try {
      // Implementation depends on your movement API endpoints
      console.log('Syncing movement:', queueItem);
      return { success: true };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMsg };
    }
  }

  private async cleanupFailedItems() {
    const maxAttempts = 5;
    const failedItems = await db.syncQueue
      .where('attempts')
      .above(maxAttempts)
      .toArray();

    if (failedItems.length > 0) {
      console.log(`🧹 Cleaning up ${failedItems.length} failed sync items`);
      
      for (const item of failedItems) {
        await db.syncQueue.delete(item.id!);
        
        // Mark corresponding records as having sync conflicts
        if (item.table === 'items') {
          await db.items.update(item.recordId, { syncStatus: 'conflict' });
        } else if (item.table === 'warehouses') {
          await db.warehouses.update(item.recordId, { syncStatus: 'conflict' });
        }
      }
    }
  }

  // Method to pull latest data from server (for initial load or refresh)
  async pullFromServer(): Promise<void> {
    if (!this.isOnline) {
      throw new Error('Cannot pull data while offline');
    }

    try {
      console.log('📥 Pulling latest data from server...');

      // Pull items
      const itemsResponse = await itemsAPI.getAll({ limit: 1000 });
      const serverItems = itemsResponse.items;

      for (const serverItem of serverItems) {
        await db.items.put({
          ...serverItem,
          syncStatus: 'synced',
          lastSynced: new Date(),
          createdAt: new Date(serverItem.createdAt),
          updatedAt: new Date(serverItem.updatedAt)
        });
      }

      // Pull warehouses
      const warehousesResponse = await warehousesAPI.getAll();
      const serverWarehouses = warehousesResponse.warehouses;

      for (const serverWarehouse of serverWarehouses) {
        await db.warehouses.put({
          ...serverWarehouse,
          syncStatus: 'synced',
          lastSynced: new Date(),
          createdAt: new Date(serverWarehouse.createdAt),
          updatedAt: new Date(serverWarehouse.updatedAt)
        });
      }

      console.log(`Pulled ${serverItems.length} items and ${serverWarehouses.length} warehouses`);
      toast.success('Data refreshed from server');
    } catch (error) {
      console.error(' Failed to pull data from server:', error);
      toast.error('Failed to refresh data from server');
      throw error;
    }
  }

  // Get sync status information
  async getSyncStatus() {
    const pendingCount = await db.syncQueue.count();
    const conflictItems = await db.items.where('syncStatus').equals('conflict').count();
    const conflictWarehouses = await db.warehouses.where('syncStatus').equals('conflict').count();

    return {
      isOnline: this.isOnline,
      syncInProgress: this.syncInProgress,
      pendingSync: pendingCount,
      conflicts: conflictItems + conflictWarehouses,
      lastSync: await this.getLastSyncTime()
    };
  }

  private async getLastSyncTime(): Promise<Date | null> {
    const lastSyncedItem = await db.items
      .orderBy('lastSynced')
      .reverse()
      .first();
      
    return lastSyncedItem?.lastSynced || null;
  }

  // Force sync (manual trigger)
  async forcSync(): Promise<SyncResult> {
    toast.loading('Syncing data...', { id: 'force-sync' });
    
    try {
      const result = await this.syncAll();
      toast.dismiss('force-sync');
      
      if (result.success) {
        toast.success(`Successfully synced ${result.processed} items`);
      } else {
        toast.error(`Sync completed with ${result.failed} errors`);
      }
      
      return result;
    } catch (error) {
      toast.dismiss('force-sync');
      toast.error('Sync failed');
      throw error;
    }
  }

  // Reset sync state (for debugging or recovery)
  async resetSyncState() {
    await db.syncQueue.clear();
    
    // Reset all items to synced status
    await db.items.toCollection().modify({ syncStatus: 'synced' });
    await db.warehouses.toCollection().modify({ syncStatus: 'synced' });
    
    console.log('🔄 Sync state reset');
    toast.success('Sync state reset');
  }
}

// Export singleton instance
export const syncService = new SyncService();
