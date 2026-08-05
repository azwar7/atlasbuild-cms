import { ProjectService } from '@/features/projects/services/ProjectService'
import { successResponse, errorResponse, getAuthorizationUser } from '@/shared/utils/errors'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const userPayload = getAuthorizationUser(request)
    if (!userPayload) {
      return errorResponse('Access denied. Authentication token required.', 'UNAUTHORIZED', 401)
    }

    const { id } = await context.params
    const projectService = new ProjectService()
    
    const workspace = await projectService.getProjectWorkspace(id, {
      id: userPayload.sub,
      role: userPayload.role,
    })

    return successResponse(workspace)
  } catch (error: any) {
    // Check if authorization failed
    if (error.message.includes('Authorization denied')) {
      return errorResponse(error.message, 'FORBIDDEN', 403)
    }
    return errorResponse(error.message || 'Workspace load failed.', 'SERVER_ERROR', 500)
  }
}
