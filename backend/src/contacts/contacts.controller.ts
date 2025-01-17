import { Controller, Get, Query } from '@nestjs/common'
import { ContactsService } from './contacts.service'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger'

@ApiTags('Contacts')
@ApiBearerAuth()
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

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
  async getContacts(@Query('clinicId') clinicId: string) {
    return await this.contactsService.getContacts(clinicId)
  }
}
