"use client";

import React, { useState } from "react";
import { Inbox, Search, Filter, Star, Archive, Trash2, MoreHorizontal, CheckCircle, AlertTriangle, Info, Clock } from "lucide-react";

const mockMessages = [
  {
    id: 1,
    type: "alert",
    priority: "high",
    title: "Low Stock Alert",
    message: "Wireless Headphones (SKU: WH-001) is running low. Current stock: 8 units",
    timestamp: "2024-03-15 10:30 AM",
    read: false,
    starred: true,
    category: "inventory"
  },
  {
    id: 2,
    type: "notification",
    priority: "medium",
    title: "New Order Received",
    message: "Order #ORD-125 has been placed by John Smith for $299.99",
    timestamp: "2024-03-15 09:45 AM",
    read: false,
    starred: false,
    category: "sales"
  },
  {
    id: 3,
    type: "info",
    priority: "low",
    title: "Monthly Report Ready",
    message: "Your March inventory report is now available for download",
    timestamp: "2024-03-15 08:15 AM",
    read: true,
    starred: false,
    category: "reports"
  },
  {
    id: 4,
    type: "alert",
    priority: "critical",
    title: "Payment Overdue",
    message: "Invoice #INV-789 from ABC Supplies is 15 days overdue ($1,250.00)",
    timestamp: "2024-03-14 04:20 PM",
    read: false,
    starred: true,
    category: "finance"
  },
  {
    id: 5,
    type: "notification",
    priority: "medium",
    title: "Shipment Delivered",
    message: "Purchase Order #PO-456 has been delivered to Main Warehouse",
    timestamp: "2024-03-14 02:30 PM",
    read: true,
    starred: false,
    category: "procurement"
  },
  {
    id: 6,
    type: "info",
    priority: "low",
    title: "System Update",
    message: "Inventory Management System will undergo maintenance on March 20th",
    timestamp: "2024-03-14 11:00 AM",
    read: false,
    starred: false,
    category: "system"
  }
];

export default function InboxPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert": return <AlertTriangle className="w-4 h-4" />;
      case "notification": return <CheckCircle className="w-4 h-4" />;
      case "info": return <Info className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string, priority: string) => {
    if (priority === "critical") return "text-red-600";
    switch (type) {
      case "alert": return priority === "high" ? "text-orange-600" : "text-yellow-600";
      case "notification": return "text-blue-600";
      case "info": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      critical: "bg-red-100 text-red-700 border-red-200",
      high: "bg-orange-100 text-orange-700 border-orange-200",
      medium: "bg-blue-100 text-blue-700 border-blue-200",
      low: "bg-gray-100 text-gray-700 border-gray-200"
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "unread" && !message.read) ||
                         (selectedFilter === "starred" && message.starred) ||
                         message.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const toggleMessageSelection = (messageId: number) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const markAsRead = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const toggleStar = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  const unreadCount = messages.filter(msg => !msg.read).length;
  const starredCount = messages.filter(msg => msg.starred).length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <Inbox className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
            <p className="text-gray-600">Stay updated with notifications and alerts</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {unreadCount} unread messages
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Inbox className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{messages.length}</div>
              <div className="text-sm text-gray-600">Total Messages</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{unreadCount}</div>
              <div className="text-sm text-gray-600">Unread</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{starredCount}</div>
              <div className="text-sm text-gray-600">Starred</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {messages.filter(m => m.priority === "critical" || m.priority === "high").length}
              </div>
              <div className="text-sm text-gray-600">Priority</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
            <div className="space-y-2">
              {[
                { key: "all", label: "All Messages", count: messages.length },
                { key: "unread", label: "Unread", count: unreadCount },
                { key: "starred", label: "Starred", count: starredCount },
                { key: "inventory", label: "Inventory", count: messages.filter(m => m.category === "inventory").length },
                { key: "sales", label: "Sales", count: messages.filter(m => m.category === "sales").length },
                { key: "procurement", label: "Procurement", count: messages.filter(m => m.category === "procurement").length },
                { key: "finance", label: "Finance", count: messages.filter(m => m.category === "finance").length },
                { key: "system", label: "System", count: messages.filter(m => m.category === "system").length },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    selectedFilter === filter.key
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm">{filter.label}</span>
                  <span className="text-xs text-gray-500">{filter.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="lg:col-span-3">
          {/* Search and Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !message.read ? 'bg-blue-50/30 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedMessages.includes(message.id)}
                        onChange={() => toggleMessageSelection(message.id)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <div className={`${getTypeColor(message.type, message.priority)}`}>
                        {getTypeIcon(message.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className={`font-medium ${!message.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.title}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityBadge(message.priority)}`}>
                          {message.priority}
                        </span>
                        {message.starred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      
                      <p className={`text-sm mb-2 ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                        {message.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                          {message.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleStar(message.id)}
                        className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                      >
                        <Star className={`w-4 h-4 ${message.starred ? 'fill-current text-yellow-500' : ''}`} />
                      </button>
                      
                      {!message.read && (
                        <button
                          onClick={() => markAsRead(message.id)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <Inbox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}