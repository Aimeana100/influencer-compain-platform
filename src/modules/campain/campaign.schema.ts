import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type CampaignDocument = Campaign & Document

export enum CampaignStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  budget: number

  @Prop({
    required: true,
    enum: CampaignStatus,
    default: CampaignStatus.PENDING,
  })
  status: string

  @Prop({ required: true })
  startDate: Date

  @Prop({ required: true })
  endDate: Date

  // Referencing the influencer model (assuming they're users in your system)
  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  influencers: Types.ObjectId[]

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign)
