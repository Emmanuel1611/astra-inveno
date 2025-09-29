"use client";

import { useState } from "react";
import { Package, Plus, CheckCircle, Clock, AlertTriangle, Truck } from "lucide-react";

const mockReceiving = [
  { id: "REC-001", poNumber: "PO-001", supplier: "Tech Supplies Inc", items: 5, expected: 5, received: 3, status: "partial", receivedDate: "2024-03-15", expectedDate: "2024-03-20" },
  { id: "REC-002", poNumber: "PO-002", supplier: "Office World", items: 3, expected: 3, received: 3, status: "complete", receivedDate: "2024-03-14", expectedDate: "2024-03-18" },
  { id: "REC-003", poNumber: "PO-003", supplier: "Electronics Hub", items: 8, expected: 8, received: 0, status: "pending", receivedDate: null, expectedDate: "2024-03-16" },
  { id: "REC-004", poNumber: "PO-004", supplier: "Furniture Plus", items: 2, expected: 2, received: 1, status: "damaged", receivedDate: "2024-03-12", expectedDate: "2024-03-25" },
];

export default function GoodsReceiving() {
  const [receiving, setReceiving] = useState(mockReceiving);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "partial": return "bg-blue-100 text-blue-700";
      case "complete": return "bg-green-100 text-green-700";
      case "damaged": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "partial": return <Package className="w-4 h-4" />;
      case "complete": return <CheckCircle className="w-4 h-4" />;
      case "damaged": return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Goods Receiving</h1>
            <p className="text-gray-600">Track incoming shipments</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors">
          <Plus className="w-4 h-4" />
          Record Receipt
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-sm text-gray-600">Partial</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-sm text-gray-600">Issues</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Receiving Records</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {receiving.map((receipt) => (
                <tr key={receipt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{receipt.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{receipt.poNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{receipt.supplier}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{receipt.expected}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{receipt.received}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(receipt.status)}`}>
                      {getStatusIcon(receipt.status)}
                      {receipt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{receipt.expectedDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{receipt.receivedDate || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}