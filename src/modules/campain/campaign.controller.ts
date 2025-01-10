import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CampaignService } from './campaign.service'
import { CreateCampaignDto } from './dto/create-campaign.dto'
import { UpdateCampaignDto } from './dto/update-campaign.dto'
import {ApiBearerAuth, ApiOperation, ApiResponse} from '@nestjs/swagger'
import { Roles } from '../auth/roles/roles.decorator'
import { UserRole } from '../user/user.schema'
import { AuthGuard } from '../auth/auth.guard'
import { RolesGuard } from '../auth/roles/roles.guard'

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @ApiOperation({ summary: 'Create a campaign ' })
  @ApiResponse({ status: 200, description: 'ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(UserRole.BRAND)
  @UseGuards(AuthGuard, RolesGuard)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto)
  }

  @ApiOperation({ summary: 'List the campaigns ' })
  @ApiResponse({ status: 200, description: 'ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(UserRole.BRAND, UserRole.INFLUENCER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.campaignService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.update(id, updateCampaignDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignService.remove(id)
  }
}
