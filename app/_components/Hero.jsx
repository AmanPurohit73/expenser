"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const { isSignedIn } = useUser();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    { icon: TrendingUp, text: "Smart Analytics" },
    { icon: Shield, text: "Secure & Reliable" },
    { icon: Zap, text: "Real-Time Sync" },
  ];

  return (
    <section className="relative h-[650px] bg-gradient-to-br from-white via-indigo-50 to-teal-50 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-70"
          style={{
            left: mousePosition.x * 0.02 + "px",
            top: mousePosition.y * 0.02 + "px",
          }}
        />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-rose-100 rounded-full blur-3xl opacity-60 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
          {/* Left Column - Text Content */}
          <div className="space-y-8 lg:pl-12 xl:pl-20">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-tight text-center">
              Manage Your{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
                Finances Smarter
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-xl text-center">
              Simplify budgeting and expense tracking with intuitive insights
              and beautiful visual analytics.
            </p>

            {/* Features - Small */}
            <div className="flex flex-wrap gap-3 justify-center">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 bg-white/70 border border-gray-200 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <feature.icon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-xs font-medium text-slate-700">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA - Large Button */}
            <div className="flex flex-col gap-4 pt-6 items-center">
              {isSignedIn ? (
                <Link href="/dashboard">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-6 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/sign-up">
                    <Button className="bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white px-12 py-6 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                      Start Free Today
                      <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                  </Link>
                  <Link href="/sign-in">
                    <Button className="bg-white hover:bg-gray-50 text-slate-700 border-2 border-gray-200 px-12 py-6 rounded-xl font-semibold text-xl shadow-sm hover:shadow-md transition-all w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative lg:block hidden lg:pr-12 xl:pr-20">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 blur-3xl rounded-3xl transform rotate-6"></div>
            <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-4 border border-gray-100 shadow-2xl transform hover:rotate-1 transition-transform duration-700 max-w-2xl">
              <Image
                src="/dashboard.png"
                alt="Dashboard Preview"
                width={1200}
                height={800}
                className="w-full h-auto rounded-2xl shadow-md"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mobile Dashboard Preview */}
        <div className="lg:hidden mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 blur-3xl rounded-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-4 border border-gray-100 shadow-2xl">
            <Image
              src="/dashboard.png"
              alt="Dashboard Preview"
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl shadow-md"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
