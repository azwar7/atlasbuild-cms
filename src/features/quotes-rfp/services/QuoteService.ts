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
