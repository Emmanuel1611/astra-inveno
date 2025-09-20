// IndexedDB utility for offline data management
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  rating?: number;
  category?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrder {
  id: string;
  productId: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  supplier?: string;
  orderDate: string;
  expectedDelivery?: string;
  status: 'pending' | 'received' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OfflineAction {
  id: string;
  type: 'create' | 'update' | 'delete';
  table: 'products' | 'purchaseOrders';
  data: any;
  timestamp: string;
  synced: boolean;
}

export const dbConfig = {
  name: 'inventoryDB',
  version: 1,
  stores: {
    items: {
      keyPath: 'id',
      indexes: [
        { name: 'sku', unique: true },
        { name: 'lastSynced', unique: false }
      ]
    },
    movements: {
      keyPath: 'id',
      indexes: [
        { name: 'syncStatus', unique: false },
        { name: 'createdAt', unique: false }
      ]
    },
    syncQueue: {
      keyPath: 'id',
      indexes: [
        { name: 'status', unique: false },
        { name: 'timestamp', unique: false }
      ]
    }
  }
};

export class IndexedDBManager {
  private db: IDBDatabase | null = null;

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbConfig.name, dbConfig.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.createStores(db);
      };
    });
  }

  private createStores(db: IDBDatabase) {
    Object.entries(dbConfig.stores).forEach(([storeName, config]) => {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: config.keyPath });
        config.indexes.forEach(index => {
          store.createIndex(index.name, index.name, { unique: index.unique });
        });
      }
    });
  }

  private getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    const transaction = this.db.transaction([storeName], mode);
    return transaction.objectStore(storeName);
  }

  // Products operations
  async getProducts(): Promise<Product[]> {
    const store = this.getStore('products');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const store = this.getStore('products');
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async addProduct(product: Product): Promise<void> {
    const store = this.getStore('products', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.add(product);
      request.onsuccess = () => {
        this.addOfflineAction('create', 'products', product);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async updateProduct(product: Product): Promise<void> {
    const store = this.getStore('products', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(product);
      request.onsuccess = () => {
        this.addOfflineAction('update', 'products', product);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteProduct(id: string): Promise<void> {
    const store = this.getStore('products', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => {
        this.addOfflineAction('delete', 'products', { id });
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  // Purchase Orders operations
  async getPurchaseOrders(): Promise<PurchaseOrder[]> {
    const store = this.getStore('purchaseOrders');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getPurchaseOrder(id: string): Promise<PurchaseOrder | undefined> {
    const store = this.getStore('purchaseOrders');
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async addPurchaseOrder(order: PurchaseOrder): Promise<void> {
    const store = this.getStore('purchaseOrders', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.add(order);
      request.onsuccess = () => {
        this.addOfflineAction('create', 'purchaseOrders', order);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async updatePurchaseOrder(order: PurchaseOrder): Promise<void> {
    const store = this.getStore('purchaseOrders', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(order);
      request.onsuccess = () => {
        this.addOfflineAction('update', 'purchaseOrders', order);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deletePurchaseOrder(id: string): Promise<void> {
    const store = this.getStore('purchaseOrders', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => {
        this.addOfflineAction('delete', 'purchaseOrders', { id });
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  // Offline actions for sync
  private async addOfflineAction(type: OfflineAction['type'], table: OfflineAction['table'], data: any): Promise<void> {
    const action: OfflineAction = {
      id: crypto.randomUUID(),
      type,
      table,
      data,
      timestamp: new Date().toISOString(),
      synced: false
    };

    const store = this.getStore('offlineActions', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.add(action);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getUnsyncedActions(): Promise<OfflineAction[]> {
    const store = this.getStore('offlineActions');
    const index = store.index('synced');
    return new Promise((resolve, reject) => {
      const keyRange = IDBKeyRange.only(false);
      const request = index.getAll(keyRange);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async markActionSynced(actionId: string): Promise<void> {
    const store = this.getStore('offlineActions', 'readwrite');
    return new Promise((resolve, reject) => {
      const getRequest = store.get(actionId);
      getRequest.onsuccess = () => {
        const action = getRequest.result;
        if (action) {
          action.synced = true;
          const putRequest = store.put(action);
          putRequest.onsuccess = () => resolve();
          putRequest.onerror = () => reject(putRequest.error);
        } else {
          resolve();
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  // Settings/Cache operations
  async setSetting(key: string, value: any): Promise<void> {
    const store = this.getStore('settings', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put({ key, value, updatedAt: new Date().toISOString() });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getSetting(key: string): Promise<any> {
    const store = this.getStore('settings');
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result?.value);
      request.onerror = () => reject(request.error);
    });
  }

  // Bulk operations for initial sync
  async bulkAddProducts(products: Product[]): Promise<void> {
    const store = this.getStore('products', 'readwrite');
    return new Promise((resolve, reject) => {
      const transaction = store.transaction;
      let completed = 0;
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);

      products.forEach(product => {
        const request = store.put(product);
        request.onsuccess = () => {
          completed++;
        };
      });
    });
  }

  async bulkAddPurchaseOrders(orders: PurchaseOrder[]): Promise<void> {
    const store = this.getStore('purchaseOrders', 'readwrite');
    return new Promise((resolve, reject) => {
      const transaction = store.transaction;
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);

      orders.forEach(order => {
        store.put(order);
      });
    });
  }

  // Clear all data
  async clearAllData(): Promise<void> {
    if (!this.db) return;

    const storeNames = ['products', 'purchaseOrders', 'offlineActions', 'settings'];
    const promises = storeNames.map(storeName => {
      const store = this.getStore(storeName, 'readwrite');
      return new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });

    await Promise.all(promises);
  }
}

// Singleton instance
export const dbManager = new IndexedDBManager();

// Initialize on module load
if (typeof window !== 'undefined') {
  dbManager.init().catch(console.error);
}
