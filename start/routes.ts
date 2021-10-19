import { Router } from 'express'

const router = Router()

router.get('/github', (request: Request, response: Response) => {
  return response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

export default router