/*
  Warnings:

  - You are about to drop the column `image` on the `albumdetail` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `destination` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `tripdetail` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `AlbumDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `TripDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `albumdetail` DROP COLUMN `image`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `destination` DROP COLUMN `image`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tripdetail` DROP COLUMN `image`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `image` LONGTEXT NOT NULL,

    UNIQUE INDEX `Image_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
