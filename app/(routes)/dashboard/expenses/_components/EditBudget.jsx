"use client";

import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { PenBox } from "lucide-react";
import { toast } from "sonner";

const EditBudget = ({ budgetInfo, refreshData }) => {
  const [emoji, setEmoji] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);
  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmoji(budgetInfo.icon);
      setName(budgetInfo.name);
      setAmount(budgetInfo.amount);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const res = await fetch(`/api/budgets/${budgetInfo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, amount, icon: emoji }),
    });

    const result = await res.json();
    if (result.success) {
      toast.success("Budget updated!");
      refreshData();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 rounded-xl">
          <PenBox className="w-4 h-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold text-slate-800">
            Edit Budget
          </DialogTitle>
          <DialogDescription>
            <div
              className="mt-5 flex justify-center"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
              <Button variant="outline" size="lg" className="text-lg">
                {emoji}
              </Button>
              <div className="absolute z-10 mt-16">
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmoji(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div>
                <h3 className="text-slate-700 font-medium mb-1">Budget Name</h3>
                <Input
                  placeholder="e.g. Home Decor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <h3 className="text-slate-700 font-medium mb-1">
                  Budget Amount
                </h3>
                <Input
                  type="number"
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={onUpdateBudget}
              disabled={!name || !amount}
              className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl"
            >
              Update Budget
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBudget;
