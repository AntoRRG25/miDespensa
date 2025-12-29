import { BaseRepository } from '../../Shared/Repositories/BaseRepository.js'
import type { IShoppingItemDTO, ShoppingItemCreate, ShoppingItemUpdate } from './shoppingList.types.js'
import { ShoppingItemParser } from './shoppingList.types.js'
import { prisma } from '../../Configs/database.js'

export class ShoppingListRepository extends BaseRepository<IShoppingItemDTO, ShoppingItemCreate, ShoppingItemUpdate> {
  constructor() {
    super(prisma.shoppingItem, ShoppingItemParser, 'ShoppingItem', 'name')
  }
}
