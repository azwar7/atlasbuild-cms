import { z } from 'zod'
import { QuoteService } from '@/features/quotes-rfp/services/QuoteService'
import { ProjectSector, QuoteStatus } from '../../../generated/client'
import { successResponse, errorResponse, validationErrorResponse, getAuthorizationUser } from '@/shared/utils/errors'

const createQuoteRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.').max(128),
  email: z.string().email('Enter a valid email address string.'),
  company: z.string().optional(),
  projectTitle: z.string().min(3, 'Project title must be at least 3 characters.').max(256),
  sector: z.nativeEnum(ProjectSector),
  budgetRange: z.string().min(1, 'Budget range is required.'),
  location: z.string().min(1, 'Location description is required.'),
  description: z.string().min(10, 'Provide a description of at least 10 characters.'),
  blueprintUrl: z.string().url('Blueprint URL must be a valid Cloudinary link.').optional().or(z.literal('')),
})

export async function GET(request: Request) {
  try {
    const userPayload = getAuthorizationUser(request)
    if (!userPayload || (userPayload.role !== 'ADMIN' && userPayload.role !== 'PROJECT_MANAGER')) {
      return errorResponse('Access denied. Administrator or PM privileges required.', 'FORBIDDEN', 403)
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as QuoteStatus | null

    const quoteService = new QuoteService()
    const quotes = await quoteService.getQuotesForAdmin(status || undefined)

    return successResponse(quotes)
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch quote lead requests.', 'SERVER_ERROR', 500)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = createQuoteRequestSchema.safeParse(body)

    if (!parsed.success) {
      return validationErrorResponse(parsed.error)
    }

    const quoteService = new QuoteService()
    const quote = await quoteService.submitQuoteRequest({
      ...parsed.data,
      blueprintUrl: parsed.data.blueprintUrl || undefined,
    })

    return successResponse(quote, 201)
  } catch (error: any) {
    return errorResponse(error.message || 'RFP submission failed.', 'SERVER_ERROR', 500)
  }
}
