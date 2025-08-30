"use client";

import React, { useEffect, useState } from "react";
import CreateBudgetList from "./CreateBudgetList";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const { user, isLoaded } = useUser();

  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    if (isLoaded && user && user.primaryEmailAddress?.emailAddress) {
      getBudgetList();
    }
  }, [user, isLoaded]);

  const getBudgetList = async () => {
    try {
      const response = await fetch(
        `/api/budgets/with-totals?email=${user?.primaryEmailAddress?.emailAddress}`
      );
      const result = await response.json();

      if (response.ok) {
        // console.log(result)
        setBudgetList(result);
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
    } finally {
    }
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CreateBudgetList />
        

        {budgetList.map((budget, index) => (
          <BudgetItem budget={budget} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BudgetList;
