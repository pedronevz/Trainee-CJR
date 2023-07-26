/*
  Warnings:

  - The primary key for the `logado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `logado` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `logado` table. All the data in the column will be lost.
  - Added the required column `username` to the `logado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logado" DROP CONSTRAINT "logado_pkey",
DROP COLUMN "id",
DROP COLUMN "user",
ADD COLUMN     "username" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "logado_pkey" PRIMARY KEY ("username");

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gender" SET DATA TYPE CHAR;
