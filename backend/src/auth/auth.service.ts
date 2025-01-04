import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Credential, CredentialDocument } from './schemas/credential.schema'
import { User, UserDocument } from '../users/schemas/user.schema'
import { CreateUserDto } from './dto/createUser.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Credential.name)
    private credentialModel: Model<CredentialDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<UserDocument> {
    const {
      email,
      password,
      provider,
      providerId,
      given_name,
      family_name,
      name,
      type,
    } = createUserDto

    const existingCredential = await this.credentialModel.findOne({ email })
    if (existingCredential) {
      throw new BadRequestException('Email is already in use.')
    }

    const credential = new this.credentialModel({
      email,
      password,
      provider,
      providerId,
    })
    await credential.save()

    const combinedName =
      provider === 'local' ? `${given_name} ${family_name}` : name

    const user = new this.userModel({
      name: combinedName,
      given_name,
      family_name,
      type: type || 'PATIENT',
      primary_email_address: email,
      credential: credential._id,
    })

    return user.save()
  }
}
