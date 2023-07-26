/*
  Warnings:

  - The primary key for the `logado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `username` on the `logado` table. All the data in the column will be lost.
  - Added the required column `user` to the `logado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logado" DROP CONSTRAINT "logado_pkey",
DROP COLUMN "username",
ADD COLUMN     "user" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "logado_pkey" PRIMARY KEY ("user");

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gender" SET DATA TYPE CHAR;
