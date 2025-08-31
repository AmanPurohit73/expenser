// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET(request, { params }) {
//   try {
//     const resolvedParams = await params; // Unwrap params Promise
//     const { id } = resolvedParams;

//     if (!id) {
//       return NextResponse.json(
//         { error: "Budget ID is required" },
//         { status: 400 }
//       );
//     }

//     // Get budget by ID using Prisma
//     const budget = await prisma.Budgets.findUnique({
//       where: {
//         id: parseInt(id), // Convert to number if your ID is numeric
//       },
//       include: {
//         expenses: true, // Include related expenses if needed
//         // Add other relations you want to include
//       },
//     });

//     if (!budget) {
//       return NextResponse.json({ error: "Budget not found" }, { status: 404 });
//     }

//     return NextResponse.json(budget);
//   } catch (error) {
//     console.error("Database error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch budget" },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params; // Unwrap params Promise
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { error: "Budget ID is required" },
        { status: 400 }
      );
    }

    // Get budget by ID using Prisma with expenses included
    const budget = await prisma.budgets.findUnique({
      where: {
        id: parseInt(id), // Convert to number if your ID is numeric
      },
      include: {
        expenses: true, // Include related expenses
      },
    });

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    // Calculate totals similar to your second API
    const totalSpend = budget.expenses.reduce((sum, expense) => {
      return sum + parseFloat(expense.amount || 0);
    }, 0);

    const totalItems = budget.expenses.length;
    const remainingAmount = parseFloat(budget.amount) - totalSpend;

    // Return budget with calculated totals
    const budgetWithTotals = {
      ...budget,
      totalSpend: totalSpend,
      totalItems: totalItems,
      remainingAmount: remainingAmount,
    };

    return NextResponse.json(budgetWithTotals);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch budget" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}




export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name, amount, icon } = await request.json();

    // Validate required fields
    if (!name || !amount) {
      return Response.json(
        { error: "Name and amount are required fields" },
        { status: 400 }
      );
    }

    // Update the budget
    const updatedBudget = await prisma.budgets.update({
      where: {
        id: parseInt(id), // or just id if using string IDs
      },
      data: {
        name,
        amount,
        icon,
      },
    });

    return Response.json({
      success: true,
      message: "Budget Updated!",
      budget: updatedBudget,
    });
  } catch (error) {
    console.error("Error updating budget:", error);

    if (error.code === "P2025") {
      return Response.json({ error: "Budget not found" }, { status: 404 });
    }

    return Response.json({ error: "Failed to update budget" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
