import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import { startUp, closeDatabase, prisma } from '../../Configs/database.js'
import { BaseRepository } from './BaseRepository.js'
import * as help from './testHelpers/testHelp.help.js'
import * as store from '../../../tests/testHelpers/testStore.help.js'

describe('BaseRepository unit test', () => {
  beforeAll(async() => {
    await startUp(true)
  })
  afterAll(async() => {
    await closeDatabase()
  })
  const ShoppingItemModel = prisma.shoppingItem
  const test = new BaseRepository(ShoppingItemModel , help.parser, 'ShoppingItem', 'name')
  describe('Create method', () => {
    it('should create a element', async() => {
      const response = await test.create(help.dataCreate)
      expect(response.message).toBe('ShoppingItem itemTest created successfully')
      expect(response.results).toEqual({
        id: expect.any(Number),
        name: 'itemTest',
        quantity: 1,
        checked: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
      store.setNumberId(response.results.id)
    })
  })
  describe('Get methods', () => {
    describe('"getAll" method', () => {
      it('should retrieve an array of elements', async() => {
        await help.createSeedRandomElements(ShoppingItemModel , help.shoppingItemSeed)
        const response = await test.getAll()
        expect(response.message).toBe('ShoppingItem records retrieved successfully')
        expect(response.results.length).toBe(16)
      })
      it('Should retrieve an array of elements filtered by query', async() => {
        const response = await test.getAll(false, 'checked')
        expect(response.message).toBe('ShoppingItem records retrieved successfully')
        expect(response.results.length).toBe(9)
      })
    })
    describe('"getById" method', () => {
      it('Should retrieve an element by Id', async() => {
        const response = await test.getById(store.getNumberId())
        expect(response.message).toBe('ShoppingItem record retrieved successfully')
        expect(response.results).toEqual({
          id: expect.any(Number),
          name: 'itemTest',
          quantity: 1,
          checked: false,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        })
      })
    })
    describe('"getByField" method', () => {
      it('Should retrieve an element by field', async() => {
        const response = await test.getByField('itemTest10', 'name')
        expect(response.message).toBe('ShoppingItem record retrieved successfully')
        expect(response.results).toEqual({
          id: expect.any(Number),
          name: 'itemTest10',
          quantity: 1,
          checked: true,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        })
      })
    })
    describe('"getWithPages" method', () => {
      it('Should retrieve an array of paginated elements', async() => {
        const queryObject = { page: 1, limit: 10 }as const
        const response = await test.getWithPages(queryObject)
        expect(response.message).toBe('Total records: 16. ShoppingItems retrieved successfully')
        expect(response.info).toEqual({ total: 16, page: 1, limit: 10, totalPages: 2 })
        expect(response.data.length).toBe(10)
        expect(response.data.map(a => a.name)).toEqual([
          'itemTest',   'itemTest1',
          'itemTest10', 'itemTest11',
          'itemTest12', 'itemTest13',
          'itemTest14', 'itemTest15',
          'itemTest2',  'itemTest3'
        ])// Order
      })
      it('Should retrieve filtered and sorted elements', async() => {
        const queryObject = { page: 1, limit: 10, query: { checked: false }, order: { name: 'ASC' } } as const
        const response = await test.getWithPages(queryObject)
        expect(response.message).toBe('Total records: 9. ShoppingItems retrieved successfully')
        expect(response.info).toEqual({ total: 9, page: 1, limit: 10, totalPages: 1 })
        expect(response.data.length).toBe(9)
        expect(response.data.map(a => a.name)).toEqual([
          'itemTest',
          'itemTest1',
          'itemTest11',
          'itemTest13',
          'itemTest15',
          'itemTest3',
          'itemTest5',
          'itemTest7',
          'itemTest9'
        ])// Order
      })
    })
  })
  describe('GetManyBy method', () => {
    it('should retrieve many elements by field', async() => {
      const response = await test.getManyBy({ checked: true })
      expect(response.message).toBe('ShoppingItem records retrieved successfully')
      expect(response.results.length).toBe(7)
    })  
  })
  describe('Count method', () => {
    it('should count and deliver the number of items', async() => {
      const count = await test.count({ checked: true })
      expect(count).toBe(7)
    })
  })
  describe('Update method', () => {
    it('should update an element', async() => {
      const data = { checked: true }
      const response = await test.update(store.getNumberId(), data)
      expect(response.results).toEqual({
        id: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        ...help.dataUpdate
      })
    })
  })
  describe('Delete method', () => {
    it('should deleted an element', async() => {
      const response = await test.delete(store.getNumberId())
      expect(response.message).toBe('itemTest deleted successfully')
    })
  })
})
