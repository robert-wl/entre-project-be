/*
  Warnings:

  - You are about to drop the column `description` on the `destination` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `destination` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `destination` table. All the data in the column will be lost.
  - Added the required column `destination` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `destination` DROP COLUMN `description`,
    DROP COLUMN `name`,
    DROP COLUMN `photo`,
    ADD COLUMN `destination` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` LONGTEXT NOT NULL,
    ADD COLUMN `notes` VARCHAR(191) NOT NULL;
