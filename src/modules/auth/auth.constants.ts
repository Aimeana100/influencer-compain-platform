export interface AuthPayload {
  id: number
  email: string
  role: string
}

// Create a custom request interface that extends the Express.Request interface
export interface CustomRequest extends Request {
  user: AuthPayload
}
