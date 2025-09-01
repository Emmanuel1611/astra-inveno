"use client";

import { Save } from "lucide-react";

export default function NewPriceListPage() {
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Create New Price List</h1>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" className="mt-1 w-full border rounded-lg p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Currency</label>
          <select className="mt-1 w-full border rounded-lg p-2">
            <option>USD</option>
            <option>UGX</option>
            <option>EUR</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select className="mt-1 w-full border rounded-lg p-2">
            <option>Sales</option>
            <option>Purchase</option>
          </select>
        </div>

        <button type="submit" className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <Save className="w-4 h-4" /> Save Price List
        </button>
      </form>
    </div>
  );
}
