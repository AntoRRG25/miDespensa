import type { ShoppingItem } from '@prisma/client'

export interface IShoppingItemTest {
  id: number
  name: string
  quantity: number
  checked: boolean
  createdAt: Date
  updatedAt: Date
}
export interface CreateShoppingItemInput {
  name: string
  quantity: number
  checked: boolean
}
export type UpdateShoppingItemInput = Partial<CreateShoppingItemInput >

export const parser = (raw:ShoppingItem): IShoppingItemTest => {
  return {
    id: raw.id,
    name: raw.name,
    quantity: raw.quantity,
    checked: raw.checked,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt
  }
}
//* --------------------------------------------------
export const dataCreate = {
  name: 'itemTest',
  quantity: 1,
  checked: false
}
export const dataUpdate: UpdateShoppingItemInput = {
  name: 'itemTest',
  quantity: 1,
  checked: true
}

//* --------------------------------------------------
// ?          ShoppingItemSeed
//* ------------------------------------------------
export const createSeedRandomElements = async(model: any, seed: unknown[]) => {
  try {
    if (!seed || seed.length === 0) throw new Error('No data')
    await model.createMany({ data: seed })
  } catch (error) {
    console.error('Error createSeedRandomElements: ', error)
  }
}
const ptt: CreateShoppingItemInput[] = [
  { 
    name: 'itemTest',
    quantity: 1,
    checked: true
  }
]

function createSeed(pattern: CreateShoppingItemInput[], quantity: number): CreateShoppingItemInput[] {
  const result = []
  const base = pattern[0]

  for (let i = 1; i <= quantity; i++) {
    result.push({
      name: `${base.name}${i}`,
      quantity: base.quantity,
      checked: i % 2 === 0
    })
  }

  return result
}
export const shoppingItemSeed: CreateShoppingItemInput[] = createSeed(ptt, 15)