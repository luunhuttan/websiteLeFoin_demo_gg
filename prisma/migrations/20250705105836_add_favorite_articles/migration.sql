-- CreateTable
CREATE TABLE `_UserFavoriteArticles` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserFavoriteArticles_AB_unique`(`A`, `B`),
    INDEX `_UserFavoriteArticles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserFavoriteArticles` ADD CONSTRAINT `_UserFavoriteArticles_A_fkey` FOREIGN KEY (`A`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserFavoriteArticles` ADD CONSTRAINT `_UserFavoriteArticles_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
