-- CreateTable
CREATE TABLE `ProjectTechnology` (
    `projectId` VARCHAR(191) NOT NULL,
    `technologyId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ProjectTechnology_projectId_idx`(`projectId`),
    INDEX `ProjectTechnology_technologyId_idx`(`technologyId`),
    PRIMARY KEY (`projectId`, `technologyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectTechnology` ADD CONSTRAINT `ProjectTechnology_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectTechnology` ADD CONSTRAINT `ProjectTechnology_technologyId_fkey` FOREIGN KEY (`technologyId`) REFERENCES `Technology`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
