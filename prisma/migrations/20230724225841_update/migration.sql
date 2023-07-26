-- AlterTable
ALTER TABLE "logado" ADD COLUMN     "user_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gender" SET DATA TYPE CHAR;
