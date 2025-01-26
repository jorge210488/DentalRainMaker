import { IsOptional, IsString, IsArray, IsObject } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

class CancelerDTO {
  @IsString()
  @ApiProperty({
    example: 'resources/provider_1',
    description: 'Name of the provider.',
  })
  name: string

  @IsString()
  @ApiProperty({
    example: 'provider_1',
    description: 'Remote ID of the provider.',
  })
  remote_id: string
}

export class CancelAppointmentDto {
  @IsObject()
  @ApiProperty({
    example: {
      name: 'resources/provider_1',
      remote_id: 'provider_1',
    },
    description: 'Provider associated with the cancellation.',
  })
  canceler: CancelerDTO

  @IsString()
  @ApiProperty({
    example: 'appointments/1413',
    description: 'Appointment name associated.',
  })
  name: string
}
