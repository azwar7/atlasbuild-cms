import { ProjectService } from '@/features/projects/services/ProjectService'
import { successResponse, errorResponse, getAuthorizationUser } from '@/shared/utils/errors'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userPayload = getAuthorizationUser(request)
    if (!userPayload || userPayload.role !== 'ADMIN') {
      return errorResponse('Access denied. Administrator privileges required.', 'FORBIDDEN', 403)
    }

    const { id } = await params
    const projectService = new ProjectService()
    const result = await projectService.deleteProject(id, userPayload.sub)

    return successResponse(result)
  } catch (error: any) {
    return errorResponse(error.message || 'Deletion failed.', 'SERVER_ERROR', 500)
  }
}
