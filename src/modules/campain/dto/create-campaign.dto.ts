import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator'

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsNotEmpty()
  budget: number

  @IsDate()
  @IsNotEmpty()
  startDate: Date

  @IsDate()
  @IsNotEmpty()
  endDate: Date
}
