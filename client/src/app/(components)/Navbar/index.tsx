"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Plus,
  HelpCircle,
  ChevronDown,
  LogOut,
  Menu,
  ChevronsRight,
  Package,
  ShoppingCart,
  FileText,
  Users,
  Truck,
  BarChart3,
  Settings,
  Archive,
  RefreshCw,
  FileCheck,
  Book,
  MessageCircle,
  Video,
  ExternalLink,
  Phone,
  Mail,
  Lightbulb,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useUser } from "@/app/hooks/useUser";
import { useNotifications } from "@/app/hooks/useNotifications";
import { useSearch } from "@/app/hooks/useSearch";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const sidebarWidth = isSidebarCollapsed ? 60 : 240;

  const { userData } = useUser();
  const { notifications, markAsRead } = useNotifications();
  const { searchResults, searchQuery, setSearchQuery } = useSearch();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpSearchQuery, setHelpSearchQuery] = useState("");

  const notifRef = useRef<HTMLDivElement>(null);
  const quickCreateRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const fullName =
    [userData?.firstName, userData?.lastName].filter(Boolean).join(" ") ||
    userData?.email ||
    "User";

  // Close dropdowns
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      notifRef.current &&
      !notifRef.current.contains(event.target as Node) &&
      quickCreateRef.current &&
      !quickCreateRef.current.contains(event.target as Node) &&
      profileRef.current &&
      !profileRef.current.contains(event.target as Node) &&
      helpRef.current &&
      !helpRef.current.contains(event.target as Node)
    ) {
      setIsNotifOpen(false);
      setIsQuickCreateOpen(false);
      setIsProfileOpen(false);
      setIsHelpOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const quickCreateItems = [
    // Items Section
    {
      category: "Items",
      items: [
        { name: "Item", icon: Package, description: "Create inventory items" },
        {
          name: "Composite Item",
          icon: Archive,
          description: "Bundle multiple items",
        },
        { name: "Item Group", icon: BarChart3, description: "Group related items" },
      ],
    },
    // Sales Section
    {
      category: "Sales",
      items: [
        { name: "Sales Order", icon: ShoppingCart, description: "Create sales orders" },
        { name: "Invoice", icon: FileText, description: "Generate invoices" },
        { name: "Package", icon: Package, description: "Create packages" },
        { name: "Shipment", icon: Truck, description: "Create shipments" },
        {
          name: "Delivery Challan",
          icon: FileCheck,
          description: "Create delivery challans",
        },
        { name: "Sales Return", icon: RefreshCw, description: "Process returns" },
      ],
    },
    // Purchases Section
    {
      category: "Purchases",
      items: [
        { name: "Purchase Order", icon: ShoppingCart, description: "Create purchase orders" },
        { name: "Bill", icon: FileText, description: "Record bills" },
        { name: "Purchase Receive", icon: Package, description: "Receive purchases" },
        { name: "Purchase Return", icon: RefreshCw, description: "Return purchases" },
      ],
    },
    // Inventory Section
    {
      category: "Inventory",
      items: [
        { name: "Inventory Adjustment", icon: Settings, description: "Adjust stock levels" },
        {
          name: "Transfer Order",
          icon: RefreshCw,
          description: "Transfer between warehouses",
        },
      ],
    },
    // Contacts Section
    {
      category: "Contacts",
      items: [
        { name: "Customer", icon: Users, description: "Add new customers" },
        { name: "Vendor", icon: Users, description: "Add new vendors" },
      ],
    },
  ];

  type HelpSectionItem = {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    action: string;
    badge?: string;
    status?: string;
  };

  type HelpSection = {
    title: string;
    items: HelpSectionItem[];
  };

  const helpSections: HelpSection[] = [
    {
      title: "Getting Started",
      items: [
        {
          icon: Book,
          title: "User Guide",
          description: "Complete guide to get started",
          action: "guide",
          badge: "Popular",
        },
        {
          icon: Video,
          title: "Video Tutorials",
          description: "Step-by-step video guides",
          action: "videos",
        },
        {
          icon: Lightbulb,
          title: "Quick Tips",
          description: "Pro tips and shortcuts",
          action: "tips",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: MessageCircle,
          title: "Live Chat",
          description: "Chat with our support team",
          action: "chat",
          status: "Online",
        },
        {
          icon: Mail,
          title: "Email Support",
          description: "Send us your questions",
          action: "email",
        },
        {
          icon: Phone,
          title: "Phone Support",
          description: "Call our support line",
          action: "phone",
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          icon: FileText,
          title: "Knowledge Base",
          description: "Search our help articles",
          action: "kb",
        },
        {
          icon: Users,
          title: "Community Forum",
          description: "Connect with other users",
          action: "forum",
        },
        {
          icon: ExternalLink,
          title: "API Documentation",
          description: "Developer resources",
          action: "api",
        },
      ],
    },
  ];

  const quickActions = [
    "How to create an item?",
    "Setting up inventory tracking",
    "Managing sales orders",
    "Generating reports",
  ];

  const handleItemClick = (itemName: string) => {
    console.log(`Creating new ${itemName}`);
    setIsQuickCreateOpen(false);
    // Here you would typically navigate to the create form or open a modal
  };

  const handleHelpItemClick = (action: string, title: string) => {
    console.log(`Help action: ${action} - ${title}`);

    // Handle different actions
    switch (action) {
      case "chat":
        // Open chat widget
        window.open("/support/chat", "_blank");
        break;
      case "guide":
        window.open("/help/user-guide", "_blank");
        break;
      case "videos":
        window.open("/help/tutorials", "_blank");
        break;
      case "kb":
        window.open("/help/knowledge-base", "_blank");
        break;
      case "forum":
        window.open("/community", "_blank");
        break;
      case "email":
        window.location.href = "mailto:support@yourcompany.com";
        break;
      case "phone":
        window.location.href = "tel:+1-800-123-4567";
        break;
      default:
        // Handle other actions
        break;
    }

    setIsHelpOpen(false);
  };

  const handleQuickActionClick = (question: string) => {
    console.log(`Quick search: ${question}`);
    setHelpSearchQuery(question);
    // You could trigger a search or navigate to relevant help article
  };

  return (
    <nav
      className="fixed top-0 right-0 z-50 h-[50px] bg-white border-b border-gray-200 flex items-center justify-between px-4 transition-all duration-300"
      style={{ left: sidebarWidth }}
    >
      {/* Left: Sidebar toggle + Search */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          {isSidebarCollapsed ? (
            <Menu className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronsRight className="h-5 w-5 text-gray-600" />
          )}
        </button>

        {/* Search */}
        <div className="relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-[220px] group-hover:w-[300px] focus:w-[300px]
               px-3 py-1 pl-8 text-sm border border-gray-300 rounded-md 
               bg-white text-gray-700
               transition-all duration-300 ease-in-out
               group-hover:border-blue-400 group-hover:bg-gray-50
               focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400 pointer-events-none" />
          <AnimatePresence>
            {searchQuery.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-sm z-50 text-sm"
              >
                {searchResults.length > 0 ? (
                  <ul className="py-1 max-h-64 overflow-y-auto">
                    {searchResults.map((result) => (
                      <li
                        key={result.id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {result.name || result.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-3 py-2 text-gray-500">No results</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Quick Create */}
        <div className="relative" ref={quickCreateRef}>
          <button
            onClick={() => setIsQuickCreateOpen(!isQuickCreateOpen)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <Plus className="h-5 w-5 text-gray-600" />
          </button>

          {/* New Quick Create Dropdown */}
          <AnimatePresence>
            {isQuickCreateOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                    Create New
                  </h3>

                  {quickCreateItems.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                        {category.category}
                      </h4>
                      <div className="space-y-1">
                        {category.items.map((item, itemIndex) => {
                          const IconComponent = item.icon;
                          return (
                            <button
                              key={itemIndex}
                              onClick={() => handleItemClick(item.name)}
                              className="w-full flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors duration-150 text-left group"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-150">
                                <IconComponent className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {item.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 hover:bg-gray-100 rounded-md relative"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute right-0 mt-2 w-[320px] bg-white border border-gray-200 rounded-md shadow-lg z-50 text-sm"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-800">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={() =>
                        notifications.forEach((n) => n.id && markAsRead(n.id.toString()))
                      }
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* List */}
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => notif.id && markAsRead(notif.id.toString())}
                        className={`px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${notif.read ? "text-gray-600" : "bg-blue-50 font-medium"
                          }`}
                      >
                        <div className="text-sm">{notif.title}</div>
                        {notif.message && (
                          <div className="text-xs text-gray-500">{notif.message}</div>
                        )}
                        {notif.timestamp && (
                          <div className="text-[11px] text-gray-400 mt-1">
                            {new Date(notif.timestamp).toLocaleString()}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500 text-sm text-center">
                      No notifications
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-gray-200 text-center">
                  <button className="text-xs font-medium text-blue-600 hover:underline">
                    View All
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Help */}
        <div className="relative" ref={helpRef}>
          <button
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className="p-2 hover:bg-blue-50 rounded-md transition-colors duration-200 relative group"
            title="Help & Support"
          >
            <HelpCircle className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
          </button>

          <AnimatePresence>
            {isHelpOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Help & Support
                    </h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-gray-500">Support Online</span>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search help articles..."
                      value={helpSearchQuery}
                      onChange={(e) => setHelpSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-b border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Quick Actions
                  </h4>
                  <div className="space-y-1">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickActionClick(action)}
                        className="w-full text-left text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-colors duration-150"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Help Sections */}
                <div className="max-h-80 overflow-y-auto">
                  {helpSections.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className="p-4 border-b border-gray-50 last:border-b-0"
                    >
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        {section.title}
                      </h4>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => {
                          const IconComponent = item.icon;
                          return (
                            <button
                              key={itemIndex}
                              onClick={() => handleHelpItemClick(item.action, item.title)}
                              className="w-full flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150 text-left group"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-150">
                                <IconComponent className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                                    {item.title}
                                  </p>
                                  {item.badge && (
                                    <span className="px-2 py-0.5 text-xs bg-orange-100 text-orange-700 rounded-full">
                                      {item.badge}
                                    </span>
                                  )}
                                  {item.status && (
                                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                                      {item.status}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                              <ExternalLink className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 rounded-b-lg">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Star className="h-3 w-3 fill-current text-yellow-400" />
                      <span>Rate your experience</span>
                    </div>
                    <span>Version 2.4.1</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-1 p-1 hover:bg-gray-100 rounded-md"
          >
            <img
              src={userData?.avatar || "/default-avatar.png"}
              alt={fullName}
              className="h-7 w-7 rounded-full"
            />
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute right-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-md shadow-lg z-50 text-sm"
              >
                {/* User Info */}
                <div className="flex items-center px-4 py-3 border-b border-gray-200">
                  <img
                    src={userData?.avatar || "/default-avatar.png"}
                    alt={fullName}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">{fullName}</div>
                    <div className="text-xs text-gray-500">{userData?.email}</div>
                  </div>
                </div>

                {/* Organization Info */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="text-sm font-medium text-gray-700">
                    {userData?.organization?.name || "Organization Name"}
                  </div>
                  <div className="text-xs text-gray-500">
                    Signed in as{" "}
                    <span className="font-semibold text-gray-700">
                      {userData?.role || "User"}
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-sm">
                    My Account
                  </button>
                    <button className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-sm">
                      Subscriptions
                    </button>
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <button
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md 
               bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-sm 
               transition-colors duration-150"
                      >
                        <span>Manage Subscription</span>
                        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                          Pro
                        </span>
                      </button>
                      <p className="mt-2 text-xs text-gray-500">
                        Renews on <span className="font-medium">Oct 25, 2025</span>
                      </p>
                    </div>

                </div>

                {/* Sign Out */}
                <div className="border-t border-gray-200 py-1">
                  <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-50 text-sm">
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
