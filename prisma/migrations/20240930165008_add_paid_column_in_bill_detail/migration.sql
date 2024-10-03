/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `billdetail` table. All the data in the column will be lost.
  - Added the required column `paid` to the `BillDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `billdetail` DROP COLUMN `totalPrice`,
    ADD COLUMN `paid` BOOLEAN NOT NULL;
