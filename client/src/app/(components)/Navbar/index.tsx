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

  const notifRef = useRef<HTMLDivElement>(null);
  const quickCreateRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const fullName =
    [userData?.firstName, userData?.lastName].filter(Boolean).join(" ") ||
    userData?.email ||
    "User";

  // Close dropdowns
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      notifRef.current && !notifRef.current.contains(event.target as Node) &&
      quickCreateRef.current && !quickCreateRef.current.contains(event.target as Node) &&
      profileRef.current && !profileRef.current.contains(event.target as Node)
    ) {
      setIsNotifOpen(false);
      setIsQuickCreateOpen(false);
      setIsProfileOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

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
          {/* Dropdown panel would go here... */}
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
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <HelpCircle className="h-5 w-5 text-gray-600" />
        </button>


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
                  <button className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-sm">
                    Settings
                  </button>
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
