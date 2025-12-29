import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import envConfig from './envConfig.js'
import { prisma, startUp, closeDatabase } from './database.js'

const Log = prisma.log
const Category = prisma.category
const PantryProduct = prisma.pantryProduct
const ShoppingItem = prisma.shoppingItem

describe('EnvDb test', () => { 
  beforeAll(async() => {
    await startUp(true)
  })
  afterAll(async() => {
    await closeDatabase()
  })
  describe('Environment variables', () => {
    it('should return the correct environment status and database variable', () => { 
      const formatEnvInfo =
      `Server running in: ${envConfig.Status}\n` +
      `Testing prisma database: ${envConfig.DatabaseUrl}`
      expect(formatEnvInfo).toBe(
        'Server running in: test\n' + 'Testing prisma database: postgresql://postgres:antonio@localhost:5432/midespensatest?schema=public'
      )
    })
  })
  describe('Database existence', () => {
    it('should query tables and return an empty array', async() => { 
      const models = [Log, Category, PantryProduct, ShoppingItem]
      for (const model of models) {
        const records = await model.findMany()
        expect(Array.isArray(records)).toBe(true)
        expect(records.length).toBe(0)
      }
    })
  })
})
