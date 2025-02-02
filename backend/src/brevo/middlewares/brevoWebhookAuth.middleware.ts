import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class BrevoWebhookAuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const tokenFromQuery = req.query.token as string // Token enviado en la URL
    const expectedToken = this.configService.get<string>('BREVO_WEBHOOK_SECRET')

    if (!tokenFromQuery || tokenFromQuery !== expectedToken) {
      throw new UnauthorizedException('Invalid Brevo Webhook Token')
    }

    next()
  }
}
