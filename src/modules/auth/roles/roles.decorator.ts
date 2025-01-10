import { SetMetadata } from '@nestjs/common'
import { UserRole } from '../../user/user.schema'

export const ROLES_KEY = 'role'
export const Roles = (...role: UserRole[]) => SetMetadata(ROLES_KEY, role)
