import { Injectable, NotFoundException, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { UpdateUserDto } from './dto/updateUser.dto'
import * as updateUsersData from '../utils/updateUsers.json'
import { Clinic, ClinicDocument } from '../clinics/schemas/clinic.schema'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Clinic.name)
    private readonly clinicModel: Model<ClinicDocument>,
  ) {}

  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec()
  }

  async getUserById(_id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(_id).exec()
    if (!user) {
      throw new NotFoundException(`User with ID "${_id}" not found`)
    }
    return user
  }

  async updateUser(
    _id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(_id, updateUserDto, {
        new: true,
      })
      .exec()
    if (!updatedUser) {
      throw new NotFoundException('User not found')
    }
    return updatedUser
  }

  async updateStateUser(_id: string, state: string): Promise<UserDocument> {
    const updatedStateUser = await this.userModel
      .findByIdAndUpdate(_id, { state }, { new: true })
      .exec()
    if (!updatedStateUser) {
      throw new NotFoundException('User not found')
    }
    return updatedStateUser
  }

  async deleteUser(_id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(_id).exec()
    if (!result) {
      throw new NotFoundException('User not found')
    }
  }

  async preloadUpdateUsers(): Promise<void> {
    this.logger.log('Starting preload of update users data...')

    for (const userData of updateUsersData) {
      try {
        // Buscar usuario por email
        const user = await this.userModel
          .findOne({ primary_email_address: userData.email })
          .exec()

        if (!user) {
          // this.logger.warn(`User with email ${userData.email} not found. Skipping...`);
          continue
        }

        // Manejar clinic_name como un array
        const clinicIds: string[] = []
        if (Array.isArray(userData.clinic_name)) {
          for (const clinicName of userData.clinic_name) {
            const clinic = await this.clinicModel
              .findOne({ clinic_name: clinicName })
              .exec()

            if (!clinic) {
              // this.logger.warn(`Clinic with name ${clinicName} not found. Skipping for user ${userData.email}.`);
              continue
            }

            clinicIds.push(clinic._id) // Agregar el ID de la clínica encontrada
          }
        }

        // Construir el DTO para actualizar excluyendo el email y clinic_name
        const { email, clinic_name, ...updateFields } = userData
        const updateUserDto: UpdateUserDto = {
          ...updateFields,
          clinics: clinicIds.length > 0 ? clinicIds : undefined, // Asignar IDs si se encontraron clínicas
        }

        await this.updateUser(user._id, updateUserDto)

        // this.logger.log(`User with email ${userData.email} updated successfully.`);
      } catch (error) {
        this.logger.error(
          `Error updating user with email ${userData.email}: ${error.message}`,
        )
      }
    }

    this.logger.log('Preload of update users data completed.')
  }
}
