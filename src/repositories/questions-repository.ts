import { Prisma, Question } from '@prisma/client'

export interface QuestionRepository {
  create(data: Prisma.QuestionUncheckedCreateInput): Promise<Question>
}
