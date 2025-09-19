"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical } from "lucide-react";

export default function PriceListsPage() {
  const [priceLists] = useState([
    { id: 1, name: "Retail Prices", items: 120, currency: "USD" },
    { id: 2, name: "Wholesale Prices", items: 80, currency: "USD" },
  ]);

  return (
    <div className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Price Lists</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow">
          <Plus size={18} /> New Price List
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg shadow">
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search price lists..."
            className="ml-2 bg-transparent outline-none w-full text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Items</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Currency</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {priceLists.map((list, idx) => (
              <tr
                key={list.id}
                className={`${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="px-4 py-3 text-sm">{list.name}</td>
                <td className="px-4 py-3 text-sm">{list.items}</td>
                <td className="px-4 py-3 text-sm">{list.currency}</td>
                <td className="px-4 py-3 text-right">
                  <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
