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
import Link from "next/link";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Create an Account",
      description:
        "Set up your profile in just a few seconds and start budgeting immediately.",
      icon: UserPlus,
      color: "from-indigo-500 to-blue-500",
    },
    {
      step: "02",
      title: "Set Up Budgets",
      description:
        "Add and organize categories to monitor your spending efficiently.",
      icon: FolderPlus,
      color: "from-teal-500 to-cyan-500",
    },
    {
      step: "03",
      title: "Track Expenses",
      description:
        "Easily log your expenses and get real-time balance updates.",
      icon: PlusCircle,
      color: "from-blue-500 to-indigo-500",
    },
    {
      step: "04",
      title: "View Insights",
      description:
        "Analyze spending trends and get actionable insights to save more.",
      icon: BarChart3,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-indigo-50 via-white to-teal-50"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full mb-6">
          <Zap className="w-4 h-4 text-indigo-600" />
          <span className="text-indigo-700 text-sm font-medium">
            How it Works
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Simple 4-Step Process
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
          Get started on your journey to smarter budgeting in just a few easy
          steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/70 border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-all`}
              >
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div
                className={`text-5xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-30`}
              >
                {step.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/dashboard"
            className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            Get Started
            <ArrowRight className="inline ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
