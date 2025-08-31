"use client";

import React, { useEffect, useState } from "react";
import ExpenseListTable from "./_components/ExpenseListTable";
import { useUser } from "@clerk/nextjs";

const page = () => {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);

  const [expensesList, setExpensesList] = useState([]);

  const getAllExpenses = async () => {
    const response = await fetch(
      `/api/expenses?email=${user?.primaryEmailAddress?.emailAddress}`
    );
    const result = await response.json();

    if (response.ok) {
      // console.log(result)
      setExpensesList(result);
    }
  };

  useEffect(() => {
    if (user && user.primaryEmailAddress?.emailAddress) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    const response = await fetch(
      `/api/budgets/with-totals?email=${user?.primaryEmailAddress?.emailAddress}`
    );
    const result = await response.json();

    if (response.ok) {
      // console.log(result)
      setBudgetList(result);
      getAllExpenses();
    }
  };
  return (
    <div className="w-[95%]">
      <h2 className="flex justify-center text-3xl font-bold py-5">
        My Expenses
      </h2>
      <div className="ml-12">
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetList}
        />
      </div>
    </div>
  );
};

export default page;
