import { Module } from '@nestjs/common'
import { GohighlevelService } from './gohighlevel.service'
import { GohighlevelController } from './gohighlevel.controller'

@Module({
  providers: [GohighlevelService],
  controllers: [GohighlevelController],
})
export class GohighlevelModule {}
