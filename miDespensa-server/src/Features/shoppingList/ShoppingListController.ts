import { BaseController } from '../../Shared/Controllers/BaseController.js'
import { CustomController } from '../../Shared/Controllers/CustomController.js'
import type { IShoppingItemDTO, ShoppingItemCreate, ShoppingItemUpdate } from './shoppingList.types.js'
import type { ShoppingListService } from './ShoppingListService.js'
import { type Request, type Response } from 'express'

export class ShoppingListController extends CustomController<IShoppingItemDTO, ShoppingItemCreate, ShoppingItemUpdate> {
  constructor(service: ShoppingListService) {
    super(service)
  }

  getStats = async(req: Request, res: Response) => {
    const total = await this.service.count({})
    const pending = await this.service.count({ checked: false })
    const completed = await this.service.count({ checked: true })

    res.status(200).json({
      success: true,
      message: 'Shopping list stats retrieved successfully',
      results: {
        total,
        pending,
        completed
      }
    })
  }
}
