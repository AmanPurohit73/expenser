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

    // Get budget by ID using Prisma
    const budget = await prisma.Budgets.findUnique({
      where: {
        id: parseInt(id), // Convert to number if your ID is numeric
      },
      include: {
        expenses: true, // Include related expenses if needed
        // Add other relations you want to include
      },
    });

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    return NextResponse.json(budget);
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
