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
  async execute(code: string) {}
}