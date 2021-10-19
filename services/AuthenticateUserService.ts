import axios from 'axios'
import PrismaClient from '@prisma/client'
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
  }
}