"use client";

import {
  LayoutDashboard,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
  const path = usePathname();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
    { name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses" },
  ];

  return (
    <aside className="h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white border-r border-gray-200/60 shadow-lg p-5 flex flex-col relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-100/40 to-transparent blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-teal-100/30 rounded-full blur-3xl"></div>

      {/* Logo */}
      <Link href="/" className="mb-12 flex justify-center relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={130}
            height={35}
            className="cursor-pointer"
          />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="space-y-2 relative z-10 flex-1">
        {menu.map((item, i) => {
          const active = path === item.path;
          const isUpgrade = item.name === "Upgrade";

          return (
            <Link
              key={i}
              href={item.path}
              className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
                active
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-200"
                  : isUpgrade
                  ? "bg-gradient-to-r from-teal-50 to-indigo-50 text-indigo-700 border border-indigo-200 hover:shadow-md"
                  : "text-slate-600 hover:text-indigo-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50/50"
              }`}
            >
              {/* Animated Background on Hover */}
              {!active && !isUpgrade && (
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-100/0 via-indigo-100/50 to-indigo-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              )}

              {/* Icon with Background */}
              <div
                className={`relative z-10 flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  active
                    ? "bg-white/20"
                    : isUpgrade
                    ? "bg-indigo-100"
                    : "bg-gray-100 group-hover:bg-indigo-100"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-all duration-300 ${
                    active
                      ? "text-white"
                      : isUpgrade
                      ? "text-indigo-600"
                      : "text-slate-600 group-hover:text-indigo-600"
                  }`}
                />
              </div>

              {/* Text */}
              <span className="relative z-10">{item.name}</span>

              {/* Active Indicator */}
              {active && (
                <span className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideNav;
