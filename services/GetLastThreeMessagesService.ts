import PrismaClient from "@prismajs/client";


export class GetLastThreeMessagesService {
  async execute() {
    const messages = await PrismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: 'desc'
      },
      include: {
        user: true
      }
    })

    return messages
  }
}