"use client";

import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";

export default function WarehousesPage() {
  const [warehouses] = useState([
    { id: 1, name: "Main Warehouse", location: "Gulu", capacity: "1000" },
    { id: 2, name: "Secondary Warehouse", location: "Mukono", capacity: "500" },
  ]);

  return (
    <div className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Warehouses</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow">
          <Plus size={18} /> New Warehouse
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Capacity</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((wh, idx) => (
              <tr
                key={wh.id}
                className={`${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="px-4 py-3 text-sm">{wh.name}</td>
                <td className="px-4 py-3 text-sm">{wh.location}</td>
                <td className="px-4 py-3 text-sm">{wh.capacity}</td>
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
