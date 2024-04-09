import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryQuestionsRepository } from '../repositories/in-memory/in-memory-questions-repository'
import { InMemoryAnswersRepository } from '../repositories/in-memory/in-memory-answers-repository'
import { CreateQuestionUseCase } from './create-question'
import { CreateAnswerUseCase } from './create-answer'

let usersRepository: InMemoryUsersRepository
let questionsRepository: InMemoryQuestionsRepository
let answersRepository: InMemoryAnswersRepository
let sut: CreateAnswerUseCase

describe('create answer use case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    questionsRepository = new InMemoryQuestionsRepository()
    answersRepository = new InMemoryAnswersRepository()
    sut = new CreateAnswerUseCase(answersRepository, questionsRepository)

    await usersRepository.create({
      id: 'user-001',
      username: 'John Doe',
      email: 'johndoe@example.com',
    })

    await questionsRepository.create({
      id: 0,
      userId: 'user-001',
      body: 'my creative question',
      answersPerPerson: 1,
    })
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: 0,
      body: 'my creative answer'
    })

    expect(answer.id).toEqual(expect.any(Number))
    expect(answer.body).toEqual(expect.any(String))
  })

  it('should not be able to create an answer for an not existing question', async () => {
    expect(async _ => 
           await sut.execute({ questionId: 1, body: 'my creative answer'})
          ).rejects.toBeInstanceOf(Error)
  })
})
