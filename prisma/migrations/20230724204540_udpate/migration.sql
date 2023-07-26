/*
  Warnings:

  - The `user_id` column on the `post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "user_id",
ADD COLUMN     "user_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gender" SET DATA TYPE CHAR;
