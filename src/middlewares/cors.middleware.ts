// cors.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  private allowedOrigins = [
    'https://hafiyacu.rw',
    'https://www.hafiyacu.rw',
    'http://localhost',
  ]

  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin
    if (this.allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin)
    }
    res.header('Access-Control-Allow-Methods', '*') // Allow all standard HTTP methods
    res.header('Access-Control-Allow-Headers', '*') // Allow all headers
    next()
  }
}
