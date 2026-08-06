import { QuoteRepository, CreateQuoteData } from '../repositories/QuoteRepository'
import { QuoteStatus } from '../../../generated/client'
import prisma from '@/shared/lib/db'

export class QuoteService {
  private quoteRepo: QuoteRepository

  constructor() {
    this.quoteRepo = new QuoteRepository()
  }

  async submitQuoteRequest(data: CreateQuoteData) {
    const quote = await this.quoteRepo.create(data)

    // Log the lead intake in the main activity audit logs
    await prisma.activityLog.create({
      data: {
        action: 'RFP_SUBMITTED',
        entityType: 'QuoteRequest',
        entityId: quote.id,
        details: JSON.stringify({ name: data.name, projectTitle: data.projectTitle }),
      },
    })

    // (Transactional Email trigger placeholder e.g. using Resend SDK)
    console.log(`✉️ Resend Notification Triggered: Client ${data.name} submitted RFP for "${data.projectTitle}" (ID: ${quote.id})`)

    return quote
  }

  async getQuotesForAdmin(status?: QuoteStatus) {
    return this.quoteRepo.listAll(status)
  }

  async getQuoteById(id: string) {
    return this.quoteRepo.findById(id)
  }

  async getStats() {
    return this.quoteRepo.getCounts()
  }

  async evaluateRFPProposal(
    id: string,
    action: 'APPROVE' | 'REJECT' | 'REVIEW' | 'ARCHIVE',
    adminId: string,
    rejectionReason?: string,
    adminNotes?: string
  ) {
    const existing = await this.quoteRepo.findById(id)
    if (!existing) {
      throw new Error('RFP Proposal record not found.')
    }

    let targetStatus: QuoteStatus = 'PENDING'
    if (action === 'APPROVE') targetStatus = 'APPROVED'
    else if (action === 'REJECT') targetStatus = 'REJECTED'
    else if (action === 'REVIEW') targetStatus = 'REVIEWING'
    else if (action === 'ARCHIVE') targetStatus = 'ARCHIVED'

    const updated = await this.quoteRepo.updateEvaluation(id, {
      status: targetStatus,
      reviewedByAdminId: adminId,
      reviewedAt: new Date(),
      rejectionReason: action === 'REJECT' ? rejectionReason || null : existing.rejectionReason,
      adminNotes: adminNotes !== undefined ? adminNotes : existing.adminNotes,
    })

    // Log Activity for Compliance Audit Trail
    await prisma.activityLog.create({
      data: {
        userId: adminId,
        action: `RFP_${action}D`,
        entityType: 'QuoteRequest',
        entityId: id,
        details: JSON.stringify({
          previousStatus: existing.status,
          newStatus: targetStatus,
          projectTitle: existing.projectTitle,
          company: existing.company,
          clientEmail: existing.email,
          rejectionReason: action === 'REJECT' ? rejectionReason : undefined,
          reviewedAt: new Date().toISOString(),
        }),
      },
    })

    // Simulated Email Notification Trigger for Submitting Client
    console.log(`✉️ Notification Triggered to ${existing.email}: Proposal "${existing.projectTitle}" has been ${targetStatus.toLowerCase()}.`)

    return updated
  }

  async updateQuoteStatus(id: string, status: QuoteStatus, operatorId: string) {
    const updated = await this.quoteRepo.updateStatus(id, status)

    // Audit log this change
    await prisma.activityLog.create({
      data: {
        userId: operatorId,
        action: 'RFP_STATUS_CHANGED',
        entityType: 'QuoteRequest',
        entityId: id,
        details: JSON.stringify({ status }),
      },
    })

    return updated
  }
}
