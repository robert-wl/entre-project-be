/*
  Warnings:

  - Added the required column `destinationOwnerId` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `destination` ADD COLUMN `destinationOwnerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Destination` ADD CONSTRAINT `Destination_destinationOwnerId_fkey` FOREIGN KEY (`destinationOwnerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
