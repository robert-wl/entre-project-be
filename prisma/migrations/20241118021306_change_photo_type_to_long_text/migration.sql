/*
  Warnings:

  - You are about to drop the column `photo` on the `albumdetail` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `tripdetail` table. All the data in the column will be lost.
  - Added the required column `image` to the `AlbumDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `TripDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `albumdetail` DROP COLUMN `photo`,
    ADD COLUMN `image` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `tripdetail` DROP COLUMN `photo`,
    ADD COLUMN `image` LONGTEXT NOT NULL;
