/*
  Warnings:

  - Added the required column `context` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developedSkills` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heroImageAlt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heroImageUrl` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectives` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `results` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seoDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seoTitle` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicalStackDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` ADD COLUMN `canonicalUrl` VARCHAR(500) NULL,
    ADD COLUMN `context` LONGTEXT NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `demoUrl` VARCHAR(500) NULL,
    ADD COLUMN `developedSkills` JSON NOT NULL,
    ADD COLUMN `githubUrl` VARCHAR(500) NULL,
    ADD COLUMN `heroImageAlt` VARCHAR(255) NOT NULL,
    ADD COLUMN `heroImageUrl` VARCHAR(500) NOT NULL,
    ADD COLUMN `improvements` JSON NULL,
    ADD COLUMN `isPublished` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `objectives` JSON NOT NULL,
    ADD COLUMN `ogImageUrl` VARCHAR(500) NULL,
    ADD COLUMN `publishedAt` DATETIME(3) NULL,
    ADD COLUMN `results` JSON NOT NULL,
    ADD COLUMN `seoDescription` VARCHAR(500) NOT NULL,
    ADD COLUMN `seoTitle` VARCHAR(255) NOT NULL,
    ADD COLUMN `shortDescription` TEXT NOT NULL,
    ADD COLUMN `technicalStackDescription` LONGTEXT NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `videoUrl` VARCHAR(500) NULL;
