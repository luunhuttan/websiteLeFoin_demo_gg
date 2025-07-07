/*
  Warnings:

  - Added the required column `content_en` to the `article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_vi` to the `article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_en` to the `article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_vi` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `content_en` TEXT NOT NULL,
    ADD COLUMN `content_vi` TEXT NOT NULL,
    ADD COLUMN `title_en` VARCHAR(191) NOT NULL,
    ADD COLUMN `title_vi` VARCHAR(191) NOT NULL;
