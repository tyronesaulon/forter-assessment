-- AlterTable
ALTER TABLE "message" ADD COLUMN     "question_id" BIGINT;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
