import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { mongoConfigAsync } from './config/mongo.config'
import { CorsMiddleware } from './middlewares/cors.middleware'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { RemovePasswordInterceptor } from './interceptors/exclude-password.interceptot'
import { CampaignModule } from './modules/campain/campaign.module'
import { SubmissionModule } from './modules/submissions/submission.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync(mongoConfigAsync),
    UserModule,
    CampaignModule,
    AuthModule,
    SubmissionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RemovePasswordInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CorsMiddleware).forRoutes('*')
  }
}
