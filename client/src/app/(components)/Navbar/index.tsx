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

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  const toggleSidebar = () => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  const toggleDarkMode = () => dispatch(setIsDarkMode(!isDarkMode));

  return (
    <div className="sticky top-0 z-50 w-full bg-white/0 backdrop-blur-md shadow-sm rounded-b-2xl boarder">
      <div className="flex justify-between items-center px-6 py-2">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition"
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search bar */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="search"
              placeholder="Search items, vendors, sales..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 bg-white rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">
          {/* Plus Menu */}
          <div className="relative" ref={plusRef}>
            <button
              onClick={() => setIsPlusOpen(!isPlusOpen)}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md"
            >
              <Plus className="w-5 h-5" />
            </button>

            {isPlusOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 
                rounded-xl shadow-xl py-2 max-h-[500px] overflow-y-auto z-50">
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
                    <p className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase">
                      {section.title}
                    </p>
                    {section.items.map((it, j) => (
                      <Link
                        key={j}
                        href={it.href}
                        onClick={() => setIsPlusOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        {it.icon} + {it.label}
                      </Link>
                    ))}
                    {i < 4 && <hr className="my-2 border-gray-200" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Sun className="cursor-pointer text-gray-500" size={22} />
            ) : (
              <Moon className="cursor-pointer text-gray-500" size={22} />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button onClick={() => setIsNotifOpen(!isNotifOpen)}>
              <Bell className="cursor-pointer text-gray-500" size={22} />
              <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                3
              </span>
            </button>
            {isNotifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white shadow-xl rounded-xl border border-gray-200 z-50">
                <div className="p-4 border-b font-semibold">Notifications</div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-2 hover:bg-gray-50">
                    New sales order #123 created.
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-50">
                    Vendor invoice approved.
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-50">
                    Low stock alert: Item "Widget A".
                  </div>
                </div>
                <div className="p-2 text-center text-sm text-blue-600 hover:underline cursor-pointer">
                  View all
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <Image
                src="/default-placeholder.png"
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="hidden md:block font-semibold">Emmanuel M</span>
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border z-50">
                {/* ORG HEADER */}
                <div className="flex items-center gap-3 px-4 py-3 border-b">
                  <Image
                    src="/org-logo.png"
                    alt="Organization"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Astra Enterprises</p>
                    <p className="text-xs text-gray-500">emmanuel@astra.com</p>
                  </div>
                </div>

                {/* PROFILE OPTIONS */}
                <div className="py-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                  >
                    <User size={16} /> My Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                  >
                    <Settings size={16} /> Settings
                  </Link>
                </div>

                <hr />

                {/* ORG MANAGEMENT */}
                <div className="py-2">
                  <Link
                    href="/organization/manage"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                  >
                    <Building2 size={16} /> Manage Organization
                  </Link>
                  <Link
                    href="/organization/switch"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                  >
                    <RefreshCcw size={16} /> Switch Organization
                  </Link>
                </div>

                <hr />

                {/* LOGOUT */}
                <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
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
