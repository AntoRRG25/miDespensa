import { BaseController } from '../../Shared/Controllers/BaseController.js'
import { CustomController } from '../../Shared/Controllers/CustomController.js'
import type { IPantryProductDTO, PantryProductCreate, PantryProductUpdate } from './PantryProduct.types.js'
import type { PantryProductService } from './PantryProductService.js'
import { type Request, type Response } from 'express'

export class PantryProductController extends CustomController<IPantryProductDTO, PantryProductCreate, PantryProductUpdate> {
  constructor(service: PantryProductService) {
    super(service)
  }

  getWithPages = async(req: Request, res: Response) => {
    const { page, limit, search, categoryId, expiring, sort, dir } = req.query

    const query: any = {}

    if (search) {
      query.name = { contains: String(search), mode: 'insensitive' }
    }

    if (categoryId) {
      query.categoryId = Number(categoryId)
    }

    if (expiring === 'true') {
      const sevenDaysFromNow = new Date()
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)
      query.expiresAt = {
        lte: sevenDaysFromNow,
        gte: new Date() // optional: don't show already expired? or show them? Req says "proximos a vencer"
      }
    }

    // Also support finding expired items
    if (expiring === 'expired') {
      query.expiresAt = { lt: new Date() }
    }

    const options = {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      query,
      order: sort ? { [String(sort)]: dir === 'desc' ? 'desc' : 'asc' } : undefined
    }

    const { message, info, data } = await this.service.getWithPages(options as any)
    BaseController.responderWithInfo(res, 200, true, message, info, data)
  }
}
