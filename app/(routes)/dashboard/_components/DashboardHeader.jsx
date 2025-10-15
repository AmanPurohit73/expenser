import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-slate-700 placeholder-gray-400 shadow-sm hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* User */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-3.6-3.6a1 1 0 01-.4-.8V8a4 4 0 10-8 0v4.6a1 1 0 01-.4.8L4 17h5m6 0v1a3 3 0 11-6 0v-1"
              />
            </svg>
            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></div>
          </button>

          <div className="p-1 rounded-full bg-gradient-to-r from-indigo-500 to-teal-500 shadow-sm">
            <div className="bg-white rounded-full p-0.5">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 rounded-full ring-2 ring-indigo-200 hover:ring-indigo-400 transition-all",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
