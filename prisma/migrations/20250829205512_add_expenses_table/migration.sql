-- CreateTable
CREATE TABLE "public"."Expenses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "budgetId" INTEGER NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Expenses" ADD CONSTRAINT "Expenses_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "public"."Budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
