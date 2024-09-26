/*
  Warnings:

  - Added the required column `audioB2` to the `GeneratedText` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audioC2` to the `GeneratedText` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeneratedText" ADD COLUMN     "audioB2" BYTEA NOT NULL,
ADD COLUMN     "audioC2" BYTEA NOT NULL;
