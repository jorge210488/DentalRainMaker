import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { RegisterUserDto } from './dto/registerUser.dto'
import { UserStatus } from './enums/userStatus.enum'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserDocument> {
    const newRegisterUser = new this.userModel(registerUserDto)
    return newRegisterUser.save()
  }

  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec()
  }

  async updateUser(
    _id: string,
    updateUserDto: RegisterUserDto,
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

  async deleteUser(_id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(_id).exec()
    if (!result) {
      throw new NotFoundException('User not found')
    }
  }
}
