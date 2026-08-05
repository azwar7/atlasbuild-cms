import { InviteService } from '@/features/onboarding-auth/services/InviteService'
import { successResponse, errorResponse } from '@/shared/utils/errors'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return errorResponse('Invitation token is required.', 'BAD_REQUEST', 400)
    }

    const inviteService = new InviteService()
    const invite = await inviteService.verifyInvite(token)

    return successResponse({
      email: invite.email,
      projectId: invite.projectId,
      expiresAt: invite.expiresAt,
    })
  } catch (error: any) {
    return errorResponse(error.message || 'Verification failed.', 'INVALID_TOKEN', 400)
  }
}
