import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'

export const config = new DocumentBuilder()
  .setTitle('Influencer compaign platform')
  .setDescription('The  REST API Documentation, describe the main endpoints')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

export const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    defaultModelsExpandDepth: -1,
    initOAuth: {
      clientId: 'id',
      usePkceWithAuthorizationCodeGrant: true,
    },
  },
}
