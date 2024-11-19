/*
  Warnings:

  - Added the required column `tripId` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `album` ADD COLUMN `tripId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `Trip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
