import { db } from "../../../../db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Add expenses include gradually
    const budgets = await db.Budgets.findMany({
      where: {
        createdBy: email,
      },
      include: {
        expenses: true, // Try adding expenses back
      },
    });
    const budgetsWithTotals = budgets.map((budget) => {
      const totalSpend = budget.expenses.reduce((sum, expense) => {
        return sum + parseFloat(expense.amount || 0);
      }, 0);

      const totalItems = budget.expenses.length;

      return {
        ...budget,
        totalSpend: totalSpend,
        totalItems: totalItems,
        remainingAmount: parseFloat(budget.amount) - totalSpend,
      };
    });

    return NextResponse.json(budgetsWithTotals);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}