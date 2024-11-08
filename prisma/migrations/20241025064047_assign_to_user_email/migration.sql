/*
  Warnings:

  - You are about to drop the column `userId` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `users`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
