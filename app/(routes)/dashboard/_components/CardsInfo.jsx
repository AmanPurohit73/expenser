import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

const CardsInfo = ({ budgetList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    calculateCardInfo();
  }, [budgetList]);

  const calculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex justify-between items-center ">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">₹ {totalBudget}</h2>
            </div>
            <PiggyBank className="p-3 h-12 w-12 rounded-full text-white bg-blue-500" />
          </div>

          <div className="p-7 border rounded-lg flex justify-between items-center ">
            <div>
              <h2 className="text-sm">Total Spent</h2>
              <h2 className="font-bold text-2xl">₹ {totalSpend}</h2>
            </div>
            <ReceiptText className="p-3 h-12 w-12 rounded-full text-white bg-blue-500" />
          </div>

          <div className="p-7 border rounded-lg flex justify-between items-center ">
            <div>
              <h2 className="text-sm">No. of Budgets</h2>
              <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
            </div>
            <Wallet className="p-3 h-12 w-12 rounded-full text-white bg-blue-500" />
          </div>
        </div>
      ) : (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {[1, 2, 3].map((item, index) => (
            <div className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsInfo;
