"use client"

import React, { useState } from 'react'
import BudgetList from './BudgetList'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { Button } from '@/components/ui/button';

const CreateBudgetList = () => {


    const [emoji, setEmoji] = useState("🌞");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);


  return (
    <div>
     
      <Dialog>
        <DialogTrigger asChild> 
          <div className="bg-slate-100 p-10 rounded-md border-2 border-dashed flex items-center flex-col">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>


    <Button variant='outline'>{emoji}</Button>

              {/* <div>
                <EmojiPicker/>
              </div> */}

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudgetList
