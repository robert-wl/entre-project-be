/*
  Warnings:

  - You are about to drop the column `description` on the `bill` table. All the data in the column will be lost.
  - You are about to drop the column `itemName` on the `billdetail` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `billdetail` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `billdetail` table. All the data in the column will be lost.
  - Added the required column `name` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bill` DROP COLUMN `description`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `billdetail` DROP COLUMN `itemName`,
    DROP COLUMN `price`,
    DROP COLUMN `quantity`;

-- CreateTable
CREATE TABLE `BillItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `billDetailId` INTEGER NOT NULL,
    `itemName` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BillItem` ADD CONSTRAINT `BillItem_billDetailId_fkey` FOREIGN KEY (`billDetailId`) REFERENCES `BillDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
