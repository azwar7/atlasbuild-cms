import prisma from '@/shared/lib/db'
import { InvitationStatus } from '../../../generated/client'

export interface CreateInviteData {
  token: string
  email: string
  projectId: string
  invitingAdminId: string
  expiresAt: Date
}

export class InviteRepository {
  async findByToken(token: string) {
    return prisma.invitationToken.findUnique({
      where: { token },
    })
  }

  async findActiveByEmail(email: string) {
    return prisma.invitationToken.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        status: InvitationStatus.PENDING,
        expiresAt: {
          gt: new Date(),
        },
      },
    })
  }

  async create(data: CreateInviteData) {
    return prisma.invitationToken.create({
      data: {
        token: data.token,
        email: data.email.toLowerCase().trim(),
        projectId: data.projectId,
        invitingAdminId: data.invitingAdminId,
        expiresAt: data.expiresAt,
      },
    })
  }

  async updateStatus(id: string, status: InvitationStatus, usedAt?: Date) {
    return prisma.invitationToken.update({
      where: { id },
      data: {
        status,
        usedAt,
      },
    })
  }

  async listAll() {
    return prisma.invitationToken.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }
}
