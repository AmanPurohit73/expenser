import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className="p-5 shadow-sm border-b flex justify-between items-center">

        
      <div>
        <label htmlFor="Search" className="relative  bg-slate-300">
          <input
            type="text"
            id="Search"
            placeholder="Search"
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm  sm:text-sm placeholder:text-center"
          />

        </label>
      </div>

      <div>
        <UserButton />
      </div>


    </div>
  );
}

export default DashboardHeader
