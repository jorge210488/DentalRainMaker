import * as admin from 'firebase-admin'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class FirebaseAdmin {
  private readonly app: admin.app.App

  constructor(private readonly configService: ConfigService) {
    const privateKey = this.configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      ?.replace(/\\n/g, '\n') // Reemplazar los \n por saltos de línea reales

    this.app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        privateKey: privateKey,
        clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      }),
    })
  }

  getAdminInstance(): admin.app.App {
    return this.app
  }

  async testFirebaseConnection(): Promise<void> {
    try {
      const messaging = this.getAdminInstance().messaging()
      console.log('FirebaseAdmin: Messaging service initialized successfully')
    } catch (error) {
      console.error(
        'FirebaseAdmin: Error initializing messaging service',
        error,
      )
      throw new Error('Failed to initialize Firebase Messaging')
    }
  }
}
