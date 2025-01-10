import { CreateCampaignDto } from './create-campaign.dto'
import { PartialType } from '@nestjs/swagger'

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {}
