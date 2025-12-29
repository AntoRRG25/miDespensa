import { BaseService } from '../../Shared/Services/BaseService.js'
import type { IPantryProductDTO, PantryProductCreate, PantryProductUpdate } from './PantryProduct.types.js'
import type { PantryProductRepository } from './PantryProductRepository.js'

export class PantryProductService extends BaseService<IPantryProductDTO, PantryProductCreate, PantryProductUpdate> {
  constructor(repository: PantryProductRepository) {
    super(repository)
  }
  async create(data: PantryProductCreate) {
    const prismaData: any = {
      name: data.name,
      quantity: data.quantity,
      expiresAt: new Date(data.expiresAt as string)
    }

    if (data.categoryId) {
      prismaData.category = {
        connect: { id: data.categoryId }
      }
    }

    return this.repository.create(prismaData)
  }
  async update(id: number, data: PantryProductUpdate) {
  const prismaData: any = {
    name: data.name,
    quantity: data.quantity,
    expiresAt: new Date(data.expiresAt as string)
  }

  if (data.categoryId) {
    prismaData.category = {
      connect: { id: data.categoryId }
    }
  }

  return this.repository.update(id, prismaData)
}

}
