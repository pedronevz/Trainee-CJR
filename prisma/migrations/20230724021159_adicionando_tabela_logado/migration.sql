-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gender" SET DATA TYPE CHAR;

-- CreateTable
CREATE TABLE "logado" (
    "username" VARCHAR(50) NOT NULL,

    CONSTRAINT "logado_pkey" PRIMARY KEY ("username")
);
