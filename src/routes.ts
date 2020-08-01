import { Router } from 'express'

import { createUserController } from './useCases/CreateUser';

export const router = Router()

router.post('/users', async (request, response) => {
  await createUserController.handle(request, response)
})
