import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Campaign, CampaignDocument } from './campaign.schema'
import { CreateCampaignDto } from './dto/create-campaign.dto'
import { UpdateCampaignDto } from './dto/update-campaign.dto'
import { CustomRequest } from '../auth/auth.constants'
import { REQUEST } from '@nestjs/core'

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @Inject(REQUEST) private readonly request: CustomRequest,
  ) {}

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const campaign = new this.campaignModel({
      ...createCampaignDto,
      createdBy: this.request.user.id,
    })
    return campaign.save()
  }

  async findAll(): Promise<Campaign[]> {
    return this.campaignModel
      .find()
      .populate('createdBy', 'names email') // Populate creator's details
      .populate('influencers', 'names email') // Populate influencer details
      .exec()
  }

  async findOne(id: string): Promise<Campaign> {
    const campaign = await this.campaignModel
      .findById(id)
      .populate('createdBy', 'names email') // Populate creator's details
      .populate('influencers', 'names email') // Populate influencer details
      .exec()
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`)
    }
    return campaign
  }

  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    const campaign = await this.campaignModel
      .findByIdAndUpdate(id, updateCampaignDto, { new: true })
      .populate('createdBy', 'names email') // Populate after update
      .populate('influencers', 'names email') // Populate after update
      .exec()
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`)
    }
    return campaign
  }

  async remove(id: string): Promise<void> {
    const result = await this.campaignModel.findByIdAndDelete(id).exec()
    if (!result) {
      throw new NotFoundException(`Campaign with ID ${id} not found`)
    }
  }
}
