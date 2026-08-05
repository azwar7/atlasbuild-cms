import { UserRepository } from '../repositories/UserRepository'
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'atlasbuild_super_secret_fallback_key'
const JWT_EXPIRES_IN = '7d'

export class AuthService {
  private userRepo: UserRepository

  constructor() {
    this.userRepo = new UserRepository()
  }

  async login(email: string, passwordUnidentified: string) {
    const user = await this.userRepo.findByEmail(email)
    if (!user) {
      throw new Error('Invalid email or password.')
    }

    const isValid = await bcrypt.compare(passwordUnidentified, user.passwordHash)
    if (!isValid) {
      throw new Error('Invalid email or password.')
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  }

  async verifySessionToken(token: string) {
    try {
      const decodedPayload = jwt.verify(token, JWT_SECRET) as {
        sub: string
        email: string
        role: string
      }
      return decodedPayload
    } catch (e) {
      throw new Error('Invalid or expired session token.')
    }
  }
}
