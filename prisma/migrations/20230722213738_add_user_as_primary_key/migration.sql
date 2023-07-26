/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senha` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cargo` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "senha" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "gender" SET DATA TYPE CHAR,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "cargo" SET NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("username");
