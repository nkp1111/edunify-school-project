-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `adddress` TEXT NOT NULL,
    `city` TEXT NOT NULL,
    `state` TEXT NOT NULL,
    `contact` INTEGER NOT NULL,
    `image` TEXT NOT NULL,
    `email_id` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
