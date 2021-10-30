import { Request, Response } from 'express'

/* ------| Services |------ */
import { CreateMessagesService } from '@service/CreateMessagesService'
import { GetLastMessage } from '@service/GetLastMessage'

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
  
  async GetLastMessage(request: Request, response: Response) {
    const service = new GetLastMessage()
    try {
      const { quantity } = request.params
      
      if (isNaN(Number(quantity))) {
        return response.status(502).json({
          type: 'not_accepted',
          error: `The param :quantity needs to be a number. Received '${quantity}'.`
        })
      }

      const result = await service.execute(Number(quantity))
      return response.json(result)
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}