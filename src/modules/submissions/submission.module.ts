import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SubmissionController } from './submission.controller'
import { SubmissionService } from './submission.service'
import { UserModule } from '../user/user.module'
import { SubmissionSchema } from './submission.schema'
import { CampaignModule } from '../campain/campaign.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Submission', schema: SubmissionSchema },
    ]),
    CampaignModule,
    UserModule,
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
