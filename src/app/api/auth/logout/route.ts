import { successResponse } from '@/shared/utils/errors'

export async function POST() {
  const response = successResponse({ message: 'Session invalidated successfully.' })
  response.headers.set(
    'Set-Cookie',
    'atlasbuild_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
  )
  return response
}
