import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { ProjectAiService } from '@/features/projects/services/ProjectAiService'
import { errorResponse, successResponse } from '@/shared/utils/errors'

const projectAiService = new ProjectAiService()

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Enforce Server-Side Authentication
    const session = await getSession()
    if (!session) {
      return errorResponse('Unauthorized: Please log in to access the AI Project Assistant.', 'UNAUTHORIZED', 401)
    }

    // 2. Validate Project ID parameter
    const { id } = await params
    if (!id || typeof id !== 'string') {
      return errorResponse('Missing or invalid Project ID parameter.', 'BAD_REQUEST', 400)
    }

    // 3. Parse and Validate Request Body
    let body: any = {}
    try {
      body = await request.json()
    } catch {
      return errorResponse('Invalid JSON request payload.', 'BAD_REQUEST', 400)
    }

    const { message, history } = body
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return errorResponse('Message parameter is required and cannot be empty.', 'BAD_REQUEST', 400)
    }

    if (message.length > 1000) {
      return errorResponse('Message length exceeds the maximum limit of 1000 characters.', 'BAD_REQUEST', 400)
    }

    // 4. Execute Project AI Assistant Chat
    const result = await projectAiService.chatWithProjectAssistant(id, message.trim(), history || [])

    return successResponse(result)
  } catch (error: any) {
    console.error(`[POST /api/projects/[id]/ai/chat] Execution error:`, error)
    return errorResponse(
      error.message || 'AI Project Assistant is temporarily unavailable. Please try again.',
      'SERVER_ERROR',
      500
    )
  }
}
