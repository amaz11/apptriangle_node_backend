/*
  Warnings:

  - Added the required column `leaveDays` to the `Leaves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leaves" ADD COLUMN     "leaveDays" INTEGER NOT NULL;
