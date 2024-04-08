import { Question } from '@prisma/client'
import { QuestionsRepository } from '../repositories/questions-repository'
import { UsersRepository } from '../repositories/users-repository'
import { generateSlug } from '../utils/generate-slug'

interface CreateQuestionUseCaseRequest {
  userId: string
  body: string
  answersPerPerson: number
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository, private usersRepository: UsersRepository) {}

  async execute({ userId, body, answersPerPerson }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) throw new Error()

    const question = await this.questionsRepository.create({
      userId, 
      body, 
      answersPerPerson,
      slug: generateSlug(body)
    })

    return { question }   
  }
}
