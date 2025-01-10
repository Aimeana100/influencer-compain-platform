import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'
import { UserRole } from '../../user/user.schema'

export class SignUpDto {
  @IsString()
  names: string

  @IsEnum(UserRole)
  role: UserRole

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string
}

export class SignUpDtoWithPass extends SignUpDto {
  @IsString()
  confirmPassword: string
}
