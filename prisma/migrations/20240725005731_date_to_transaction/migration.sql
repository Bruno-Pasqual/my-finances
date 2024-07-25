/*
  Warnings:

  - Added the required column `dataCriacao` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `dataCriacao` DATETIME(3) NOT NULL;
