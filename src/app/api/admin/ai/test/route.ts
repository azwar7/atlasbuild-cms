import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSession } from '@/lib/auth'
import { getAIProvider } from '@/lib/ai'
import { errorResponse, successResponse } from '@/shared/utils/errors'

const testOutputSchema = z.object({
  name: z.string(),
  type: z.string(),
  summary: z.string(),
})

export async function POST(request: Request) {
  try {
    const session = await getSession()

    // Enforce Administrator access
    if (!session || (session.role !== 'ADMIN' && session.role !== 'PROJECT_MANAGER' && session.role !== 'SUPER_ADMIN')) {
      return errorResponse('Forbidden: Administrator privileges required.', 'UNAUTHORIZED', 403)
    }

    let providerOverride: string | undefined = undefined
    let userPrompt = 'Return a structured JSON description of AtlasBuild CMS.'

    try {
      const body = await request.json()
      if (body.provider && typeof body.provider === 'string') {
        providerOverride = body.provider
      }
      if (body.prompt && typeof body.prompt === 'string') {
        userPrompt = body.prompt
      }
    } catch {
      // Body may be empty
    }

    const provider = getAIProvider(providerOverride)
    const result = await provider.generateStructuredOutput({
      systemPrompt: 'You are AtlasBuild CMS system assistant. Return valid JSON only.',
      userPrompt,
      schema: testOutputSchema,
    })

    return successResponse({
      provider: provider.name,
      result,
    })
  } catch (error: any) {
    console.error('AI Test Route Error:', error.message || error)
    return errorResponse(
      error.message || 'AI Provider test failed.',
      'SERVER_ERROR',
      500
    )
  }
}
