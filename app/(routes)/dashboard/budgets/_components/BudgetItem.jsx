
import Link from 'next/link';
import React from 'react'

const BudgetItem = ({budget}) => {


  const progressPercentage = () => {

    const perc = (budget.totalSpend/budget.amount) * 100
    return perc.toFixed(2)
  }

  return (
    <Link
      href={"/dashboard/expenses/" + budget?.id}
      className="p-5 border rounded-lg hover:shadow-md cursor-pointer hover:border-2 h-[150px]"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-xl p-3 px-4 bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>

          <div className="">
            <h2 className="font-medium capitalize">{budget.name}</h2>
            <h2 className="font-light text-sm text-gray-500">
              {budget.totalItems} Item
            </h2>
          </div>
        </div>

        <h2 className="font-bold text-lg text-blue-600">₹{budget.amount}</h2>
      </div>

      <div className="m-5 -mb-3 flex items-center justify-between ">
        <h2 className="text-sm text-slate-500">
          ${budget.totalSpend ? budget.totalSpend : "0"} Spent
        </h2>

        <h2 className="text-sm text-slate-500">
          ₹{budget.amount - budget.totalSpend} Remaining
        </h2>
      </div>

      <div className="mt-5">
        <div className="w-full bg-slate-300 h-2 rounded-xl">
          <div
            className=" bg-blue-700 h-2 rounded-xl"
            style={{ width: `${progressPercentage()}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem
