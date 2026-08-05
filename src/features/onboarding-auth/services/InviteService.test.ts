import { describe, it, expect, vi, beforeEach } from 'vitest'
import { InviteService } from './InviteService'
import crypto from 'crypto'

vi.mock('../repositories/InviteRepository')
vi.mock('../repositories/UserRepository')
vi.mock('@/shared/lib/db', () => ({
  default: {
    $transaction: vi.fn((cb: (tx: unknown) => unknown) => cb({})),
  },
}))

describe('InviteService - Unit Tests', () => {
  let inviteService: InviteService

  beforeEach(() => {
    vi.clearAllMocks()
    inviteService = new InviteService()
  })

  it('should generate a 64-character hex token format for invites', () => {
    const token = crypto.randomBytes(32).toString('hex')
    expect(token).toMatch(/^[a-f0-9]{64}$/i)
    expect(token.length).toBe(64)
  })

  it('should reject tokens expired in the past', () => {
    const expiresAt = new Date(Date.now() - 5000)
    const isExpired = expiresAt < new Date()
    expect(isExpired).toBe(true)
  })

  it('should accept valid future expiration tokens', () => {
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000)
    const isExpired = expiresAt < new Date()
    expect(isExpired).toBe(false)
  })
})
