"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const CreateBudgetList = ({ refreshData }) => {
  const [emoji, setEmoji] = useState("💰");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser();

  const onCreateBudget = async () => {
    try {
      const response = await fetch("/api/budgets/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          amount,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emoji,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        refreshData();
        toast.success("New budget created successfully!");
        setName("");
        setAmount("");
        setEmoji("💰");
      } else toast.error(result.error || "Failed to create budget");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white/70 border border-dashed border-gray-300 rounded-2xl p-10 flex flex-col justify-center items-center text-slate-600 hover:shadow-md hover:border-indigo-400 transition-all cursor-pointer">
          <span className="text-4xl mb-1">+</span>
          <p className="font-medium">Create New Budget</p>
        </div>
      </DialogTrigger>

      <DialogContent className="rounded-2xl border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold text-slate-800">
            Create New Budget
          </DialogTitle>
          <DialogDescription>
            <div
              className="mt-5 flex justify-center"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
              <Button variant="outline" size="lg" className="text-xl">
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
                <h3 className="font-medium text-slate-700 mb-1">Budget Name</h3>
                <Input
                  placeholder="e.g. Food, Rent, Travel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <h3 className="font-medium text-slate-700 mb-1">
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
              disabled={!name || !amount}
              onClick={onCreateBudget}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl"
            >
              Create Budget
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBudgetList;
