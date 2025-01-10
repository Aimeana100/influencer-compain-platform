import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find().select('-password').exec()
  }

  async getUserById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).select('-password').exec()
    if (!user) throw new NotFoundException(`User with ID ${id} not found`)
    return user
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const result = await this.userModel.findByIdAndDelete(id).exec()
    if (!result) throw new NotFoundException(`User with ID ${id} not found`)
    return { message: 'User deleted successfully' }
  }
}
