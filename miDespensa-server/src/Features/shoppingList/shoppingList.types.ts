import { type ShoppingItem } from '@prisma/client'

export interface IShoppingItemDTO {
    id: number
    name: string
    quantity: number
    checked: boolean
    createdAt: Date
    updatedAt: Date
}

export type ShoppingItemCreate = {
    name: string
    quantity?: number
    checked?: boolean
}

export type ShoppingItemUpdate = {
    name?: string
    quantity?: number
    checked?: boolean
}

export const ShoppingItemParser = (data: ShoppingItem): IShoppingItemDTO => {
  return {
    id: data.id,
    name: data.name,
    quantity: data.quantity,
    checked: data.checked,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}
