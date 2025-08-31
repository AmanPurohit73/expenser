

import { TrashIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ExpenseListTable = ({ expensesList, refreshData, isLoading = false }) => {
  const deleteExpense = async (expense) => {
    const response = await fetch(`/api/expenses?expenseId=${expense.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result) {
      toast("Expense Deleted !");
      refreshData();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="mt-6">
      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
          <h3 className="text-blue-800 font-semibold text-sm uppercase tracking-wide">
            Name
          </h3>
          <h3 className="text-blue-800 font-semibold text-sm uppercase tracking-wide">
            Amount
          </h3>
          <h3 className="text-blue-800 font-semibold text-sm uppercase tracking-wide">
            Date
          </h3>
          <h3 className="text-blue-800 font-semibold text-sm uppercase tracking-wide text-center">
            Action
          </h3>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-blue-50">
          {isLoading
            ? // Skeleton UI
              [1,2,3].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 px-6 py-4 animate-pulse"
                >
                  <div className="flex items-center">
                    <div className="h-4 bg-blue-100 rounded w-20"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 bg-blue-100 rounded w-16"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 bg-blue-100 rounded w-24"></div>
                  </div>
                </div>
              ))
            : expensesList.map((expenses, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 px-6 py-4 hover:bg-blue-25 transition-colors duration-200 group"
                >
                  <div className="flex items-center">
                    <span className="text-gray-800 font-medium capitalize text-sm">
                      {expenses.name}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-blue-700 font-semibold text-sm">
                      ₹ {expenses.amount}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-600 text-sm">
                      {formatDate(expenses.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => deleteExpense(expenses)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200 group-hover:scale-105 transform"
                      title="Delete expense"
                    >
                      <TrashIcon className="w-4 h-4 text-red-500 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseListTable;