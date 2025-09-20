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

class IndexedDBManager {
  private db: IDBDatabase | null = null;
  private readonly dbName = 'AstraInventoryDB';
  private readonly version = 1;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB initialized successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Products store
        if (!db.objectStoreNames.contains('products')) {
          const productsStore = db.createObjectStore('products', { keyPath: 'id' });
          productsStore.createIndex('name', 'name', { unique: false });
          productsStore.createIndex('category', 'category', { unique: false });
        }

        // Purchase Orders store
        if (!db.objectStoreNames.contains('purchaseOrders')) {
          const ordersStore = db.createObjectStore('purchaseOrders', { keyPath: 'id' });
          ordersStore.createIndex('productId', 'productId', { unique: false });
          ordersStore.createIndex('status', 'status', { unique: false });
          ordersStore.createIndex('orderDate', 'orderDate', { unique: false });
        }

        // Offline Actions store (for sync when back online)
        if (!db.objectStoreNames.contains('offlineActions')) {
          const actionsStore = db.createObjectStore('offlineActions', { keyPath: 'id' });
          actionsStore.createIndex('synced', 'synced', { unique: false });
          actionsStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Settings/Cache store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
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
