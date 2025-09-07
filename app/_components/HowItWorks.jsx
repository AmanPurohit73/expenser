"use client";

import React from "react";
import {
  UserPlus,
  FolderPlus,
  PlusCircle,
  BarChart3,
  ArrowRight,
  Zap,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Get Started",
      description:
        "Create your account and set up your financial profile in just 2 minutes",
      icon: UserPlus,
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "02",
      title: "Manage Budget Categories",
      description:
        "Create and organize budget categories like Food, Transport, Entertainment, etc.",
      icon: FolderPlus,
      color: "from-indigo-500 to-purple-500",
    },
    {
      step: "03",
      title: "Add Expenses",
      description:
        "Log your daily expenses to specific budget categories and track your spending",
      icon: PlusCircle,
      color: "from-purple-500 to-pink-500",
    },
    {
      step: "04",
      title: "View Dashboard",
      description:
        "Monitor your budget and expenses in a simplified dashboard with insights and analytics",
      icon: BarChart3,
      color: "from-pink-500 to-red-500",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-12 -mt-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span className="text-indigo-600 font-medium text-sm">
              How does it work?
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple 4-Step Process
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with smart budgeting in four easy steps
          </p>
        </div>

        {/* Steps with Horizontal Curvy Road */}
        <div className="max-w-7xl mx-auto relative">
          {/* Arrow indicators between cards */}
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-center z-0 hidden xl:flex">
            <div className="w-full max-w-7xl mx-auto px-4 flex justify-between items-center">
              {/* Empty space for first card */}
              <div className="flex-1"></div>

              {/* Arrow 1 -> 2 */}
              <div className="flex-shrink-0 mx-4">
                <ArrowRight className="w-6 h-6 text-indigo-400 opacity-60" />
              </div>

              {/* Empty space for second card */}
              <div className="flex-1"></div>

              {/* Arrow 2 -> 3 */}
              <div className="flex-shrink-0 mx-4">
                <ArrowRight className="w-6 h-6 text-purple-400 opacity-60" />
              </div>

              {/* Empty space for third card */}
              <div className="flex-1"></div>

              {/* Arrow 3 -> 4 */}
              <div className="flex-shrink-0 mx-4">
                <ArrowRight className="w-6 h-6 text-pink-400 opacity-60" />
              </div>

              {/* Empty space for fourth card */}
              <div className="flex-1"></div>
            </div>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/80 rounded-3xl p-6 shadow-lg border border-white/20 h-80 flex flex-col justify-between transition-all duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-2xl hover:bg-white/90 hover:-translate-y-2 group cursor-pointer">
                  {/* Icon & Step Number */}
                  <div className="flex flex-col items-center mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg mb-3 transition-all duration-300 group-hover:shadow-xl group-hover:scale-110`}
                    >
                      <step.icon className="w-8 h-8 text-white transition-all duration-300 group-hover:rotate-6" />
                    </div>
                    <div
                      className={`text-4xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-60`}
                    >
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-grow flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-indigo-700 hover:to-purple-700">
            <span>Ready to get started?</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 hover:translate-x-1" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;