import express from 'express'
import { ShoppingListRepository } from './ShoppingListRepository.js'
import { ShoppingListService } from './ShoppingListService.js'
import { ShoppingListController } from './ShoppingListController.js'
import { Validator } from 'req-valid-express'
import {create, update }from './schemas/create.js'

const repository = new ShoppingListRepository()
const service = new ShoppingListService(repository)
const controller = new ShoppingListController(service)

const shoppingListRouter = express.Router()

shoppingListRouter.get(
  '/',
  controller.getAll
)

shoppingListRouter.get(
  '/paginated',
  controller.getWithPages
)

shoppingListRouter.get(
  '/stats',
  controller.getStats
)

shoppingListRouter.get(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  controller.getById
)

shoppingListRouter.post(
  '/',
  Validator.validateBody(create),
  controller.create
)

shoppingListRouter.put(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  Validator.validateBody(update),
  controller.update
)

shoppingListRouter.delete(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  controller.delete
)

export default shoppingListRouter