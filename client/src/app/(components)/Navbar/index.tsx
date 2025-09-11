"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import {
  Bell,
  Menu,
  Moon,
  Sun,
  Plus,
  UserPlus,
  Building2,
  ShoppingCart,
  FileText,
  Package,
  Receipt,
  Layers,
  RefreshCcw,
  DollarSign,
  Search,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

interface UserData {
  name: string;
  email: string;
  organization: {
    name: string;
    logo: string;
  };
}

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoadingNotif, setIsLoadingNotif] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plusRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (plusRef.current && !plusRef.current.contains(event.target as Node)) {
        setIsPlusOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoadingNotif(true);
      try {
        const response = await fetch("/api/notifications", {
          headers: {
            // Add auth headers if needed, e.g., Authorization: `Bearer ${token}`
          },
        });
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError("Failed to load notifications");
      } finally {
        setIsLoadingNotif(false);
      }
    };
    fetchNotifications();
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoadingUser(true);
      try {
        const response = await fetch("/api/user", {
          headers: {
            // Add auth headers if needed
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchUserData();
  }, []);

  const toggleSidebar = () => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  const toggleDarkMode = () => dispatch(setIsDarkMode(!isDarkMode));

  return (
    <div className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="flex justify-between items-center px-4 py-3 md:px-6">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-transform hover:scale-105"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Search bar */}
          <div className="relative w-48 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="search"
              placeholder="Search items, vendors, sales..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg 
                hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-sm dark:hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-500 dark:focus:border-blue-500
                text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Plus Menu */}
          <div className="relative" ref={plusRef}>
            <button
              onClick={() => setIsPlusOpen(!isPlusOpen)}
              className="p-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg shadow-md 
                transition-transform hover:scale-105"
              aria-label="Create new"
            >
              <Plus className="w-5 h-5" />
            </button>

            {isPlusOpen && (
              <div className="absolute right-0 top-10 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                rounded-xl shadow-lg py-3 max-h-[500px] overflow-y-auto z-50 
                animate-in fade-in slide-in-from-top-2 duration-200">
                {[
                  {
                    title: "Contacts",
                    items: [
                      { icon: <UserPlus size={16} />, label: "New Customer", href: "/customers/new" },
                      { icon: <Building2 size={16} />, label: "New Vendor", href: "/vendors/new" },
                    ],
                  },
                  {
                    title: "Sales",
                    items: [
                      { icon: <ShoppingCart size={16} />, label: "New Sales Order", href: "/sales/order" },
                      { icon: <FileText size={16} />, label: "New Invoice", href: "/sales/invoice" },
                    ],
                  },
                  {
                    title: "Purchases",
                    items: [
                      { icon: <Package size={16} />, label: "New Purchase Order", href: "/purchases/order" },
                      { icon: <Receipt size={16} />, label: "New Bill", href: "/purchases/bill" },
                    ],
                  },
                  {
                    title: "Inventory",
                    items: [
                      { icon: <Layers size={16} />, label: "New Inventory Item", href: "/inventory/new-item" },
                      { icon: <RefreshCcw size={16} />, label: "Adjust Inventory", href: "/inventory/adjust" },
                    ],
                  },
                  {
                    title: "Finance",
                    items: [
                      { icon: <DollarSign size={16} />, label: "New Expense", href: "/expenses/new" },
                    ],
                  },
                ].map((section, i) => (
                  <div key={i}>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {section.title}
                    </p>
                    {section.items.map((it, j) => (
                      <Link
                        key={j}
                        href={it.href}
                        onClick={() => setIsPlusOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 
                          hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150 text-sm font-medium"
                      >
                        {it.icon} {it.label}
                      </Link>
                    ))}
                    {i < 4 && <hr className="my-2 border-gray-200 dark:border-gray-700" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform hover:scale-105"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform hover:scale-105"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-bold 
                  text-white bg-red-500 rounded-full animate-pulse">
                  {notifications.length}
                </span>
              )}
            </button>
            {isNotifOpen && (
              <div className="absolute right-0 top-10 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-xl border 
                border-gray-200 dark:border-gray-700 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 text-sm">
                  Notifications
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {isLoadingNotif ? (
                    <div className="px-4 py-3 text-gray-700 dark:text-gray-300 text-sm flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-600 dark:border-gray-300 border-t-transparent rounded-full animate-spin" />
                      Loading...
                    </div>
                  ) : error ? (
                    <div className="px-4 py-3 text-red-600 dark:text-red-400 text-sm">{error}</div>
                  ) : notifications.length === 0 ? (
                    <div className="px-4 py-3 text-gray-700 dark:text-gray-300 text-sm">No new notifications</div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm 
                          border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors duration-150"
                      >
                        {notif.message}
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {new Date(notif.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                <Link
                  href="/notifications"
                  className="block p-3 text-center text-sm text-gray-700 dark:text-gray-300 
                    hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors duration-150"
                >
                  View all
                </Link>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <div
              className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                transition-transform hover:scale-105"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <Image
                src={userData?.organization.logo || "/default-placeholder.png"}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full border border-gray-200 dark:border-gray-600"
              />
              <span className="hidden md:block font-medium text-gray-700 dark:text-gray-300 text-sm">
                {isLoadingUser ? "Loading..." : userData?.name || "User"}
              </span>
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 top-10 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border 
                border-gray-200 dark:border-gray-700 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* ORG HEADER */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                  <Image
                    src={userData?.organization.logo || "/org-logo.png"}
                    alt="Organization"
                    width={36}
                    height={36}
                    className="rounded-md border border-gray-200 dark:border-gray-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                      {isLoadingUser ? "Loading..." : userData?.organization.name || "Organization"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                      {isLoadingUser ? "Loading..." : userData?.email || "email@example.com"}
                    </p>
                  </div>
                </div>

                {/* PROFILE OPTIONS */}
                <div className="py-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 
                      text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors duration-150"
                  >
                    <User size={16} /> My Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 
                      text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors duration-150"
                  >
                    <Settings size={16} /> Settings
                  </Link>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                {/* ORG MANAGEMENT */}
                <div className="py-2">
                  <Link
                    href="/organization/manage"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 
                      text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors duration-150"
                  >
                    <Building2 size={16} /> Manage Organization
                  </Link>
                  <Link
                    href="/organization/switch"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 
                      text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors duration-150"
                  >
                    <RefreshCcw size={16} /> Switch Organization
                  </Link>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                {/* LOGOUT */}
                <button className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-red-600 dark:text-red-400 
                  hover:bg-red-50 dark:hover:bg-red-900 text-sm font-medium transition-colors duration-150">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;