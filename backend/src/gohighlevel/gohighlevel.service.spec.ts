import { Test, TestingModule } from '@nestjs/testing'
import { GohighlevelService } from './gohighlevel.service'

describe('GohighlevelService', () => {
  let service: GohighlevelService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GohighlevelService],
    }).compile()

    service = module.get<GohighlevelService>(GohighlevelService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
