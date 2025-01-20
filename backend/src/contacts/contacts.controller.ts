import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common'
import { ContactsService } from './contacts.service'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger'
import { RolesGuard } from '../guards/role.guard'
import { PermissionsGuard } from '../guards/permission.guard'
import { Permissions } from '../decorators/permissions.decorator'

@ApiBearerAuth()
@ApiTags('Contacts')
@Controller('contacts')
@UseGuards(RolesGuard, PermissionsGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: 'Obtener contactos desde Kolla',
    description: 'Devuelve una lista de contactos desde la API de Kolla.',
  })
  @ApiQuery({
    name: 'clinicId',
    description: 'ID de la clínica para obtener los contactos.',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de contactos obtenida exitosamente.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '12345' },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john.doe@example.com' },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'ID de clínica no válido.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
  })
  @Permissions('ALL_ACCESS', 'READ_OWN_USER')
  async getContacts(@Query('clinicId') clinicId: string) {
    return await this.contactsService.getContacts(clinicId)
  }

  @Get(':remote_id')
  @ApiOperation({ summary: 'Get contact by remote ID' })
  @ApiQuery({ name: 'clinicId', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Contact found.' })
  @ApiResponse({ status: 404, description: 'Contact not found.' })
  @Permissions('ALL_ACCESS', 'READ_OWN_USER')
  async getContactById(
    @Query('clinicId') clinicId: string,
    @Param('remote_id') remoteId: string,
  ) {
    return this.contactsService.getContactById(clinicId, remoteId)
  }


  @Get('patients')
  @ApiOperation({ summary: 'Get patients' })
  @ApiQuery({ name: 'clinicId', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Patients found.' })
  @ApiResponse({ status: 404, description: 'Patients not found.' })
  @Permissions('ALL_ACCESS')
  async getPatients(
    @Query('clinicId') clinicId: string,
  ) {
    return this.contactsService.getPatients(clinicId)
  }
}
