import { TrashIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ExpenseListTable = ({ expensesList, refreshData, isLoading = false }) => {
  const deleteExpense = async (expense) => {
    const res = await fetch(`/api/expenses?expenseId=${expense.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data) {
      toast.success("Expense deleted!");
      refreshData();
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <div className="mt-6 bg-white/80 border border-gray-100 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-4 bg-gradient-to-r from-indigo-50 to-teal-50 px-6 py-3 border-b border-gray-200">
        {["Name", "Amount", "Date", "Action"].map((head) => (
          <h3
            key={head}
            className="text-slate-700 font-semibold text-sm uppercase tracking-wide text-center"
          >
            {head}
          </h3>
        ))}
      </div>

      <div className="divide-y divide-gray-100">
        {isLoading
          ? [1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-4 px-6 py-4 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-20"></div>
                <div className="h-4 bg-gray-100 rounded w-16"></div>
                <div className="h-4 bg-gray-100 rounded w-24"></div>
              </div>
            ))
          : expensesList.map((exp, i) => (
              <div
                key={i}
                className="grid grid-cols-4 px-6 py-4 text-sm text-slate-600 hover:bg-gray-50 transition-all"
              >
                <span className="font-medium text-slate-800 text-center">
                  {exp.name}
                </span>
                <span className="text-indigo-600 font-semibold text-center">
                  ₹{exp.amount}
                </span>
                <span className="text-center">{formatDate(exp.createdAt)}</span>
                <button
                  onClick={() => deleteExpense(exp)}
                  className="flex justify-center items-center hover:bg-rose-50 rounded-lg transition"
                  title="Delete"
                >
                  <TrashIcon className="w-5 h-5 text-rose-500 cursor-pointer" />
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ExpenseListTable;
