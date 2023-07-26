-- AlterTable
ALTER TABLE "logado" ADD COLUMN     "user_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gender" SET DATA TYPE CHAR;
