import { NextResponse } from 'next/server'
import { QuoteService } from '@/features/quotes-rfp/services/QuoteService'
import { getSession } from '@/lib/auth'
import { errorResponse, successResponse } from '@/shared/utils/errors'
import { QuoteStatus } from '@/generated/client'

const quoteService = new QuoteService()

export async function GET(request: Request) {
  try {
    const session = await getSession()

    // Enforce Administrator / PM permissions
    if (!session || (session.role !== 'ADMIN' && session.role !== 'PROJECT_MANAGER' && session.role !== 'SUPER_ADMIN')) {
      return errorResponse('Forbidden: Administrator access required.', 'UNAUTHORIZED', 403)
    }

    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get('status') as QuoteStatus | null

    const proposals = await quoteService.getQuotesForAdmin(statusFilter || undefined)
    const stats = await quoteService.getStats()

    return successResponse({
      proposals,
      stats,
    })
  } catch (error: any) {
    console.error('Failed to fetch admin RFP proposals:', error)
    return errorResponse(error.message || 'Failed to fetch RFP proposals.', 'SERVER_ERROR', 500)
  }
}
