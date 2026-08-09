import { NextResponse } from 'next/server'
import { QuoteService } from '@/features/quotes-rfp/services/QuoteService'
import { getSession } from '@/lib/auth'
import { errorResponse, successResponse } from '@/shared/utils/errors'

const quoteService = new QuoteService()

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()

    // 1. Enforce strict Admin / PM RBAC
    if (!session || (session.role !== 'ADMIN' && session.role !== 'PROJECT_MANAGER' && session.role !== 'SUPER_ADMIN')) {
      return errorResponse('Forbidden: Administrator privileges required to override RFP priority.', 'UNAUTHORIZED', 403)
    }

    const { id } = await params
    if (!id) {
      return errorResponse('Missing RFP Proposal ID.', 'BAD_REQUEST', 400)
    }

    const body = await request.json()
    const humanPriority = body.humanPriority as 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

    if (!['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].includes(humanPriority)) {
      return errorResponse('Invalid priority override level. Expected CRITICAL, HIGH, MEDIUM, or LOW.', 'BAD_REQUEST', 400)
    }

    const adminUserId = session.sub || session.id || 'usr-admin-1'

    // 2. Execute Priority Override
    const result = await quoteService.overrideRFPPriority(id, humanPriority, adminUserId)

    return successResponse(result)
  } catch (error: any) {
    console.error('Failed to execute RFP Priority Override endpoint:', error)
    if (error.message && error.message.includes('not found')) {
      return errorResponse(error.message, 'NOT_FOUND', 404)
    }
    return errorResponse(
      error.message || 'RFP priority override is temporarily unavailable.',
      'SERVER_ERROR',
      500
    )
  }
}
