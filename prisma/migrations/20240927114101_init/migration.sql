/*
  Warnings:

  - You are about to drop the column `endDate` on the `trip` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `trip` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`;
