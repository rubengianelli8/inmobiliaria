/*
  Warnings:

  - The values [alquiler,venta,both] on the enum `inm_estate_type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `antique` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area_m2` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area_m3` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bathrooms` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `between_streets` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commercial_use` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credit` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flat` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floors` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `garages` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_cartel` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internal_number` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `luminosity` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orientation` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pets` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pool` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_ceiling` to the `inm_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yard` to the `inm_estate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inm_estate` ADD COLUMN `antique` INTEGER NOT NULL,
    ADD COLUMN `area_m2` INTEGER NOT NULL,
    ADD COLUMN `area_m3` INTEGER NOT NULL,
    ADD COLUMN `bathrooms` INTEGER NOT NULL,
    ADD COLUMN `bedrooms` INTEGER NOT NULL,
    ADD COLUMN `between_streets` VARCHAR(70) NOT NULL,
    ADD COLUMN `commercial_use` BOOLEAN NOT NULL,
    ADD COLUMN `credit` BOOLEAN NOT NULL,
    ADD COLUMN `flat` VARCHAR(10) NOT NULL,
    ADD COLUMN `floor` VARCHAR(10) NOT NULL,
    ADD COLUMN `floors` INTEGER NOT NULL,
    ADD COLUMN `garages` INTEGER NOT NULL,
    ADD COLUMN `has_cartel` BOOLEAN NOT NULL,
    ADD COLUMN `internal_number` VARCHAR(10) NOT NULL,
    ADD COLUMN `luminosity` ENUM('Buena', 'Regular', 'Mala') NOT NULL,
    ADD COLUMN `orientation` VARCHAR(20) NOT NULL,
    ADD COLUMN `pets` BOOLEAN NOT NULL,
    ADD COLUMN `pool` BOOLEAN NOT NULL,
    ADD COLUMN `province` VARCHAR(20) NOT NULL,
    ADD COLUMN `type_ceiling` ENUM('Loza', 'Chapa', 'Madera') NOT NULL,
    ADD COLUMN `yard` BOOLEAN NOT NULL,
    MODIFY `type` ENUM('Alquiler', 'Venta', 'Ambos') NOT NULL;
