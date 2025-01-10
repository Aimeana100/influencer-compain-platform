import { MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

export const mongoConfigAsync: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<{ uri: string }> => ({
    uri: configService.get<string>('MONGO_URI'),
  }),
}
