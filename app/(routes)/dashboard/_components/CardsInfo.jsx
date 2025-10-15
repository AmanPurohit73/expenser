import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

const CardsInfo = ({ budgetList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    if (budgetList) {
      let totalBudget_ = 0;
      let totalSpend_ = 0;
      budgetList.forEach((b) => {
        totalBudget_ += Number(b.amount);
        totalSpend_ += b.totalSpend;
      });
      setTotalBudget(totalBudget_);
      setTotalSpend(totalSpend_);
    }
  }, [budgetList]);

  const cardBase =
    "p-7 border border-gray-100 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex justify-between items-center";

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className={`${cardBase}`}>
        <div>
          <h2 className="text-sm text-slate-500">Total Budget</h2>
          <h2 className="font-bold text-2xl text-slate-900">₹ {totalBudget}</h2>
        </div>
        <PiggyBank className="p-3 h-12 w-12 rounded-full text-white bg-gradient-to-r from-indigo-500 to-teal-500 shadow-md" />
      </div>

      <div className={`${cardBase}`}>
        <div>
          <h2 className="text-sm text-slate-500">Total Spent</h2>
          <h2 className="font-bold text-2xl text-slate-900">₹ {totalSpend}</h2>
        </div>
        <ReceiptText className="p-3 h-12 w-12 rounded-full text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-md" />
      </div>

      <div className={`${cardBase}`}>
        <div>
          <h2 className="text-sm text-slate-500">Total Budgets</h2>
          <h2 className="font-bold text-2xl text-slate-900">
            {budgetList?.length}
          </h2>
        </div>
        <Wallet className="p-3 h-12 w-12 rounded-full text-white bg-gradient-to-r from-teal-500 to-indigo-500 shadow-md" />
      </div>
    </div>
  );
};

export default CardsInfo;
