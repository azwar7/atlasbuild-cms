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
    })
  }

  async listAll(status?: QuoteStatus) {
    return prisma.quoteRequest.findMany({
      where: {
        deletedAt: null,
        ...(status ? { status } : {}),
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

  async softDelete(id: string) {
    return prisma.quoteRequest.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }
}
