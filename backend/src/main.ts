import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { loggerGlobal } from './middlewares/logger.middleware'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = process.env.PORT || 3000
  const frontendOrigin = configService.get<string>('FRONTEND_URL')

  app.enableCors({
    origin: frontendOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  app.use(loggerGlobal)

  const config = new DocumentBuilder()
    .setTitle('Dental Rain Maker API Documentation')
    .setDescription('API for my app')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  await app.listen(port)
}
bootstrap()
