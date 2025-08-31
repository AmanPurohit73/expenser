import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/db';
import React, { useState } from 'react'
import { toast } from 'sonner';

const AddExpense = ({budgetId,refreshData}) => {

const [name, setName] = useState()
const [amount, setAmount] = useState()





const addNewExpense = async () => {


  try {
    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        amount: amount,
        budgetId: budgetId,
      }),
    });

 
    const result = await response.json();

    setAmount("")
    setName("")

    if(result){
        toast("New Expense Added!");
        refreshData()
    }


  } catch (error) {
    console.error("Error adding expense:", error);
    toast("Error adding expense");
  }
};


  return (
    <div className='border p-5 rounded-lg '>
      <h2 className="font-bold text-lg">Add Expense</h2>

      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
        value={name}
          placeholder="e.g Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
        value={amount}
          placeholder="e.g 5000"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button className='mt-3 w-full bg-blue-500 hover:bg-blue-700 cursor-pointer' 
      disabled={!(name && amount)} 
      onClick={()=>addNewExpense()}
      >Add New Expense</Button>
    </div>
  );
}

export default AddExpense
