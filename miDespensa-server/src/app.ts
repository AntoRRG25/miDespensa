import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import * as eh from './Configs/errorHandlers.js'
import mainRouter from './routes.js'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(eh.jsonFormat)

app.use(mainRouter)
app.use(eh.notFoundRoute)
app.use(eh.errorEndWare)

export default app
