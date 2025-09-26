"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function PublicNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQ", href: "/faq" }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="flex items-center justify-between px-6 lg:px-8 py-4 border-b bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm">
      {/* Logo */}
      <Link href="/landing" className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
          <img src="/2.png" alt="Astra Logo" className="w-6 h-6" />
        </div>
        <span className="font-bold text-xl text-gray-900">Astra Inventory</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-8 text-sm font-medium text-gray-700">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`hover:text-blue-600 transition-colors ${
              isActive(link.href) ? "text-blue-600 font-semibold" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      
      {/* Desktop Auth Buttons */}
      <div className="hidden lg:flex items-center space-x-3">
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

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg lg:hidden">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-gray-700 hover:text-blue-600 transition-colors ${
                  isActive(link.href) ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}