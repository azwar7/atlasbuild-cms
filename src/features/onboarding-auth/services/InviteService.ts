import { InviteRepository } from '../repositories/InviteRepository'
import { UserRepository } from '../repositories/UserRepository'
import { InvitationStatus, Role } from '../../../generated/client'
import crypto from 'crypto'
import prisma from '@/shared/lib/db'

export class InviteService {
  private inviteRepo: InviteRepository
  private userRepo: UserRepository

  constructor() {
    this.inviteRepo = new InviteRepository()
    this.userRepo = new UserRepository()
  }

  async generateInvite(email: string, projectId: string, invitingAdminId: string) {
    // Check if there is already an active pending invite for this email
    const existingInvite = await this.inviteRepo.findActiveByEmail(email)
    if (existingInvite) {
      return existingInvite
    }

    // Generate a secure crypto token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 48) // 48 hours

    return this.inviteRepo.create({
      token,
      email,
      projectId,
      invitingAdminId,
      expiresAt,
    })
  }

  async verifyInvite(token: string) {
    const invite = await this.inviteRepo.findByToken(token)
    if (!invite) {
      throw new Error('Invitation token not found.')
    }

    if (invite.status !== InvitationStatus.PENDING) {
      throw new Error(`Invitation is no longer active (Status: ${invite.status}).`)
    }

    if (invite.expiresAt < new Date()) {
      await this.inviteRepo.updateStatus(invite.id, InvitationStatus.EXPIRED)
      throw new Error('Invitation token has expired.')
    }

    return invite
  }

  async completeInvite(token: string, passwordUnidentified: string, name: string) {
    const invite = await this.verifyInvite(token)

    const passwordHash = await require('bcryptjs').hash(passwordUnidentified, 10)

    // Execute in a transaction to guarantee atomicity
    return prisma.$transaction(async (tx: any) => {
      // 1. Create client user account
      const newUser = await tx.user.create({
        data: {
          email: invite.email.toLowerCase().trim(),
          name,
          passwordHash,
          role: Role.CLIENT,
          createdBy: invite.invitingAdminId,
          assignedProjects: {
            connect: { id: invite.projectId }
          }
        }
      })

      // 2. Mark token as accepted
      await tx.invitationToken.update({
        where: { id: invite.id },
        data: {
          status: InvitationStatus.ACCEPTED,
          usedAt: new Date()
        }
      })

      return newUser
    })
  }
}
