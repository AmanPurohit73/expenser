"use client"

import { Button } from "../../components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow ">
      <Image src={"./logo.svg"} alt="" width={160} height={100} />

      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={'/sign-in'}>
        <Button variant="" className="bg-indigo-600 hover:bg-indigo-800">
          Get Started
        </Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
