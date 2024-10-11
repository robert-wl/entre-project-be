-- CreateTable
CREATE TABLE `Itinerary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tripId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `itineraryOwnerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItineraryDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `itineraryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItineraryItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startHour` VARCHAR(191) NOT NULL,
    `endHour` VARCHAR(191) NOT NULL,
    `detailName` VARCHAR(191) NOT NULL,
    `itineraryDetailId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Itinerary` ADD CONSTRAINT `Itinerary_itineraryOwnerId_fkey` FOREIGN KEY (`itineraryOwnerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryDetail` ADD CONSTRAINT `ItineraryDetail_itineraryId_fkey` FOREIGN KEY (`itineraryId`) REFERENCES `Itinerary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryItem` ADD CONSTRAINT `ItineraryItem_itineraryDetailId_fkey` FOREIGN KEY (`itineraryDetailId`) REFERENCES `ItineraryDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
