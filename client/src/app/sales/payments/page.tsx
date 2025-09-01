"use client";

import React from "react";
import { useState } from "react";
import { Plus, Search, Filter, MoreVertical } from "lucide-react";

export default function PaymentsPage() {
  const [payments] = useState([
    { id: "PAY-3001", customer: "Acme Corp", method: "Bank Transfer", amount: 1200, date: "2025-08-15" },
    { id: "PAY-3002", customer: "Globex Inc", method: "Credit Card", amount: 890, date: "2025-08-20" },
  ]);

  return (
    <div className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments Received</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
          <Plus size={18} /> Record Payment
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg shadow">
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search payments..."
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
              <th className="px-4 py-3 text-left text-sm font-semibold">Payment ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Method</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, idx) => (
              <tr
                key={pay.id}
                className={`${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="px-4 py-3 text-sm font-medium">{pay.id}</td>
                <td className="px-4 py-3 text-sm">{pay.customer}</td>
                <td className="px-4 py-3 text-sm">{pay.method}</td>
                <td className="px-4 py-3 text-sm">${pay.amount.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm">{pay.date}</td>
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
