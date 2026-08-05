import prisma from '@/shared/lib/db'
import { Role } from '../../../generated/client'

export interface CreateUserData {
  email: string
  passwordHash: string
  name?: string
  role?: Role
  createdBy?: string
}

export interface UpdateUserData {
  name?: string
  passwordHash?: string
  role?: Role
  updatedBy?: string
}

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    })
  }

  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        deletedAt: null,
      },
    })
  }

  async create(data: CreateUserData) {
    return prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        passwordHash: data.passwordHash,
        name: data.name,
        role: data.role ?? Role.CLIENT,
        createdBy: data.createdBy,
      },
    })
  }

  async update(id: string, data: UpdateUserData) {
    return prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    })
  }

  async softDelete(id: string, updatedBy?: string) {
    return prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedBy,
      },
    })
  }
}
