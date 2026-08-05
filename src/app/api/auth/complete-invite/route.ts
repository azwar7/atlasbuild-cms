import { z } from 'zod'
import { InviteService } from '@/features/onboarding-auth/services/InviteService'
import { successResponse, errorResponse, validationErrorResponse } from '@/shared/utils/errors'

const completeInviteSchema = z.object({
  token: z.string().min(1, 'Token is required.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least 1 number.')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least 1 special character.'),
  name: z.string().min(2, 'Name must be at least 2 characters long.').max(128),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = completeInviteSchema.safeParse(body)

    if (!parsed.success) {
      return validationErrorResponse(parsed.error)
    }

    const inviteService = new InviteService()
    const user = await inviteService.completeInvite(
      parsed.data.token,
      parsed.data.password,
      parsed.data.name
    )

    return successResponse(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      201
    )
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to complete registration.', 'REGISTRATION_FAILED', 400)
  }
}
