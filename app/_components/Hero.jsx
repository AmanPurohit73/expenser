"use client"

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const { user, isSignedIn } = useUser();

  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Manage Your Expense
            <br />
            <strong className="text-indigo-600"> Control </strong>
            Your Money
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Start Creating your budget and Save tn of Money.
          </p>

          {isSignedIn ? (
            <Link href='/dashboard'>
            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <p
                className="inline-block rounded-xl border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                >
                Continue to Dashboard
              </p>
            </div>
                </Link>
          ) : (
            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <Link
                href={"/sign-in"}
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      <Image
        src={"/dashboard.png"}
        alt=""
        width={1000}
        height={700}
        className="-mt-9 rounded-xl border-2"
      />
    </section>
  );
};

export default Hero;
