import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
} from 'class-validator'

export class CreateSubmissionDto {
  @IsNotEmpty()
  influencer: string // Influencer ID

  @IsNotEmpty()
  campaign: string // Campaign ID

  @IsNotEmpty()
  @IsUrl()
  contentUrl: string // URL of the content

  @IsOptional()
  performanceMetrics?: {
    views: number
    clicks: number
    conversions: number
  }
}

export class UpdatePerformanceDto {
  @IsOptional()
  @IsNumber()
  views?: number

  @IsOptional()
  @IsNumber()
  clicks?: number

  @IsOptional()
  @IsNumber()
  conversions?: number
}
