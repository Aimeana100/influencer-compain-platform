import { Types } from 'mongoose'

export interface AuthPayload {
  id: Types.ObjectId
  email: string
  role: string
}

// Create a custom request interface that extends the Express.Request interface
export interface CustomRequest extends Request {
  user: AuthPayload
}
