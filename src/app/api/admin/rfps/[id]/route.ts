import { NextResponse } from 'next/server'
import { QuoteService } from '@/features/quotes-rfp/services/QuoteService'
import { getSession } from '@/lib/auth'
import { errorResponse, successResponse } from '@/shared/utils/errors'

const quoteService = new QuoteService()

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session || (session.role !== 'ADMIN' && session.role !== 'PROJECT_MANAGER' && session.role !== 'SUPER_ADMIN')) {
      return errorResponse('Forbidden: Administrator access required.', 'UNAUTHORIZED', 403)
    }

    const { id } = await params
    const proposal = await quoteService.getQuoteById(id)

    if (!proposal) {
      return errorResponse('RFP Proposal not found.', 'NOT_FOUND', 404)
    }

    return successResponse(proposal)
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch proposal details.', 'SERVER_ERROR', 500)
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()

    // Strict Administrator enforcement for mutations
    if (!session || (session.role !== 'ADMIN' && session.role !== 'PROJECT_MANAGER' && session.role !== 'SUPER_ADMIN')) {
      return errorResponse('Forbidden: Only Administrators can approve or reject proposals.', 'UNAUTHORIZED', 403)
    }

    const { id } = await params
    const body = await request.json()
    const { action, rejectionReason, adminNotes } = body

    if (!action || !['APPROVE', 'REJECT', 'REVIEW', 'ARCHIVE'].includes(action)) {
      return errorResponse('Invalid action specified. Must be APPROVE, REJECT, REVIEW, or ARCHIVE.', 'BAD_REQUEST', 400)
    }

    const updatedProposal = await quoteService.evaluateRFPProposal(
      id,
      action,
      session.sub || session.id,
      rejectionReason,
      adminNotes
    )

    return successResponse(updatedProposal)
  } catch (error: any) {
    console.error('Failed to update proposal evaluation:', error)
    return errorResponse(error.message || 'Failed to evaluate RFP proposal.', 'SERVER_ERROR', 500)
  }
}
