import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Clinic } from './schemas/clinic.schema'
import { CreateClinicDto } from './dtos/createClinic.dto'
import { UpdateClinicDto } from './dtos/updateClinic.dto'
import * as clinicsData from '../utils/clinics.json'
import { BrevoService } from 'src/brevo/brevo.service'

@Injectable()
export class ClinicsService {
  private readonly logger = new Logger(ClinicsService.name)
  constructor(
    @InjectModel(Clinic.name) private readonly clinicModel: Model<Clinic>,
    private readonly brevoService: BrevoService,
  ) {}

  async create(createClinicDto: CreateClinicDto): Promise<Clinic> {
    const { clinic_name, clinic_website } = createClinicDto

    // Verificar si la clínica ya existe en MongoDB
    const existingClinic = await this.clinicModel.findOne({ clinic_name })
    if (existingClinic) {
      throw new BadRequestException('Clinic already exists')
    }

    // Crear la clínica en la base de datos
    const clinic = new this.clinicModel(createClinicDto)
    await clinic.save()
    console.log(
      `✅ Clínica ${clinic_name} creada en MongoDB con ID: ${clinic._id}`,
    )

    // 🔹 Registrar la clínica en Brevo
    const createBrevoCompanyDto = {
      clinic_id: clinic._id,
      clinic_name,
      clinic_website,
    }

    try {
      await this.brevoService.registerCompany(createBrevoCompanyDto)
      console.log('✅ Clinic Register at Brevo:', createBrevoCompanyDto)
    } catch (error) {
      console.error('❌ Error al registrar clínica en Brevo:', error.message)
      throw new BadRequestException('Failed to register clinic in Brevo.')
    }

    return clinic
  }

  async findAll(): Promise<Clinic[]> {
    return this.clinicModel.find().exec()
  }

  async findById(id: string): Promise<Clinic> {
    const clinic = await this.clinicModel.findById(id).exec()
    if (!clinic) {
      throw new NotFoundException('Clinic not found')
    }
    return clinic
  }

  async update(id: string, updateClinicDto: UpdateClinicDto): Promise<Clinic> {
    const clinic = await this.clinicModel
      .findByIdAndUpdate(id, updateClinicDto, { new: true })
      .exec()

    if (!clinic) {
      throw new NotFoundException('Clinic not found')
    }

    return clinic
  }

  async delete(id: string): Promise<void> {
    const result = await this.clinicModel.findByIdAndDelete(id).exec()
    if (!result) {
      throw new NotFoundException('Clinic not found')
    }
  }

  async preloadClinics(): Promise<void> {
    this.logger.log('Starting clinic preload process...')

    for (const clinicData of clinicsData) {
      const createClinicDto: CreateClinicDto = {
        clinic_name: clinicData.clinic_name,
        clinic_website: clinicData.clinic_website || null,
      }

      try {
        await this.create(createClinicDto)
        // console.log(`Clinic ${createClinicDto.clinic_name} created successfully.`);
      } catch (error) {
        if (error instanceof BadRequestException) {
          // console.log(`Clinic ${createClinicDto.clinic_name} already exists. Skipping.`);
        } else {
          // console.error(`Failed to create clinic ${createClinicDto.clinic_name}: ${error.message}`);
        }
      }
    }

    this.logger.log('Clinic preload process completed.')
  }
}
