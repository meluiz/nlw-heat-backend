import PrismaClient from "@prismajs/client";


export class ProfileUserService {
  async execute(user_id: string) {
    const user = await PrismaClient.user.findFirst({
      where: {
        id: user_id
      }
    })

    return user
  }
}