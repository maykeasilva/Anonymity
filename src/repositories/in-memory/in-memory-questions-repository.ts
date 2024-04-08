import { Prisma, Question } from '@prisma/client'
import { QuestionsRepository } from '../questions-repository'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public database: Question[] = []
  
  async create(data: Prisma.QuestionUncheckedCreateInput) {
    const question = {
      id: data.id ?? this.database.length + 1,
      userId: data.userId,
      slug: data.slug,
      body: data.body,
      answersPerPerson: data.answersPerPerson,
      closedAt: data.closedAt ? new Date() : null,
      createdAt: new Date(),
    }

    this.database.push(question)

    return question
  }
}
