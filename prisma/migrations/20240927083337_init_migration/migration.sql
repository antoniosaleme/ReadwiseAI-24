/*
  Warnings:

  - You are about to drop the column `audioB2` on the `GeneratedText` table. All the data in the column will be lost.
  - You are about to drop the column `audioC2` on the `GeneratedText` table. All the data in the column will be lost.
  - Added the required column `audioB2Url` to the `GeneratedText` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audioC2Url` to the `GeneratedText` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeneratedText" DROP COLUMN "audioB2",
DROP COLUMN "audioC2",
ADD COLUMN     "audioB2Url" TEXT NOT NULL,
ADD COLUMN     "audioC2Url" TEXT NOT NULL;
