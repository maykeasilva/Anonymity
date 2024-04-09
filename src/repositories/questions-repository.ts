import { Prisma, Question } from '@prisma/client'

export interface QuestionRepository {
  findById(id: number): Promise<Question | null>
  create(data: Prisma.QuestionUncheckedCreateInput): Promise<Question>
}
