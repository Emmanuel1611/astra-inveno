"use client";

import { Save } from "lucide-react";

export default function AssignPriceListPage() {
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Assign Price List</h1>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Price List</label>
          <select className="mt-1 w-full border rounded-lg p-2">
            <option>Retail Pricing</option>
            <option>Wholesale Pricing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Assign To</label>
          <select className="mt-1 w-full border rounded-lg p-2">
            <option>Customer A</option>
            <option>Customer B</option>
          </select>
        </div>

        <button type="submit" className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <Save className="w-4 h-4" /> Assign
        </button>
      </form>
    </div>
  );
}
