/*
  Warnings:

  - You are about to drop the column `note` on the `Office` table. All the data in the column will be lost.
  - Added the required column `applicantID` to the `Leaves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayCount` to the `Leaves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Leaves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Office` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leaves" ADD COLUMN     "applicantID" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dayCount" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Office" DROP COLUMN "note",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Leaves" ADD CONSTRAINT "Leaves_applicantID_fkey" FOREIGN KEY ("applicantID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
