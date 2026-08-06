import prisma from '@/shared/lib/db'
import { ProjectSector, QuoteStatus } from '../../../generated/client'

export interface CreateQuoteData {
  name: string
  email: string
  company?: string
  projectTitle: string
  sector: ProjectSector
  budgetRange: string
  location: string
  description: string
  blueprintUrl?: string
}

export interface UpdateEvaluationData {
  status: QuoteStatus
  reviewedByAdminId?: string
  reviewedAt?: Date
  rejectionReason?: string | null
  adminNotes?: string | null
}

export class QuoteRepository {
  async create(data: CreateQuoteData) {
    return prisma.quoteRequest.create({
      data: {
        ...data,
      },
    })
  }

  async findById(id: string) {
    return prisma.quoteRequest.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        reviewedByAdmin: {
          select: { id: true, name: true, email: true },
        },
      },
    })
  }

  async listAll(status?: QuoteStatus) {
    return prisma.quoteRequest.findMany({
      where: {
        deletedAt: null,
        ...(status ? { status } : {}),
      },
      include: {
        reviewedByAdmin: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async updateStatus(id: string, status: QuoteStatus) {
    return prisma.quoteRequest.update({
      where: { id },
      data: { status },
    })
  }

  async updateEvaluation(id: string, data: UpdateEvaluationData) {
    return prisma.quoteRequest.update({
      where: { id },
      data: {
        status: data.status,
        reviewedByAdminId: data.reviewedByAdminId,
        reviewedAt: data.reviewedAt || new Date(),
        rejectionReason: data.rejectionReason,
        adminNotes: data.adminNotes,
      },
      include: {
        reviewedByAdmin: {
          select: { id: true, name: true, email: true },
        },
      },
    })
  }

  async getCounts() {
    const total = await prisma.quoteRequest.count({ where: { deletedAt: null } })
    const pending = await prisma.quoteRequest.count({ where: { deletedAt: null, status: 'PENDING' } })
    const approved = await prisma.quoteRequest.count({ where: { deletedAt: null, status: 'APPROVED' } })
    const rejected = await prisma.quoteRequest.count({ where: { deletedAt: null, status: 'REJECTED' } })
    const reviewing = await prisma.quoteRequest.count({ where: { deletedAt: null, status: 'REVIEWING' } })
    const archived = await prisma.quoteRequest.count({ where: { deletedAt: null, status: 'ARCHIVED' } })

    return { total, pending, approved, rejected, reviewing, archived }
  }

  async softDelete(id: string) {
    return prisma.quoteRequest.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }
}
