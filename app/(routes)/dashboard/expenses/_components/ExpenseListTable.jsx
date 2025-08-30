import { TrashIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ExpenseListTable = ({ expensesList,refreshData }) => {


  const deleteExpense = async (expense) => {

    const response = await fetch(`/api/expenses?expenseId=${expense.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if(result){
        toast('Expense Deleted !')
        refreshData
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2 rounded-lg font-bold">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>
      {expensesList.map((expenses, index) => (
        <div className="grid grid-cols-4 bg-slate-50 p-2 rounded-lg">
          <h2>{expenses.name}</h2>
          <h2>{expenses.amount}</h2>
          <h2>{expenses.createdAt}</h2>
          <h2>
            <TrashIcon
              className="text-red-700 cursor-pointer"
              onClick={() => deleteExpense(expenses)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
