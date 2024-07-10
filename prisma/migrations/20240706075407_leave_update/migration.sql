/*
  Warnings:

  - The `adminStatus` column on the `Leaves` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LeaveAdminStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Attendence" ALTER COLUMN "checkOutTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Leaves" DROP COLUMN "adminStatus",
ADD COLUMN     "adminStatus" "LeaveAdminStatus" NOT NULL DEFAULT 'PENDING';
