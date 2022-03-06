/*
  Warnings:

  - Added the required column `dni` to the `inm_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personal_address` to the `inm_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inm_user` ADD COLUMN `cell_phone` VARCHAR(35) NULL,
    ADD COLUMN `dni` INTEGER NOT NULL,
    ADD COLUMN `personal_address` VARCHAR(20) NOT NULL,
    ADD COLUMN `phone` VARCHAR(35) NULL,
    ADD COLUMN `work_address` VARCHAR(30) NULL;
