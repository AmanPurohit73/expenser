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
    const result = await db.budgets.create({
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
