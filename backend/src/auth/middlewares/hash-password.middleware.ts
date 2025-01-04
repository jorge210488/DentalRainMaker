import * as bcrypt from 'bcrypt'
import { CredentialDocument } from '../schemas/credential.schema'

export async function hashPasswordMiddleware(
  this: CredentialDocument,
  next: Function,
) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
}
