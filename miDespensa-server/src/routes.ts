import express from 'express'
import categoryRouter from './Features/categories/category.routes.js'
import pantryProductRouter from './Features/pantryProducts/product.routes.js'
import shoppingListRouter from './Features/shoppingList/shoppingList.routes.js'
import loggerRouter from './Features/logs/log.routes.js'

const mainRouter = express.Router()
    
mainRouter.use('/api/categories', categoryRouter)
mainRouter.use('/api/pantry', pantryProductRouter)
mainRouter.use('/api/shopping-list', shoppingListRouter)
mainRouter.use('/api/logs', loggerRouter)

export default mainRouter