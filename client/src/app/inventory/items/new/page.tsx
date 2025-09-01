"use client";

import { Package, Save } from "lucide-react";

const CreateItemPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Package className="w-6 h-6 text-blue-600" />
        Add New Item
      </h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Item Name"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="SKU"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          <Save className="w-4 h-4" />
          Save Item
        </button>
      </form>
    </div>
  );
};

export default CreateItemPage;
