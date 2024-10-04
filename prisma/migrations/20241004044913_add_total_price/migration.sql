/*
  Warnings:

  - Added the required column `totalPrice` to the `BillDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `billdetail` ADD COLUMN `totalPrice` DOUBLE NOT NULL;
