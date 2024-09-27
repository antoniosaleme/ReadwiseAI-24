/*
  Warnings:

  - The `difficultWordsB2` column on the `GeneratedText` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `difficultWordsC2` column on the `GeneratedText` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GeneratedText" DROP COLUMN "difficultWordsB2",
ADD COLUMN     "difficultWordsB2" JSONB[],
DROP COLUMN "difficultWordsC2",
ADD COLUMN     "difficultWordsC2" JSONB[];
