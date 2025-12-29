import type { IBaseRepository, IRepositoryResponse, IPaginatedOptions, IPaginatedResults, Direction } from '../Interfaces/base.interface.js'
import { throwError } from '../../Configs/errorHandlers.js'

export class BaseRepository<
  TDTO,
  TCreate extends Record<string, any>,
  TUpdate = Partial<TCreate>,
  TModel extends {
    findMany: Function
    findUnique: Function
    findFirst: Function
    create: Function
    update: Function
    delete: Function
    count: Function
    name?: string
  } = any
> implements IBaseRepository<TDTO, TCreate, TUpdate> {
  constructor(
    protected readonly Model: TModel,
    protected readonly parserFn: (model: any) => TDTO,
    protected readonly modelName: string = Model.name ?? 'Model',
    protected readonly whereField: keyof TDTO & string
  ) {}

  async getAll(
    field?: unknown,
    whereField?: keyof TDTO | string
  ): Promise<IRepositoryResponse<TDTO[]>> {
    const whereClause = whereField != null && field != null
      ? { [whereField]: field }
      : {}
    const models = await this.Model.findMany({ where: whereClause })
    return {
      message: `${this.modelName} records retrieved successfully`,
      results: models.map(this.parserFn)
    }
  }

  async getWithPages(
    options?: IPaginatedOptions<TDTO>
  ): Promise<IPaginatedResults<TDTO>> {
    const page = options?.page ?? 1
    const limit = options?.limit ?? 10
    const whereClause = options?.query ?? {}
    const skip = (page - 1) * limit

    const orderClause = options?.order
      ? Object.entries(options.order).map(([field, dir]) => ({
        [field]:
        String(dir).toLowerCase() === 'asc'? 'asc' : 'desc'
      }))
      : { [this.whereField]: 'asc' }

    const data = await this.Model.findMany({
      where: whereClause,
      orderBy: orderClause,
      skip,
      take: limit
    })
    const total = await this.Model.count({ where: whereClause })
    

    return {
      message: `Total records: ${total}. ${this.modelName}s retrieved successfully`,
      info: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: data.map(this.parserFn)
    }
  }

  async getById(id: string | number): Promise<IRepositoryResponse<TDTO>> {
    const model = await this.Model.findUnique({ where: { id: id } })
    if (!model) throwError(`${this.modelName} not found`, 404)
    return {
      message: `${this.modelName} record retrieved successfully`,
      results: this.parserFn(model)
    }
  }

  async getByField(
    field?: unknown,
    whereField: keyof TDTO | string = this.whereField
  ): Promise<IRepositoryResponse<TDTO>> {
    if (field == null) throwError(`No value provided for ${(whereField as string)}`, 400)
    const model = await this.Model.findFirst({
      where: { [whereField]: field }
    })
    if (!model) throwError(`The ${(whereField as string)} "${field}" was not found`, 404)
    return {
      message: `${this.modelName} record retrieved successfully`,
      results: this.parserFn(model)
    }
  }

  async getManyBy(
    where: Record<string, unknown>
  ): Promise<IRepositoryResponse<TDTO[]>> {
    const models = await this.Model.findMany({ where })
    return {
      message: `${this.modelName} records retrieved successfully`,
      results: models.map(this.parserFn)
    }
  }
  async count(where?: Record<string, unknown>): Promise<number> {
    return this.Model.count({ where })
  }
  async create(data: TCreate,  options?: { checkUnique?: boolean }): Promise<IRepositoryResponse<TDTO>> {
    if (options?.checkUnique) {
      const value = (data as any)[this.whereField]
      if (value != null) {
        const exists = await this.Model.findFirst({
          where: { [this.whereField]: value }
        })
        if (exists) {
          throwError(
            `${this.modelName} with ${this.whereField} "${value}" already exists`,
            400
          )
        }
      }
    }
    const model = await this.Model.create({ data })
    return {
      message: `${this.modelName} ${model[this.whereField]} created successfully`,
      results: this.parserFn(model)
    }
  }

  async update(
    id: string | number,
    data: TUpdate
  ): Promise<IRepositoryResponse<TDTO>> {
    const model = await this.Model.findUnique({ where: { id: id } })
    if (!model) throwError(`${this.modelName} not found`, 404)
    const updated = await this.Model.update({
      where: { id:id },
      data
    })
    return {
      message: `${this.modelName} record updated successfully`,
      results: this.parserFn(updated)
    }
  }

  async delete(id: string | number): Promise<IRepositoryResponse<string>> {
    const model = await this.Model.findUnique({ where: { id: id } })
    if (!model) throwError(`${this.modelName} not found`, 404)
    const value = (model as any)[this.whereField]
    await this.Model.delete({ where: { id: id } })
    return {
      message: `${value} deleted successfully`,
      results: ''
    }
  }
}
