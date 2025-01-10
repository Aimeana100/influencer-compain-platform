import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsString, validateSync } from 'class-validator'
import { logger } from './logger'

class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  MONGO_URI: string

  @IsNotEmpty()
  @IsString()
  FRONTEND_LINK: string

  @IsNotEmpty()
  @IsString()
  PORT: string

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string

  @IsNotEmpty()
  @IsString()
  JWT_SIGN_OPTIONS: string

  @IsNotEmpty()
  @IsString()
  JWT_TOKEN_EXPIRES_IN: string

  @IsNotEmpty()
  @IsString()
  RESET_PASSWORD_TOKEN_EXPIRES_IN: string
}

export function validate(config: Record<string, unknown>) {
  const validateCOnfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validateCOnfig, {
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    logger.error(`Environment variable validation failed: ${errors.toString()}`)
    throw new Error(errors.toString())
  }

  return validateCOnfig
}
