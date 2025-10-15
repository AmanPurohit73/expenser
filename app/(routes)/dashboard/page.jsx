"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardsInfo from "./_components/CardsInfo";
import BarChartDashboard from "./budgets/_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

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
    <div className="p-8">
      <h2 className="text-3xl font-bold ">Hi, {user?.fullName} 👋</h2>
      <p className="text-gray-500">
        Here's What happening with your Money, Let's manage it.
      </p>

      <CardsInfo budgetList={budgetList} />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-5">
        <div className="md:col-span-2 ">
          <BarChartDashboard budgetList={budgetList} />

          <h2 className="font-bold text-xl flex justify-center mt-10 mb-5">
            Latest Expenses
          </h2>
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList}
          />
        </div>

        <div className="grid gap-5">
          <h2 className="font-bold text-xl flex justify-center">
            Budgets Category
          </h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
