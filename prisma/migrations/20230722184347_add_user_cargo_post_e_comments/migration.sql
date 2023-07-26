-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50),
    "senha" VARCHAR(250),
    "gender" CHAR,
    "email" VARCHAR(250),
    "cargo" VARCHAR(250),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cargo" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(250),
    "nucleo" VARCHAR(250),

    CONSTRAINT "cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR(50),
    "content" VARCHAR(250),

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "post_id" VARCHAR(50),
    "user_id" VARCHAR(50),
    "content" VARCHAR(250),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);
