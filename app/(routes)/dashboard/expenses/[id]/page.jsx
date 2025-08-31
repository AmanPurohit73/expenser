"use client";

import React, { useEffect, useState, use } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

const Expenses = ({ params }) => {
  const [budgetInfo, setBudgetInfo] = useState([]);

  const [expensesList, setExpensesList] = useState([]);

  const resolvedParams = use(params);

  const route = useRouter()

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
      getExpensesList();
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  const getExpensesList = async () => {
    try {
      const response = await fetch(
        `/api/expenses/latest?budgetId=${resolvedParams.id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log(result);
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const deleteBudget = async() => {
    const response = await fetch(`/api/budgets/create?budgetId=${resolvedParams?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result) {
      toast("Budget Deleted !");
      route.replace('/dashboard/budgets')
    }
  }

  return (
    <div className="p-7">
      <h2 className="font-bold text-3xl flex justify-between text-center items-center ">
        My Expenses


        <div className="flex gap-3 items-center">

          <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()}/>


          <span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="flex gap-2 cursor-pointer"
                  variant="destructive"
                >
                  <Trash /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your current budget and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteBudget()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </span>


        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          budgetId={resolvedParams.id}
          refreshData={() => {
            getBudgetInfo();
          }}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-xl">Latest Expenses</h2>
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
};

export default Expenses;
