import PrismaClient from "@prismajs/client";

export class CreateMessagesService {
  async execute(message: string, user_id: string) {
    const m = await PrismaClient.message.create({
        data: {
          message,
          user_id
        },
        include: {
          user: true
        }
    })

    return message
  }
}