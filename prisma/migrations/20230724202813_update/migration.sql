-- AlterTable
ALTER TABLE "post" ADD COLUMN     "author" VARCHAR(50);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gender" SET DATA TYPE CHAR;
