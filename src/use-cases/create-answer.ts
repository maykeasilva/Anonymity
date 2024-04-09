// TODO Check for limit

import { Answer } from '@prisma/client'
import { AnswersRepository } from '../repositories/answers-repository'
import { UsersRepository } from '../repositories/users-repository'

interface CreateAnswerUseCaseRequest {
  questionId: number
  body: string
}

interface CreateAnswerUseCaseResponse {
  answer: Answer
}

export class CreateAnswerUseCase {
  constructor(private answersRepository: AnswersRepository, private questionsRepository: QuestionsRepository) {}

  async execute({ questionId, body }: CreateAnswerUseCaseRequest): Promise<CreateAnswerUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) throw new Error()

    const answer = await this.answersRepository.create({ questionId, body })

    return { answer }   
  }
}
