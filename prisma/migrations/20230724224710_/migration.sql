/*
  Warnings:

  - You are about to drop the column `user_id` on the `logado` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "logado" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gender" SET DATA TYPE CHAR;
