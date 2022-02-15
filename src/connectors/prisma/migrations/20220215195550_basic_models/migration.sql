-- CreateTable
CREATE TABLE `inm_real_estate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(128) NOT NULL,

    UNIQUE INDEX `inm_real_estate_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inm_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `id_real_estate` INTEGER NOT NULL,

    UNIQUE INDEX `inm_user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inm_owner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `inm_owner_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inm_client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `inm_client_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inm_billing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_client` INTEGER NOT NULL,

    UNIQUE INDEX `inm_billing_id_client_key`(`id_client`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inm_user` ADD CONSTRAINT `inm_user_id_real_estate_fkey` FOREIGN KEY (`id_real_estate`) REFERENCES `inm_real_estate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inm_owner` ADD CONSTRAINT `inm_owner_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `inm_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inm_client` ADD CONSTRAINT `inm_client_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `inm_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inm_billing` ADD CONSTRAINT `inm_billing_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `inm_client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
