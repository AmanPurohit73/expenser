import { NextResponse } from "next/server";
import { db } from "../../../db";

export async function POST(request) {
  try {
    const { name, amount, budgetId } = await request.json();

    if (!name || !amount || !budgetId) {
      return NextResponse.json(
        { error: "Name, amount, and budgetId are required" },
        { status: 400 }
      );
    }

    const result = await db.Expenses.create({
      data: {
        name: name,
        amount: amount,
        budgetId: parseInt(budgetId), // Convert to number if needed
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to add expense" },
      { status: 500 }
    );
  }
}
