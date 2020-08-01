import { Router } from 'express'

export const router = Router()

router.post('/user', (request, response) => {
  return response.status(201).send()
})
