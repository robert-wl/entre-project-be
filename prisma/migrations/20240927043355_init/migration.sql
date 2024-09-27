/*
  Warnings:

  - Added the required column `photo` to the `TripDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tripdetail` ADD COLUMN `photo` LONGBLOB NOT NULL;
