import { throwError, processError } from '../errorHandlers.js'
import { type ILogger, type LoggerUpdate, type ILoggerService, type IPagesOptions, type IActionResponse, type IPaginatedResponse } from './Logger.interfaces.js'
import { type Log } from '@prisma/client'
import { prisma } from '../database.js'

export class LoggerServiceDb implements ILoggerService<ILogger, LoggerUpdate> {
  protected readonly db: typeof prisma.log

  constructor() {
    this.db = prisma.log
  }

  /**
   * Parse prisma instance → ILogger
   */
  private readonly parserFn = (u: Log): ILogger => {
    const log = u
    return {
      id: log.id,
      levelName: log.levelName ?? '',
      levelCode: log.levelCode,
      message: log.message,
      type: log.type ?? null,
      status: log.status ?? null,
      stack: log.stack ?? null,
      contexts: log.contexts ?? [],
      pid: log.pid,
      time: Number(log.time) ?? '',
      hostname: log.hostname ?? '',
      keep: log.keep,
      createdAt: log.createdAt?.toISOString() ?? '',
      updatedAt: log.updatedAt?.toISOString() ?? ''
    }
  }


  /**
 * Get paginated results (Prisma)
 */
  async getAll(options: IPagesOptions<ILogger> = {}): Promise<IPaginatedResponse> {
    try {
      const {
        searchField = '',
        search = null,
        sortBy = 'createdAt', // más natural para logs
        order = 'DESC',
        page = 1,
        limit = 10
      } = options

      // Normalizar valores
      const pageNum = Number(page) > 0 ? Number(page) : 1
      const limitNum = Number(limit) > 0 ? Number(limit) : 10
      const skip = (pageNum - 1) * limitNum

      // Construir filtro
      const where: any = {}

      if (search && searchField) {
        where[searchField] = {
          contains: search,
          mode: 'insensitive' // insensible a mayúsculas/minúsculas
        }
      }

      // Construir sort
      const orderBy: any = {
        [sortBy]: order.toLowerCase()
      }

      const [docs, total] = await Promise.all([
        this.db.findMany({
          where,
          orderBy,
          skip,
          take: limitNum
        }),
        this.db.count({ where })
      ])

      return {
        info: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum)
        },
        results: docs.map(doc => this.parserFn(doc))
      }
    } catch (error) {
      return processError(error, 'Log getAll')
    }
  }


  /**
   * Get single log by IDk
   */
  async getById(id: string): Promise<ILogger> {
    try {
      const record = await this.db.findUnique({
        where: { id }
      })

      if (!record) {
        throwError(`Log con ID ${id} no encontrado`, 404)
      }

      return this.parserFn(record!)
    } catch (error) {
      return processError(error, 'Log getById')
    }
  }

  /**
   * Update keep flag or other allowed fields
   */
  async update(id: string, data: LoggerUpdate): Promise<IActionResponse> {
    try {
      const record = await this.db.findUnique({
        where: { id }
      })

      if (!record) {
        throwError(`Log con ID ${id} no encontrado`, 404)
      }

      const updatedRecord = await this.db.update({
        where: { id },
        data: data as any // Asumiendo que LoggerUpdate mapea correctamente a los campos de prisma o un subconjunto
      })

      return {
        message: 'Log actualizado correctamente',
        results: this.parserFn(updatedRecord)
      }
    } catch (error) {
      return processError(error, 'Log update')
    }
  }

  /**
   * Delete single log
   */
  async delete(id: string): Promise<string> {
    try {
      const record = await this.db.findUnique({
        where: { id }
      })

      if (!record) {
        throwError(`Log con ID ${id} no encontrado`, 404)
      }

      await this.db.delete({
        where: { id }
      })

      return 'Log eliminado correctamente'
    } catch (error) {
      return processError(error, 'Log delete')
    }
  }

  /**
   * Delete all logs except those marked as keep = true
   */
  async deleteAll(): Promise<string> {
    try {
      await this.db.deleteMany({
        where: {
          keep: false
        }
      })

      return 'Logs eliminados correctamente'
    } catch (error) {
      return processError(error, 'Log deleteAll')
    }
  }
}
