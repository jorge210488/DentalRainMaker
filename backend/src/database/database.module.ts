import { Module, OnApplicationBootstrap } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import mongoose from 'mongoose'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully')
    })

    mongoose.connection.on('error', (err) => {
      console.error('❌ Error connecting to MongoDB:', err.message)
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB connection lost')
    })
  }
}
