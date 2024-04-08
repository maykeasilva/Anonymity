import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'

interface RegisterUseCaseRequest {
  username: string
  email: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    email,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error()
    }

    const user = await this.usersRepository.create({
      username,
      email,
    })

    return {
      user,
    }
  }
}
