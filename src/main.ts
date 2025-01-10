import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule } from '@nestjs/swagger'
import { config, customOptions } from './config/swagger.config'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  })

  SwaggerModule.setup('docs', app, document, customOptions)
  const configService = app.get(ConfigService)
  app.use(helmet())
  await app.listen(parseInt(configService.get<string>('PORT')) || 4000)
}
bootstrap()
