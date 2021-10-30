import { Router, Request, Response } from 'express'

/* ------| Middleware |------ */
import { isAuthenticated } from '@app/middleware/isAuthenticated'

/* ------| Controllers |------ */
import { UserController } from '@app/controllers/http/UserController'
import { MessageController } from '@app/controllers/http/MessageController'

const router = Router()

router.get('/github', (request: Request, response: Response) => {
  return response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

router.get('/signin/callback', (request: Request, response: Response) => {
  const { code } = request.query
  return response.json(code)
})

router.post('/authenticate', new UserController().handle)
router.get('/profile', isAuthenticated, new UserController().profile)
router.post('/messages', isAuthenticated, new MessageController().handle)
router.post('/messages/three', new MessageController().GetLastThreeMessages)

export default router