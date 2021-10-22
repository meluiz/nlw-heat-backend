import { Request, Response } from 'express'

/* ------| Services |------ */
import { CreateMessagesService } from '@service/CreateMessagesService'
import { GetLastThreeMessagesService } from '@service/GetLastThreeMessagesService'

export class MessageController {
  async handle(request: Request, response: Response) {
    const { message } = request.body
    const { user_id } = request

    const service = new CreateMessagesService()

    try {
      const result = await service.execute(message, user_id)
      return response.json(result)
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
  
  async GetLastThreeMessages(request: Request, response: Response) {
    const service = new GetLastThreeMessagesService()
    try {
      const result = await service.execute()
      return response.json(result)
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}