/*
  Warnings:

  - Added the required column `address_number` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `inm_estate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inm_estate` ADD COLUMN `address_number` VARCHAR(10) NOT NULL,
    ADD COLUMN `city` VARCHAR(50) NOT NULL,
    ADD COLUMN `neighborhood` VARCHAR(50) NOT NULL,
    ADD COLUMN `status` ENUM('Alquilada', 'Vendida', 'En_construccion', 'En_reparacion', 'Disponible') NOT NULL,
    MODIFY `type` ENUM('alquiler', 'venta', 'both') NOT NULL;

-- CreateTable
CREATE TABLE `inm_prospective_buyers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_client` INTEGER NOT NULL,
    `id_estate` INTEGER NOT NULL,

    UNIQUE INDEX `inm_prospective_buyers_id_client_key`(`id_client`),
    UNIQUE INDEX `inm_prospective_buyers_id_estate_key`(`id_estate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inm_prospective_buyers` ADD CONSTRAINT `inm_prospective_buyers_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `inm_client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inm_prospective_buyers` ADD CONSTRAINT `inm_prospective_buyers_id_estate_fkey` FOREIGN KEY (`id_estate`) REFERENCES `inm_estate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
