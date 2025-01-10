import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export enum SubmissionApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type SubmissionDocument = Submission & Document

@Schema({ timestamps: true })
export class Submission {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  influencer: Types.ObjectId // Reference to the influencer

  @Prop({ type: Types.ObjectId, ref: 'Campaign', required: true })
  campaign: Types.ObjectId // Reference to the campaign

  @Prop({ required: true })
  contentUrl: string // URL or link to the submitted content

  @Prop({
    type: Object,
    default: {
      views: 0,
      clicks: 0,
      conversions: 0,
    },
  })
  performanceMetrics: {
    views: number
    clicks: number
    conversions: number
  }

  @Prop({ required: true, default: Date.now })
  submissionDate: Date // Date when the submission was made

  @Prop({
    required: true,
    enum: SubmissionApprovalStatus,
    default: SubmissionApprovalStatus.PENDING,
  })
  approvalStatus: SubmissionApprovalStatus // Tracks the approval/rejection status

  @Prop({ type: Types.ObjectId, ref: 'User' })
  reviewedBy: Types.ObjectId // The brand/SME who reviewed the submission
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission)
