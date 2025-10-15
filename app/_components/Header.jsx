"use client";

import { Button } from "../../components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Budgets", href: "/dashboard/budgets" },
    { name: "Expenses", href: "/dashboard/expenses" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-md border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/logo.svg"
              alt="Finance Tracker"
              width={140}
              height={40}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-slate-700 hover:text-indigo-600 font-medium transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 ring-2 ring-indigo-200 hover:ring-indigo-400 transition-all duration-300 rounded-full",
                  },
                }}
              />
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    className="text-slate-700 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-medium shadow-sm hover:shadow-md transition-all">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-5 py-6 space-y-4 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-slate-700 hover:text-indigo-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {!isSignedIn && (
            <div className="pt-4 space-y-3 border-t border-gray-200">
              <Link href="/sign-in" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-700 hover:text-indigo-600"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up" className="block">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
