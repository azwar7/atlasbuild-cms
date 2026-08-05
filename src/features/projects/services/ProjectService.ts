import { ProjectRepository, CreateProjectData, UpdateProjectData } from '../repositories/ProjectRepository'
import { Role } from '../../../generated/client'
import prisma from '@/shared/lib/db'

export class ProjectService {
  private projectRepo: ProjectRepository

  constructor() {
    this.projectRepo = new ProjectRepository()
  }

  async getPublicPortfolio(filters?: { sector?: any; status?: any; search?: string }) {
    return this.projectRepo.findPublic(filters)
  }

  async getProjectWorkspace(projectId: string, user: { id: string; role: Role }) {
    const project = await this.projectRepo.findById(projectId)
    if (!project) {
      throw new Error('Project not found or archived.')
    }

    // Role-based Access Control (RBAC) validation
    if (user.role === Role.CLIENT) {
      const isAssigned = project.clients.some((client: any) => client.id === user.id)
      if (!isAssigned) {
        throw new Error('Authorization denied. Client is not assigned to this project.')
      }
    } else if (user.role === Role.PROJECT_MANAGER) {
      if (project.projectManagerId !== user.id) {
        throw new Error('Authorization denied. PM is not assigned to manage this project.')
      }
    }

    return project
  }

  async createProject(data: CreateProjectData, operatorId: string) {
    const project = await this.projectRepo.create(data)

    // Log this action to ActivityLog
    await prisma.activityLog.create({
      data: {
        userId: operatorId,
        action: 'PROJECT_CREATE',
        entityType: 'Project',
        entityId: project.id,
        details: JSON.stringify({ title: project.title }),
      },
    })

    return project
  }

  async updateProject(id: string, data: UpdateProjectData, operatorId: string) {
    const project = await this.projectRepo.update(id, data)

    // Log update action
    await prisma.activityLog.create({
      data: {
        userId: operatorId,
        action: 'PROJECT_UPDATE',
        entityType: 'Project',
        entityId: id,
        details: JSON.stringify(data),
      },
    })

    return project
  }

  async deleteProject(id: string, operatorId: string) {
    await this.projectRepo.softDelete(id, operatorId)

    // Log deletion action
    await prisma.activityLog.create({
      data: {
        userId: operatorId,
        action: 'PROJECT_DELETE',
        entityType: 'Project',
        entityId: id,
      },
    })

    return { id, message: 'Project soft deleted.' }
  }
}
