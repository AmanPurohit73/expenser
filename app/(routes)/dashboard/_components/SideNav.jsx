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
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  return (
    <div className="h-screen p-5 border shadow ">
      <Link href={'/'}>
      <Image
        src={"./logo.svg"}
        alt=""
        width={160}
        height={100}
        className="ml-7 cursor-pointer"
        />
        </Link>

      <div className="mt-7">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h1
              className={`flex gap-2 items-center text-gray-500 mb-2 font-medium p-5 cursor-pointer rounded-md hover:text-blue-700 hover:bg-blue-100 
          ${path == menu.path && "text-primary bg-blue-200"}`}
            >
              <menu.icon />
              {menu.name}
            </h1>
          </Link>
        ))}
      </div>


    </div>
  );
};

export default SideNav;
