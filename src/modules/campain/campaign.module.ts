import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CampaignService } from './campaign.service'
import { CampaignController } from './campaign.controller'
import { Campaign, CampaignSchema } from './campaign.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
  ],
  controllers: [CampaignController],
  providers: [CampaignService, CampaignModule],
  exports: [CampaignService],
})
export class CampaignModule {}
