/*
  Warnings:

  - Made the column `category` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `category` ENUM('None', 'High', 'Medium', 'Low') NOT NULL;
