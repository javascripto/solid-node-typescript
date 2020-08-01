import { Request, Response } from 'express';

import { CreateUserDTO } from './CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(request: Request<{}, {}, CreateUserDTO>, response: Response) {
    const { name, email, password } = request.body
    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password,
      })
      return response.status(201).send()
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}
