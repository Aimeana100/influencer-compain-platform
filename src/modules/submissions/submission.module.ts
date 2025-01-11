import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SubmissionController } from './submission.controller'
import { SubmissionService } from './submission.service'
import { UserModule } from '../user/user.module'
import { SubmissionSchema } from './submission.schema'
import { CampaignModule } from '../campain/campaign.module'
import { CampaignSchema } from '../campain/campaign.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Submission', schema: SubmissionSchema },
      { name: 'Campaign', schema: CampaignSchema },
    ]),
    CampaignModule,
    UserModule,
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService],
  exports: [SubmissionService],
})
export class SubmissionModule {}
