"use client";

import React, { useState } from "react";
import { ShoppingCart, Search, Filter, Eye, Edit2, Download, Calendar, DollarSign, Package, Users } from "lucide-react";

const mockSales = [
  {
    id: "ORD-001",
    customer: "John Smith",
    customerEmail: "john@example.com",
    items: 3,
    total: 245.97,
    status: "completed",
    paymentStatus: "paid",
    date: "2024-03-15",
    time: "10:30 AM",
    products: ["Wireless Headphones", "USB Cable", "Notebook"]
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    items: 1,
    total: 299.99,
    status: "processing",
    paymentStatus: "paid",
    date: "2024-03-15",
    time: "09:45 AM",
    products: ["Office Chair"]
  },
  {
    id: "ORD-003",
    customer: "Mike Wilson",
    customerEmail: "mike@example.com",
    items: 5,
    total: 127.45,
    status: "shipped",
    paymentStatus: "paid",
    date: "2024-03-14",
    time: "03:20 PM",
    products: ["USB Cable", "Notebook", "Desk Lamp"]
  },
  {
    id: "ORD-004",
    customer: "Emma Davis",
    customerEmail: "emma@example.com",
    items: 2,
    total: 125.98,
    status: "pending",
    paymentStatus: "pending",
    date: "2024-03-14",
    time: "11:15 AM",
    products: ["Wireless Headphones", "Wireless Mouse"]
  },
  {
    id: "ORD-005",
    customer: "Alex Brown",
    customerEmail: "alex@example.com",
    items: 4,
    total: 183.96,
    status: "cancelled",
    paymentStatus: "refunded",
    date: "2024-03-13",
    time: "02:45 PM",
    products: ["Office Chair", "Desk Lamp"]
  },
  {
    id: "ORD-006",
    customer: "Lisa Garcia",
    customerEmail: "lisa@example.com",
    items: 6,
    total: 298.74,
    status: "delivered",
    paymentStatus: "paid",
    date: "2024-03-13",
    time: "08:30 AM",
    products: ["Wireless Headphones", "USB Cable", "Notebook", "Desk Lamp"]
  }
];

export default function AllSales() {
  const [sales, setSales] = useState(mockSales);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const statuses = ["all", "pending", "processing", "shipped", "delivered", "completed", "cancelled"];
  const paymentStatuses = ["all", "pending", "paid", "refunded"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "delivered": return "bg-green-100 text-green-700";
      case "processing":
      case "shipped": return "bg-blue-100 text-blue-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "refunded": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sale.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sale.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || sale.status === selectedStatus;
    const matchesPaymentStatus = selectedPaymentStatus === "all" || sale.paymentStatus === selectedPaymentStatus;
    
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const totalRevenue = sales.filter(s => s.paymentStatus === "paid").reduce((sum, sale) => sum + sale.total, 0);
  const totalOrders = sales.length;
  const completedOrders = sales.filter(s => s.status === "completed" || s.status === "delivered").length;
  const pendingOrders = sales.filter(s => s.status === "pending" || s.status === "processing").length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Sales</h1>
            <p className="text-gray-600">Manage and track all sales orders</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{completedOrders}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{pendingOrders}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by order ID, customer name, or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {paymentStatuses.map(status => (
                <option key={status} value={status}>
                  {status === "all" ? "All Payment Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{sale.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{sale.customer}</div>
                    <div className="text-sm text-gray-500">{sale.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{sale.items} items</div>
                    <div className="text-xs text-gray-500 max-w-40 truncate">
                      {sale.products.join(", ")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">${sale.total.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(sale.paymentStatus)}`}>
                      {sale.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{sale.date}</div>
                    <div className="text-xs text-gray-500">{sale.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredSales.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sales found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}