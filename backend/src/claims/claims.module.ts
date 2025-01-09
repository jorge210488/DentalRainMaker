import { Module } from '@nestjs/common'
import { ClaimsService } from './claims.service'
import { ClaimsController } from './claims.controller'

@Module({
  providers: [ClaimsService],
  controllers: [ClaimsController],
})
export class ClaimsModule {}
