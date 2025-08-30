// import { UserButton } from '@clerk/nextjs'
// import React from 'react'

// const DashboardHeader = () => {
//   return (
//     <div className="p-5 shadow-sm border-b flex justify-between items-center">

        
//       <div>
//         <label htmlFor="Search" className="relative  bg-slate-300">
//           <input
//             type="text"
//             id="Search"
//             placeholder="Search"
//             className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm  sm:text-sm placeholder:text-center"
//           />

//         </label>
//       </div>

//       <div>
//         <UserButton />
//       </div>


//     </div>
//   );
// }

// export default DashboardHeader

import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
      <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="Search"
              placeholder="Search anything..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl 
                         bg-gray-50/50 backdrop-blur-sm
                         text-gray-900 placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         hover:bg-white/60 transition-all duration-300 ease-in-out
                         shadow-sm hover:shadow-md focus:shadow-lg
                         text-sm font-medium"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        
        {/* User Section */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          {/* Notification Bell (Optional) */}
          <button className="relative p-2 rounded-full hover:bg-gray-100/80 transition-colors duration-200 group">
            <svg
              className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 transition-colors duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-3.595-3.595a1 1 0 01-.405-.822V8a4 4 0 10-8 0v4.583a1 1 0 01-.405.822L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
          </button>

          {/* User Button with enhanced styling */}
          <div className="relative">
            <div className="p-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-white rounded-full p-0.5">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-2 rounded-full ring-2 ring-white shadow-md hover:shadow-lg transition-all duration-300",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;