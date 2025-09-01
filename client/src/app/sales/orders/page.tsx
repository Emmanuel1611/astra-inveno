"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreVertical, CheckCircle, XCircle } from "lucide-react";

export default function SalesOrdersPage() {
  const [orders] = useState([
    { id: "SO-1001", customer: "Acme Corp", total: 1200, status: "Confirmed", date: "2025-08-10" },
    { id: "SO-1002", customer: "Globex Inc", total: 890, status: "Pending", date: "2025-08-12" },
  ]);

  return (
    <div className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Orders</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
          <Plus size={18} /> New Order
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg shadow">
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="ml-2 bg-transparent outline-none w-full text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={order.id}
                className={`${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                <td className="px-4 py-3 text-sm">{order.customer}</td>
                <td className="px-4 py-3 text-sm">${order.total.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm">
                  {order.status === "Confirmed" ? (
                    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                      <CheckCircle size={16} /> Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                      <XCircle size={16} /> Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">{order.date}</td>
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
