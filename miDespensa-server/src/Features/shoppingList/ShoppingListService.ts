import { BaseService } from '../../Shared/Services/BaseService.js'
import type { IShoppingItemDTO, ShoppingItemCreate, ShoppingItemUpdate } from './shoppingList.types.js'
import type { ShoppingListRepository } from './ShoppingListRepository.js'

export class ShoppingListService extends BaseService<IShoppingItemDTO, ShoppingItemCreate, ShoppingItemUpdate> {
  constructor(repository: ShoppingListRepository) {
    super(repository)
  }
}
