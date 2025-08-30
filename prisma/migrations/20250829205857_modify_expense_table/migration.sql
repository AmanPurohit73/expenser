/*
  Warnings:

  - Added the required column `createdBy` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Expenses" ADD COLUMN     "createdBy" TEXT NOT NULL;
