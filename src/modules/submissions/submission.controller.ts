import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Get,
  Patch,
} from '@nestjs/common'
import { SubmissionService } from './submission.service'
import { CreateSubmissionDto, UpdatePerformanceDto } from './dto/submission.dto'
import { AuthGuard } from '../auth/auth.guard'
import { RolesGuard } from '../auth/roles/roles.guard'
import { UserRole } from '../user/user.schema'
import { Roles } from '../auth/roles/roles.decorator'
import { UpdateSubmissionApprovalDto } from './dto/update-submission-approval.dto'
import { Submission, SubmissionApprovalStatus } from './submission.schema'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @ApiOperation({ summary: 'Create a Submission ' })
  @ApiResponse({ status: 201, description: 'ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.INFLUENCER)
  @Post()
  async createSubmission(@Body() createSubmissionDto: CreateSubmissionDto) {
    return this.submissionService.create(createSubmissionDto)
  }

  @ApiOperation({ summary: 'Get all Submissions ' })
  @ApiResponse({ status: 200, description: 'ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.INFLUENCER, UserRole.BRAND)
  @Get()
  async getSubmissions(): Promise<Submission[]> {
    return this.submissionService.findSubmissionsForUser()
  }

  @ApiOperation({ summary: 'Approve a Submission ' })
  @ApiResponse({ status: 200, description: 'ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.BRAND)
  @Patch(':id/approve')
  async approveSubmission(
    @Param('id') id: string,
    @Body() updateApprovalDto: UpdateSubmissionApprovalDto,
  ): Promise<Submission> {
    return this.submissionService.updateApprovalStatus(id, {
      approvalStatus: SubmissionApprovalStatus.APPROVED,
    })
  }
  @ApiOperation({ summary: 'Reject Submission ' })
  @ApiResponse({ status: 200, description: 'ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.BRAND)
  @ApiBearerAuth()
  @Patch(':id/reject')
  async rejectSubmission(
    @Param('id') id: string,
    @Body() updateApprovalDto: UpdateSubmissionApprovalDto,
  ): Promise<Submission> {
    return this.submissionService.updateApprovalStatus(id, {
      approvalStatus: SubmissionApprovalStatus.REJECTED,
    })
  }

  @Put(':id/performance')
  @UseGuards(AuthGuard)
  @Roles(UserRole.BRAND)
  async updatePerformance(
    @Param('id') submissionId: string,
    @Body() updatePerformanceDto: UpdatePerformanceDto,
  ) {
    return this.submissionService.updatePerformance(
      submissionId,
      updatePerformanceDto,
    )
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getSubmission(@Param('id') submissionId: string) {
    return this.submissionService.findOne(submissionId)
  }
}
