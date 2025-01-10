import { IsBoolean, IsIn, IsNotEmpty } from 'class-validator'

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsIn(['confirmed', 'cancelled', 'completed', 'broken'])
  field: 'confirmed' | 'cancelled' | 'completed' | 'broken'

  @IsBoolean()
  value: boolean
}
