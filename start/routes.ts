import { Router, Request, Response } from 'express'
import { UserController } from '@app/controllers/http/UserController'

const router = Router()

router.get('/github', (request: Request, response: Response) => {
  return response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

router.get('/signin/callback', (request: Request, response: Response) => {
  const { code } = request.query
  return response.json(code)
})

router.post('/authenticate', new UserController().handle)

export default router