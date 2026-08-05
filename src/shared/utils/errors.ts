import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  )
}

export function errorResponse(message: string, code: string, status: number = 400) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
      },
    },
    { status }
  )
}

export function validationErrorResponse(error: ZodError) {
  const details = error.issues.map((err: any) => ({
    field: err.path.join('.'),
    message: err.message,
  }))

  return NextResponse.json(
    {
      success: false,
      error: {
        message: 'Validation verification failed.',
        code: 'VALIDATION_FAILED',
        details,
      },
    },
    { status: 422 }
  )
}

export function getAuthorizationUser(request: Request) {
  // Extract Authorization or Cookies header
  const authHeader = request.headers.get('authorization')
  let token: string | null = null

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7)
  } else {
    // Check cookies
    const cookieHeader = request.headers.get('cookie')
    if (cookieHeader) {
      const match = cookieHeader.match(/atlasbuild_session=([^;]+)/)
      if (match) {
        token = match[1]
      }
    }
  }

  if (!token) {
    return null
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'atlasbuild_super_secret_fallback_key'
    const jwt = require('jsonwebtoken')
    return jwt.verify(token, JWT_SECRET) as {
      sub: string
      email: string
      role: 'ADMIN' | 'PROJECT_MANAGER' | 'CLIENT'
    }
  } catch (e) {
    return null
  }
}
