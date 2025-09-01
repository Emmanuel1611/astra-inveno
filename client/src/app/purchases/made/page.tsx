"use client";

import { useState } from "react";
import { MoreVertical, Search, ChevronLeft, ChevronRight } from "lucide-react";

const PurchaseMadePage = () => {
  const [purchases] = useState([
    { id: 1, vendor: "Vendor A", invoiceNo: "INV-001", date: "2025-08-12", status: "Paid", amount: "$1,200" },
    { id: 2, vendor: "Vendor C", invoiceNo: "INV-002", date: "2025-08-15", status: "Unpaid", amount: "$800" },
  ]);

  return (
    <div className="p-6 min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Purchases Made</h1>
      </div>

      {/* Search */}
      <div className="flex items-center mb-4 w-full md:w-1/3 px-3 py-2 rounded-lg shadow bg-gray-100 dark:bg-gray-800">
        <Search size={18} className="text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Search purchases..."
          className="ml-2 w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border shadow bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Invoice No</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Vendor</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {purchases.map((p, idx) => (
              <tr
                key={p.id}
                className={`${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-3 text-sm">{p.invoiceNo}</td>
                <td className="px-4 py-3 text-sm">{p.vendor}</td>
                <td className="px-4 py-3 text-sm">{p.date}</td>
                <td className="px-4 py-3 text-sm">{p.status}</td>
                <td className="px-4 py-3 text-sm">{p.amount}</td>
                <td className="px-4 py-3 text-right">
                  <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
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
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {purchases.length} purchases</p>
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

export default PurchaseMadePage;
