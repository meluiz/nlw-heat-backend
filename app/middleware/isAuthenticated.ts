import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
  const access_token = request.headers.authorization

  if (!access_token) {
    response.status(401).json({
      type: 'invalid',
      error: 'Token is invalid'
    })
  }
  
  try {
    const [, token] = access_token.split(' ')
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

    request.user_id = sub

    return next()
  } catch (error) {
    response.status(401).json({
      type: 'invalid',
      error: 'Token expired'
    })
  }
}