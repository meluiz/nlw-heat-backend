import PrismaClient from "@prismajs/client";

export class CreateMessagesService {
  async execute(text: string, user_id: string) {
    const message = await PrismaClient.message.create({
        data: {
          text,
          user_id
        },
        include: {
          user: true
        }
    })

    return message
  }
}