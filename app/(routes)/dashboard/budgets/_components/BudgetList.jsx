"use client";
import React, { useEffect, useState } from "react";
import CreateBudgetList from "./CreateBudgetList";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const { user, isLoaded } = useUser();
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      getBudgetList();
    }
  }, [user, isLoaded]);

  const getBudgetList = async () => {
    try {
      const res = await fetch(
        `/api/budgets/with-totals?email=${user.primaryEmailAddress.emailAddress}`
      );
      const data = await res.json();
      if (res.ok) setBudgetList(data);
    } catch (err) {
      console.error("Error fetching budgets:", err);
    }
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateBudgetList refreshData={getBudgetList} />
        {budgetList.length
          ? budgetList.map((b, i) => <BudgetItem budget={b} key={i} />)
          : [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[150px] bg-gray-100 rounded-2xl animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default BudgetList;
