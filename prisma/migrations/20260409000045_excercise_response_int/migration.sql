/*
  Warnings:

  - Added the required column `reqResponse` to the `exCatUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exCatUser" ADD COLUMN     "reqResponse" TEXT NOT NULL;
