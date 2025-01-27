import {
  Controller,
  Get,
  Query,
  Patch,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common'
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
import { UpdateContactDto } from './dtos/updateContact.dto'

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

  @Patch(':remote_id')
  @ApiOperation({ summary: 'Update contact by remote ID' })
  @ApiQuery({ name: 'clinicId', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Contact updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 404, description: 'Contact not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Permissions('ALL_ACCESS', 'UPDATE_USER')
  async updateContact(
    @Query('clinicId') clinicId: string,
    @Param('remote_id') remoteId: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactsService.updateContact(
      clinicId,
      remoteId,
      updateContactDto,
    )
  }
}
