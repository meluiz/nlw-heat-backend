import PrismaClient from "@prismajs/client";


export class GetLastMessage {
  async execute(quantity: number) {
    const messages = await PrismaClient.message.findMany({
      take: quantity,
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