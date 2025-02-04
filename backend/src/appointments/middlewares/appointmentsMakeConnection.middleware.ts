import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppointmentsMakeConnectionMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const tokenFromQuery = req.query.token as string // Token enviado en la URL
    const expectedToken = this.configService.get<string>(
      'APPOINTMENTS_SURVEY_SECRET',
    )

    if (!tokenFromQuery || tokenFromQuery !== expectedToken) {
      throw new UnauthorizedException('Invalid Appointments Token')
    }

    next()
  }
}
