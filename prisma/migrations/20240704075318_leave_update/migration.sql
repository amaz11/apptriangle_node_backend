/*
  Warnings:

  - Added the required column `dayEnd` to the `Leaves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayStart` to the `Leaves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leaves" ADD COLUMN     "dayEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dayStart" TIMESTAMP(3) NOT NULL;
