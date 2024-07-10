/*
  Warnings:

  - You are about to drop the column `teamhead` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `_TeamToUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teamheadID` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TeamToUsers" DROP CONSTRAINT "_TeamToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamToUsers" DROP CONSTRAINT "_TeamToUsers_B_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "teamhead",
ADD COLUMN     "teamheadID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_TeamToUsers";

-- CreateTable
CREATE TABLE "_members" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_members_AB_unique" ON "_members"("A", "B");

-- CreateIndex
CREATE INDEX "_members_B_index" ON "_members"("B");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamheadID_fkey" FOREIGN KEY ("teamheadID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_members" ADD CONSTRAINT "_members_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_members" ADD CONSTRAINT "_members_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
