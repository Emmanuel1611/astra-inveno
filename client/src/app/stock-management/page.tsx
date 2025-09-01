"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  History,
  Layers,
  ArrowLeftRight,
} from "lucide-react";
import { useTheme } from "next-themes";

const StockManagementPage = () => {
  const { theme } = useTheme(); // detects "dark" or "light"

  const [stockItems] = useState([
    { id: 1, name: "Laptop Pro X", sku: "ELEC001", warehouse: "Main Warehouse", qty: 120, reorder: 20 },
    { id: 2, name: "Office Chair", sku: "FURN002", warehouse: "Branch A", qty: 45, reorder: 10 },
    { id: 3, name: "Kitchen Mixer", sku: "HOME003", warehouse: "Main Warehouse", qty: 15, reorder: 5 },
    { id: 4, name: "Sports Shoes", sku: "SPRT004", warehouse: "Branch B", qty: 200, reorder: 30 },
  ]);

  const [selected, setSelected] = useState<any | null>(null);

  // choose styles based on theme
  const isDark = theme === "dark";
  const containerClasses = isDark
    ? "bg-gray-900 text-gray-100"
    : "bg-white text-gray-900";

  const cardClasses = isDark
    ? "bg-gray-800 text-gray-100"
    : "bg-gray-100 text-gray-900";

  const hoverClasses = isDark
    ? "hover:bg-gray-700"
    : "hover:bg-gray-200";

  return (
    <div className={`p-6 min-h-screen ${containerClasses}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stock Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow">
          <Plus size={18} /> Adjust Stock
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`flex items-center w-full md:w-1/3 px-3 py-2 rounded-lg shadow ${cardClasses}`}
        >
          <Search size={18} className="opacity-60" />
          <input
            type="text"
            placeholder="Search stock..."
            className="ml-2 bg-transparent outline-none w-full placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className={`overflow-x-auto rounded-lg border shadow ${cardClasses}`}>
        <table className="w-full border-collapse">
          <thead className={cardClasses}>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Item</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">SKU</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Warehouse</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Qty Available</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Reorder Level</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item, idx) => (
              <tr
                key={item.id}
                className={`${idx % 2 === 0 ? containerClasses : cardClasses} ${hoverClasses}`}
              >
                <td className="px-4 py-3 text-sm">{item.name}</td>
                <td className="px-4 py-3 text-sm">{item.sku}</td>
                <td className="px-4 py-3 text-sm">{item.warehouse}</td>
                <td className="px-4 py-3 text-sm">{item.qty}</td>
                <td
                  className={`px-4 py-3 text-sm ${
                    item.qty <= item.reorder
                      ? "text-red-500 font-semibold"
                      : "text-green-500"
                  }`}
                >
                  {item.reorder}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setSelected(item)}
                    className={`p-2 rounded-full ${hoverClasses}`}
                  >
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm opacity-70">
          Showing 1–{stockItems.length} of {stockItems.length} items
        </p>
        <div className="flex gap-2">
          <button className={`p-2 rounded-lg ${cardClasses} ${hoverClasses}`}>
            <ChevronLeft size={18} />
          </button>
          <button className={`p-2 rounded-lg ${cardClasses} ${hoverClasses}`}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slide-over Detail Panel */}
      {selected && (
        <div className="fixed inset-0 flex justify-end z-50">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSelected(null)}
          />
          <div
            className={`relative w-full md:w-1/3 p-6 shadow-xl ${containerClasses}`}
          >
            <h2 className="text-xl font-semibold mb-4">
              {selected.name} ({selected.sku})
            </h2>
            <p><span className="font-semibold">Warehouse:</span> {selected.warehouse}</p>
            <p><span className="font-semibold">Quantity:</span> {selected.qty}</p>
            <p><span className="font-semibold">Reorder Level:</span> {selected.reorder}</p>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white">
                <ArrowLeftRight size={18} /> Transfer Stock
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white">
                <Layers size={18} /> Adjust Stock
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${cardClasses} ${hoverClasses}`}
              >
                <History size={18} /> View History
              </button>
            </div>

            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockManagementPage;
