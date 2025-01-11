import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthGuard } from '../auth/auth.guard'
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Roles} from "../auth/roles/roles.decorator";
import {UserRole} from "./user.schema";

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Users' })
  @ApiResponse({ status: 200, description: 'ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.BRAND, UserRole.INFLUENCER)
  @ApiBearerAuth()
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers()
  }
  //
  // @Get(':id')
  // async getUserById(@Param('id') id: string) {
  //   return this.userService.getUserById(id)
  // }
  //
  // @Delete(':id')
  // async deleteUser(@Param('id') id: string) {
  //   return this.userService.deleteUser(id)
  // }
}
