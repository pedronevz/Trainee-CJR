/*
  Warnings:

  - The primary key for the `logado` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "logado" DROP CONSTRAINT "logado_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "logado_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gender" SET DATA TYPE CHAR;
