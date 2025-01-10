import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule } from '@nestjs/swagger'
import { config, customOptions } from './config/swagger.config'
import helmet from 'helmet'
import { VersioningType } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  })

  SwaggerModule.setup('docs', app, document, customOptions)
  const configService = app.get(ConfigService)
  app.use(helmet())
  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI, // Use URI versioning (/v1)
    defaultVersion: configService.get<string>('API_VERSION') || '1', // 1 as a Default version
  })

  await app.listen(parseInt(configService.get<string>('PORT')) || 4000)
}
bootstrap()
