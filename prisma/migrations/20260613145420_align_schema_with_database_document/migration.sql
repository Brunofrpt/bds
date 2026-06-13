/*
  Warnings:

  - The primary key for the `Technology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `Technology` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `slug` on the `Technology` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(120)`.

*/
-- AlterTable
ALTER TABLE `Technology` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `slug` VARCHAR(120) NOT NULL,
    MODIFY `logoUrl` VARCHAR(500) NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `Project_isPublished_idx` ON `Project`(`isPublished`);

-- CreateIndex
CREATE INDEX `Project_publishedAt_idx` ON `Project`(`publishedAt`);

-- CreateIndex
CREATE INDEX `Project_createdAt_idx` ON `Project`(`createdAt`);
