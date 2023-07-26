/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "author" VARCHAR(50);

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "senha" DROP NOT NULL,
ALTER COLUMN "gender" SET DATA TYPE CHAR,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
