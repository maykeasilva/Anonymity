import { Prisma, Answer } from '@prisma/client'
import { AnswersRepository } from '../questions-repository'

export class InMemoryAnswersRepository implements AnswersRepository {
  public database: Answer[] = []

  async create(data: Prisma.AnswerUncheckedCreateInput) {
    const answer = {
      id: data.id ?? this.database.length + 1,
      questionId: data.questionId,
      body: data.body
    }

    this.database.push(answer)

    return answer
  }
}
