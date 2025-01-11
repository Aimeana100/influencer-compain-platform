import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateSubmissionDto, UpdatePerformanceDto } from './dto/submission.dto'
import { Submission } from './submission.schema'
import { UpdateSubmissionApprovalDto } from './dto/update-submission-approval.dto'
import { REQUEST } from '@nestjs/core'
import { CustomRequest } from '../auth/auth.constants'
import { UserRole } from '../user/user.schema'
import { Campaign } from '../campain/campaign.schema'

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel('Submission')
    private readonly submissionModel: Model<Submission>,
    @InjectModel('Campaign') private readonly campaignModel: Model<Campaign>,
    @Inject(REQUEST) private readonly request: CustomRequest,
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    const { campaign, contentUrl, performanceMetrics } = createSubmissionDto

    const foundCampaign = await this.campaignModel.findById(campaign)

    if (!foundCampaign) {
      throw new NotFoundException('Campaign not found')
    }

    if (!foundCampaign.influencers.includes(this.request.user.id)) {
      foundCampaign.influencers.push(this.request.user.id)
      await foundCampaign.save()
    }

    const newSubmission = new this.submissionModel({
      influencer: this.request.user.id,
      campaign,
      contentUrl,
      performanceMetrics,
    })

    const savedSubmission = await newSubmission.save()
    //
    // foundCampaign.submissions.push(savedSubmission._id)
    // await foundCampaign.save()

    return savedSubmission
  }
  async findSubmissionsForUser(): Promise<Submission[]> {
    const { id: userId, role } = this.request.user

    if (role === UserRole.BRAND) {
      // Fetch submissions tied to campaigns created by this brand
      const submissions = await this.submissionModel
        .find()
        .populate('campaign', '_id title description createdBy', 'Campaign', {
          createdBy: userId,
        })
        .exec()
      return submissions.filter((submission) => submission.campaign !== null)
    } else if (role === 'INFLUENCER') {
      // Fetch submissions made by this influencer
      return this.submissionModel
        .find({ influencer: userId })
        .populate('campaign', '_id title description createdBy', 'Campaign')
        .exec()
    } else {
      throw new UnauthorizedException('Invalid user role')
    }
  }

  async updatePerformance(
    submissionId: string,
    updatePerformanceDto: UpdatePerformanceDto,
  ): Promise<Submission> {
    const submission = await this.submissionModel.findById(submissionId)

    if (!submission) {
      throw new NotFoundException('Submission not found')
    }

    submission.performanceMetrics = {
      ...submission.performanceMetrics,
      ...updatePerformanceDto,
    }

    return submission.save()
  }

  async findOne(submissionId: string): Promise<Submission> {
    const submission = await this.submissionModel
      .findById(submissionId)
      .populate('campaign')
      .populate('influencer')

    if (!submission) {
      throw new NotFoundException('Submission not found')
    }

    return submission
  }

  async findSubmissionsForCampaign(campaignId: string): Promise<Submission[]> {
    return this.submissionModel
      .find({ campaign: campaignId })
      .populate('campaign')
      .populate('influencer')
      .exec()
  }

  // Approve or Reject a submission
  async updateApprovalStatus(
    submissionId: string,
    updateApprovalDto: UpdateSubmissionApprovalDto,
  ): Promise<Submission> {
    const submission = await this.submissionModel.findById(submissionId)

    if (!submission) {
      throw new NotFoundException('Submission not found')
    }

    // Ensure the approvalStatus is either APPROVED or REJECTED
    submission.approvalStatus = updateApprovalDto.approvalStatus
    submission.reviewedBy = this.request.user.id

    await submission.save()
    return submission
  }
}
