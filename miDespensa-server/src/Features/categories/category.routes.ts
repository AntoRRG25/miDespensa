import express from 'express'
import { prisma } from '../../Configs/database.js'
import { BaseRepository } from '../../Shared/Repositories/BaseRepository.js'
import { BaseService } from '../../Shared/Services/BaseService.js'
import { CustomController } from '../../Shared/Controllers/CustomController.js'
import type { ICategoryDTO, CategoryCreate, CategoryUpdate } from './category.types.js'
import { CategoryParser } from './category.types.js'
import { Validator } from 'req-valid-express'
import create from './schemas/create.js'

const categoryRepository = new BaseRepository<ICategoryDTO, CategoryCreate, CategoryUpdate>(
  prisma.category,
  CategoryParser,
  'Category',
  'name'
)
const categoryService = new BaseService<ICategoryDTO, CategoryCreate, CategoryUpdate>(categoryRepository)
const categoryController = new CustomController<ICategoryDTO, CategoryCreate, CategoryUpdate>(categoryService)

const categoryRouter = express.Router()

categoryRouter.get(
  '/', 
  categoryController.getAll
)

categoryRouter.get(
  '/paginated', 
  categoryController.getWithPages
)

categoryRouter.get(
  '/:id', 
  Validator.paramId('id', Validator.ValidReg.INT),
  categoryController.getById
)

categoryRouter.post(
  '/', 
  Validator.validateBody(create),
  categoryController.create
)

categoryRouter.put(
  '/:id', 
  Validator.paramId('id', Validator.ValidReg.INT),
  categoryController.update
)

categoryRouter.delete(
  '/:id', 
  Validator.paramId('id', Validator.ValidReg.INT),
  categoryController.delete
)

export default categoryRouter