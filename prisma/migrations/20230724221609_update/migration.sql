-- AlterTable
CREATE SEQUENCE logado_user_id_seq;
ALTER TABLE "logado" ALTER COLUMN "user_id" SET DEFAULT nextval('logado_user_id_seq');
ALTER SEQUENCE logado_user_id_seq OWNED BY "logado"."user_id";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gender" SET DATA TYPE CHAR;
