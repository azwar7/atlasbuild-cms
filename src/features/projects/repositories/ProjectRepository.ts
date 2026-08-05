import prisma from '@/shared/lib/db'
import { ProjectSector, ProjectStatus, Prisma } from '../../../generated/client'

export interface CreateProjectData {
  title: string
  description: string
  sector: ProjectSector
  location: string
  budget: number | string | Prisma.Decimal
  squareFootage: number
  startDate: Date
  projectManagerId: string
  createdBy?: string
}

export interface UpdateProjectData {
  title?: string
  description?: string
  sector?: ProjectSector
  location?: string
  status?: ProjectStatus
  budget?: number | string | Prisma.Decimal
  squareFootage?: number
  completionRate?: number
  emrScore?: number
  updatedBy?: string
}

export class ProjectRepository {
  async findPublic(filters?: { sector?: ProjectSector; status?: ProjectStatus; search?: string }) {
    const where: Prisma.ProjectWhereInput = {
      deletedAt: null,
    }

    if (filters?.sector) {
      where.sector = filters.sector
    }

    if (filters?.status) {
      where.status = filters.status
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { location: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    return prisma.project.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        sector: true,
        location: true,
        status: true,
        budget: true,
        squareFootage: true,
        completionRate: true,
        emrScore: true,
        startDate: true,
      },
      orderBy: { startDate: 'desc' },
    })
  }

  async findById(id: string) {
    return prisma.project.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        projectManager: {
          select: { id: true, name: true, email: true }
        },
        clients: {
          select: { id: true, name: true, email: true }
        },
        phases: {
          where: { deletedAt: null },
          orderBy: { sortOrder: 'asc' },
        },
        feedUpdates: {
          where: { deletedAt: null },
          include: {
            assets: {
              where: { deletedAt: null }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        assets: {
          where: { deletedAt: null }
        }
      }
    })
  }

  async create(data: CreateProjectData) {
    return prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        sector: data.sector,
        location: data.location,
        budget: data.budget,
        squareFootage: data.squareFootage,
        startDate: data.startDate,
        projectManagerId: data.projectManagerId,
        createdBy: data.createdBy,
      },
    })
  }

  async update(id: string, data: UpdateProjectData) {
    return prisma.project.update({
      where: { id },
      data: {
        ...data,
      },
    })
  }

  async softDelete(id: string, updatedBy?: string) {
    return prisma.project.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedBy,
      },
    })
  }
}
