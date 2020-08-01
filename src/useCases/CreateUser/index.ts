import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';
import { MailTrapMailProvider } from '../../providers/implementations/MailTrapMailProvider';
import { InMemoryUsersRepository } from '../../repositories/implementations/InMemoryUsersRepository';

const mailProvider = new MailTrapMailProvider()
const usersRepository = new InMemoryUsersRepository()

const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  mailProvider,
)

export const createUserController = new CreateUserController(
  createUserUseCase
)
