/*
  Warnings:

  - You are about to alter the column `photo` on the `destination` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `profilePic` on the `user` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `destination` MODIFY `photo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `profilePic` VARCHAR(191) NULL;
