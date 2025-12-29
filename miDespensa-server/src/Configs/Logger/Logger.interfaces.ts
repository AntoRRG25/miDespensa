export interface ILogger {
  id: string
  levelName: string
  levelCode: number
  message: string
  type?: string | null
  status?: number | null
  stack?: string | null
  contexts?: string[] | []
  pid: number
  time: number
  hostname: string
  keep: boolean
  createdAt?: string
  updatedAt?: string
}

export interface LoggerCreate {
  level: string
  message: string
  data?: Record<string, any> | null
}

export type LoggerUpdate = Pick<ILogger, 'keep'>

interface IPagesInfo {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface IPaginatedResponse {
  info: IPagesInfo
  results: ILogger[]
}

export type OrderDirection = 'ASC' | 'DESC'

export interface Order<T> {
  field: keyof T
  direction: OrderDirection
}

export interface IPagesOptions<T> {
  searchField?: keyof T
  search?: unknown
  page?: number
  limit?: number
  sortBy?: keyof T
  order?: OrderDirection
}

export interface IActionResponse {
  message: string
  results: ILogger
}

export interface ILoggerService<TLog, TLogUpdate> {
  getAll: (options: IPagesOptions<TLog>) => Promise<IPaginatedResponse>
  getById: (id: string) => Promise<TLog>
  update: (id: string, data: TLogUpdate) => Promise<IActionResponse>
  delete: (id: string) => Promise<string>
  deleteAll: () => Promise<string>
}
