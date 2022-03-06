/*
  Warnings:

  - You are about to drop the column `id_real_estate` on the `inm_user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `inm_user` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `inm_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `inm_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `inm_user` DROP FOREIGN KEY `inm_user_id_real_estate_fkey`;

-- AlterTable
ALTER TABLE `inm_user` DROP COLUMN `id_real_estate`,
    DROP COLUMN `password`,
    ADD COLUMN `first_name` VARCHAR(40) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(40) NOT NULL;

-- CreateTable
CREATE TABLE `inm_estate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(100) NOT NULL,
    `type` ENUM('alquiler', 'venta') NOT NULL,
    `price` INTEGER NOT NULL,
    `id_owner` INTEGER NOT NULL,
    `id_client` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inm_estate` ADD CONSTRAINT `inm_estate_id_owner_fkey` FOREIGN KEY (`id_owner`) REFERENCES `inm_owner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inm_estate` ADD CONSTRAINT `inm_estate_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `inm_client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
