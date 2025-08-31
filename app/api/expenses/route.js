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
        budgetId: parseInt(budgetId),
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

export async function DELETE(request) {
  try {
    console.log("DELETE request received");

    const { searchParams } = new URL(request.url);
    const expenseId = searchParams.get("expenseId");

    if (!expenseId) {
      return NextResponse.json(
        { error: "ExpenseId is required" },
        { status: 400 }
      );
    }

    // Check if expense exists before deleting
    const existingExpense = await db.Expenses.findUnique({
      where: {
        id: parseInt(expenseId),
      },
    });

    if (!existingExpense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    // Delete the expense
    const result = await db.Expenses.delete({
      where: {
        id: parseInt(expenseId),
      },
    });

    return NextResponse.json({
      message: "Expense deleted successfully",
      deletedExpense: result,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete expense" },
      { status: 500 }
    );
  }
}




export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get all expenses for the user's budgets
    const expenses = await db.Expenses.findMany({
      where: {
        budget: {
          createdBy: email,
        },
      },
      include: {
        budget: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}