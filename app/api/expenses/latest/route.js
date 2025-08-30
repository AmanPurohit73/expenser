import { NextResponse } from "next/server";
import { db } from "../../../../db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const budgetId = searchParams.get("budgetId");

    if (!budgetId) {
      return NextResponse.json(
        { error: "Budget ID is required" },
        { status: 400 }
      );
    }

    // Get latest expenses for specific budget, ordered by ID descending
    const result = await db.Expenses.findMany({
      where: {
        budgetId: parseInt(budgetId),
      },
      orderBy: {
        id: "desc", // Latest expenses first
      },
    });

    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}

