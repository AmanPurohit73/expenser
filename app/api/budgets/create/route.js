import { db } from "../../../../db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, amount, createdBy, icon } = await request.json();

    // Validation
    if (!name || !amount || !createdBy) {
      return NextResponse.json(
        { error: "Name, amount, and createdBy are required" },
        { status: 400 }
      );
    }

    // Create budget in database using Prisma syntax
    const result = await db.Budgets.create({
      data: {
        name: name,
        amount: amount,
        createdBy: createdBy,
        icon: icon,
      },
    });

    return NextResponse.json({
      success: true,
      budget: result,
      message: "Budget created successfully",
    });
  } catch (error) {
    console.error("Error creating budget:", error);
    return NextResponse.json(
      { error: "Failed to create budget" },
      { status: 500 }
    );
  }
}



export async function DELETE(request) {
  try {
    console.log("DELETE budget request received");

    const { searchParams } = new URL(request.url);
    const budgetId = searchParams.get("budgetId");

    console.log("BudgetId:", budgetId);

    if (!budgetId) {
      return NextResponse.json(
        { error: "BudgetId is required" },
        { status: 400 }
      );
    }

    // Check if budget exists before deleting
    const existingBudget = await db.Budgets.findUnique({
      where: {
        id: parseInt(budgetId),
      },
      include: {
        expenses: true, // Include expenses to check if any exist
      },
    });

    if (!existingBudget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    // Optional: Delete associated expenses first (if you want cascade delete)
    if (existingBudget.expenses.length > 0) {
      await db.Expenses.deleteMany({
        where: {
          budgetId: parseInt(budgetId),
        },
      });
    }

    // Delete the budget
    const result = await db.Budgets.delete({
      where: {
        id: parseInt(budgetId),
      },
    });

    console.log("Budget deleted successfully:", result);

    return NextResponse.json({
      success: true,
      message: "Budget deleted successfully",
      deletedBudget: result,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete budget" },
      { status: 500 }
    );
  }
}