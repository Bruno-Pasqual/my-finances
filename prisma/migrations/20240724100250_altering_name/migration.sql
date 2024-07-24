/*
  Warnings:

  - You are about to drop the column `categoria` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `categoria`,
    ADD COLUMN `titulo` VARCHAR(191) NOT NULL DEFAULT '';
