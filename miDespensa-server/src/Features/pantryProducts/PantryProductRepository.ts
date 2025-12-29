import { BaseRepository } from '../../Shared/Repositories/BaseRepository.js'
import type { IPantryProductDTO, PantryProductCreate, PantryProductUpdate } from './PantryProduct.types.js'
import { PantryProductParser } from './PantryProduct.types.js'
import { prisma } from '../../Configs/database.js'

export class PantryProductRepository extends BaseRepository<IPantryProductDTO, PantryProductCreate, PantryProductUpdate> {
  constructor() {
    super(prisma.pantryProduct, PantryProductParser, 'PantryProduct', 'name')
  }
}
