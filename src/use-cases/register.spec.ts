import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      username: 'John Doe',
      email: 'johndoe@example.com',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'
    
    await sut.execute({
      username: 'John Doe',
      email,
    })

    expect(() => 
      sut.execute({
        username: 'John Doe',
        email,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
