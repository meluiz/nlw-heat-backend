import { Request, Response } from 'express'

/* ------| Services |------ */
import { AuthenticateUserService } from '@service/AuthenticateUserService'

export class UserController {
  async handle(request: Request, response: Response) {
    const { code } = request.body
    const service = new AuthenticateUserService()
    
    try {
      const result = await service.execute(code)
      return response.json(result)
    } catch (error) {
      return response.json({ error: error.message })
    }
  
  }
}