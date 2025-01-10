import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document
export enum UserRole {
  BRAND = 'BRAND',
  INFLUENCER = 'INFLUENCER',
  ADMIN = 'ADMIN',
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  names: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true, enum: UserRole })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User)
