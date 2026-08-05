import { z } from 'zod'
import { AuthService } from '@/features/onboarding-auth/services/AuthService'
import { successResponse, errorResponse, validationErrorResponse } from '@/shared/utils/errors'
import { NextResponse } from 'next/server'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address string.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)
    
    if (!parsed.success) {
      return validationErrorResponse(parsed.error)
    }

    const authService = new AuthService()
    const result = await authService.login(parsed.data.email, parsed.data.password)

    // Set secure HTTP-only cookie
    const response = successResponse({ user: result.user })
    response.headers.set(
      'Set-Cookie',
      `atlasbuild_session=${result.token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}` // 7 days
    )

    return response
  } catch (error: any) {
    return errorResponse(error.message || 'Authentication failed.', 'UNAUTHORIZED', 401)
  }
}
