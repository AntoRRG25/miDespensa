import { PrismaClient }from '@prisma/client'
import { execSync } from 'child_process'
import envConfig from './envConfig.js'
import logger from './logger.js'

const prisma = new PrismaClient({
  datasources: {
    db:{
      url: envConfig.DatabaseUrl
    }
        
  }
})
const nameOfDb = (): string => {
  const url = envConfig.DatabaseUrl
  if (!url) return 'unknown'
  const parts = url.split('/')
  return parts[parts.length - 1] || 'unknown'
}

async function startUp(reset:boolean = false){
  try {
    if(reset=== true && envConfig.Status==='test'){
      logger.info(`🔄 Restarting database "${nameOfDb()}" for testing...`)
      await prisma.$disconnect() // Cierra cualquier conexión activa
      execSync('npx prisma migrate reset --force', { stdio: 'inherit' })
      logger.info('🧪  Database restored successfully')
    }
    await prisma.$connect()
    logger.info(`🟢  Database "${nameOfDb()}" initialized successfully!!`)
  } catch (error) {
    logger.error('❌ Error starting database: '+ error)
  }
}

async function closeDatabase() {
  try {
    await prisma.$disconnect()
    logger.info(`🛑 Database "${nameOfDb()}" disconnect successfully.`)
  } catch (error) {
    logger.error('❌ Error closing database:' +error)
  }
}
export {
  prisma,
  startUp,
  closeDatabase
}
