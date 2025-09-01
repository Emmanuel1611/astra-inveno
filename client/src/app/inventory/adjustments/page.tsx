"use client";

import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";

export default function AdjustmentsPage() {
  const [adjustments] = useState([
    { id: 1, item: "Product A", type: "Addition", qty: 20, date: "2025-08-01" },
    { id: 2, item: "Product B", type: "Deduction", qty: 5, date: "2025-08-10" },
  ]);

  return (
    <div className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stock Adjustments</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow">
          <Plus size={18} /> New Adjustment
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Item</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {adjustments.map((adj, idx) => (
              <tr
                key={adj.id}
                className={`${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="px-4 py-3 text-sm">{adj.item}</td>
                <td className="px-4 py-3 text-sm">{adj.type}</td>
                <td className="px-4 py-3 text-sm">{adj.qty}</td>
                <td className="px-4 py-3 text-sm">{adj.date}</td>
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
