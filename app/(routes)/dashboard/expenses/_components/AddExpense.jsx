import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

const AddExpense = ({ budgetId, refreshData }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addNewExpense = async () => {
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, amount, budgetId }),
      });
      const data = await res.json();
      if (data) {
        toast.success("Expense added!");
        refreshData();
        setName("");
        setAmount("");
      }
    } catch {
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="border border-gray-100 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
      <h2 className="font-semibold text-lg text-slate-800 mb-4">Add Expense</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-slate-600 mb-1">
            Expense Name
          </h3>
          <Input
            placeholder="e.g. Coffee, Groceries"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-600 mb-1">
            Expense Amount
          </h3>
          <Input
            type="number"
            placeholder="e.g. 250"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button
          className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium"
          disabled={!name || !amount}
          onClick={addNewExpense}
        >
          Add Expense
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
