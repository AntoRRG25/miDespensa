import express from 'express'
import { Validator } from 'req-valid-express'
import { Middlewares } from '../../Shared/Middlewares/Middlewares.js'
import { LoggerServiceDb } from '../../Configs/Logger/LoggerServiceDb.js'
import { LoggerController } from '../../Configs/Logger/LoggerController.js'
import { logquery } from './logSchemas.js'

const loggerService = new LoggerServiceDb()
const logController = new LoggerController(loggerService)

const loggerRouter = express.Router()

loggerRouter.get(
  '/',
  Validator.validateQuery(logquery),
  Middlewares.allowedQueryValuesByRules({
    searchField: ['levelName', 'message', 'status'],
    sortBy: ['id', 'time', 'createdAt'],
    order:['ASC', 'DESC']
  }),
  logController.getAll
)

loggerRouter.get(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  logController.getById
)

loggerRouter.patch(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  Validator.validateBody({ keep:{ type:'boolean' } }),
  logController.update
)

loggerRouter.delete(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  logController.delete
)

loggerRouter.delete(
  '/all/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  logController.deleteAll
)
export default loggerRouter