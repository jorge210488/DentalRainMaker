import { Injectable, NotFoundException, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { UpdateUserDto } from './dto/updateUser.dto'
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
}
