import { IsEnum } from 'class-validator'
import { SubmissionApprovalStatus } from '../submission.schema'

export class UpdateSubmissionApprovalDto {
  @IsEnum(SubmissionApprovalStatus)
  approvalStatus: SubmissionApprovalStatus
}
