import axios from 'axios'
import PrismaClient from '@prismajs/client'
import { sign } from 'jsonwebtoken'

/* ------| Types |------ */
interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  id: number
  name: string
  login: string
  avatar_url: string
}

export class AuthenticateUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token'
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        'Accept': 'application/json'
      }
    })

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    const { id, name, login, avatar_url } = response.data
    let user = await PrismaClient.user.findFirst({
      where: {
        github_id: id
      }
    })

    if (!user) {
      user = await PrismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name
        }
      })
    }

    const token = sign({
      user: {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url
      }
    }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d'
    })

    return { token, user }
  }
}