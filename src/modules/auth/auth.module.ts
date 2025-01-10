import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { UserService } from '../user/user.service'
import { BcryptService } from './bcrypt.service'
import { PassportModule } from '@nestjs/passport'
import { User, UserSchema } from '../user/user.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, UserService, BcryptService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
