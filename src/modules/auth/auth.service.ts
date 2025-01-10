import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../user/user.schema'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { BcryptService } from './bcrypt.service'
import { ChangePasswordDto } from './dto/change-password.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userModel.findOne({ email: signInDto.email })
    if (
      !user ||
      !(await this.bcryptService.compare(signInDto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { id: user._id, email: user.email, role: user.role }
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userModel.findOne({
      email: signUpDto.email,
    })
    if (existingUser) {
      throw new ConflictException('User with the same email already exists')
    }

    const hashedPassword = await this.bcryptService.hash(signUpDto.password)
    const newUser = new this.userModel({
      ...signUpDto,
      password: hashedPassword,
    })
    await newUser.save()

    const { password, ...userPublic } = newUser.toObject()
    return userPublic
  }

  async changePassword(changePasswordDto: ChangePasswordDto, userId: string) {
    const user = await this.userModel.findById(userId)
    if (
      !user ||
      !(await this.bcryptService.compare(
        changePasswordDto.password,
        user.password,
      ))
    ) {
      throw new UnauthorizedException('Old password is incorrect')
    }

    user.password = await this.bcryptService.hash(changePasswordDto.newPassword)
    await user.save()

    return { message: 'Password changed successfully' }
  }
}
