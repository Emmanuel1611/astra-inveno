"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ItemsPage = () => {
  const [items] = useState([
    {
      id: 1,
      name: "Product A",
      sku: "SKU001",
      stock: 120,
      price: "$50",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Product B",
      sku: "SKU002",
      stock: 80,
      price: "$30",
      category: "Accessories",
    },
    {
      id: 3,
      name: "Product C",
      sku: "SKU003",
      stock: 45,
      price: "$75",
      category: "Home & Kitchen",
    },
    {
      id: 4,
      name: "Product D",
      sku: "SKU004",
      stock: 10,
      price: "$100",
      category: "Sports",
    },
  ]);

  return (
    <div className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Items</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow">
          <Plus size={18} /> New Item
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg shadow">
          <Search size={18} className="text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search items..."
            className="ml-2 bg-transparent outline-none w-full text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                SKU
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={item.id}
                className={`${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="px-4 py-3">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                <td className="px-4 py-3 text-sm">{item.name}</td>
                <td className="px-4 py-3 text-sm">{item.sku}</td>
                <td className="px-4 py-3 text-sm">{item.category}</td>
                <td className="px-4 py-3 text-sm">{item.stock}</td>
                <td className="px-4 py-3 text-sm">{item.price}</td>
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing 1–{items.length} of {items.length} items
        </p>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
            <ChevronLeft size={18} />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
