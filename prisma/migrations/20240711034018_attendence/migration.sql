/*
  Warnings:

  - Added the required column `updatedAt` to the `Attendence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendence" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isCheckIn" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isCheckOut" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
