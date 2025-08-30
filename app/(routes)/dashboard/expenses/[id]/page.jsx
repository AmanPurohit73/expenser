"use client";

import React, { useEffect, useState, use } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";

const Expenses = ({ params }) => {
  const [budgetInfo, setBudgetInfo] = useState([]);

  const [expensesList, setExpensesList] = useState([])

  // Unwrap the params Promise
  const resolvedParams = use(params);

  useEffect(() => {
    if (resolvedParams?.id) {
      getBudgetInfo();
    }
  }, [resolvedParams?.id]);


  const getBudgetInfo = async () => {
    try {
      const response = await fetch(`/api/budgets/${resolvedParams.id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setBudgetInfo(result);
      getExpensesList()
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  const getExpensesList = async () => {
    try {
      const response = await fetch(`/api/expenses/latest?budgetId=${resolvedParams.id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log(result);
      setExpensesList(result)

    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };


  return (
    <div className="p-7">
      <h2 className="font-bold text-3xl text-center ">My Expenses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : 
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse">
          </div>
        }
        <AddExpense budgetId={resolvedParams.id} refreshData={()=>{
          getBudgetInfo()
          }}/>
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-xl">Latest Expenses</h2>
        <ExpenseListTable expensesList={expensesList}
        refreshData={()=>getBudgetInfo()}/>
      </div>
    </div>
  );
};

export default Expenses;
