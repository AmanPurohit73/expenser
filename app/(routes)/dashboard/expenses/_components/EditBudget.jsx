"use client";

import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { use, useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const EditBudget = ({ budgetInfo, refreshData }) => {
  console.log(budgetInfo);

  const [emoji, setEmoji] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);

  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmoji(budgetInfo?.icon);
      setAmount(budgetInfo?.amount)
      setName(budgetInfo?.name)
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const response = await fetch(`/api/budgets/${budgetInfo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        amount: amount.toString(),
        icon: emoji,
      }),
    });

    const result = await response.json();

    if (result.success) {
      refreshData();
      toast("Budget Updated Successfully!");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg cursor-pointer flex gap-2">
            {" "}
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex text-center justify-center">
              Edit Budget
            </DialogTitle>
            <DialogDescription>
              <div
                className="mt-5"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                <Button variant="outline" size="lg" className="text-lg">
                  {emoji}
                </Button>

                <div className="absolute z-10">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmoji(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Name</h2>
                <Input
                  placeholder="e.g Home Decor"
                  defaultValue={budgetInfo.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g 5000"
                  defaultValue={budgetInfo.amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700"
                disabled={!(name && amount)}
                onClick={() => onUpdateBudget()}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
