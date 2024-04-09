import { Prisma, Answer } from '@prisma/client'

export interface AnswerRepository {
  create(data: Prisma.AnswerUncheckedCreateInput): Promise<Question>
}
