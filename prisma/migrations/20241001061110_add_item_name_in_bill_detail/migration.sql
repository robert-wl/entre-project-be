/*
  Warnings:

  - Added the required column `itemName` to the `BillDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `billdetail` ADD COLUMN `itemName` VARCHAR(191) NOT NULL;
