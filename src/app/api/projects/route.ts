import { z } from 'zod'
import { ProjectService } from '@/features/projects/services/ProjectService'
import { ProjectSector, ProjectStatus } from '../../../generated/client'
import { successResponse, errorResponse, validationErrorResponse, getAuthorizationUser } from '@/shared/utils/errors'

const createProjectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.').max(256),
  description: z.string().min(1, 'Description is required.'),
  sector: z.nativeEnum(ProjectSector),
  location: z.string().min(1, 'Location is required.'),
  budget: z.preprocess((val) => Number(val), z.number().positive('Budget must be positive.')),
  squareFootage: z.number().int().positive('Square footage must be a positive integer.'),
  startDate: z.string().datetime({ message: 'Start date must be a valid ISO 8601 string.' }),
  projectManagerId: z.string().min(1, 'Project Manager ID is required.'),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sector = searchParams.get('sector') as ProjectSector | null
    const status = searchParams.get('status') as ProjectStatus | null
    const search = searchParams.get('search') || undefined

    const projectService = new ProjectService()
    const projects = await projectService.getPublicPortfolio({ sector: sector || undefined, status: status || undefined, search })

    return successResponse(projects)
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch project list.', 'SERVER_ERROR', 500)
  }
}

export async function POST(request: Request) {
  try {
    const userPayload = getAuthorizationUser(request)
    if (!userPayload || userPayload.role !== 'ADMIN') {
      return errorResponse('Access denied. Administrator privileges required.', 'FORBIDDEN', 403)
    }

    const body = await request.json()
    const parsed = createProjectSchema.safeParse(body)

    if (!parsed.success) {
      return validationErrorResponse(parsed.error)
    }

    const projectService = new ProjectService()
    const project = await projectService.createProject(
      {
        ...parsed.data,
        startDate: new Date(parsed.data.startDate),
      },
      userPayload.sub
    )

    return successResponse(project, 201)
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to create project.', 'SERVER_ERROR', 500)
  }
}
