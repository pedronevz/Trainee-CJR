-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "date" VARCHAR(10);

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "date" VARCHAR(10);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gender" SET DATA TYPE CHAR;
