"use client";

import Link from "next/link";

export default function PublicNavbar() {
  return (
    <header className="flex items-center justify-between px-6 lg:px-8 py-4 border-b bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
          <img src="/2.png" alt="Astra Logo" className="w-6 h-6" />
        </div>
        <span className="font-bold text-xl text-gray-900">Astra Inventory</span>
      </div>

      <nav className="hidden lg:flex space-x-8 text-sm font-medium text-gray-700">
        <Link href="/features" className="hover:text-blue-600 transition-colors">
          Features
        </Link>
        <Link href="/pricing" className="hover:text-blue-600 transition-colors">
          Pricing
        </Link>
        <Link href="/testimonials" className="hover:text-blue-600 transition-colors">
          Testimonials
        </Link>
        <Link href="/faq" className="hover:text-blue-600 transition-colors">
          FAQ
        </Link>
      </nav>

      <div className="flex items-center space-x-3">
        <Link
          href="/login"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          Start Free Trial
        </Link>
      </div>
    </header>
  );
}