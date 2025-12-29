import { type PantryProduct } from '@prisma/client'

export interface IPantryProductDTO {
    id: number
    name: string
    quantity: number
    expiresAt: Date | null
    categoryId: number
    createdAt: Date
    updatedAt: Date
}

export type PantryProductCreate = {
    name: string
    quantity?: number
    expiresAt?: Date | string | null
    categoryId: number
}

export type PantryProductUpdate = {
    name?: string
    quantity?: number
    expiresAt?: Date | string | null
    categoryId?: number
}

export const PantryProductParser = (data: PantryProduct): IPantryProductDTO => {
  return {
    id: data.id,
    name: data.name,
    quantity: data.quantity,
    expiresAt: data.expiresAt,
    categoryId: data.categoryId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}