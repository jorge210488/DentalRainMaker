import { Injectable, NotFoundException, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserStatus } from './enums/userStatus.enum'
import { StateUserDto } from './dto/stateUser.dto'
import * as updateUsersData from '../utils/updateUsers.json'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec()
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
          // this.logger.warn(
          //   `User with email ${userData.email} not found. Skipping...`,
          // )
          continue
        }

        // Construir el DTO para actualizar excluyendo el email
        const { email, ...updateFields } = userData
        const updateUserDto: UpdateUserDto = {
          ...updateFields,
        }

        await this.updateUser(user._id, updateUserDto)

        // this.logger.log(
        //   `User with email ${userData.email} updated successfully.`,
        // )
      } catch (error) {
        this.logger.error(
          `Error updating user with email ${userData.email}: ${error.message}`,
        )
      }
    }

    this.logger.log('Preload of update users data completed.')
  }
}
