"use client";

import { useState } from "react";
import { RotateCcw, Plus, TrendingUp, TrendingDown, Calendar } from "lucide-react";

const mockAdjustments = [
  { id: 1, item: "Laptop Dell XPS", sku: "LP-001", type: "increase", quantity: 5, reason: "New stock received", date: "2024-03-15", user: "John Doe" },
  { id: 2, item: "Office Mouse", sku: "OM-123", type: "decrease", quantity: 3, reason: "Damaged items", date: "2024-03-14", user: "Jane Smith" },
  { id: 3, item: "USB Drive 32GB", sku: "USB-32", type: "increase", quantity: 20, reason: "Bulk purchase", date: "2024-03-13", user: "Mike Johnson" },
];

export default function StockAdjustments() {
  const [adjustments, setAdjustments] = useState(mockAdjustments);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Stock Adjustments</h1>
            <p className="text-gray-600">Track inventory level changes</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Adjustment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Adjustments</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adjustments.map((adjustment) => (
                <tr key={adjustment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{adjustment.item}</div>
                      <div className="text-sm text-gray-500">{adjustment.sku}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {adjustment.type === "increase" ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm capitalize ${adjustment.type === "increase" ? "text-green-700" : "text-red-700"}`}>
                        {adjustment.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {adjustment.type === "increase" ? "+" : "-"}{adjustment.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{adjustment.reason}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{adjustment.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{adjustment.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}