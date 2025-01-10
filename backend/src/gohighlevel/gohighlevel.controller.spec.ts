import { Test, TestingModule } from '@nestjs/testing'
import { GohighlevelController } from './gohighlevel.controller'

describe('GohighlevelController', () => {
  let controller: GohighlevelController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GohighlevelController],
    }).compile()

    controller = module.get<GohighlevelController>(GohighlevelController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
