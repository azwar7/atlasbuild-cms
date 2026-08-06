import { NextResponse } from 'next/server'
import prisma from '@/shared/lib/db'
import { errorResponse, successResponse } from '@/shared/utils/errors'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return errorResponse('All contact fields (name, email, subject, message) are required.', 'BAD_REQUEST', 400)
    }

    // Save to Database
    const contactReq = await prisma.contactRequest.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })

    // Log in audit activity trail
    await prisma.activityLog.create({
      data: {
        action: 'CONTACT_FORM_SUBMITTED',
        entityType: 'ContactRequest',
        entityId: contactReq.id,
        details: JSON.stringify({ name, email, subject }),
      },
    })

    console.log(`✉️ Contact Request Received from ${name} (${email}): ${subject}`)

    return successResponse({
      id: contactReq.id,
      message: 'Thank you for contacting AtlasBuild. Our civil engineering team will respond within 24 business hours.',
    })
  } catch (error: any) {
    console.error('Contact submission error:', error)
    return errorResponse(error.message || 'Failed to submit contact request.', 'SERVER_ERROR', 500)
  }
}
