import { IsBoolean, IsIn, IsNotEmpty } from 'class-validator'

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsIn(['confirmed', 'cancelled', 'completed', 'broken', 'pending', 'paid'])
  field: 'confirmed' | 'cancelled' | 'completed' | 'broken' | 'pending' | 'paid'

  @IsBoolean()
  value: boolean
}
