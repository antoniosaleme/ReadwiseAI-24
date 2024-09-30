/*
  Warnings:

  - Changed the type of `difficultWordsB2` on the `GeneratedText` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `difficultWordsC2` on the `GeneratedText` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GeneratedText" DROP COLUMN "difficultWordsB2",
ADD COLUMN     "difficultWordsB2" JSONB NOT NULL,
DROP COLUMN "difficultWordsC2",
ADD COLUMN     "difficultWordsC2" JSONB NOT NULL;
