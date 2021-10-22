import PrismaClient from "@prismajs/client";
import { io } from "server";

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

    const data = {
      message: m.message,
      user_id: m.user_id,
      user: {
        avatar: m.user.avatar_url,
        username: m.user.name,
        name: m.user.name,
      },
      createdAt: m.created_at
    }

    io.emit('new_message', data)

    return m
  }
}