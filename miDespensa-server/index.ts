import app from './src/app.js'
import { startUp } from './src/Configs/database.js'
import envConfig from './src/Configs/envConfig.js'
import logger from './src/Configs/logger.js'

const message =`Server is listening on port ${envConfig.Port}\nServer in ${envConfig.Status}\n 🚀​ Everything is allright!!`
async function serverBootstrap() {
  try {
    await startUp()
    app.listen(envConfig.Port, () => {
      logger.info(message)
      console.log(message)
    })
  } catch (error) {
    logger.fatal(error, 'Error initalizing app')
    process.exit(1)
  }
}

serverBootstrap()