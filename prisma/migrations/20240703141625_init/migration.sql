-- CreateEnum
CREATE TYPE "AttendenceType" AS ENUM ('EARLY', 'LATE', 'ONTIME');

-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LeavesType" AS ENUM ('SICK', 'CASUAL', 'ANNUAL');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TODO', 'INPROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('ADMIN', 'EMPLOYEE');

-- CreateTable
CREATE TABLE "Attendence" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "checkInTime" TIMESTAMP(3) NOT NULL,
    "checkOutTime" TIMESTAMP(3) NOT NULL,
    "checkIn" "AttendenceType" NOT NULL,
    "checkOut" "AttendenceType" NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Attendence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Office" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "note" TEXT,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaves" (
    "id" SERIAL NOT NULL,
    "type" "LeavesType" NOT NULL DEFAULT 'CASUAL',
    "status" "LeaveStatus" NOT NULL DEFAULT 'PENDING',
    "adminStatus" "LeaveStatus" NOT NULL DEFAULT 'PENDING',
    "reason" VARCHAR(250) NOT NULL,
    "file" TEXT NOT NULL,
    "noteHead" TEXT NOT NULL,
    "noteAdmin" TEXT NOT NULL,

    CONSTRAINT "Leaves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "due" TIMESTAMP(3) NOT NULL,
    "priority" "Priority" NOT NULL DEFAULT 'LOW',
    "status" "Status" NOT NULL DEFAULT 'TODO',
    "assignedTo" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "teamhead" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "position" TEXT NOT NULL,
    "role" "ROLES" NOT NULL DEFAULT 'EMPLOYEE',
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToUsers_AB_unique" ON "_TeamToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToUsers_B_index" ON "_TeamToUsers"("B");

-- AddForeignKey
ALTER TABLE "Attendence" ADD CONSTRAINT "Attendence_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUsers" ADD CONSTRAINT "_TeamToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUsers" ADD CONSTRAINT "_TeamToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
