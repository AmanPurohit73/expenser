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

const CreateBudgetList = () => {
  const [emoji, setEmoji] = useState("🌞");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  // const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const onCreateBudget = async () => {

    try {
      // Customer places order to waiter (API call)
      const response = await fetch("/api/budgets/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          amount: amount,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emoji,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast("New Budget Created! 🎉");
        // Clear the form
        setName("");
        setAmount("");
        setEmoji("🌞");
      } else {
        toast.error(result.error || "Failed to create budget");
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Something went wrong!");
    } 
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md border-2 border-dashed flex items-center flex-col cursor-pointer hover:shadow-md transition-shadow">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex text-center justify-center">
              Create New Budget
            </DialogTitle>
            <DialogDescription>
              <div
                className="mt-5"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                <Button variant="outline" size="lg" className="text-lg">
                  {emoji}
                </Button>

                <div className="absolute">
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
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g 5000"
                  value={amount || ""}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700"
                disabled={!(name && amount) }
                onClick={() => onCreateBudget()}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudgetList;
