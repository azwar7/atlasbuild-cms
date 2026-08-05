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

    // Filter assets to return only blueprints
    const blueprints = workspace.assets.filter((asset: any) => asset.assetType === 'BLUEPRINT')

    // (Cloudinary transient link signer generation placeholder)
    const secureBlueprints = blueprints.map((blueprint: any) => {
      // In a live environment, append a signed URL parameter using the cloudinary SDK.
      // E.g. cloudinary.utils.private_download_url(blueprint.key, 'pdf', { expires_at: Date.now() + 15 * 60 })
      return {
        id: blueprint.id,
        fileName: blueprint.key + '.pdf',
        secureUrl: `${blueprint.url}?signature_expiry=${Math.floor(Date.now() / 1000) + 15 * 60}&signature=mock_hex_hash`,
        size: blueprint.size,
        createdAt: blueprint.createdAt,
      }
    })

    return successResponse({ blueprints: secureBlueprints })
  } catch (error: any) {
    if (error.message.includes('Authorization denied')) {
      return errorResponse(error.message, 'FORBIDDEN', 403)
    }
    return errorResponse(error.message || 'Blueprint retrieval failed.', 'SERVER_ERROR', 500)
  }
}
