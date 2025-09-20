"use client";

import { Save } from "lucide-react";
import { use } from "react";

export default function EditInventoryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Item #{id}</h1>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input type="text" className="mt-1 w-full border rounded-lg p-2" defaultValue="Sample Item" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SKU</label>
          <input type="text" className="mt-1 w-full border rounded-lg p-2" defaultValue="SKU1234" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" className="mt-1 w-full border rounded-lg p-2" defaultValue="99.99" />
        </div>

        <button type="submit" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Save className="w-4 h-4" /> Update Item
        </button>
      </form>
    </div>
  );
}
