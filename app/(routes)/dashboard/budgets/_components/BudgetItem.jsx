import Link from "next/link";
import React from "react";

const BudgetItem = ({ budget }) => {
  const totalSpend = Number(budget?.totalSpend || 0);
  const totalAmount = Number(budget?.amount || 0);
  const percentage =
    totalAmount > 0 ? Math.min((totalSpend / totalAmount) * 100, 100) : 0;

  return (
    <Link href={`/dashboard/expenses/${budget?.id}`} className="block">
      <div className="relative group">
        {/* Gradient glow behind card */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>

        {/* Card container */}
        <div className="relative p-7 bg-white border border-gray-200 rounded-2xl hover:shadow-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:border-indigo-400/30 h-[190px] flex flex-col justify-between">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl p-4 bg-gradient-to-br from-indigo-100 to-teal-100 rounded-2xl border border-indigo-200">
                {budget?.icon}
              </div>

              <div>
                <h2 className="font-bold capitalize text-lg text-slate-900">
                  {budget?.name || "Unnamed"}
                </h2>
                <p className="font-medium text-sm text-slate-500">
                  {budget?.totalItems || 0} Items
                </p>
              </div>
            </div>

            <h2 className="font-bold text-xl text-indigo-600">
              ₹{budget?.amount || 0}
            </h2>
          </div>

          {/* Spend vs Remaining */}
          <div className="mt-4 flex items-center justify-between text-sm font-medium text-slate-600">
            <span>₹{totalSpend} Spent</span>
            <span>₹{Math.max(totalAmount - totalSpend, 0)} Remaining</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  percentage >= 90
                    ? "bg-gradient-to-r from-rose-500 to-pink-500"
                    : "bg-gradient-to-r from-indigo-500 to-teal-500"
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
