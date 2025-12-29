import express from 'express'
import { PantryProductRepository } from './PantryProductRepository.js'
import { PantryProductService } from './PantryProductService.js'
import { PantryProductController } from './PantryProductController.js'
import { Validator } from 'req-valid-express'
import create from './schemas/create.js'

const repository = new PantryProductRepository()
const service = new PantryProductService(repository)
const controller = new PantryProductController(service)

const pantryProductRouter = express.Router()

pantryProductRouter.get(
  '/',
  controller.getAll
)

pantryProductRouter.get(
  '/paginated',
  controller.getWithPages
)

pantryProductRouter.get(
  '/:id',
 Validator.paramId('id', Validator.ValidReg.INT),
  controller.getById
)

pantryProductRouter.post(
  '/',
  Validator.validateBody(create),
  controller.create
)

pantryProductRouter.patch(
  '/:id',
 Validator.paramId('id', Validator.ValidReg.INT),
  controller.update
)

pantryProductRouter.delete(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  controller.delete
)

export default pantryProductRouter