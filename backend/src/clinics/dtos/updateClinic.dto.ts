import { PartialType } from '@nestjs/swagger'
import { CreateClinicDto } from './createClinic.dto'

export class UpdateClinicDto extends PartialType(CreateClinicDto) {}
