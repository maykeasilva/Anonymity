import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryQuestionsRepository } from '../repositories/in-memory/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let usersRepository: InMemoryUsersRepository
let questionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('create question use case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(questionsRepository, usersRepository)

    await usersRepository.create({
      id: 'user-001',
      username: 'John Doe',
      email: 'johndoe@example.com',
    })
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      userId: 'user-001',
      body: 'my creative question',
      answersPerPerson: 1
    })

    expect(question.id).toEqual(expect.any(Number))
    expect(question).toEqual(expect.objectContaining({ body: 'my creative question', answersPerPerson: 1, slug: 'my-creative-question' }))
  })

  it('should remove symbols to the slug', async () => {
    const { question } = await sut.execute({
      userId: 'user-001',
      body: 'my ----  ___ [[[ creative quéstiôn?',
      answersPerPerson: 1 
    })

    expect(question).toEqual(expect.objectContaining({ slug: 'my-creative-question' }))
  })
})
