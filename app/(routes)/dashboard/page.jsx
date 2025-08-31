"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardsInfo from "./_components/CardsInfo";
import BarChartDashboard from "./budgets/_components/BarChartDashboard";

const page = () => {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);


  useEffect(() => {
    if ( user && user.primaryEmailAddress?.emailAddress) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
      const response = await fetch(
        `/api/budgets/with-totals?email=${user?.primaryEmailAddress?.emailAddress}`
      );
      const result = await response.json();

      if (response.ok) {
        // console.log(result)
        setBudgetList(result);
      }
       else {
        console.error("Error:", result.error);
      }
    } 
    catch (error) {
      console.error("Error fetching budgets:", error);
    } 
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold ">Hi, {user?.fullName} 👋</h2>
      <p className="text-gray-500">Here's What happening with your Money, Let's manage it.</p>

      <CardsInfo budgetList={budgetList}/>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-10">

        <div className="md:col-span-2 flex justify-center">
            <BarChartDashboard budgetList={budgetList}/>
        </div>

        <div>
          other
        </div>

      </div>
    </div>
  );
};

export default page;
