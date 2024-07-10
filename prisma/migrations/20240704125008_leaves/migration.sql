/*
  Warnings:

  - Changed the type of `dayEnd` on the `Leaves` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dayStart` on the `Leaves` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Leaves" ALTER COLUMN "noteHead" DROP NOT NULL,
ALTER COLUMN "noteAdmin" DROP NOT NULL,
DROP COLUMN "dayEnd",
ADD COLUMN     "dayEnd" TIMESTAMP(3) NOT NULL,
DROP COLUMN "dayStart",
ADD COLUMN     "dayStart" TIMESTAMP(3) NOT NULL;
