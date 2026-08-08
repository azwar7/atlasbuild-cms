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
      return errorResponse('Forbidden: Administrator privileges required to analyze RFPs.', 'UNAUTHORIZED', 403)
    }

    const { id } = await params
    if (!id) {
      return errorResponse('Missing RFP Proposal ID.', 'BAD_REQUEST', 400)
    }

    // 2. Optional body parameters (e.g. force re-analysis flag)
    let reanalyze = false
    try {
      const body = await request.json()
      if (typeof body.reanalyze === 'boolean') {
        reanalyze = body.reanalyze
      }
    } catch {
      // Body may be empty on standard POST
    }

    const adminUserId = session.sub || session.id || 'usr-admin-1'

    // 3. Execute AI Analysis Service
    const result = await quoteService.analyzeRFP(id, adminUserId, {
      forceReanalyze: reanalyze,
    })

    return successResponse(result)
  } catch (error: any) {
    console.error('Failed to execute AI RFP Analysis endpoint:', error)
    if (error.message && error.message.includes('not found')) {
      return errorResponse(error.message, 'NOT_FOUND', 404)
    }
    return errorResponse(
      error.message || 'AI RFP analysis is temporarily unavailable. Please try again.',
      'SERVER_ERROR',
      500
    )
  }
}
